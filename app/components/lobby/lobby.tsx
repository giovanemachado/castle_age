"use client";

import { MatchData } from "@/schema/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { createClient } from "@/utils/supabase/client";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

/**
 * Lobby handles all interaction to enter in a match
 */
export default function Lobby() {
  const supabase = createClient();
  const router = useRouter();
  const { match, setMatch, setEvents, events } = useGameStore((state) => state);
  const [token, setToken] = useState<string>("");
  const [matchCode, setMatchCode] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();
      setToken(sessionData.data.session?.access_token ?? "");
    };

    getData();
  }, [supabase]);

  useEffect(() => {
    const onEvent = (value: any) => {
      // TODO need to check if is the correct match
      setEvents({ type: "enter_in_match", value });
    };

    socket.on("enter_in_match", onEvent);

    return () => {
      socket.off("enter_in_match", onEvent);
    };
  }, [setEvents, token]);

  // TODO temp
  useEffect(() => {
    if (events.length > 0) {
      router.push("/game");
    }
  }, [events, router]);

  useEffect(() => {
    if (token && match.active && match.players.length == 2 && !matchCode) {
      setMatchCode(matchCode);
    }
  }, [token, match.active, match.players, matchCode]);

  const handleCreateMatch = async () => {
    const { status, data } = await fetchData(token, `games/match`, "POST");

    if (status === 201) {
      const matchData: MatchData = data;
      setMatch(matchData);
    } else {
      console.log("something went wrong in games/match");
    }
  };

  const handleEnterMatch = async () => {
    if (!matchCode) {
      return;
    }

    const { status } = await fetchData(
      token,
      `games/enter-match/${matchCode}`,
      "POST",
    );

    if (status === 201) {
      // TODO this causes a flash when hitting enter match, might need to add a loadign state here
      router.push("/game");
    } else {
      console.log("something went wrong in games/enter-match/");
    }
  };

  if (!token) {
    return null;
  }

  if (match.active) {
    return (
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">
              Share this Match code with your opponent:
            </h2>
            <h1 className="text-lg font-bold text-center">{match.code}</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!match.active || match.players.length != 2) {
    return (
      <div className="hero h-full bg-base-100">
        <div className="hero-content flex-col">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Create a new Match.</h1>
            <button onClick={handleCreateMatch} className="btn btn-primary">
              Create
            </button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-center">
              Or join a Match with a Match Code.
            </h1>
            <div className="join">
              <input
                className="input input-bordered join-item"
                placeholder="Match code"
                onChange={(v) => setMatchCode(v.target.value)}
              />
              <button
                onClick={handleEnterMatch}
                className="btn btn-primary join-item rounded-r-full"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
