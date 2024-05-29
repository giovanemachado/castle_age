import { useGameStore } from "@/app/store/gameStoreProvider";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";

export function useWaitForGameEvent() {
  const { setWaitingOtherPlayers, match, setEvents, events, setMatchState } =
    useGameStore((state) => state);

  useEffect(() => {
    console.log("useEffect1");

    const onEvent = (value: any) => {
      if (value.matchCode == match?.code) {
        setEvents({ type: "both_players_ended_turn", value });
      }
    };

    const onConnect = () => {
      console.log("onConnect");
    };

    const onDisconnect = () => {
      console.log("onDisconnect");
    };

    socket.on("both_players_ended_turn", onEvent);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("both_players_ended_turn", onEvent);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [match?.code, setEvents]);

  // TODO temp
  useEffect(() => {
    const event = events.findLast(
      (e) =>
        e.type === "both_players_ended_turn" && e.value.code === match?.code,
    );

    console.log("xxxxxxx");
    if (!event) {
      return;
    }

    console.log(event.value.matchState);

    setMatchState(event.value.matchState);
    setWaitingOtherPlayers(false);
  }, [events, match?.code, setMatchState, setWaitingOtherPlayers]);
}
