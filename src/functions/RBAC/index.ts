import { ROLE_ROUTES } from "@/constants/RBAC";

import { Role } from "@/types/enums";
import { RouteConfig } from "@/types/route-config";

export function getRouteConfig(pathname: string): RouteConfig | null {
  // Buscar coincidencia exacta primero
  const exactMatch = ROLE_ROUTES.find((route) => route.path === pathname);
  if (exactMatch) return exactMatch;

  // Buscar coincidencia con prefijo (útil para rutas dinámicas)
  const prefixMatch = ROLE_ROUTES.find((route) =>
    pathname.startsWith(route.path)
  );
  return prefixMatch || null;
}

export function hasRequiredRole(
  userRole: string | undefined,
  requiredRoles: Role[]
): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole as Role);
}
