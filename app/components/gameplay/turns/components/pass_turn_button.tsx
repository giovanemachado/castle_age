"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";

const PassTurnButton = () => {
  const {
    turns,
    unitsMovement,
    money,
    setMatchState,
    setEvents,
    events,
    setWaitingOtherPlayers,
    match,
    waitingOtherPlayers,
    token,
  } = useGameStore((state) => state);

  useEffect(() => {
    const onEvent = (value: any) => {
      if (value.matchCode == match?.code) {
        setEvents({ type: "both_players_ended_turn", value });
      }
    };

    socket.on("both_players_ended_turn", onEvent);

    return () => {
      socket.off("both_players_ended_turn", onEvent);
    };
  }, [match?.code, setEvents, token]);

  // TODO temp
  useEffect(() => {
    const event = events.findLast(
      (e) =>
        e.type === "both_players_ended_turn" && e.value.code === match?.code,
    );

    if (!event) {
      return;
    }

    setMatchState(event.value.matchState);
    setWaitingOtherPlayers(false);
  }, [events, setMatchState, setWaitingOtherPlayers, match]);

  const handleClick = async () => {
    if (!match) {
      return;
    }

    await fetchData(token, `games/match-state/${match.code}`, "POST", {
      turns,
      unitsMovement,
      money,
    });

    setWaitingOtherPlayers(true);
  };

  return (
    <button
      onClick={handleClick}
      className={"btn btn-primary btn-l"}
      disabled={waitingOtherPlayers}
    >
      {waitingOtherPlayers ? "Wait ..." : "Pass turn"}
    </button>
  );
};

export default PassTurnButton;
