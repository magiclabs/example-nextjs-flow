import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TypographyLarge, TypographySmall } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { useUser } from '@/hooks/use-user'
import { fcl, getFlowdiverAccountURL } from '@/lib/fcl'
import { CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCopyToClipboard } from 'react-use'

export const UserInfoCard = () => {
  const router = useRouter()
  const { user } = useUser()
  const [, copyToClipboard] = useCopyToClipboard()
  const { toast } = useToast()

  const handleLogout = async () => {
    const res = await fcl.unauthenticate()
    console.log({ res })
    toast({
      title: 'Success Logout',
      description: 'You have successfully logged out!',
    })
    router.push('/sign-in')
  }

  const handleCopyPublicAddress = () => {
    try {
      copyToClipboard(user.addr)
      toast({
        title: 'Copy Public Address',
        description: 'Copied to clipboard!',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Info</CardTitle>
        {/* <CardDescription>{email}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <Button
          variant="link"
          className="space-x-2"
          onClick={handleCopyPublicAddress}
        >
          <TypographyLarge>{user.addr}</TypographyLarge>
          <CopyIcon className="h-5 w-5" />
        </Button>
      </CardContent>
      <CardFooter className="flex items-end justify-between">
        <a
          href={getFlowdiverAccountURL(user.addr)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center space-x-2 hover:underline"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          <TypographySmall>See details in the Flowdiver!</TypographySmall>
        </a>
        <Button onClick={handleLogout}>Logout</Button>
      </CardFooter>
    </Card>
  )
}
