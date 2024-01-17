import { fcl } from '@/lib/onflow'

export const FCLDecodeCard = () => {
  const handleClick = async () => {
    const response = await fcl.send([
      fcl.script`
            pub fun main(int1: Int, int2: Int): Int {
                return int1 + int2
            }
        `,
      fcl.args([fcl.arg(1, fcl.t.Int), fcl.arg(2, fcl.t.Int)]),
    ])

    console.log({ response })

    const decoded = await fcl.decode(response)
    console.log({ decoded })
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.decode</button>
    </div>
  )
}
