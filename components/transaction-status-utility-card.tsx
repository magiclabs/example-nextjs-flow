import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const TransactionStatusUtilityCard = () => {
  const handleTx = async () => {
    const user = await fcl.currentUser().snapshot()
    console.log({ user })

    const transactionId = await fcl.mutate({
      cadence: `
      transaction(a: Int, b: Int, c: Address) {
        prepare(acct: AuthAccount) {
          log(acct)
          log(a)
          log(b)
          log(c)
        }
      }
    `,
      args: (arg: any, t: any) => [
        arg(6, t.Int),
        arg(7, t.Int),
        arg(user.addr, t.Address),
      ],
      limit: 50,
    })

    const tx = await fcl.tx(transactionId).snapshot()

    console.log({ tx })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Status Utility</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleTx}>fcl.tx</Button>
      </CardContent>
    </Card>
  )
}
