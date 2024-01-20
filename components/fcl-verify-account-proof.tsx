import { fcl } from '@/lib/fcl'
import { Buffer } from 'buffer'

const toHexStr = (str: string) => {
  return Buffer.from(str).toString('hex')
}

export const FCLVerifyAccountProof = () => {
  const handleClick = async () => {
    const user = await fcl.currentUser.snapshot()
    console.log({ user })

    const uu = await fcl.currentUser()
    console.log({ uu })

    const message = Buffer.from('foo').toString('hex')
    const signed = await fcl.currentUser().signUserMessage(message)
    console.log({ signed })

    console.log(
      fcl.WalletUtils.encodeAccountProof(
        {
          address: user.addr,
          nonce:
            '75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a',
          appIdentifier: 'Magic',
        },
        false,
      ),
    )

    const signatures = signed.map((s: any) => ({
      ...s,
      keyId: 0,
    }))

    const accountProofData = {
      address: user.addr,
      nonce: '75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a',
      signatures: signatures,
    }

    const isValid = await fcl.AppUtils.verifyAccountProof(
      'Magic',
      accountProofData,
    )

    console.log({ isValid })
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.AppUtils.verifyAccountProof</button>
    </div>
  )
}
