import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

export default function useUpdateMatchState() {
  const {
    match,
    token,
    setMatch,
    turns,
    unitsMovement,
    money,
    setWaitingOtherPlayers,
  } = useGameStore((state) => state);

  return async () => {
    if (!match) {
      return;
    }

    await fetchData(token, `games/match-state/${match.code}`, "POST", {
      turns,
      unitsMovement,
      money,
    });

    setWaitingOtherPlayers(true);
  };
}
