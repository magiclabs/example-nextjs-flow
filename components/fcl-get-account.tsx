import { fcl } from "@/lib/onflow";

export const FCLGetAccount = () => {
  const handleClick = async () => {
    const result = await await fcl
      .send([fcl.getAccount(`0x6c4fdc9a9d2975ff`)])
      .then(fcl.decode);

    console.log(result);
  };

  return (
    <div>
      <button onClick={handleClick}>fcl.getAccount</button>
    </div>
  );
};
