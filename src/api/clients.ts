import type { AdFormValues } from "../types/adSchema";

const API_BASE = "http://localhost:8080";

const request = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// GET запрос
export const get = <T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<T> => {
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        searchParams.append(k, String(v));
      }
    });
    const query = searchParams.toString();
    if (query) url = `${endpoint}?${query}`;
  }
  return request<T>(url, { method: "GET" });
};

// PUT запрос
export const put = <T>(endpoint: string, data: AdFormValues): Promise<T> => {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
