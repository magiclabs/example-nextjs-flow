import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const BuildersCard = () => {
  const handleGetBlock = async () => {
    const block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode)

    console.log({ block })
  }

  const handleGetAccount = async () => {
    const user = await fcl.currentUser().snapshot()

    const account = await await fcl
      .send([fcl.getAccount(user.addr)])
      .then(fcl.decode)

    console.log({ account })
  }

  const handleAtBlockHeight = async () => {
    const target = await fcl.send([fcl.getBlock(true)]).then(fcl.decode)

    const block = await fcl
      .send([fcl.getBlock(), fcl.atBlockHeight(target.height)])
      .then(fcl.decode)

    console.log({ block })
  }

  const handleGetEventsAtBlockHeightRange = async () => {
    const block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode)
    console.log({ block })

    const result = await fcl
      .send([
        fcl.getEventsAtBlockHeightRange(
          'A.7e60df042a9c0868.FlowToken.TokensWithdrawn',
          block.height - 100,
          block.height,
        ),
      ])
      .then(fcl.decode)

    console.log(result)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Builders</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button
          className="small-button"
          style={{ width: 'auto' }}
          onClick={handleGetAccount}
        >
          getAccount
        </Button>
        <Button
          className="small-button"
          style={{ width: 'auto' }}
          onClick={handleGetBlock}
        >
          getBlock
        </Button>
        <Button
          className="small-button"
          style={{ width: 'auto' }}
          onClick={handleAtBlockHeight}
        >
          atBlockHeight
        </Button>
        <Button
          className="small-button"
          style={{ width: 'auto' }}
          onClick={handleGetEventsAtBlockHeightRange}
        >
          getEventsAtBlockHeightRange
        </Button>
      </CardContent>
    </Card>
  )
}
