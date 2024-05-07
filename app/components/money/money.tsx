"use client";
import { useGameStore } from "../../store/gameStoreProvider";

const Money = () => {
    const { money } = useGameStore((state) => state);

    return (
        <div className="w-full flex">
            <span className="px-2 font-mono text-5xl">{money[0].value}</span>
        </div>
    );
};

export default Money;
