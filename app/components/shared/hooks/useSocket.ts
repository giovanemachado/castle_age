import { useGameStore } from "@/app/store/gameStoreProvider";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";

export function useSocket() {
  const { token, setEvents, match } = useGameStore((state) => state);

  useEffect(() => {
    const onEvent = (value: any) => {
      if (value.matchCode == match?.code) {
        setEvents({ type: "enter_in_match", value });
      }
    };

    socket.on("enter_in_match", onEvent);

    return () => {
      socket.off("enter_in_match", onEvent);
    };
  }, [match, setEvents, token]);
}
