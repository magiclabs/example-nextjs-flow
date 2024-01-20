import { fcl } from '@/lib/fcl'

export const FCLGetBlock = () => {
  const handleClick = async () => {
    const result = await fcl.send([fcl.getBlock(true)]).then(fcl.decode)

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.getBlock</button>
    </div>
  )
}
