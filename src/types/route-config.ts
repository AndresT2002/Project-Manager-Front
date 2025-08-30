import { Role } from "./enums";

export interface RouteConfig {
  path: string;
  requiredRoles: Role[];
  title: string;
  description?: string;
}
