import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const PreBuiltInteractionsCard = () => {
  const handleAccount = async () => {
    const user = await fcl.currentUser().snapshot()
    const account = await fcl.account(user.addr)
    console.log({ account })
  }

  const handleBlock = async () => {
    // get latest finalized block
    const latestBlock = await fcl.block()
    console.log({ latestBlock })

    // get latest sealed block
    const sealedLatestBlock = await fcl.block({ sealed: true })
    console.log({ sealedLatestBlock })

    // get block by id
    const blockById = await fcl.block({
      id: latestBlock.id,
    })
    console.log({ blockById })

    // get block by height
    const blockByHeight = await fcl.block({ height: latestBlock.height })
    console.log({ blockByHeight })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pre-built interactions</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleAccount}>fcl.account</Button>
        <Button onClick={handleBlock}>fcl.block</Button>
      </CardContent>
    </Card>
  )
}
