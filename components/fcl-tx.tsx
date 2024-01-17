import { fcl } from '@/lib/onflow'

export const FCLTx = () => {
  const handleClick = async () => {
    const transactionId = `130bcbc93591725791a7ea70d5de0304e90143662f762cd6e6c6c72e00715c08`
    const result = await fcl.tx(transactionId).snapshot()

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.tx</button>
    </div>
  )
}
