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

  const handleSnapshot = async () => {
    const user = await fcl.currentUser().snapshot()

    console.log({ user })
  }

  const handleSubscribe = async () => {
    // subscribes to the current user object and logs to console on changes
    fcl.currentUser().subscribe(console.log)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current User</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleSignUserMessage}>
          fcl.currentUser().signUserMessage()
        </Button>
        <Button onClick={handleSnapshot}>fcl.currentUser().snapshot()</Button>
        <Button onClick={handleSubscribe}>fcl.currentUser().subscribe()</Button>
      </CardContent>
    </Card>
  )
}
