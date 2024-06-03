"use client";

import { useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useRedirectToActiveMatch } from "./hooks/useRedirectToActiveMatch";
import { useWaitForLobbyEvent } from "../shared/hooks/useWaitForLobbyEvent";
import { useRedirectByEvent } from "./hooks/useRedirectByEvent";
import useCreateMatch from "./hooks/useCreateMatch";
import useJoinMatch from "./hooks/useJoinMatch";
import { useFinishMatch } from "../shared/hooks/useFinishMatch";
import Loading from "../shared/components/loading";
import ShareCode from "./components/shareCode";
import CreateMatch from "./components/createMatch";

/**
 * Lobby handles all interaction to join a match
 */
export default function Lobby() {
  const { match, token } = useGameStore((state) => state);

  const [matchCode, setMatchCode] = useState<string>("");

  const createMatch = useCreateMatch();
  const joinMatch = useJoinMatch(matchCode);
  const finishMatch = useFinishMatch();

  const loading = useRedirectToActiveMatch();
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

  if (loading) {
    return <Loading />;
  }

  if (match?.active && match?.players.length != 2) {
    return (
      <ShareCode handleCancelMatch={handleCancelMatch} matchCode={match.code} />
    );
  }

  if (!match?.active || match.players.length != 2) {
    return (
      <CreateMatch
        handleCreateMatch={handleCreateMatch}
        handleJoinMatch={handleJoinMatch}
        onChangeInput={(value) => setMatchCode(value)}
      />
    );
  }
}
