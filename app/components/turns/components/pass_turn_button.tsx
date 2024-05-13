"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";

const PassTurnButton = () => {
  const { turns, units, gameId, playerIds, money, passTurn } = useGameStore(
    (state) => state,
  );

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3001/games/${gameId}/state`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ playerIds, turns, units, money }),
      },
    );
    const jsonData = await response.json();
    passTurn(jsonData);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary btn-lg">
      Pass turn
    </button>
  );
};

export default PassTurnButton;
