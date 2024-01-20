'use client'

import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

export default function SignInLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user.loggedIn) {
      router.push('/sign-in')
    }
  }, [user, router])

  return !user.loggedIn ? <div>Checking session...</div> : <>{children}</>
}
