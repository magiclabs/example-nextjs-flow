'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypographyH2, TypographyP } from '@/components/ui/typography'
import { useUser } from '@/hooks/use-user'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

export default function SignInLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn } = useUser()

  const [isMounted, setIsMounted] = useState(false)

  const method = useMemo(() => {
    return pathname.split('/').pop()
  }, [pathname])

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
    setIsMounted(true)
  }, [isLoggedIn, router])

  if (!isMounted) {
    return <div>Checking session...</div>
  }

  return isLoggedIn ? (
    <div>Checking session...</div>
  ) : (
    <div className="flex w-full flex-1 flex-col">
      <TypographyH2>Magic + FCL Example</TypographyH2>
      <br />

      <TypographyP>You can select sign-in methods</TypographyP>
      <Select
        value={method}
        onValueChange={(v) => router.push('/sign-in/' + v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="email-otp">Email OTP</SelectItem>
          <SelectItem value="magic-link">Magic Link</SelectItem>
          <SelectItem value="sms">SMS</SelectItem>
          <SelectItem value="oauth">OAuth</SelectItem>
          <SelectItem value="discovery">Discovery</SelectItem>
        </SelectContent>
      </Select>

      <br />

      {children}
    </div>
  )
}
