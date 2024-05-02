"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";

const PassTurnButton = () => {
    const { passTurn } = useGameStore((state) => state);

    const handleClick = async () => {
        const response = await fetch("http://localhost:3001/games/turns", {
            method: "POST",
        });
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
