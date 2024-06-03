import { useUpdateWholeMatchState } from "@/app/game/hooks/useUpdateWholeMatchState";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

export default function useUpdateMatchState() {
  const { match, token, turns, unitsMovement, money, setWaitingOtherPlayers } =
    useGameStore((state) => state);

  const updateWholeMatchState = useUpdateWholeMatchState();

  return async () => {
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

    updateWholeMatchState({ matchState: data.data });
  };
}
