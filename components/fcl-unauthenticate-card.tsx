import { fcl } from '@/lib/fcl'

export const FCLUnauthenticateCard = () => {
  const handleClick = async () => {
    const response = await fcl.unauthenticate()
    console.log({ response })
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.unauthenticate</button>
    </div>
  )
}
