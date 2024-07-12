import { useGameStore } from "@/app/store/gameStoreProvider";
import { MatchData } from "@/schema/types";
import { fetchData } from "@/utils/requests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export function useRedirectToActiveMatch() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { setMatch, token, setPlayer } = useGameStore(
    useShallow((state) => ({
      setMatch: state.setMatch,
      token: state.token,
      setPlayer: state.setPlayer,
    })),
  );

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await fetchData(token, `games/match`);

      if (status === 200) {
        const matchData: MatchData | null = data;
        if (matchData) {
          setMatch(matchData);

          if (matchData.players.length == 2) {
            router.push("/game");
          }
        }
      }

      setLoading(false);
    };

    getData();
  }, [router, setMatch, setPlayer, token]);

  return loading;
}
