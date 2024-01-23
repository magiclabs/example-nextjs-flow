import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { generateRandomNonce } from '@/utils'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'

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
  'discovery.wallet': `${FCL_BASE_URL}/authn?apiKey=${MAGIC_API_KEY}`,
  'discovery.wallet.method': 'IFRAME/RPC',
  'fcl.accountProof.resolver': resolver,
})

const getFlowdiverAccountURL = (address: string) => {
  const network = fcl.config().get('flow.network')
  return network === 'mainnet'
    ? `https://flowdiver.io/account/${address}`
    : `https://testnet.flowdiver.io/account/${address}`
}

const getFlowdiverTxURL = (txId: string) => {
  const network = fcl.config().get('flow.network')
  return network === 'mainnet'
    ? `https://flowdiver.io/tx/${txId}`
    : `https://testnet.flowdiver.io/tx/${txId}`
}

export { fcl, getFlowdiverAccountURL, getFlowdiverTxURL, t }
