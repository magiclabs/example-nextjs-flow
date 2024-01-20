import { fcl } from '@/lib/fcl'

export const FCLQueryCard = () => {
  const handleClick = async () => {
    const result = await fcl.query({
      cadence: `
        pub fun main(a: Int, b: Int, addr: Address): Int {
          log(addr)
          return a + b
        }
      `,
      args: (arg: any, t: any) => [
        arg(7, t.Int), // a: Int
        arg(6, t.Int), // b: Int
        arg('0xba1132bc08f82fe2', t.Address), // addr: Address
      ],
    })

    console.log(result) // 13
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.query</button>
    </div>
  )
}
