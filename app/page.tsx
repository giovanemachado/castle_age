import React from "react";
import LoginForm from "./components/login/login";
import Lobby from "./components/lobby/lobby";

export default async function Home() {
    return (
        <>
            <LoginForm />
            <Lobby />
        </>
    );
}
