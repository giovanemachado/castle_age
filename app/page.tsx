import React from "react";
import LoginForm from "./components/login/login";
import Lobby from "./components/lobby/lobby";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <>
            {!session && <LoginForm />}
            {session && <Lobby />}
        </>
    );
}
