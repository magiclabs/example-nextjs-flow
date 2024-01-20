export const yup = (tag: string) => (d: any) => {
  // eslint-disable-next-line no-console
  console.log(`${tag}`, d)
  return d
}

export const nope = (tag: string) => (d: any) => {
  // eslint-disable-next-line no-console
  console.error(`Oh No!! [${tag}]`, d)
  return d
}

export const generateRandomNonce = () => {
  const hexChars = '0123456789abcdef'
  let nonce = ''

  for (let i = 0; i < 64; i++) {
    const randomIndex = Math.floor(Math.random() * 16)
    nonce += hexChars[randomIndex]
  }

  return nonce
}
