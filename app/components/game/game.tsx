"use client";
import { useEffect, useState } from "react";
import Map from "../maps/map";
import Turns from "../turns/turns";
import { GameState } from "@/schema/types";
import { useGameStore } from '@/app/store/gameStoreProvider';
import Lobby from '../lobby/lobby';

export default function Game() {
    const [loading, setLoading] = useState(true);
    const { token } = useGameStore((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch(
            //     "http://localhost:3001/games/initial-load"
            // );
            // const initialLoad: GameState = await response.json();
            // setInitialLoad(gameInitialState)
        };
        fetchData();

        setLoading(false);
    }, [token]);

    return (
        <>
            {!loading && token ? (
                <>
                    <Lobby />
                    {/* <div className="flex overflow-y-auto justify-center">
                        <Map />
                    </div>
                    <div className="flex justify-between">
                        <Money />
                        <Turns />
                    </div> */}
                </>
            ) : null}
        </>
    );
}
