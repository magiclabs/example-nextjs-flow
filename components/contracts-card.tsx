import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fcl } from '@/lib/fcl'

export const ContractsCard = () => {
  const handleGetAccount = async () => {
    const currentUser = await fcl.currentUser()

    const cadence = `
    import FungibleToken from 0xFT
    import FlowToken from 0xFLOW

    transaction(recepient: Address, amount: UFix64){
      prepare(signer: AuthAccount){
        let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow Provider reference to the Vault")

        let receiverAccount = getAccount(recepient)

        let receiver = receiverAccount.getCapability(/public/flowTokenReceiver)
          .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
          ?? panic("Could not borrow Receiver reference to the Vault")

                let tempVault <- sender.withdraw(amount: amount)
        receiver.deposit(from: <- tempVault)
      }
    }
  `
    const args = (arg: any, t: any) => [
      arg('0x3ad5425104231af1', t.Address),
      arg(0.00001, t.UFix64),
    ]
    const limit = 500

    const txId = await fcl.mutate({ cadence, args, limit })
    console.log({ txId })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contracts</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button
          className="small-button"
          style={{ width: 'auto' }}
          onClick={handleGetAccount}
        >
          Send tokens
        </Button>
      </CardContent>
    </Card>
  )
}
