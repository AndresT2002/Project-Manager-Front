import { useState, useEffect, useRef } from "react";
import { useAuth } from "./useAuth";

export const useValidateSession = (redirectTo: string) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Controlar la verificación inicial
  useEffect(() => {
    // Si ya se completó la verificación inicial, no hacer nada
    if (initialCheckComplete) return;

    // Si terminó de cargar y está autenticado, redirigir inmediatamente
    if (!isLoading && isAuthenticated) {
      // Limpiar timeout si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      window.location.href = redirectTo;
      return;
    }

    // Si terminó de cargar (ya sea autenticado o no), marcar como completado
    if (!isLoading) {
      setInitialCheckComplete(true);
      return;
    }

    // Si está cargando por primera vez, configurar timeout de seguridad
    if (isLoading && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setInitialCheckComplete(true);
      }, 3000); // 3 segundos máximo
    }

    // Limpiar timeout si deja de cargar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isAuthenticated, isLoading, initialCheckComplete, redirectTo]);

  // Cleanup en desmontaje
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isSessionValidating: !initialCheckComplete,
  };
};
