"use client";

import { useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useRedirectToActiveMatch } from "./hooks/useRedirectToActiveMatch";
import { useWaitForLobbyEvent } from "../shared/hooks/useWaitForLobbyEvent";
import { useRedirectByEvent } from "./hooks/useRedirectByEvent";
import useCreateMatch from "./hooks/useCreateMatch";
import useJoinMatch from "./hooks/useJoinMatch";
import { useFinishMatch } from "../shared/hooks/useFinishMatch";

/**
 * Lobby handles all interaction to join a match
 */
export default function Lobby() {
  const { match, token } = useGameStore((state) => state);

  const [matchCode, setMatchCode] = useState<string>("");

  const createMatch = useCreateMatch();
  const joinMatch = useJoinMatch(matchCode);
  const finishMatch = useFinishMatch();

  useRedirectToActiveMatch();
  useWaitForLobbyEvent();
  useRedirectByEvent();

  const handleCreateMatch = () => {
    createMatch();
  };

  const handleJoinMatch = () => {
    joinMatch();
  };

  const handleCancelMatch = () => {
    finishMatch();
  };

  if (!token) {
    return null;
  }

  if (match?.active) {
    return (
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">
              Share this Match code with your opponent:
            </h2>
            <h1 className="text-lg font-bold text-center">{match.code}</h1>
            <button onClick={handleCancelMatch} className="my-4 btn btn-error">
              Cancel Match
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!match?.active || match.players.length != 2) {
    return (
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Create a new Match.</h1>
            <button onClick={handleCreateMatch} className="btn btn-primary">
              Create
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-center">
              Or join a Match with a Match Code.
            </h1>
            <div className="join">
              <input
                className="input input-bordered join-item"
                placeholder="Match code"
                onChange={(v) => setMatchCode(v.target.value)}
              />
              <button
                onClick={handleJoinMatch}
                className="btn btn-primary join-item rounded-r-full"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
