"use client";

import { MatchData, SquareData } from "@/schema/types";
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
  const { match, setGameMap, setMatch, setPlayerId, setEvents } = useGameStore(
    (state) => state,
  );
  const [token, setToken] = useState<string>("");
  const [currentPlayerId, setCurrentPlayerId] = useState<string>("");
  const [matchCode, setMatchCode] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const userData = await supabase.auth.getUser();
      const sessionData = await supabase.auth.getSession();
      setToken(sessionData.data.session?.access_token ?? "");
      setCurrentPlayerId(userData.data.user?.id ?? "");
    };
    getData();
  }, [supabase]);

  useEffect(() => {
    const onEvent = (value: any) => {
      setEvents({ type: "match_created", value });
    };

    socket.on("match_created", onEvent);

    return () => {
      socket.off("match_created", onEvent);
    };
  }, [setEvents, token]);

  useEffect(() => {
    if (token && match.active && match.players.length == 2 && !matchCode) {
      setMatchCode(matchCode);
    }
  }, [token, match.active, match.players.length, matchCode]);

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }

  //   if (fooEvents.length > 0) {
  //     router.push("/game");
  //   }
  // }, [fooEvents, token, router]);

  const getMap = async (code: string) => {
    const { status, data } = await fetchData(
      token,
      `games/initial-map/${code}`,
    );

    if (status === 200) {
      const mapData: { rows: SquareData[][] } = data;
      setGameMap(mapData.rows);
    }
  };

  const handleCreateMatch = async () => {
    const { status, data } = await fetchData(token, `games/match`, "POST");

    // TODO real bad to have this logic here
    if (status === 201) {
      const matchData: MatchData = data;

      await getMap(matchData.code);
      setMatch(matchData);
    }
  };

  const handleEnterMatch = async () => {
    if (!matchCode) {
      return;
    }

    const { status, data } = await fetchData(
      token,
      `games/enter-match/${matchCode}`,
      "POST",
    );

    if (status === 201) {
      const matchData: MatchData = data;
      await getMap(matchData.code);
      setMatch(matchData);
      setPlayerId(currentPlayerId);
      // TODO this causes a flash when hitting enter match, might need to add a loadign state here
      router.push("/game");
    }
  };

  return (
    <>
      {/* TODO real bad to have this logic here */}
      {token && match.active && match.players.length == 2 && (
        <>
          <p>Match code: {match.code}</p>
          <button
            onClick={handleEnterMatch}
            className="btn btn-primary join-item rounded-r-full"
          >
            Re-enter match
          </button>
        </>
      )}
      {token && (!match.active || match.players.length != 2) && (
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
                Or enter a Match code. // test: 342851
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
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
