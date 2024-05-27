"use client";

import { MatchData } from "@/schema/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/socket/socket";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

/**
 * Lobby handles all interaction to join a match
 */
export default function Lobby() {
  const router = useRouter();
  const { match, setMatch, setEvents, events, setPlayer, token } = useGameStore(
    (state) => state,
  );
  const [matchCode, setMatchCode] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await fetchData(token, `games/match`);

      if (status === 200) {
        const matchData: MatchData | null = data;
        if (matchData) {
          setMatch(matchData);

          if (matchData.players.length == 2) {
            router.push("/game");
          }
        }
      }
    };

    getData();
  }, [router, setMatch, setPlayer, token]);

  useEffect(() => {
    const onEvent = (value: any) => {
      if (value.matchCode == match?.code) {
        setEvents({ type: "enter_in_match", value });
      }
    };

    socket.on("enter_in_match", onEvent);

    return () => {
      socket.off("enter_in_match", onEvent);
    };
  }, [match, setEvents, token]);

  // TODO temp
  useEffect(() => {
    if (
      events.filter((e) => {
        return e.type === "enter_in_match";
      }).length > 0
    ) {
      router.push("/game");
    }
  }, [events, router]);

  const handleCreateMatch = async () => {
    const { status, data } = await fetchData(token, `games/match`, "POST");

    if (status === 201) {
      const matchData: MatchData = data;
      setMatch(matchData);
    }
  };

  const handleJoinMatch = async () => {
    const { status } = await fetchData(
      token,
      `games/join-match/${matchCode}`,
      "POST",
    );

    if (status === 201) {
      // TODO this causes a flash when hitting join match, might need to add a loadign state here
      router.push("/game");
    }
  };

  if (!token) {
    return null;
  }

  if (match?.active) {
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

  if (!match?.active || match.players.length != 2) {
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
                onClick={handleJoinMatch}
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
