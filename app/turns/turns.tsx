"use client";
import PassTurnButton from "./components/pass_turn_button";
import { useGameStore } from "../store/gameStoreProvider";

const Turns = () => {
    const { turns, increaseTurns } = useGameStore((state) => state);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch("http://localhost:3001/games/turns");
    //         const jsonData = await response.json();
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className="w-full flex justify-end">
            <span className="px-2 font-mono text-6xl">{turns}</span>

            <PassTurnButton onTurnUpdate={() => increaseTurns()} />
        </div>
    );
};

export default Turns;
