"use client";

import { fcl } from "@/lib/fcl";
import { nope, yup } from "@/utils";
import { FlowExtension } from "@magic-ext/flow";
import { WalletUtils } from "@onflow/fcl";
import { Magic } from "magic-sdk";
import { useEffect, useState } from "react";

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet":
    "http://localhost:3014/v1/fcl/authn?ak=pk_live_57F1A666E6E19BCA",
  "discovery.wallet.method": "IFRAME/RPC",
});

export default function Home() {
  const [magic, setMagic] = useState<Magic<[FlowExtension]> | null>(null);
  useEffect(() => {
    const magic = new Magic("pk_live_57F1A666E6E19BCA", {
      endpoint: "http://localhost:3014",
      extensions: [
        new FlowExtension({
          rpcUrl: "https://rest-testnet.onflow.org",
          network: "testnet",
        }),
      ],
    });
    // magic.wallet.connectWithUI().then((d) => console.log(d));

    setMagic(magic);
  }, []);

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

  const handleLogout = async () => {
    const response = await magic?.user.logout();
    console.log({ response });
  };

  const handleShowUI = async () => {
    const response = await magic?.wallet.showUI();
    console.log({ response });
  };

  const handleConnectWithUI = async () => {
    const response = await magic?.wallet.connectWithUI();
    console.log({ response });
  };

  const handleAuthorization = async () => {
    const user = fcl.currentUser();
    const response = await user.authorization;
    console.log({ response });
  };

  const handleSignUserMessage = async () => {
    const user = fcl.currentUser();
    const response = await user.signUserMessage("464f4f");
    console.log({ response });
  };

  const handleAuthorizeTransaction = async () => {
    const user = fcl.currentUser();
    fcl
      .mutate({
        cadence: `
        transaction() {
          prepare(acct: AuthAccount) {
            log(acct)
          }
        }
      `,
        limit: 50,
      })
      .then(yup("M-1"))
      .catch(nope("M-1"));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <button onClick={handleClick}>Authenticate</button>
      <button onClick={handleUnauthenticate}>Unauthenticate</button>
      <button onClick={handleAuthorization}>Authorization</button>
      <button onClick={handleSignUserMessage}>SignUserMessage</button>
      <button onClick={handleAuthorizeTransaction}>AuthroizeTransaction</button>
      <button onClick={handleConnectWithUI}>ConnectWithUI</button>
      <button onClick={handleShowUI}>Show UI</button>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
