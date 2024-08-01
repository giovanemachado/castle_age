import { useGameStore } from "@/app/store/gameStoreProvider";
import { useShallow } from "zustand/react/shallow";

const Priority = () => {
  const { turns, match } = useGameStore(
    useShallow((state) => ({
      turns: state.turns,
      match: state.match,
    }))
  );

  // TODO temp, move this to the correct spot
  const prioPlayer = turns % 2 === 0 ? match?.players[0] : match?.players[1];

  return (
    <div>
      <span className="text-bold text-xl">
        {prioPlayer ? "YOUR" : "ENEMYS'S"}
      </span>{" "}
      Priority turn!
    </div>
  );
};

export default Priority;
