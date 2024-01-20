import { fcl } from '@/lib/fcl'

export const FCLSendCard = () => {
  const handleClick = async () => {
    const { authorization } = fcl.currentUser()

    const tx = await fcl.send([
      fcl.transaction`
        transaction {
          prepare(acct: AuthAccount) {
            log("Transaction Submitted")
          }
        }
      `,
      fcl.payer(authorization),
      fcl.proposer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100),
    ])

    console.log({ tx })
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.send</button>
    </div>
  )
}
