"use client";

import Map from "../maps/map";
import Money from "../money/money";
import { useGameStore } from "../store/gameStoreProvider";
import Turns from "../turns/turns";

export default function Game() {
    const { token } = useGameStore((state) => state);

    if (token) {
        return null;
    }

    return (
        <>
            {/* <div className="flex overflow-y-auto justify-center">
                <Map />
            </div>
            <div className="flex justify-between">
                <Money />
                <Turns />
            </div> */}
        </>
    );
}
