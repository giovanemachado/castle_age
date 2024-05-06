"useClient";
import React from "react";
import LoginForm from "./login/login";
import Game from "./game/game";
import Navbar from "./navbar/navbar";

export default async function Home() {
    return (
        <div className="h-screen flex flex-col container mx-auto px-2">
            <Navbar />
            <LoginForm />
            <Game />
        </div>
    );
}
