"use client";
import { useEffect, useState } from "react";
import PassTurnButton from "./components/pass_turn_button";

const Turns = () => {
    const [turns, setTurns] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/games/turns");
            const jsonData = await response.json();
            setTurns(jsonData);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full flex justify-end">
            <span className="px-2 font-mono text-6xl">{turns}</span>
            <PassTurnButton
                onTurnUpdate={(turnCounting) => setTurns(turnCounting)}
            />
        </div>
    );
};

export default Turns;
