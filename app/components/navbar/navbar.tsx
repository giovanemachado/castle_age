"use client";

import Link from "next/link";
import { signOut } from "@/app/lib/actions";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useResetUserData } from "../shared/useResetUserData";

export default function Navbar() {
  const player = useGameStore((state) => state.player);

  const resetUserData = useResetUserData();

  const handleClick = async () => {
    await signOut();
    resetUserData();
  };

  return (
    <div className="navbar bg-base-100 sticky  top-0 z-[2]">
      <div className="navbar-start">
        {player && (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-base"
            >
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  text-base"
            >
              <li>
                <Link className="text-base" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-base" href="/game">
                  Game
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-center">
        <p className="text-3xl font-bold">Castle Age</p>
      </div>
      <div className="navbar-end">
        {player && (
          <ul className="menu menu-horizontal px-1  text-base">
            <li>
              <details>
                <summary>Playing as: {player.name}</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a onClick={handleClick}>Sign out</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
