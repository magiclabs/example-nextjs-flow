import { fcl } from '@/lib/fcl'

export const FCLAtBlockHeight = () => {
  const handleClick = async () => {
    const result = await fcl
      .send([fcl.getBlock(), fcl.atBlockHeight(148099911)])
      .then(fcl.decode)

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.atBlockHeight</button>
    </div>
  )
}
