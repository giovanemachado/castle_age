import { useUpdateMatchState } from "@/app/game/useUpdateWholeMatchState";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export default function usePassTurn() {
  const { match, token, turns, unitsMovement, money } = useGameStore(
    useShallow((state) => ({
      match: state.match,
      token: state.token,
      turns: state.turns,
      unitsMovement: state.unitsMovement,
      money: state.money,
    })),
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
