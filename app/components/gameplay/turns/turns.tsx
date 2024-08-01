import { useGameStore } from "@/app/store/gameStoreProvider";
import { useShallow } from "zustand/react/shallow";
import Priority from "../priority/priority";

const Turns = () => {
  const { turns } = useGameStore(
    useShallow((state) => ({
      turns: state.turns,
    }))
  );

  return (
    <div className="flex-col h-16">
      <div>
        Turn: <span className="font-bold">{turns}</span>
      </div>
      <Priority />
    </div>
  );
};

export default Turns;
