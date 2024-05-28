import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

export function useFinishMatch() {
  const { match, token, setMatch } = useGameStore((state) => state);

  return async () => {
    if (!match?.code) {
      return;
    }

    await fetchData(token, `games/finish-match/${match.code}`, "POST");
    setMatch();
  };
}
