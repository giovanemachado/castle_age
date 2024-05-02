import { GameState } from "@/schema/types";
import { createStore } from "zustand/vanilla";
import { setUnitMovement } from "./gameStoreActions";

export type GameActions = {
    passTurn: (updatedState: GameState) => void;
    setUnitMovement: (unitId: string, localization: string) => void;
};

export type GameStore = GameState & GameActions;

export const createGameStore = (initState: GameState) => {
    return createStore<GameStore>()((set) => ({
        ...initState,
        passTurn: (updatedState) => set(() => updatedState),
        setUnitMovement: (unitId, localization) =>
            set((state) => setUnitMovement(state, unitId, localization)),
    }));
};
