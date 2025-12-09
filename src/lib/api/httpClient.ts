interface HttpError {
  status: number;
  message: string;
}

export async function httpClient<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  };

  const response = await fetch(input, config);

  const contentType = response.headers.get("content-type") ?? "";

  if (response.redirected) {
    console.warn("Request was redirected to:", response.url);
  }

  if (!response.ok) {
    let message = "Something went wrong";

    if (contentType.includes("application/json")) {
      const errorBody = await response.json().catch(() => null);
      if (
        errorBody &&
        typeof errorBody === "object" &&
        "message" in errorBody
      ) {
        message = errorBody.message ?? message;
      }
    } else {
      const text = await response.text().catch(() => "");
      console.error("Non-JSON error response:", response.status, text);
    }

    const error: HttpError = {
      status: response.status,
      message,
    };

    throw error;
  }

  if (!contentType.includes("application/json")) {
    const text = await response.text().catch(() => "");
    console.error("Expected JSON but got non-JSON success response:", text);

    const error: HttpError = {
      status: response.status,
      message: "Invalid response format",
    };

    throw error;
  }

  return response.json() as Promise<T>;
}
