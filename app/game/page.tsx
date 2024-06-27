"use client";

import Map from "../components/gameplay/maps/map";
import Turns from "../components/gameplay/turns/turns";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Surrender from "../components/gameplay/surrender/surrender";
import { useGetInitialData } from "./useGetInitialData";
import Loading from "../components/shared/loading";
import { useWaitForGameEvent } from "./useWaitForGameEvent";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const { token, match, waitingOtherPlayers } = useGameStore((state) => state);

  const loadingData = useGetInitialData();
  useWaitForGameEvent();

  if (!token) {
    return null;
  }

  if (loadingData) {
    return <Loading />;
  }

  if (!match) {
    return <>No active Match ...</>;
  }

  return (
    <>
      <div className="flex overflow-y-auto justify-center py-4">
        <Map />
      </div>
      <div className="relative flex justify-center items-center">
        {waitingOtherPlayers && (
          <div className="flex flex-col justify-center items-center absolute">
            <p className="py-2 text-sm">Waiting your opponent to play ...</p>
            <progress className="progress w-56"></progress>
          </div>
        )}

        <Surrender />
        <Turns />
      </div>
    </>
  );
}
