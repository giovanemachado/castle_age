"use client";

import { MatchData } from "@/schema/types";
import { useState } from "react";
import { useGameStore } from "../../store/gameStoreProvider";

export default function Lobby() {
    const { token } = useGameStore((state) => state);
    const [match, setMatch] = useState<MatchData | null>(null);
    const [matchCode, setMatchCode] = useState<string>("");

    const handleCreateMatch = async () => {
        const response = await fetch(`http://localhost:3001/games/match`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
        });

        if (response.status === 201) {
            const matchData: MatchData = await response.json();
            setMatch(matchData);
        }
    };

    const handleEnterMatch = async () => {
        if (!matchCode) {
            return;
        }

        const response = await fetch(
            `http://localhost:3001/games/enter-match/${matchCode}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
            }
        );

        if (response.status === 201) {
            const matchData: MatchData = await response.json();
            setMatch(matchData);
        }
    };

    return (
        <>
            {match && <p>Match code: {match.code}</p>}
            {!match && (
                <>
                    <button
                        onClick={handleCreateMatch}
                        className="btn btn-primary btn-lg"
                    >
                        Create match
                    </button>
                    <div className="join">
                        <input
                            className="input input-bordered join-item"
                            placeholder="Match code"
                            onChange={(v) => setMatchCode(v.target.value)}
                        />
                        <button
                            onClick={handleEnterMatch}
                            className="btn join-item rounded-r-full"
                        >
                            Enter in Match
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
