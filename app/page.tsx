"use client";

import React from "react";
import LoginForm from "./components/login/login";
import { useGameStore } from "./store/gameStoreProvider";
import Lobby from "./components/lobby/lobby";

export default function Home() {
  const user = useGameStore((state) => state.user);

  return <>{!user?.id ? <LoginForm /> : <Lobby />}</>;
}
