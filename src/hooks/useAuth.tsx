"use client";

import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";

// Tipos
export interface User {
  id: string;
  email: string;
  name: string;
  fullName: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Átomos de Jotai para el estado global
export const authStateAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
});

export const authInitializedAtom = atom<boolean>(false);

// Hook principal de autenticación
export function useAuth() {
  const [authState, setAuthState] = useAtom(authStateAtom);
  const [isInitialized, setIsInitialized] = useAtom(authInitializedAtom);
  const router = useRouter();

  // Función para verificar el estado de autenticación
  const checkAuthStatus = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch("/api/auth/me", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Error al verificar la autenticación",
      });
    }
  }, [setAuthState]);

  // Función para iniciar sesión
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.error || "Error al iniciar sesión";

          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
          }));

          throw new Error(errorMessage);
        }

        // Login exitoso, verificar estado
        await checkAuthStatus();

        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [setAuthState, checkAuthStatus]
  );

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Independientemente del resultado, limpiamos el estado local
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Redirigir al login
      router.push("/");

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Aun si hay error, limpiamos el estado local
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      router.push("/");
      throw error;
    }
  }, [setAuthState, router]);

  // Función para refrescar el token
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // Token refrescado exitosamente, verificar estado
        await checkAuthStatus();
        return { success: true };
      } else {
        // Token de refresh inválido, cerrar sesión
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return { success: false };
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      return { success: false };
    }
  }, [checkAuthStatus, setAuthState]);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, [setAuthState]);

  // Inicializar autenticación al montar el componente
  useEffect(() => {
    if (!isInitialized) {
      checkAuthStatus();
      setIsInitialized(true);
    }
  }, [isInitialized, checkAuthStatus, setIsInitialized]);

  return {
    // Estado
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,

    // Acciones
    login,
    logout,
    refreshToken,
    checkAuthStatus,
    clearError,
  };
}

export default useAuth;
