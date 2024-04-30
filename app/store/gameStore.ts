import { GameState, UnitData } from "@/schema/types";
import { createStore } from "zustand/vanilla";
// import { setUnitMovement } from "./gameStoreActions";

export type GameActions = {
    increaseTurns: () => void;
    // setUnitMovement: (unitId: string) => void;
};

export type GameStore = GameState & GameActions;

export const createGameStore = (initState: GameState) => {
    return createStore<GameStore>()((set) => ({
        ...initState,
        increaseTurns: () => set((state) => ({ turns: state.turns + 1 })),
        // setUnitMovement: (unitId) =>
        //     set((state) => setUnitMovement(state, unitId)),
    }));
};
