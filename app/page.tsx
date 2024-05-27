"use client";

import React, { useEffect, useState } from "react";
import LoginForm from "./components/login/login";
import Lobby from "./components/lobby/lobby";
import { useGameStore } from "./store/gameStoreProvider";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const { setToken, setUser, user, setPlayer } = useGameStore((state) => state);

  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();
      const userData = await supabase.auth.getUser();

      if (userData.data.user) {
        setUser(userData.data.user);
        setToken(sessionData.data.session?.access_token ?? "");

        const playerInfo = {
          playerId: userData.data.user.id,
          name: userData.data.user.user_metadata.name,
        };

        setPlayer(playerInfo);
      }

      setLoading(false);
    };

    getData();
  }, [setToken, supabase, setUser, setPlayer]);

  if (loading) {
    return <>Loading ...</>;
  }

  return <>{!user?.id ? <LoginForm /> : <Lobby />}</>;
}
