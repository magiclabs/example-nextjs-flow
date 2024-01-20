'use client'

import { useUser } from '@/hooks/use-user'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

export default function SignInLayout({ children }: PropsWithChildren) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  return isLoggedIn ? <div>Checking session...</div> : <>{children}</>
}
