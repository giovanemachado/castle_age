import { useGameStore } from "@/app/store/gameStoreProvider";
import { fetchData } from "@/utils/requests";
import { useCallback, useEffect, useState } from "react";
import { useUpdateWholeMatchState } from "./useUpdateWholeMatchState";

export function useGetInitialData() {
  const [loading, setLoading] = useState(true);

  const updateWholeMatchState = useUpdateWholeMatchState();

  const { token, user } = useGameStore((state) => state);

  const getData = useCallback(async () => {
    if (!user || !token) {
      return;
    }

    const { status, data } = await fetchData(token, `games/initial-data`);

    if (status === 200) {
      const mapData = data;
      updateWholeMatchState(mapData);
    }
    setLoading(false);
  }, [token, updateWholeMatchState, user]);

  useEffect(() => {
    getData();
  }, [getData]);

  return loading;
}
