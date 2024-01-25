'use client'

import DiscoverySignInForm from '@/components/discovery-sign-in-form'
import MagicSignInForm from '@/components/magic-sign-in-form'
import { Button } from '@/components/ui/button'
import { TypographyH2 } from '@/components/ui/typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const [isMagic, setIsMagic] = useState(true)

  return (
    <div className="flex w-full flex-1 flex-col">
      <TypographyH2>Magic + FCL Example</TypographyH2>
      <br />

      <div>
        <Button variant="link" onClick={() => setIsMagic((prev) => !prev)}>
          {isMagic ? 'Go to Wallet Discovery' : 'Go to Magic'}
        </Button>
      </div>

      {isMagic ? <MagicSignInForm /> : <DiscoverySignInForm />}
    </div>
  )
}
