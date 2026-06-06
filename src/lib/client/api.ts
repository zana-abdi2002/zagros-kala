/**
 * Custom error class to handle non-2xx HTTP responses.
 */
export class ApiError<T = unknown> extends Error {
  public status: number;
  public data?: T;

  constructor(message: string, status: number, data?: T) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * A robust wrapper around native fetch for client-side requests.
 */
export async function fetchJson<T>(
  endpoint: string | URL,
  options: RequestInit = {},
): Promise<T> {
  // 1. Offline Check
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("No internet connection. Please check your network.");
  }

  // 2. Safely merge headers using the native Headers API
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  let res: Response;

  // 3. Network-level try/catch (Catches DNS errors, AbortController cancellations, etc.)
  try {
    res = await fetch(endpoint, config);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown network error";
    console.error("Network fetch failed:", errorMessage);

    // Check if the request was intentionally aborted
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    throw new Error(`Network error: Could not reach the server.`);
  }

  // 4. HTTP-level error handling (Catches 4xx and 5xx responses)
  if (!res.ok) {
    let errorData: unknown = null;

    try {
      // Attempt to extract the error payload from the API
      errorData = await res.json();
    } catch {
      // If parsing fails, it might be an HTML error page (like a 502 Bad Gateway)
    }

    // Safely extract message depending on your API's standard error shape
    const parsedData = errorData as Record<string, unknown> | null;
    const errorMessage =
      (typeof parsedData?.error === "string" ? parsedData.error : null) ||
      (typeof parsedData?.message === "string" ? parsedData.message : null) ||
      `HTTP Error ${res.status}: ${res.statusText}`;

    throw new ApiError(errorMessage, res.status, errorData);
  }

  // 5. Safe JSON parsing for successful responses
  // Handle cases where the API returns 204 No Content or a completely empty body
  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return null as unknown as T;
  }

  try {
    return await res.json();
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Invalid JSON response from server.");
  }
}
