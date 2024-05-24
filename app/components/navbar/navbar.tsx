"use client";

import { signOut } from "@/app/lib/actions";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
  const { player, setPlayer } = useGameStore((state) => state);

  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const userData = await supabase.auth.getUser();
      if (!userData.data.user) {
        return;
      }

      const playerInfo = {
        playerId: userData.data.user.id,
        name: userData.data.user.user_metadata.name,
      };

      setPlayer(playerInfo);
    };
    getData();
  }, [setPlayer, supabase]);

  const handleClick = () => {
    signOut();
    setPlayer();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/game">Game</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className="text-xl font-bold">Castle Age</p>
      </div>
      <div className="navbar-end">
        {player && (
          <>
            <div>{player.name}</div>
            <button onClick={handleClick} className="btn btn-seocndary">
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
