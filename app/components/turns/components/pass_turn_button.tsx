"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { socket } from "@/app/socket/socket";
import { MatchState } from "@/schema/types";

const PassTurnButton = () => {
  const {
    turns,
    unitsMovement,
    money,
    setMatchState,
    setEvents,
    events,
    match,
  } = useGameStore((state) => state);
  const supabase = createClient();

  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<MatchState>();

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();
      setToken(sessionData.data.session?.access_token ?? "");
    };
    getData();
  }, [supabase]);

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
    const event = events.findLast((e) => e.type === "both_players_ended_turn");

    if (!event) {
      return;
    }

    setMatchState(event.value.matchState);
  }, [events, data, setMatchState]);

  const handleClick = async () => {
    if (!match) {
      return;
    }

    const { data } = await fetchData(
      token,
      `games/match-state/${match.code}`,
      "POST",
      {
        turns,
        unitsMovement,
        money,
      },
    );

    setData(data);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary btn-lg">
      Pass turn
    </button>
  );
};

export default PassTurnButton;
