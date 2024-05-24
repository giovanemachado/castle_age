"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import PassTurnButton from "./components/pass_turn_button";

const Turns = () => {
  const { turns } = useGameStore((state) => state);

  return (
    <div className="flex py-2 justify-end w-full items-center">
      <span className="px-2 ">{`Turn: ${turns}`}</span>
      <PassTurnButton />
    </div>
  );
};

export default Turns;
