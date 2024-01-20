import { fcl } from '@/lib/fcl'

export const FCLGetEventsAtBlockHeightRange = () => {
  const handleClick = async () => {
    const result = await fcl
      .send([
        fcl.getEventsAtBlockHeightRange(
          'A.7e60df042a9c0868.FlowToken.TokensWithdrawn',
          148088000,
          148088115,
        ),
      ])
      .then(fcl.decode)

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.getEventsAtBlockHeightRange</button>
    </div>
  )
}
