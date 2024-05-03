"use client";
import PassTurnButton from "./components/pass_turn_button";
import { useGameStore } from "../store/gameStoreProvider";

const Turns = () => {
    const { turns } = useGameStore((state) => state);

    return (
        <div className="w-full flex justify-end">
            <span className="px-2 font-mono text-5xl">{turns}</span>

            <PassTurnButton />
        </div>
    );
};

export default Turns;
