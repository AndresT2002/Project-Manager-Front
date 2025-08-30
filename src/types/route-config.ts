import { Role } from "./enums";

export interface RouteConfig {
  path: string;
  requiredRoles: Role[];
  title: string;
  description?: string;
}

export const ROUTE_CONFIG: RouteConfig[] = [
  {
    path: "/admin",
    requiredRoles: [Role.ADMIN],
    title: "Panel de Administración",
    description: "Gestión avanzada del sistema",
  },
  {
    path: "/dashboard",
    requiredRoles: [Role.USER, Role.ADMIN],
    title: "Dashboard",
    description: "Panel principal de usuario",
  },
  // Agregar más rutas aquí según sea necesario
  // {
  //   path: "/moderator",
  //   requiredRoles: [Role.ADMIN, Role.MODERATOR],
  //   title: "Panel de Moderador",
  //   description: "Herramientas de moderación",
  // },
];

export function getRouteConfig(pathname: string): RouteConfig | null {
  // Buscar coincidencia exacta primero
  const exactMatch = ROUTE_CONFIG.find((route) => route.path === pathname);
  if (exactMatch) return exactMatch;

  // Buscar coincidencia con prefijo (útil para rutas dinámicas)
  const prefixMatch = ROUTE_CONFIG.find((route) =>
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
