import { fcl } from "@/lib/onflow";

export const FCLAtBlockHeightCard = () => {
  const handleClick = async () => {
    const res = await fcl.send([fcl.getBlock(), fcl.atBlockHeight(148101582)]);
    console.log({ res });

    const decoded = await fcl.decode(res);
    console.log({ decoded });
  };

  return (
    <div>
      <button onClick={handleClick}>fcl.atBlockHeight</button>
    </div>
  );
};
