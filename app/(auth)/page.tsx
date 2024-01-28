'use client'

import { AppUtilsCard } from '@/components/app-utils-card'
import { BuildersCard } from '@/components/builders-card'
import { ContractsCard } from '@/components/contracts-card'
import { CurrentUserCard } from '@/components/current-user-card'
import { OnChainInteractionsCard } from '@/components/on-chain-interactions-card'
import { PreBuiltInteractionsCard } from '@/components/pre-built-interactions-card'
import { TransactionStatusUtilityCard } from '@/components/transaction-status-utility-card'
import { TypographyH2 } from '@/components/ui/typography'
import { UserInfoCard } from '@/components/user-info-card'

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <TypographyH2>Magic FCL Wallet</TypographyH2>
      <br />

      <div className="flex flex-col space-y-6">
        <UserInfoCard />

        <ContractsCard />
        <OnChainInteractionsCard />
        <PreBuiltInteractionsCard />
        <TransactionStatusUtilityCard />
        <AppUtilsCard />
        <BuildersCard />
        <CurrentUserCard />
      </div>
    </div>
  )
}
