"use client";

import Map from "../components/gameplay/maps/map";
import Turns from "../components/gameplay/turns/turns";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Surrender from "../components/gameplay/surrender/surrender";
import { useGetInitialData } from "./useGetInitialData";
import Loading from "../components/shared/loading";
import { useWaitForGameEvent } from "./useWaitForGameEvent";
import PassTurnButton from "../components/gameplay/turns/passTurnButton";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const token = useGameStore((state) => state.token);
  const match = useGameStore((state) => state.match);
  const waitingOtherPlayers = useGameStore(
    (state) => state.waitingOtherPlayers
  );

  const { loading, refetch } = useGetInitialData();
  useWaitForGameEvent();

  const reload = () => {
    refetch();
  };

  if (!token) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  if (!match) {
    return <>No active Match ...</>;
  }

  return (
    <div className="flex">
      <div className="relative">
        <div className="px-2 flex flex-col justify-between fixed top-[60px] min-w-60 h-screen bg-base-100 z-[2]">
          <div className="justify-normal">
            <h2 className="text-center font-bold text-xl pb-4">Actions</h2>
            <div className="text-left w-full pb-4">
              <Turns />
            </div>
            {waitingOtherPlayers && (
              <div className="flex flex-col pb-2">
                <p className="pb-2 text-center text-sm">
                  Waiting your opponent to play ...
                </p>
                <progress className="progress w-full"></progress>
              </div>
            )}
            <div className="w-full pb-2">
              <PassTurnButton />
            </div>
          </div>

          <div className="pb-[66px]">
            {!waitingOtherPlayers && (
              <div className="w-full pb-2">
                <button
                  onClick={reload}
                  className={"btn btn-warning text-base w-full"}
                >
                  Revert movements
                </button>
              </div>
            )}
            <Surrender />
          </div>
        </div>
      </div>

      <div className="flex w-full overflow-y-auto justify-center pb-2">
        <Map />
      </div>
    </div>
  );
}
