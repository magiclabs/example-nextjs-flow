'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
import { z } from 'zod'

const FormSchema = z.object({
  method: z.string(),
  network: z.string(),
  apiKey: z.string(),
  email: z.string().email(),
  locale: z.string(),
})

export default function EmailOTPPage() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      method: 'email-otp',
      network: 'testnet',
      apiKey: MAGIC_API_KEY,
      email: '',
      locale: 'en',
    },
  })

  const onSubmit = async ({
    method,
    network,
    apiKey,
    email,
    locale,
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
      fcl.config().put(
        'discovery.wallet',
        `${FCL_BASE_URL}/authn?${new URLSearchParams({
          apiKey,
          method,
          email,
          locale,
        })}`,
      )
      fcl.config().put('discovery.wallet.method', 'IFRAME/RPC')

      const user = await fcl.authenticate()
      if (!user.loggedIn) {
        throw new Error("You're not logged in")
      }
      console.log({ user })

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>FCL Authenticate</CardTitle>
        <CardDescription>Sign in with mail OTP using custom UI</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
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
              name="locale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locale</FormLabel>
                  <FormDescription></FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">en</SelectItem>
                      <SelectItem value="ja">ja</SelectItem>
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

            {form.formState.errors.root && (
              <div>
                <TypographySmall className="text-red-500 dark:text-red-900">
                  {form.formState.errors.root.message}
                </TypographySmall>
              </div>
            )}
          </CardContent>

          <CardFooter>
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
