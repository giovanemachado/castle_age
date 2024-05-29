import { useGameStore } from "@/app/store/gameStoreProvider";
import { MatchState } from "@/schema/types";
import { fetchData } from "@/utils/requests";
import { useEffect, useState } from "react";

export function useGetInitialData() {
  const [loading, setLoading] = useState(true);

  const {
    setGameMap,
    setMatch,
    setUnitsMovement,
    setMatchState,
    player,
    token,
    user,
    setWaitingOtherPlayers,
  } = useGameStore((state) => state);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getData = async () => {
      const { status, data } = await fetchData(token, `games/initial-data`);

      if (status === 200) {
        const mapData = data;
        setMatchState(mapData.matchState);
        setGameMap(mapData.rows, mapData.units);
        setUnitsMovement(mapData.units);
        setMatch(mapData.matchData);

        const currentState: MatchState = mapData.matchState;

        if (
          currentState.playersEndTurn.find(
            (p) => p.playerId == player?.playerId && p.endedTurn == true,
          )
        ) {
          setWaitingOtherPlayers(true);
        }
      }
      setLoading(false);
    };

    getData();
  }, [
    setGameMap,
    player,
    setMatch,
    setMatchState,
    setUnitsMovement,
    token,
    user,
    setWaitingOtherPlayers,
  ]);

  return loading;
}
