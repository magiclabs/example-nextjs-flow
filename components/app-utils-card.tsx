import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_IDENTIFIER, fcl } from '@/lib/fcl'

const USER_SIGNATURE = 'USER_SIGNATURE'

export const AppUtilsCard = () => {
  const handleVerifyUserSignature = async () => {
    try {
      const hexMessage = Buffer.from('Foo').toString('hex')
      const signatures = await fcl.currentUser().signUserMessage(hexMessage)
      console.log({ signatures })

      const isValid = await fcl.AppUtils.verifyUserSignatures(
        hexMessage,
        signatures,
      )
      console.log({ isValid })
    } catch (e) {
      console.error(e)
    }
  }

  const handleVerifyAccountProof = async () => {
    const user = await fcl.currentUser.snapshot()
    console.log({ user })

    const proofService = user.services.find(
      (service: any) => service.type === 'account-proof',
    )
    if (!proofService) {
      console.warn('account-proof service is not enabled')
      return false
    }
    console.log({ proofService })

    const accountProofData = {
      address: user.addr,
      nonce: proofService.data.nonce,
      signatures: proofService.data.signatures,
    }

    const isValid = await fcl.AppUtils.verifyAccountProof(
      APP_IDENTIFIER,
      accountProofData,
    )

    console.log({ isValid })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Utils</CardTitle>
      </CardHeader>
      <CardContent className="grid-col-2 grid flex-col space-y-3">
        <Button onClick={handleVerifyUserSignature}>
          fcl.AppUtils.verifyUserSignatures
        </Button>
        <Button onClick={handleVerifyAccountProof}>
          fcl.AppUtils.verifyAccountProof
        </Button>
      </CardContent>
    </Card>
  )
}
