"use client";

import React, { useEffect } from "react";
import LoginForm from "./components/login/login";
import { useGameStore } from "./store/gameStoreProvider";
import Lobby from "./components/lobby/lobby";
import { useGetUserData } from "./components/shared/hooks/useGetUserData";

export default function Home() {
  const getUserData = useGetUserData();

  const { user } = useGameStore((state) => state);

  useEffect(() => {
    getUserData?.();
  }, [getUserData]);

  return <>{!user?.id ? <LoginForm /> : <Lobby />}</>;
}
