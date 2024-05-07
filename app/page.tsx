"useClient";
import React from "react";
import LoginForm from "./components/login/login";
import Game from "./components/game/game";

export default async function Home() {
    return (
        <>
            <LoginForm />
            <Game />
        </>
    );
}
