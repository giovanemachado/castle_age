import { useGameStore } from "@/app/store/gameStoreProvider";
import PassTurnButton from "./passTurnButton";
import { useShallow } from "zustand/react/shallow";

const Turns = () => {
  const { turns, match, player } = useGameStore(
    useShallow((state) => ({
      turns: state.turns,
      match: state.match,
      player: state.player,
    })),
  );

  // TODO temp, move this to the correct spot
  const prioPlayer = turns % 2 === 0 ? match?.players[0] : match?.players[1];

  return (
    <div className="flex py-2 justify-end w-full items-center">
      {/* TODO temp, move this to the correct spot */}
      {prioPlayer == player?.playerId && (
        <span className="px-2 ">Player priority</span>
      )}
      <span className="px-2 ">{`Turn: ${turns}`}</span>
      <PassTurnButton />
    </div>
  );
};

export default Turns;
