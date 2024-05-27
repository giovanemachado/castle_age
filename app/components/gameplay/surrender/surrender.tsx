"use client";

import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";

const Surrender = () => {
  const { match } = useGameStore((state) => state);

  const handleClick = async () => {
    if (!match) {
      return;
    }

    await fetchData("token", `games/finish-match/${match.code}`, "POST");
  };

  return (
    <button onClick={handleClick} className={"btn btn-error"}>
      Surrender
    </button>
  );
};

export default Surrender;
