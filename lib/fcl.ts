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

fcl.config({
  'flow.network': 'testnet',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'discovery.wallet.method': 'IFRAME/RPC',
  'fcl.accountProof.resolver': resolver,
  '0xFLOW': '0x7e60df042a9c0868',
  '0xFT': '0x9a0766d93b6608b7',
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
