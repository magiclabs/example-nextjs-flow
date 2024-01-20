import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { fcl } from '@/lib/fcl'
import { ChangeEvent, useState } from 'react'

export const FCLAuthenticateCard = () => {
  const [selectedItem, setSelectedItem] = useState('')

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedItem(value)

    fcl.config().put(
      'discovery.wallet',
      `${FCL_BASE_URL}/${MAGIC_API_KEY}/authn?${new URLSearchParams({
        method: value,
      })}`,
    )
  }

  const handleClick = async () => {
    const response = await fcl.authenticate()
    console.log({ response })
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="selectItem">Choose an item: </label>
      <select
        id="selectItem"
        onChange={handleSelectChange}
        value={selectedItem}
      >
        <option value="default">default</option>
        <option value="email-otp">email-otp</option>
        <option value="magic-link">magic-link</option>
        <option value="sms">sms</option>
        <option value="oidc">oidc</option>
      </select>
      <button onClick={handleClick}>fcl.authenticate</button>
    </div>
  )
}
