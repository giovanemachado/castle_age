"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const PassTurnButton = () => {
  const supabase = createClient();

  const { turns, units, money, passTurn, match } = useGameStore(
    (state) => state,
  );

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();
      setToken(sessionData.data.session?.access_token ?? "");
    };
    getData();
  }, [supabase]);

  const handleClick = async () => {
    const { data } = await fetchData(
      token,
      `games/turn/${match.code}`,
      "POST",
      {
        turns,
        units,
        money,
      },
    );

    passTurn(data);
  };

  return (
    <button onClick={handleClick} className="btn btn-primary btn-lg">
      Pass turn
    </button>
  );
};

export default PassTurnButton;
