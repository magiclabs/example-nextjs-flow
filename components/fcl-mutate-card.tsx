import { fcl } from "@/lib/onflow";

export const FCLMutateCard = () => {
  const handleClick = async () => {
    const txId = await fcl.mutate({
      cadence: `
        import Profile from 0xba1132bc08f82fe2
        
        transaction(name: String) {
          prepare(account: AuthAccount) {
            account.borrow<&{Profile.Owner}>(from: Profile.privatePath)!.setName(name)
          }
        }
      `,
      args: (arg: any, t: any) => [arg("myName", t.String)],
      proposer: fcl.authz, // optional - default is fcl.authz
      payer: fcl.authz, // optional - default is fcl.authz
      authorizations: [fcl.authz], // optional - default is [fcl.authz]
    });

    console.log(txId);
  };

  return (
    <div>
      <button onClick={handleClick}>fcl.mutate</button>
    </div>
  );
};
