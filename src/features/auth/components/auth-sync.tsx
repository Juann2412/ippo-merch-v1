"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "@convex/_generated/api";

/** Synchronise l'utilisateur Clerk → table Convex `users` après auth */
export function AuthSync() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const storeUser = useMutation(api.users.store);
  const synced = useRef(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated || synced.current) return;

    synced.current = true;
    storeUser().catch(() => {
      synced.current = false;
    });
  }, [isAuthenticated, isLoading, storeUser]);

  return null;
}
