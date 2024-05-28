import { useGameStore } from "@/app/store/gameStoreProvider";
import { createClient } from "@/utils/supabase/client";

export function useGetUserData() {
  const supabase = createClient();

  const { setPlayer, setToken, setUser, user } = useGameStore((state) => state);

  if (user?.id) {
    return;
  }

  return async () => {
    const sessionData = await supabase.auth.getSession();
    const userData = await supabase.auth.getUser();

    if (userData.data.user) {
      setUser(userData.data.user);
      setToken(sessionData.data.session?.access_token ?? "");

      const playerInfo = {
        playerId: userData.data.user.id,
        name: userData.data.user.user_metadata.name,
      };

      setPlayer(playerInfo);
    }
  };
}
