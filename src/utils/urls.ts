const envBaseURL = import.meta.env.VITE_API_BASE_URL ?? "";

const normalizeBase = (value: string) => value.replace(/\/+$/, "");
const normalizePath = (value: string) => value.replace(/^\/+/, "");

export const resolveApiUrl = (url?: string) => {
  if (!url) {
    return "";
  }

  if (/^(data:|blob:|https?:\/\/)/i.test(url)) {
    return url;
  }

  const base = envBaseURL || window.location.origin;
  if (!base) {
    return url;
  }

  return `${normalizeBase(base)}/${normalizePath(url)}`;
};
