'use client'

import { isEmpty, isNil } from '@fxts/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypographySmall } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { fcl } from '@/lib/fcl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { z } from 'zod'

const FormSchema = z.object({
  network: z.string(),
  apiKey: z.string(),
  method: z.string(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  provider: z.string().optional(),
})

export default function MagicSignInForm() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: 'testnet',
      apiKey: MAGIC_API_KEY,
      method: 'default',
    },
  })

  const method = form.watch('method')

  const onSubmit = async ({
    network,
    apiKey,
    method,
    email,
    phoneNumber,
    provider,
  }: z.infer<typeof FormSchema>) => {
    try {
      fcl.config().put('flow.network', network)
      fcl
        .config()
        .put(
          'accessNode.api',
          network === 'mainnet'
            ? 'https://rest-mainnet.onflow.org'
            : 'https://access-testnet.onflow.org',
        )

      if (method === 'email-otp' || method === 'magic-link') {
        if (isNil(email) || isEmpty(email)) {
          form.setError(
            'email',
            {
              message: 'Email is required',
            },
            { shouldFocus: true },
          )
          return
        }

        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/authn?${new URLSearchParams({
            apiKey,
            method,
            email,
          })}`,
        )
        fcl.config().put('discovery.wallet.method', 'IFRAME/RPC')
      } else if (method === 'sms') {
        if (isNil(phoneNumber) || isEmpty(phoneNumber)) {
          form.setError(
            'phoneNumber',
            {
              message: 'PhoneNumber is required',
            },
            { shouldFocus: true },
          )
          return
        }

        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/authn?${new URLSearchParams({
            apiKey,
            method,
            phoneNumber,
          })}`,
        )
        fcl.config().put('discovery.wallet.method', 'IFRAME/RPC')
      } else if (method === 'oauth') {
        if (isNil(provider) || isEmpty(provider)) {
          form.setError(
            'provider',
            {
              message: 'Provider is required',
            },
            { shouldFocus: true },
          )
          return
        }

        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/authn?${new URLSearchParams({
            apiKey,
            method,
            provider,
          })}`,
        )
        fcl.config().put('discovery.wallet.method', 'TAB/RPC')
      } else {
        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/authn?${new URLSearchParams({
            apiKey,
          })}`,
        )
        fcl.config().put('discovery.wallet.method', 'IFRAME/RPC')
      }

      const user = await fcl.authenticate()
      if (!user.loggedIn) {
        throw new Error("You're not logged in")
      }

      toast({
        title: 'Success Login',
        description: 'You have successfully logged in!',
      })
      router.push('/')
    } catch (e) {
      form.setError('root', {
        message: e instanceof Error ? e.message : 'An unknown error occurred',
      })
    }
  }
  useEffect(() => {
    if (form.getValues('email') || form.getValues('phoneNumber')) {
      form.reset({
        ...form.getValues(),
        email: undefined,
        phoneNumber: undefined,
      })
    }
  }, [form, method])

  return (
    <Card>
      <CardHeader>
        <CardTitle>FCL Authenticate</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormDescription></FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="testnet">Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Magic API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Your API Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <FormDescription>
                    Please select sign in method
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="email-otp">Email OTP</SelectItem>
                      <SelectItem value="magic-link">Magic Link</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="oauth">OAuth</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(method === 'email-otp' || method === 'magic-link') && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {method === 'sms' && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PhoneNumber</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {method === 'oauth' && (
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            {form.formState.errors.root && (
              <div>
                <TypographySmall className="text-red-500 dark:text-red-900">
                  {form.formState.errors.root.message}
                </TypographySmall>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
          disabled={
            form.formState.isSubmitting || form.formState.isSubmitSuccessful
          }
        >
          Sign In
        </Button>
      </CardFooter>
    </Card>
  )
}
