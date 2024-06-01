import { useGameStore } from "@/app/store/gameStoreProvider";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";

export function useWaitForGameEvent() {
  const { setWaitingOtherPlayers, match, setEvents, events, setMatchState } =
    useGameStore((state) => state);

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
  }, [match?.code, setEvents]);

  // TODO temp
  useEffect(() => {
    const event = events.findLast((e) => {
      return (
        e.type === "both_players_ended_turn" &&
        e.value.matchCode === match?.code
      );
    });

    if (!event) {
      return;
    }

    setMatchState(event.value.matchState);
    setWaitingOtherPlayers(false);
  }, [events, match?.code, setMatchState, setWaitingOtherPlayers]);
}
