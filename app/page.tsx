import React from "react";
import LoginForm from "./components/login/login";
import Lobby from "./components/lobby/lobby";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <>
      {data?.user?.email && <p>Hello {data?.user?.email}</p>}
      {!data?.user?.id ? <LoginForm /> : data.user && <Lobby />}
    </>
  );
}
