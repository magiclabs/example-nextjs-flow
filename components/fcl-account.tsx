import { fcl } from '@/lib/onflow'

export const FCLAccount = () => {
  const handleClick = async () => {
    const result = await fcl.account('0x1d007d755706c469')

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.account</button>
    </div>
  )
}
