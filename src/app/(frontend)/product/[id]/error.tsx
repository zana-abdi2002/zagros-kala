// app/dashboard/error.tsx
"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // digest = server-side error hash for logging
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div role="alert">
      <h2>Something went wrong in the dashboard</h2>
      {/* digest is safe to show — it's a hash, not the actual message */}
      {error.digest && <p>Error ID: {error.digest}</p>}
      {/* Only expose details in development */}
      {process.env.NODE_ENV === "development" && <pre>{error.message}</pre>}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
