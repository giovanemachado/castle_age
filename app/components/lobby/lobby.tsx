import { useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useRedirectToActiveMatch } from "./useRedirectToActiveMatch";
import { useWaitForLobbyEvent } from "../shared/useWaitForLobbyEvent";
import { useRedirectByEvent } from "./useRedirectByEvent";
import useCreateMatch from "./useCreateMatch";
import useJoinMatch from "./useJoinMatch";
import Loading from "../shared/loading";
import ShareCode from "./shareCode";
import CreateMatch from "./createMatch";
import useFinishMatch from "../shared/useFinishMatch";

/**
 * Lobby handles all interaction to join a match
 */
export default function Lobby() {
  const match = useGameStore((state) => state.match);
  const token = useGameStore((state) => state.token);

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
