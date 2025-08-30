"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Unathorized from "@/components/auth/Unathorized";
import { getRouteConfig } from "@/functions/RBAC";
import { usePathname } from "next/navigation";
import { Role } from "@/types/enums";
import { EXCLUDED_ROLE_ROUTES } from "@/constants/RBAC";

interface PrivateComponentProps {
  children: React.ReactNode;
  //   requiredRoles?: string[];
  fallback?: React.ReactNode;
}

const PrivateComponent: React.FC<PrivateComponentProps> = ({
  children,
  //   requiredRoles = [],
  fallback,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const pathname = usePathname();
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  const isExcludedRoleRoute = EXCLUDED_ROLE_ROUTES.includes(pathname);
  if (isExcludedRoleRoute) {
    return <>{children}</>;
  }

  // Controlar la verificación inicial para evitar mostrar contenido brevemente
  useEffect(() => {
    if (!initialCheckComplete && !isLoading) {
      setInitialCheckComplete(true);
    }
  }, [isLoading, initialCheckComplete]);

  // Mostrar loading mientras se verifica la autenticación inicial
  if (!initialCheckComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <div className="h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Cargando...
            </h3>
            <p className="text-sm text-text-secondary">Un momento por favor</p>
          </div>
        </div>
      </div>
    );
  }

  // Usuario no autenticado
  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <div className="h-6 w-6 text-red-600">⚠️</div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">
                Acceso denegado
              </h3>
              <p className="text-sm text-text-secondary">
                Debes iniciar sesión para acceder a esta página
              </p>
            </div>
          </div>
        </div>
      )
    );
  }

  const requiredRoles = getRouteConfig(pathname)?.requiredRoles;
  console.log(requiredRoles);
  // Verificar roles si se requieren
  if (requiredRoles && requiredRoles.length > 0 && user?.role) {
    const hasRequiredRole = requiredRoles.includes(user.role as Role);

    if (!hasRequiredRole) {
      return <Unathorized />;
    }
  }

  // Usuario autenticado y con permisos adecuados
  return <>{children}</>;
};

export { PrivateComponent };
