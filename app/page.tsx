"use client";

import { fcl } from "@/lib/fcl";
import { nope, yup } from "@/utils";
import { WalletUtils, mutate } from "@onflow/fcl";
import { ChangeEvent, useState } from "react";

const MAGIC_FCL_BASE_URL = "https://fcl-wallet-provider.vercel.app/";
const DFEAULT_API_KEY = "pk_live_B5D084C479C04892";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": `${MAGIC_FCL_BASE_URL}/${DFEAULT_API_KEY}/authn`,
  "discovery.wallet.method": "IFRAME/RPC",
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
    </main>
  );
}
