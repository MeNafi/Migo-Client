import axios, { type AxiosError } from "axios";
 
const trim = (u: string) => u.replace(/\/+$/, "");
export const API_ROOT = trim(process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000");
export const APP_URL = trim(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
const KEY = "migo_access_token";
const RKEY = "migo_refresh_token";
const creds = process.env.NEXT_PUBLIC_WITH_CREDENTIALS === "true";

export const api = axios.create({ baseURL: `${API_ROOT}/api/v1`, withCredentials: creds, timeout: 20000 });

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(KEY)),
  set: (t: string, refresh?: string) => {
    localStorage.setItem(KEY, t);
    if (refresh) localStorage.setItem(RKEY, refresh);
    document.cookie = `${KEY}=${t}; path=/; max-age=2592000; samesite=lax`; // read by proxy.ts
  },
  refresh: () => (typeof window === "undefined" ? null : localStorage.getItem(RKEY)),
  clear: () => {
    localStorage.removeItem(KEY);
    localStorage.removeItem(RKEY);
    document.cookie = `${KEY}=; path=/; max-age=0`;
  },
};

api.interceptors.request.use((c) => {
  const t = tokenStore.get();
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});

// One shared refresh for all parallel 401s.
let refreshing: Promise<string | null> | null = null;
const refresh = () =>
  (refreshing ??= axios
    .post(`${API_ROOT}/api/v1/auth/refresh`, { refreshToken: tokenStore.refresh() }, { withCredentials: creds })
    .then((r) => {
      const d = r.data?.data;
      if (d?.accessToken) tokenStore.set(d.accessToken, d.refreshToken);
      return (d?.accessToken ?? null) as string | null;
    })
    .catch(() => null)
    .finally(() => { refreshing = null; }));

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const cfg: any = error.config;
    const isAuth = /\/auth\/(login|refresh|register)/.test(cfg?.url || "");
    if (error.response?.status === 401 && cfg && !cfg._retry && !isAuth && typeof window !== "undefined") {
      cfg._retry = true;
      const t = await refresh();
      if (t) { cfg.headers.Authorization = `Bearer ${t}`; return api(cfg); }
      tokenStore.clear();
      if (!location.pathname.startsWith("/login")) location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const unwrap = <T = any>(p: { data?: T }) => p?.data as T;
export const errMsg = (e: unknown) => {
  const d = (e as any)?.response?.data;
  return d?.errorDetails?.[0]?.message ?? d?.message ?? (e as any)?.message ?? "Something went wrong";
};
