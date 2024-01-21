import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const OnChainInteractionsCard = () => {
  const handleQuery = async () => {
    const result = await fcl.query({
      cadence: `
        pub fun main(a: Int, b: Int, addr: Address): Int {
          log(addr)
          return a + b
        }
      `,
      args: (arg: any, t: any) => [
        arg(7, t.Int), // a: Int
        arg(6, t.Int), // b: Int
        arg('0xba1132bc08f82fe2', t.Address), // addr: Address
      ],
    })

    console.log({ result })
  }

  const handleMutate = async () => {
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

    console.log({ transactionId })

    return transactionId
  }

  const handleSend = async () => {
    const tx = await fcl.send([
      fcl.transaction`
        transaction {
          prepare(acct: AuthAccount) {
            log("Transaction Submitted")
          }
        }
      `,
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(100),
    ])

    console.log({ tx })
    return tx
  }

  const handleDecode = async () => {
    const response = await fcl.send([
      fcl.script`
            pub fun main(int1: Int, int2: Int): Int {
                return int1 + int2
            }
        `,
      fcl.args([fcl.arg(1, fcl.t.Int), fcl.arg(2, fcl.t.Int)]),
    ])

    console.log({ response })

    const decoded = await fcl.decode(response)
    console.log({ decoded })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>On-chain Interactions</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleQuery}>fcl.query</Button>
        <Button onClick={handleMutate}>fcl.muate</Button>
        <Button onClick={handleSend}>fcl.send</Button>
        <Button onClick={handleDecode}>fcl.decode</Button>
      </CardContent>
    </Card>
  )
}
