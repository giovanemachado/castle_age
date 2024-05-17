import {
  GameState,
  MapData,
  MatchData,
  SquareData,
  UnitData,
} from "@/schema/types";
import { createStore } from "zustand/vanilla";
import {
  setCanBeReached,
  setInitialLoadState,
  setUnitMovement,
} from "./gameStoreActions";

export type ClientState = {
  canBeReached: string[];
  currentPlayerId: string;
  gameMap: MapData;
  events: {
    type: string;
    value: any;
  }[];
};

export type GameActions = {
  passTurn: (updatedState: GameState) => void;
  setUnitMovement: (unitId: string, localization: string) => void;
  setCanBeReached: (unitId?: string) => void;
  setInitialLoadState: (initialLoad: GameState) => void;
  setMatch: (matchData: MatchData) => void;
  setGameMap: (rows: SquareData[][]) => void;
  setUnits: (units: UnitData[]) => void;
  setPlayerId: (playerId: string) => void;
  setEvents: (eventValue: { type: string; value: any }) => void;
};

export type GameStore = GameState & GameActions & ClientState;

// Only stuff that need to be updated (confirmed) by the backend
const initialStateObject: GameState = {
  money: [],
  turns: 0,
  units: [],
  match: {
    id: 0,
    code: "",
    players: [],
    active: false,
    createdAt: "",
    updatedAt: "",
  },
};

export const createGameStore = (initState = initialStateObject) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    canBeReached: [],
    currentPlayerId: "",
    gameMap: {
      rows: [],
    },
    events: [],
    passTurn: (updatedState) => set(() => updatedState),
    setUnitMovement: (unitId, localization) =>
      set((state) => setUnitMovement(state, unitId, localization)),
    setCanBeReached: (unitId) => set((state) => setCanBeReached(state, unitId)),
    setInitialLoadState: (initialLoad) =>
      set(() => setInitialLoadState(initialLoad)),
    setMatch: (match: MatchData) =>
      set(() => ({
        match,
      })),
    setGameMap: (rows: SquareData[][]) =>
      set(() => ({
        gameMap: {
          rows,
        },
      })),
    setUnits: (units: UnitData[]) =>
      set(() => ({
        units,
      })),
    setPlayerId: (currentPlayerId: string) =>
      set(() => ({
        currentPlayerId,
      })),
    setEvents: (eventValue: { type: string; value: any }) =>
      set((state) => ({ events: [...state.events, eventValue] })),
  }));
};
