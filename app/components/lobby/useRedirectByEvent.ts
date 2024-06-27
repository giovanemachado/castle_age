import { useGameStore } from "@/app/store/gameStoreProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectByEvent() {
  const router = useRouter();
  const { events } = useGameStore((state) => state);

  // TODO temp
  useEffect(() => {
    if (
      events.filter((e) => {
        return e.type === "enter_in_match";
      }).length > 0
    ) {
      router.push("/game");
    }
  }, [events, router]);
}
