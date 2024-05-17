"use client";

import { useEffect, useState } from "react";
import Map from "../components/maps/map";
import Turns from "../components/turns/turns";
import { GameState } from "@/schema/types";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Money from "../components/money/money";
import { createClient } from "@/utils/supabase/client";
import { fetchData } from "@/utils/requests";

/**
 * Game handles all game load, preparing all data to other components (Map, Turns, etc)
 */
export default function Game() {
  const { match, setInitialLoadState } = useGameStore((state) => state);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();

      setToken(sessionData.data.session?.access_token ?? "");
    };

    getData();
  }, [supabase]);

  useEffect(() => {
    if (!token || !loading) {
      return;
    }

    const getData = async () => {
      if (!match.code) {
        return;
      }

      const initialLoad = await fetchData(
        token,
        `games/initial-load/${match.code}`,
      );

      setInitialLoadState(initialLoad.data);
    };
    getData();

    setLoading(false);
  }, [token, setInitialLoadState, match, loading]);

  return (
    <>
      {!loading && token && (
        <>
          <div className="flex overflow-y-auto justify-center">
            <Map />
          </div>
          <div className="flex justify-between">
            <Money />
            <Turns />
          </div>
        </>
      )}
    </>
  );
}
