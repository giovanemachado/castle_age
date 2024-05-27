"use client";

import { useEffect, useState } from "react";
import Map from "../components/gameplay/maps/map";
import Turns from "../components/gameplay/turns/turns";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { createClient } from "@/utils/supabase/client";
import { fetchData } from "@/utils/requests";
import Surrender from "../components/gameplay/surrender/surrender";
import { useRouter } from "next/navigation";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const {
    setGameMap,
    setPlayerId,
    setMatch,
    setUnitsMovement,
    setMatchState,
    waitingOtherPlayers,
    setToken,
    token,
  } = useGameStore((state) => state);

  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const userData = await supabase.auth.getUser();
      const sessionData = await supabase.auth.getSession();

      if (!userData.data.user) {
        router.push("/");
      }

      setToken(sessionData.data.session?.access_token ?? "");
      setPlayerId(userData.data.user?.id ?? "");

      const { status, data } = await fetchData(token, `games/initial-data`);

      if (status === 200) {
        const mapData = data;
        setMatchState(mapData.matchState);
        setGameMap(mapData.rows, mapData.units);
        setUnitsMovement(mapData.units);
        setMatch(mapData.matchData);
      }
    };

    getData();
    setLoading(false);
  }, [
    setGameMap,
    setMatch,
    setPlayerId,
    setUnitsMovement,
    setMatchState,
    supabase,
    router,
    setToken,
    token,
  ]);

  if (!token) {
    return null;
  }

  return (
    !loading && (
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
    )
  );
}
