import { fcl } from "@/lib/onflow";

export const FCLAuthenticateCard = () => {
  const handleClick = async () => {
    const response = await fcl.authenticate();
    console.log({ response });
  };

  return (
    <div>
      <button onClick={handleClick}>fcl.authenticate</button>
    </div>
  );
};
