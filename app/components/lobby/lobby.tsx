"use client";

import { MatchData } from "@/schema/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { createClient } from "@/utils/supabase/client";

export default function Lobby() {
  const [token, setToken] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const sessionData = await supabase.auth.getSession();
      setToken(sessionData.data.session?.access_token ?? "");
    };
    getData();
  }, [supabase]);

  const router = useRouter();
  const [match, setMatch] = useState<MatchData | null>(null);
  const [matchCode, setMatchCode] = useState<string>("");

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("match_created", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("match_created", onFooEvent);
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (fooEvents.length > 0) {
      router.push("/game");
    }
  }, [fooEvents, token, router]);

  const handleCreateMatch = async () => {
    const response = await fetch(`http://localhost:3001/games/match`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });

    if (response.status === 201) {
      const matchData: MatchData = await response.json();
      setMatch(matchData);
    }
  };

  const handleEnterMatch = async () => {
    if (!matchCode) {
      return;
    }

    const response = await fetch(
      `http://localhost:3001/games/enter-match/${matchCode}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      },
    );

    if (response.status === 201) {
      const matchData: MatchData = await response.json();
      setMatch(matchData);
      router.push("/game");
    }
  };

  return (
    <>
      {token && match && <p>Match code: {match.code}</p>}
      {token && !match && (
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
                Or enter a Match code.
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
