import { useGameStore } from "@/app/store/gameStoreProvider";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";
import { EVENT_TYPES } from "@/app/socket/events";

export function useWaitForLobbyEvent() {
  const { setEvents, match } = useGameStore((state) => state);

  useEffect(() => {
    const onEvent = (value: any) => {
      setEvents({ type: EVENT_TYPES.JOIN_MATCH, value });
    };

    if (!match?.code) {
      return;
    }

    const eventName = `${EVENT_TYPES.JOIN_MATCH}_${match.code}`;

    socket.on(eventName, onEvent);

    return () => {
      socket.off(eventName, onEvent);
    };
  }, [match, setEvents]);
}
