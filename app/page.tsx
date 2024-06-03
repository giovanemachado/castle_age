"use client";

import React, { useEffect } from "react";
import LoginForm from "./components/login/login";
import { useGameStore } from "./store/gameStoreProvider";
import Lobby from "./components/lobby/lobby";

export default function Home() {
  const { user } = useGameStore((state) => state);

  return <>{!user?.id ? <LoginForm /> : <Lobby />}</>;
}
