"use client";
type PassTurnButtonProps = {
    onTurnUpdate: (turns: number) => void;
};

const PassTurnButton = ({ onTurnUpdate }: PassTurnButtonProps) => {
    const handleClick = async () => {
        const response = await fetch("http://localhost:3001/games/turns", {
            method: "POST",
        });
        const jsonData = await response.json();
        onTurnUpdate(jsonData);
    };

    return (
        <button onClick={handleClick} className="btn btn-primary btn-lg">
            Pass turn
        </button>
    );
};

export default PassTurnButton;
