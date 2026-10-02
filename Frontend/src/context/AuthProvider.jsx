import { useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useUserQuery } from "../hooks/useUserQuery";
import {
  setAccessToken,
  clearAccessToken,
} from "../services/apiService";
import { refreshToken } from "../services/authService";

export function AuthProvider({ children }) {
  const initialized = useRef(false);

  const [token, setTokenState] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const setToken = (newToken) => {
    setAccessToken(newToken);
    setTokenState(newToken);
  };

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const initializeAuth = async () => {
      try {
        const response = await refreshToken();

        const newToken = response.data.token;

        setToken(newToken);
      } catch {
        clearAccessToken();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const userQuery = useUserQuery(token);

  return (
    <AuthContext.Provider
      value={{
        ...userQuery,
        token,
        setToken,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}