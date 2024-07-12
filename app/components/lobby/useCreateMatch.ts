import { useGameStore } from "@/app/store/gameStoreProvider";
import { MatchData } from "@/schema/types";
import { fetchData } from "@/utils/requests";
import { useCallback } from "react";

export default function useCreateMatch() {
  const token = useGameStore((state) => state.token);
  const setMatch = useGameStore((state) => state.setMatch);

  return useCallback(async () => {
    const { status, data } = await fetchData(token, `games/match`, "POST");

    if (status === 201) {
      const matchData: MatchData = data;
      setMatch(matchData);
    }
  }, [setMatch, token]);
}
