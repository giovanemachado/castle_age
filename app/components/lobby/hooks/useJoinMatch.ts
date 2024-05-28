import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useRouter } from "next/navigation";

export default function useJoinMatch(matchCode: string) {
  const router = useRouter();
  const { token } = useGameStore((state) => state);

  return async () => {
    const { status } = await fetchData(
      token,
      `games/join-match/${matchCode}`,
      "POST",
    );

    if (status === 201) {
      // TODO this causes a flash when hitting join match, might need to add a loadign state here
      router.push("/game");
    }
  };
}
