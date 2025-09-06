import { Role, Pages } from "@/types/enums";
import { RouteConfig } from "@/types/route-config";

export const ROLE_ROUTES: RouteConfig[] = [
  {
    path: Pages.ADMIN,
    requiredRoles: [Role.ADMIN],
    title: "Panel de Administración",
    description: "Gestión avanzada del sistema",
  },
  {
    path: Pages.DASHBOARD,
    requiredRoles: [Role.USER, Role.ADMIN, Role.LEADER],
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

export const EXCLUDED_ROLE_ROUTES = [Pages.LOGIN, Pages.REGISTER, Pages.HOME];
