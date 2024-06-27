"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import useUpdateMatchState from "./usePassTurn";

const PassTurnButton = () => {
  const { waitingOtherPlayers } = useGameStore((state) => state);

  const updateMatchState = useUpdateMatchState();

  const handleClick = async () => {
    updateMatchState();
  };

  return (
    <button
      onClick={handleClick}
      className={"btn btn-primary btn-l"}
      disabled={waitingOtherPlayers}
    >
      {waitingOtherPlayers ? "Wait ..." : "Pass turn"}
    </button>
  );
};

export default PassTurnButton;
