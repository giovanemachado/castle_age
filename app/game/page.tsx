"use client";

import { useEffect } from "react";
import Map from "../components/gameplay/maps/map";
import Turns from "../components/gameplay/turns/turns";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Surrender from "../components/gameplay/surrender/surrender";
import { useRouter } from "next/navigation";
import { useGetUserData } from "../components/shared/hooks/useGetUserData";
import { useGetInitialData } from "./hooks/useGetInitialData";
import { useWaitForGameEvent } from "./hooks/useWaitForGameEvent";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const { waitingOtherPlayers, token, match, user } = useGameStore(
    (state) => state,
  );
  const getUserData = useGetUserData();
  const router = useRouter();
  const loading = useGetInitialData();
  useWaitForGameEvent();

  useEffect(() => {
    getUserData?.();

    if (!user) {
      router.push("/");
    }
  }, [getUserData, router, user]);

  if (!token) {
    return null;
  }

  if (loading) {
    return <>Loading ...</>;
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

        {/* <Money /> */}

        <Surrender />
        <Turns />
      </div>
    </>
  );
}
