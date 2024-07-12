import { useGameStore } from "@/app/store/gameStoreProvider";
import { useShallow } from "zustand/react/shallow";

export function useResetUserData() {
  const { setPlayer, setToken, setUser, setMatch } = useGameStore(
    useShallow((state) => ({
      setPlayer: state.setPlayer,
      setToken: state.setToken,
      setUser: state.setUser,
      setMatch: state.setMatch,
    })),
  );

  return () => {
    setUser();
    setToken();
    setPlayer();
    setMatch();
  };
}
