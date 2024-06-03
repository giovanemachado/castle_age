import { useUpdateMatchState } from "@/app/game/hooks/useUpdateWholeMatchState";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback } from "react";

export default function usePassTurn() {
  const { match, token, turns, unitsMovement, money } = useGameStore(
    (state) => state,
  );

  const updateMatchState = useUpdateMatchState();

  return useCallback(async () => {
    if (!match) {
      return;
    }

    const data = await fetchData(
      token,
      `games/match-state/${match.code}`,
      "POST",
      {
        turns,
        unitsMovement,
        money,
      },
    );

    updateMatchState({ matchState: data.data });
  }, [match, money, token, turns, unitsMovement, updateMatchState]);
}
