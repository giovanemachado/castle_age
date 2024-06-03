"use client";

import React, { useEffect, useState } from "react";
import { useGetUserData } from "./components/shared/hooks/useGetUserData";
import Loading from "./components/shared/components/loading";

export default function UserDataWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setIsLoading] = useState(true);

  const getUserData = useGetUserData();

  useEffect(() => {
    const getData = async () => {
      await getUserData?.();
      setIsLoading(false);
    };

    getData();
  }, [getUserData]);

  if (loading) {
    return <Loading />;
  }

  return children;
}
