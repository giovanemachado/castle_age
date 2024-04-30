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
import { GameState } from "@/schema/types";

export type GameStoreApi = ReturnType<typeof createGameStore>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(
    undefined
);

export interface GameStoreProviderProps {
    children: ReactNode;
}

export const GameStoreProvider = ({ children }: GameStoreProviderProps) => {
    const [loading, setLoading] = useState(true);
    const storeRef = useRef<GameStoreApi>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:3001/games/initial-load"
            );
            const gameInitialState: GameState = await response.json();

            if (!storeRef.current) {
                storeRef.current = createGameStore(gameInitialState);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <>f</>;
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
