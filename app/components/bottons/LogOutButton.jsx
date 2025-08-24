"use client";
import { getQueryClient } from "@/app/lib/queryClient/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

export const LogOutButton = () => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const path = usePathname();
  const notify = (m) => toast(m);
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (path.includes("cart")) {
        router.replace("/");
        await signOut({ redirect: false });
      }
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      router.refresh();
      queryClient.clear();
      notify("successfully signed out");
    },
    onError: (error) => {
      console.error("Sign out failed:", error);
    },
  });

  // The handleSignOut function is now simplified to call the mutation.
  const handleSignOut = () => {
    logoutMutation.mutate();
  };

  return (
    <button disabled={logoutMutation.isPending} onClick={handleSignOut}>
      {logoutMutation.isPending ? "Signing Out..." : "Logout"}
    </button>
  );
};
