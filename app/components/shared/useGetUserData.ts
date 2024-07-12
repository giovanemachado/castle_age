import { useGameStore } from "@/app/store/gameStoreProvider";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function useGetUserData() {
  const router = useRouter();
  const supabase = createClient();
  const setPlayer = useGameStore((state) => state.setPlayer);
  const setToken = useGameStore((state) => state.setToken);
  const setUser = useGameStore((state) => state.setUser);
  const user = useGameStore((state) => state.user);

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
    } else {
      router.push("/");
    }
  };
}
