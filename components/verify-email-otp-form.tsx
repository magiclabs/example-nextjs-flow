'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TypographySmall } from '@/components/ui/typography'
import { z } from 'zod'

const FormSchema = z.object({
  otp: z.string().optional(),
})

export default function VerifyEmailOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async ({ otp }: z.infer<typeof FormSchema>) => {
    // window.addEventListener('message', )
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onClick={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="000000" {...field} />
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

        <Button type="submit">Verify</Button>
      </form>
    </Form>
  )
}
