'use client'

import { isEmpty, isNil } from '@fxts/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { TypographyH2 } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { fcl } from '@/lib/fcl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { z } from 'zod'

const FormSchema = z.object({
  apiKey: z.string(),
  method: z.string(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
})

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      apiKey: MAGIC_API_KEY,
      method: 'default',
    },
  })

  const method = form.watch('method')

  const onSubmit = async ({
    apiKey,
    method,
    email,
    phoneNumber,
  }: z.infer<typeof FormSchema>) => {
    try {
      if (method === 'email-otp' || method === 'magic-link') {
        if (isNil(email) || isEmpty(email)) {
          throw new Error('Email is required')
        }

        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/${apiKey}/authn?${new URLSearchParams({
            method,
            email,
          })}`,
        )
      } else if (method === 'sms') {
        if (isNil(phoneNumber) || isEmpty(phoneNumber)) {
          throw new Error('PhoneNumber is required')
        }

        fcl.config().put(
          'discovery.wallet',
          `${FCL_BASE_URL}/${apiKey}/authn?${new URLSearchParams({
            method,
            phoneNumber,
          })}`,
        )
      } else {
        fcl.config().put('discovery.wallet', `${FCL_BASE_URL}/${apiKey}/authn`)
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
      form.setError(
        'root',
        e instanceof Error ? e : new Error('An unknown error occurred'),
      )
    }
  }

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      email: '',
      phoneNumber: '',
    })
  }, [form, method])

  return (
    <div className="flex w-full flex-1 flex-col">
      <TypographyH2>Magic + FCL Example</TypographyH2>

      <br />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormDescription>Please select sign in method</FormDescription>
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

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={
              form.formState.isSubmitting || form.formState.isSubmitSuccessful
            }
          >
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  )
}
