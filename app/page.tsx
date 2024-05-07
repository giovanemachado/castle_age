"useClient";
import React from "react";
import LoginForm from "./login/login";
import Game from "./game/game";

export default async function Home() {
    return (
        <>
            <LoginForm />
            <Game />
        </>
    );
}
