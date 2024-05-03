import { GameState, UnitData } from "@/schema/types";
import { createStore } from "zustand/vanilla";
import { setCanBeReached, setUnitMovement } from "./gameStoreActions";

export type ClientState = {
    canBeReached: string[];
};

export type GameActions = {
    passTurn: (updatedState: GameState) => void;
    setUnitMovement: (unitId: string, localization: string) => void;
    setCanBeReached: (unitId?: string) => void;
};

export type GameStore = GameState & GameActions & ClientState;

export const createGameStore = (initState: GameState) => {
    return createStore<GameStore>()((set) => ({
        ...initState,
        canBeReached: [],
        passTurn: (updatedState) => set(() => updatedState),
        setUnitMovement: (unitId, localization) =>
            set((state) => setUnitMovement(state, unitId, localization)),
        setCanBeReached: (unitId) =>
            set((state) => setCanBeReached(state, unitId)),
    }));
};
