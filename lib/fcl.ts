import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { generateRandomNonce } from '@/utils'
import * as fcl from '@onflow/fcl'

export const APP_IDENTIFIER = 'Magic Wallet'

const resolver = async () => {
  return {
    appIdentifier: APP_IDENTIFIER,
    nonce: generateRandomNonce(),
  }
}

console.log({ FCL_BASE_URL, MAGIC_API_KEY })

fcl.config({
  'flow.network': 'testnet',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': `${FCL_BASE_URL}/${MAGIC_API_KEY}/authn`,
  'discovery.wallet.method': 'IFRAME/RPC',
  'fcl.accountProotf.resolver': resolver,
})

export { fcl }
