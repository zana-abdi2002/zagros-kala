"use client";

import { Skeleton } from "@mui/material";

function UserIconSkeleton() {
  return (
    <Skeleton variant="circular" width={40} height={40} animation="wave" />
  );
}

export default UserIconSkeleton;
