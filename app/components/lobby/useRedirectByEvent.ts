import { EVENT_TYPES } from "@/app/socket/events";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectByEvent() {
  const router = useRouter();
  const { events } = useGameStore((state) => state);

  useEffect(() => {
    if (
      events.filter((event) => {
        return event.type === EVENT_TYPES.JOIN_MATCH;
      }).length > 0
    ) {
      router.push("/game");
    }
  }, [events, router]);
}
