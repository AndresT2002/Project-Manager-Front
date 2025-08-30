import { Role } from "@/types/enums";
import { RouteConfig } from "@/types/route-config";

export const ROLE_ROUTES: RouteConfig[] = [
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

export const EXCLUDED_ROLE_ROUTES = ["/login", "/register", "/components", "/"];
