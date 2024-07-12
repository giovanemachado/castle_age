import { useGameStore } from "@/app/store/gameStoreProvider";
import { MatchData, MatchState, SquareData, UnitData } from "@/schema/types";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useUpdateMatchState() {
  const {
    setGameMap,
    setMatch,
    setUnitsMovement,
    setMatchState,
    player,
    setWaitingOtherPlayers,
  } = useGameStore(
    useShallow((state) => ({
      setGameMap: state.setGameMap,
      setMatch: state.setMatch,
      setUnitsMovement: state.setUnitsMovement,
      setMatchState: state.setMatchState,
      player: state.player,
      setWaitingOtherPlayers: state.setWaitingOtherPlayers,
    })),
  );

  return useCallback(
    (mapData: {
      matchState: MatchState;
      rows?: SquareData[][];
      units?: UnitData[];
      matchData?: MatchData;
    }) => {
      if (mapData.rows && mapData.units && mapData.matchData) {
        setGameMap(mapData.rows, mapData.units);
        setUnitsMovement(mapData.units);
        setMatch(mapData.matchData);
      }
      setMatchState(mapData.matchState);

      const currentState: MatchState = mapData.matchState;

      if (
        currentState.playersEndTurn.find(
          (p) => p.playerId == player?.playerId && p.endedTurn == true,
        )
      ) {
        setWaitingOtherPlayers(true);
      } else {
        setWaitingOtherPlayers(false);
      }
    },
    [
      player?.playerId,
      setGameMap,
      setMatch,
      setMatchState,
      setUnitsMovement,
      setWaitingOtherPlayers,
    ],
  );
}
