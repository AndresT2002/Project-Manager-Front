import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useValidateSession = (redirectTo: string) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  // Controlar la verificación inicial
  useEffect(() => {
    // Si ya se completó la verificación inicial, no hacer nada
    if (initialCheckComplete) return;

    // Si terminó de cargar y está autenticado, redirigir inmediatamente
    if (!isLoading && isAuthenticated) {
      window.location.href = redirectTo;
      return;
    }

    // Si terminó de cargar (ya sea autenticado o no), marcar como completado
    if (!isLoading) {
      setInitialCheckComplete(true);
    }
  }, [isAuthenticated, isLoading, initialCheckComplete, redirectTo]);

  return {
    isSessionValidating: !initialCheckComplete,
  };
};
