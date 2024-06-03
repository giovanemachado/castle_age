import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback } from "react";

export function useFinishMatch() {
  const { match, token, setMatch } = useGameStore((state) => state);

  return useCallback(
    () => async () => {
      if (!match?.code) {
        return;
      }

      await fetchData(token, `games/finish-match/${match.code}`, "POST");
      setMatch();
    },
    [match?.code, setMatch, token],
  );
}
