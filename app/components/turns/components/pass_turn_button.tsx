"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

const PassTurnButton = () => {
  const { turns, units, money, passTurn, match } = useGameStore(
    (state) => state,
  );

  const handleClick = async () => {
    const { data } = await fetchData(
      "token",
      `games/turn/${match.code}`,
      "POST",
      {
        turns,
        units,
        money,
      },
    );

    passTurn(data);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary btn-lg">
      Pass turn
    </button>
  );
};

export default PassTurnButton;
