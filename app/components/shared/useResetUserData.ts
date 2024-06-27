import { useGameStore } from "@/app/store/gameStoreProvider";

export function useResetUserData() {
  const { setPlayer, setToken, setUser, setMatch } = useGameStore(
    (state) => state,
  );

  return () => {
    setUser();
    setToken();
    setPlayer();
    setMatch();
  };
}
