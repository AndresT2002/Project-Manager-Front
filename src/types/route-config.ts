import { Role, Pages } from "./enums";

export interface RouteConfig {
  path: Pages;
  requiredRoles: Role[];
  title: string;
  description?: string;
}
