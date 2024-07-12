import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback } from "react";

export default function useFinishMatch() {
  const match = useGameStore((state) => state.match);
  const token = useGameStore((state) => state.token);
  const setMatch = useGameStore((state) => state.setMatch);

  return useCallback(async () => {
    if (!match?.code) {
      return;
    }

    await fetchData(token, `games/finish-match/${match.code}`, "POST");
    setMatch();
  }, [match?.code, setMatch, token]);
}
