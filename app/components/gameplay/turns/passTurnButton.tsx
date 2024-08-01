import { useGameStore } from "@/app/store/gameStoreProvider";
import useUpdateMatchState from "./usePassTurn";

const PassTurnButton = () => {
  const waitingOtherPlayers = useGameStore(
    (state) => state.waitingOtherPlayers
  );

  const updateMatchState = useUpdateMatchState();

  const handleClick = async () => {
    updateMatchState();
  };

  return (
    <button
      onClick={handleClick}
      className={"btn btn-primary text-base w-full"}
      disabled={waitingOtherPlayers}
    >
      {waitingOtherPlayers ? "Wait ..." : "Pass turn"}
    </button>
  );
};

export default PassTurnButton;
