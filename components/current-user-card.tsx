import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const CurrentUserCard = () => {
  const handleSignUserMessage = async () => {
    const user = await fcl.currentUser()

    const hexMessage = Buffer.from('Hello World').toString('hex')
    const signed = await user.signUserMessage(hexMessage)

    console.log({ signed })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current User</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleSignUserMessage}>
          fcl.currentUser().signUserMessage
        </Button>
      </CardContent>
    </Card>
  )
}
