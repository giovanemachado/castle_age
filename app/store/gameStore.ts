import { GameState, UnitData } from "@/schema/types";
import { createStore } from "zustand/vanilla";
import {
  setCanBeReached,
  setInitialLoadState,
  setUnitMovement,
} from "./gameStoreActions";

export type ClientState = {
  token: string;
  canBeReached: string[];
};

export type GameActions = {
  passTurn: (updatedState: GameState) => void;
  setUnitMovement: (unitId: string, localization: string) => void;
  setCanBeReached: (unitId?: string) => void;
  setToken: (token: string) => void;
  setInitialLoadState: (initialLoad: GameState) => void;
};

export type GameStore = GameState & GameActions & ClientState;

const initialStateObject: GameState = {
  gameId: "",
  playerIds: [],
  money: [],
  turns: 0,
  units: [],
  gameMap: {
    rows: [],
  },
};

export const createGameStore = (initState = initialStateObject) => {
  return createStore<GameStore>()((set) => ({
    ...initState,
    canBeReached: [],
    token: "", // localStorage.getItem("accessToken") ?? "",
    passTurn: (updatedState) => set(() => updatedState),
    setUnitMovement: (unitId, localization) =>
      set((state) => setUnitMovement(state, unitId, localization)),
    setCanBeReached: (unitId) => set((state) => setCanBeReached(state, unitId)),
    setToken: (externaltoken) =>
      set(() => {
        return { token: externaltoken };
      }),
    setInitialLoadState: (initialLoad) =>
      set(() => setInitialLoadState(initialLoad)),
  }));
};
