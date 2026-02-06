import { ApiError } from "../types/api.types";

/* ---------- Base HTTP client configuration ----------- */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ----------Default headers for API requests ----------- */
const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

/* ----------- Generic HTTP request handler
 ------------ Centralizes error handling and response parsing */
async function handleRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw ApiError.fromResponse(response, data.message || data.error);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors or JSON parse errors
    if (error instanceof TypeError) {
      throw ApiError.networkError(error);
    }

    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      500,
      error,
    );
  }
}

/* ----------- HTTP client with typed methods ----------- */
export const httpClient = {
  /* GET request */
  get: <T>(
    endpoint: string,
    params?: Record<string, string | number | undefined>,
  ): Promise<T> => {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url = `${endpoint}?${queryString}`;
      }
    }

    return handleRequest<T>(url, { method: "GET" });
  },

  /* POST request */
  post: <T>(endpoint: string, body?: unknown): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /* PATCH request */
  patch: <T>(endpoint: string, body?: unknown): Promise<T> => {
    return handleRequest<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /* DELETE request */
  delete: <T>(endpoint: string): Promise<T> => {
    return handleRequest<T>(endpoint, { method: "DELETE" });
  },
};

export default httpClient;
