import { MatchData, MatchState, SquareData, UnitData } from "@/schema/types";
import { createStore } from "zustand/vanilla";
import { setCanBeReached, setUnitNewLocalization } from "./gameStoreActions";

export type ClientState = {
  canBeReached: string[];
  currentPlayerId?: string;
  gameMap?: { rows: SquareData[][]; units: UnitData[] };
  match?: MatchData;
  events: {
    type: string;
    value: any;
  }[];
};

export type GameActions = {
  setMatchState: (updatedState: MatchState) => void;
  setUnitNewLocalization: (unitId: string, localization: string) => void;
  setCanBeReached: (unitId?: string) => void;
  setMatch: (matchData: MatchData) => void;
  setGameMap: (rows: SquareData[][], units: UnitData[]) => void;
  setPlayerId: (playerId: string) => void;
  setEvents: (eventValue: { type: string; value: any }) => void;
  setUnitsMovement: (unitsData: UnitData[]) => void;
};

export type GameStore = MatchState & GameActions & ClientState;

export const createGameStore = (initState: MatchState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    canBeReached: [],
    events: [],
    setMatchState: (updatedState) =>
      set(() => {
        return updatedState;
      }),
    setUnitNewLocalization: (unitId, localization) =>
      set((state) => setUnitNewLocalization(state, unitId, localization)),
    setCanBeReached: (unitId) => set((state) => setCanBeReached(state, unitId)),
    setMatch: (match: MatchData) =>
      set(() => ({
        match,
      })),
    setGameMap: (rows: SquareData[][], units: UnitData[]) =>
      set(() => ({
        gameMap: {
          rows,
          units,
        },
      })),
    setPlayerId: (currentPlayerId: string) =>
      set(() => ({
        currentPlayerId,
      })),
    setEvents: (eventValue: { type: string; value: any }) =>
      set((state) => ({ events: [...state.events, eventValue] })),
    setUnitsMovement: (unitsData) =>
      set((state) => ({
        unitsMovement: unitsData.map((unitData) => ({
          id: unitData.id,
          localization: unitData.movement.initialLocalization,
          playerId: unitData.playerId,
          movedInTurn: false,
        })),
      })),
  }));
};
