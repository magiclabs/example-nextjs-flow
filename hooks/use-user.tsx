import { fcl } from '@/lib/fcl'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useUser = () => {
  const queryClient = useQueryClient()

  const { data: user } = useSuspenseQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (typeof window === 'undefined') {
        return null
      }
      const user = await fcl.currentUser().snapshot()
      return user
    },
  })

  const isLoggedIn = !!user?.loggedIn

  useEffect(() => {
    fcl.currentUser().subscribe((user: any) => {
      queryClient.setQueryData(['user'], user)
    })
  }, [queryClient])

  return { user, isLoggedIn }
}
