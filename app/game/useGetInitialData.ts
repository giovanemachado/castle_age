import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback, useEffect, useState } from "react";
import { useUpdateMatchState } from "./useUpdateWholeMatchState";

export function useGetInitialData() {
  const [loading, setLoading] = useState(true);
  const [shouldRefetch, refetch] = useState({});

  const updateMatchState = useUpdateMatchState();

  const token = useGameStore((state) => state.token);
  const user = useGameStore((state) => state.user);

  const getData = useCallback(async () => {
    if (!user || !token) {
      return;
    }

    setLoading(true);

    const { status, data } = await fetchData(token, `games/initial-data`);

    if (status === 200) {
      const mapData = data;
      updateMatchState(mapData);
    }
    setLoading(false);
  }, [token, updateMatchState, user, shouldRefetch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { loading, refetch: () => refetch({}) };
}
