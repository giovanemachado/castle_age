"use client";

import { useFinishMatch } from "../../shared/hooks/useFinishMatch";

const Surrender = () => {
  const finishMatch = useFinishMatch();

  const handleClick = async () => {
    finishMatch();
  };

  return (
    <button onClick={handleClick} className={"btn btn-error"}>
      Surrender
    </button>
  );
};

export default Surrender;
