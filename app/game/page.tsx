"use client";
import { useEffect, useState } from "react";
import Map from "../components/maps/map";
import Turns from "../components/turns/turns";
import { GameState } from "@/schema/types";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Money from "../components/money/money";

export default function Game() {
    const { token, setInitialLoadState } = useGameStore((state) => state);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3001/games/initial-load",
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${localStorage.getItem(
                        //     "accessToken"
                        // )}`,
                    },
                }
            );
            const initialLoad: GameState = await response.json();
            setInitialLoadState(initialLoad);
        };
        fetchData();

        setLoading(false);
    }, [token, setInitialLoadState]);

    return (
        <>
            {!loading && token ? (
                <>
                    <div className="flex overflow-y-auto justify-center">
                        <Map />
                    </div>
                    <div className="flex justify-between">
                        <Money />
                        <Turns />
                    </div>
                </>
            ) : null}
        </>
    );
}
