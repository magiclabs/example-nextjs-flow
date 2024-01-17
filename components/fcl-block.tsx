import { fcl } from '@/lib/onflow'

export const FCLBlock = () => {
  const handleClick = async () => {
    // get latest finalized block
    const latestBlock = await fcl.block()
    console.log({ latestBlock })

    // get latest sealed block
    const sealedLatestBlock = await fcl.block({ sealed: true })
    console.log({ sealedLatestBlock })

    // get block by id
    const blockById = await fcl.block({
      id: '11d797824744d14f9c29af5e3f4574169efb40010f67dee4fe9f4c8033a6e5f3',
    })
    console.log({ blockById })

    // get block by height
    const blockByHeight = await fcl.block({ height: 148101582 })
    console.log({ blockByHeight })
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.block</button>
    </div>
  )
}
