"use client";

import { FCLAccount } from "@/components/fcl-account";
import { FCLAtBlockHeight } from "@/components/fcl-at-block-height";
import { FCLAuthenticateCard } from "@/components/fcl-authenticate-card";
import { FCLGetAccount } from "@/components/fcl-get-account";
import { FCLGetBlock } from "@/components/fcl-get-block";
import { FCLGetCollection } from "@/components/fcl-get-collection";
import { FCLGetEventsAtBlockHeightRange } from "@/components/fcl-get-events-at-blockheight-range";
import { FCLMutateCard } from "@/components/fcl-mutate-card";
import { FCLQueryCard } from "@/components/fcl-query-card";
import { FCLTx } from "@/components/fcl-tx";
import { FCLUnauthenticateCard } from "@/components/fcl-unauthenticate-card";
import { FCLVerifyUserSignatureCard } from "@/components/fcl-verify-user-signature-card";
import { fcl } from "@/lib/onflow";
import { nope, yup } from "@/utils";
import { WalletUtils, mutate } from "@onflow/fcl";
import { ChangeEvent, useState } from "react";

const MAGIC_FCL_BASE_URL = "https://fcl-wallet-provider.vercel.app"; // "http://localhost:3002";
const DFEAULT_API_KEY = "pk_live_B5D084C479C04892";

const resolver = async () => {
  return {
    appIdentifier: "Magic",
    nonce: "75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a",
  };
};

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `${MAGIC_FCL_BASE_URL}/${DFEAULT_API_KEY}/authn`,
  // "discovery.wallet": "http://localhost:3002/pk_live_B5D084C479C04892/authn",
  "discovery.wallet.method": "IFRAME/RPC",
  "fcl.accountProotf.resolver": resolver,
});

export default function Home() {
  const [selectedItem, setSelectedItem] = useState("");
  const [apiKey, setApiKey] = useState(DFEAULT_API_KEY);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setApiKey(value);
    fcl
      .config()
      .put("discovery.wallet", `${MAGIC_FCL_BASE_URL}/${value}/authn`);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedItem(value);
    fcl.config().put(
      "discovery.wallet",
      `${MAGIC_FCL_BASE_URL}/${apiKey}/authn?${new URLSearchParams({
        method: value,
      })}`
    );
  };

  const handleClick = async () => {
    WalletUtils.onMessageFromFCL("FCL:VIEW:READY:RESPONSE", (data: any) => {
      console.log({ data });
    });

    const hello = await fcl.authenticate();
    console.log("TT", hello);

    const user = fcl.currentUser();
    console.log({ user });
  };

  const handleUnauthenticate = async () => {
    console.log("Clicked handleUnauthenticate");
    const response = await fcl.unauthenticate();
    console.log({ response });
  };

  const handleSignUserMessage = async () => {
    fcl
      .currentUser()
      .signUserMessage("464f4f")
      .then(yup("M-1"))
      .catch(nope("M-1"));
  };

  const handleAuthorizeTransaction = async () => {
    mutate({
      cadence: `
      transaction() {
        prepare(acct: AuthAccount) {
          log(acct)
        }
      }
    `,
    })
      .then(yup("M-1"))
      .catch(nope("M-1"));
  };

  const handleSendTransaction = async () => {
    const SIMPLE_TRANSACTION = `\
      transaction {
        execute {
          log("Hello World!!")
        }
      }
      `;

    const transactionId = await fcl.mutate({
      cadence: SIMPLE_TRANSACTION,
      // proposer: fcl.currentUser,
      // payer: fcl.currentUser,
      limit: 50,
    });

    console.log({ transactionId });

    const transaction = await fcl.tx(transactionId);
    transaction.subscribe(console.log);
    const response = await transaction.onceExecuted();
    console.log({ response });

    const res2 = await transaction.onceFinalized();
    console.log({ res2 });

    const res3 = await transaction.onceSealed();
    console.log({ res3 });
  };

  const handleAccountProof = async () => {
    // AppUtils.verifyAccountProof(appIdentifier, {});
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <input
        style={{ padding: "4px 8px", width: "246px" }}
        value={apiKey}
        onChange={handleChange}
      />
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
      </select>
      <button onClick={handleClick}>Authenticate</button>
      <button onClick={handleUnauthenticate}>Unauthenticate</button>
      <button onClick={handleSignUserMessage}>SignUserMessage</button>
      <button onClick={handleAuthorizeTransaction}>AuthroizeTransaction</button>
      <button onClick={handleSendTransaction}>Send Transaction</button>
      <button onClick={handleAccountProof}>Account Proof</button>
      <FCLAuthenticateCard />
      <FCLUnauthenticateCard />
      <FCLQueryCard />
      <FCLMutateCard />
      <FCLVerifyUserSignatureCard />
      <FCLGetBlock />
      <FCLAccount />
      <FCLGetAccount />
      <FCLTx />
      <FCLGetEventsAtBlockHeightRange />
      <FCLGetCollection />
      <FCLAtBlockHeight />
    </main>
  );
}
