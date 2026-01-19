import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { authService } from "../services/authService";
import { authStorage } from "../utils/storage";

type AuthContextValue = {
  token: string | null;
  isReady: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = authStorage.getToken();
    if (stored) {
      setToken(stored);
    }
    setIsReady(true);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    authStorage.setTokens(response.access_token, response.refresh_token);
    setToken(response.access_token);
  }, []);

  const logout = useCallback(() => {
    authStorage.clear();
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isReady,
      login,
      logout,
    }),
    [token, isReady, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
