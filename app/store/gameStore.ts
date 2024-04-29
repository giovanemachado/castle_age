import { createStore } from "zustand/vanilla";

export type GameState = {
    turns: number;
};

export type GameActions = {
    increaseTurns: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
    turns: 0,
};

export const createGameStore = (initState: GameState = defaultInitState) => {
    return createStore<GameStore>()((set) => ({
        ...initState,
        increaseTurns: () => set((state) => ({ turns: state.turns + 1 })),
    }));
};
