import { fcl } from '@/lib/fcl'
import { Buffer } from 'buffer'

const toHexStr = (str: string) => {
  return Buffer.from(str).toString('hex')
}

export const FCLVerifyUserSignatureCard = () => {
  const handleClick = async () => {
    const MSG = toHexStr('FOO')
    console.log({ MSG })

    try {
      const res = await fcl.currentUser().signUserMessage(MSG)
      if (typeof res === 'string') {
        throw new Error(res)
      }
      console.log({ res })

      const account = await fcl.account(res[0].addr)
      console.log({ account })

      const comSig = new fcl.WalletUtils.CompositeSignature(
        res[0].addr,
        0,
        res[0].signature,
      )
      console.log({ comSig })

      const isValid = await fcl.AppUtils.verifyUserSignatures(MSG, [comSig])
      console.log({ isValid })
    } catch (e) {
      console.log(e)
      console.error(JSON.stringify(e))
    }
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.AppUtils.verifyUserSignatures</button>
    </div>
  )
}
