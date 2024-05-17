"use client";

import { useEffect, useState } from "react";
import Map from "../components/maps/map";
import Turns from "../components/turns/turns";
import { GameState } from "@/schema/types";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Money from "../components/money/money";
import { createClient } from "@/utils/supabase/client";

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

    const fetchData = async () => {
      if (!match.code) {
        return;
      }

      const response = await fetch(
        `http://localhost:3001/games/initial-load/${match.code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const initialLoad: GameState = await response.json();
      setInitialLoadState(initialLoad);
    };
    fetchData();

    setLoading(false);
  }, [token, setInitialLoadState, match, loading]);

  return (
    <>
      {!loading && token ? (
        <>
          <div className="flex overflow-y-auto justify-center">
            <Map />
          </div>
          <div className="flex justify-between">
            <Money />
            <Turns />
          </div>
        </>
      ) : null}
    </>
  );
}
