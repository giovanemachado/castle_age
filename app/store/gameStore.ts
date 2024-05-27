import { MatchData, MatchState, SquareData, UnitData } from "@/schema/types";
import { createStore } from "zustand/vanilla";
import { setCanBeReached, setUnitNewLocalization } from "./gameStoreActions";

export type Player = {
  name: string;
  playerId: string; // TODO same from currentPlayerId, we could remove it
};

export type ClientState = {
  user?: any;
  token?: string;
  canBeReached: string[];
  currentPlayerId?: string;
  player?: Player;
  gameMap?: { rows: SquareData[][]; units: UnitData[] };
  match?: MatchData;
  events: {
    type: string;
    value: any;
  }[];
  waitingOtherPlayers: boolean;
};

export type GameActions = {
  setUser: (user?: any) => void;
  setToken: (token?: string) => void;
  setMatchState: (updatedState: MatchState) => void;
  setUnitNewLocalization: (unitId: string, localization: string) => void;
  setCanBeReached: (unitId?: string) => void;
  setMatch: (matchData: MatchData) => void;
  setGameMap: (rows: SquareData[][], units: UnitData[]) => void;
  setPlayerId: (playerId: string) => void;
  setEvents: (eventValue: { type: string; value: any }) => void;
  setUnitsMovement: (unitsData: UnitData[]) => void;
  setWaitingOtherPlayers: (isWaiting: boolean) => void;
  setPlayer: (player?: Player) => void;
};

export type GameStore = MatchState & GameActions & ClientState;

export const createGameStore = (initState: MatchState) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    canBeReached: [],
    events: [],
    waitingOtherPlayers: false,
    setUser: (newUser) => set(() => ({ user: newUser })),
    setToken: (newToken) => set(() => ({ token: newToken })),
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
    setWaitingOtherPlayers: (isWaiting) =>
      set((state) => ({ waitingOtherPlayers: isWaiting })),
    setPlayer: (playerData) => set(() => ({ player: playerData })),
  }));
};
