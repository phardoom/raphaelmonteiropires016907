import axios from "axios";
import { authStorage } from "../utils/storage";
import type { AuthResponseDto } from "../types/auth";

const envBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();
const baseURL = envBaseURL || "";

export const api = axios.create({
  baseURL,
});

const refreshClient = axios.create({
  baseURL,
});

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const enqueueRefresh = (callback: (token: string | null) => void) => {
  refreshQueue.push(callback);
};

const flushRefreshQueue = (token: string | null) => {
  refreshQueue.forEach((callback) => callback(token));
  refreshQueue = [];
};

api.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    } as typeof config.headers;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status as number | undefined;
    if (status === 401) {
      const originalRequest = error.config as { _retry?: boolean; headers?: Record<string, string> };
      const refreshToken = authStorage.getRefreshToken();

      if (refreshToken && !originalRequest?._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshResponse = await refreshClient.put<AuthResponseDto>(
              "/autenticacao/refresh",
              null,
              {
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              }
            );
            authStorage.setTokens(
              refreshResponse.data.access_token,
              refreshResponse.data.refresh_token
            );
            isRefreshing = false;
            flushRefreshQueue(refreshResponse.data.access_token);
          } catch (refreshError) {
            isRefreshing = false;
            flushRefreshQueue(null);
            authStorage.clear();
            window.location.assign("/login");
            return Promise.reject(refreshError);
          }
        }

        return new Promise((resolve, reject) => {
          enqueueRefresh((token) => {
            if (!token) {
              reject(error);
              return;
            }
            originalRequest.headers = {
              ...(originalRequest.headers ?? {}),
              Authorization: `Bearer ${token}`,
            };
            resolve(api(originalRequest));
          });
        });
      }

      authStorage.clear();
      window.location.assign("/login");
    }

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Não foi possível completar a solicitação.";
    return Promise.reject(new Error(message));
  }
);
