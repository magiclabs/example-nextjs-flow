import { fcl } from '@/lib/fcl'

export const FCLGetCollection = () => {
  const handleClick = async () => {
    const result = await fcl
      .send([
        fcl.getCollection(
          '33a8146bd7761547d59dcadd7d2a051e2d77e1cf181d69f66788ba9539116b0a',
        ),
      ])
      .then(fcl.decode)

    console.log(result)
  }

  return (
    <div>
      <button onClick={handleClick}>fcl.getCollection</button>
    </div>
  )
}
