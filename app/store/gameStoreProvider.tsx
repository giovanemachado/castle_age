"use client";
import {
    type ReactNode,
    createContext,
    useRef,
    useContext,
    useEffect,
    useState,
} from "react";
import { useStore } from "zustand";
import { GameStore, createGameStore } from "./gameStore";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(
    undefined,
);

export interface GameStoreProviderProps {
    children: ReactNode;
}

export const GameStoreProvider = ({ children }: GameStoreProviderProps) => {
    const [loading, setLoading] = useState(true);
    const storeRef = useRef<GameStoreApi>();

    useEffect(() => {
        storeRef.current = createGameStore();
        setLoading(false);
    }, []);

    if (loading) {
        return <>Loading</>;
    }

    return (
        <GameStoreContext.Provider value={storeRef.current}>
            {children}
        </GameStoreContext.Provider>
    );
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
    const gameStoreContext = useContext(GameStoreContext);

    if (!gameStoreContext) {
        throw new Error(`useGameStore must be use within GameStoreProvider`);
    }

    return useStore(gameStoreContext, selector);
};
