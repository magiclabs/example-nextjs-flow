'use client'

import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function SignInLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
    setIsMounted(true)
  }, [isLoggedIn, router])

  if (!isMounted) {
    return <div>Checking session...</div>
  }

  return isLoggedIn ? <div>Checking session...</div> : <>{children}</>
}
