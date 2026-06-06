"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Suspense } from "react";
import AuthenticatedUserIcon from "./AuthenticatedUserIcon";
import GuestUserIcon from "./GuestUserIcon";
import UserIconSkeleton from "./UserIconSkeleton";

function UserIcon() {
  const {
    data: session,
    isPending,
    error,
    refetch,
    isRefetching,
  } = authClient.useSession();

  if (error) return <button onClick={() => refetch}>Retry</button>;
  if (isPending || isRefetching)
    return (
      <Suspense>
        <UserIconSkeleton />
      </Suspense>
    );

  if (!session) return <GuestUserIcon />;
  return <AuthenticatedUserIcon />;
}

export default UserIcon;
