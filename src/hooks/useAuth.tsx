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

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  lastName: string;
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
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Error verifying authentication",
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
          const errorMessage = errorData.error || "Error logging in";

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
        throw error;
      }
    },
    [setAuthState, checkAuthStatus]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.error || "Error registering user";
          throw new Error(errorMessage);
        }

        return { success: true };
      } catch (error) {
        throw error;
      }
    },
    [setAuthState]
  );

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Hacer la llamada al servidor en background
      fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      }).catch((error) => {});

      // Limpiar estado local inmediatamente para mejor UX
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Pequeño delay antes de redirigir para evitar conflictos de estado
      setTimeout(() => {
        router.push("/");
      }, 100);

      return { success: true };
    } catch (error) {
      // Aun si hay error, limpiamos el estado local
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      setTimeout(() => {
        router.push("/");
      }, 100);

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
    let mounted = true;

    if (!isInitialized && mounted) {
      checkAuthStatus().finally(() => {
        if (mounted) {
          setIsInitialized(true);
        }
      });
    }

    return () => {
      mounted = false;
    };
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
    register,
  };
}

export default useAuth;
