'use client'

import { FCLAccount } from '@/components/fcl-account'
import { FCLAtBlockHeight } from '@/components/fcl-at-block-height'
import { FCLAuthenticateCard } from '@/components/fcl-authenticate-card'
import { FCLBlock } from '@/components/fcl-block'
import { FCLDecodeCard } from '@/components/fcl-decode-card'
import { FCLGetAccount } from '@/components/fcl-get-account'
import { FCLGetBlock } from '@/components/fcl-get-block'
import { FCLGetEventsAtBlockHeightRange } from '@/components/fcl-get-events-at-blockheight-range'
import { FCLMutateCard } from '@/components/fcl-mutate-card'
import { FCLQueryCard } from '@/components/fcl-query-card'
import { FCLSendCard } from '@/components/fcl-send-card'
import { FCLTx } from '@/components/fcl-tx'
import { FCLUnauthenticateCard } from '@/components/fcl-unauthenticate-card'
import { FCLVerifyAccountProof } from '@/components/fcl-verify-account-proof'
import { FCLVerifyUserSignatureCard } from '@/components/fcl-verify-user-signature-card'
import { FCL_BASE_URL, MAGIC_API_KEY } from '@/constants/env'
import { fcl } from '@/lib/fcl'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('')
  const [apiKey, setApiKey] = useState(MAGIC_API_KEY)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setApiKey(value)
    fcl.config().put('discovery.wallet', `${FCL_BASE_URL}/${value}/authn`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4 p-24">
      <input
        style={{ padding: '4px 8px', width: '246px' }}
        value={apiKey}
        onChange={handleChange}
      />

      <div>Wallet Interactions</div>
      <FCLAuthenticateCard />
      <FCLUnauthenticateCard />

      <div>Current User</div>

      <div>On-chain Interations</div>
      <FCLQueryCard />
      <FCLMutateCard />

      <div>AppUtils</div>
      <FCLVerifyUserSignatureCard />
      <FCLVerifyAccountProof />

      <div> Builders</div>
      <FCLGetAccount />
      <FCLGetBlock />
      <FCLAtBlockHeight />
      <FCLGetEventsAtBlockHeightRange />

      <div>Pre-built Interactions</div>
      <FCLSendCard />
      <FCLDecodeCard />
      <FCLAccount />
      <FCLBlock />

      <div>Transaction Status Utility</div>
      <FCLTx />
    </main>
  )
}
