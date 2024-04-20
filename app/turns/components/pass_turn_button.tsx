"use client";

const PassTurnButton = () => {
    const handleClick = () => {
        fetch("http://localhost:3001/games/pass-turn", { method: "POST" });
    };

    return (
        <button onClick={handleClick} className="btn btn-primary btn-lg">
            Pass turn
        </button>
    );
};

export default PassTurnButton;
