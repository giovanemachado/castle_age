"use client";

import { useEffect, useState } from "react";
import Map from "../components/maps/map";
import Turns from "../components/turns/turns";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Money from "../components/money/money";
import { createClient } from "@/utils/supabase/client";
import { fetchData } from "@/utils/requests";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const { setGameMap, setPlayerId, setMatch, setUnitsMovement, setMatchState } =
    useGameStore((state) => state);

  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const userData = await supabase.auth.getUser();
      const sessionData = await supabase.auth.getSession();

      setToken(sessionData.data.session?.access_token ?? "");
      setPlayerId(userData.data.user?.id ?? "");

      const { status, data } = await fetchData(
        sessionData.data.session?.access_token ?? "",
        `games/initial-data`,
      );

      if (status === 200) {
        const mapData = data;
        setGameMap(mapData.rows, mapData.units);
        setUnitsMovement(mapData.units);
        setMatch(mapData.matchData);
        setMatchState(mapData.matchState);
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
  ]);

  if (!token) {
    return null;
  }

  return (
    !loading && (
      <>
        <div className="flex overflow-y-auto justify-center">
          <Map />
        </div>
        <div className="flex justify-between">
          <Money />
          <Turns />
        </div>
      </>
    )
  );
}
