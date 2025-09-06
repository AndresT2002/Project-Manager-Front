"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Pages, Role } from "@/types/enums";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/atomic-design/shadcn/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LogOut } from "lucide-react";
import { Icon } from "@iconify/react";

interface AppSidebarProps {
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
}
const navigationItems = [
  {
    href: Pages.DASHBOARD,
    label: "Dashboard",
    icon: <Icon icon="mdi:view-dashboard" className="w-5 h-5" />,
    visibleRoles: [Role.USER, Role.ADMIN, Role.LEADER],
  },
  {
    href: Pages.PROJECTS,
    label: "Projects",
    icon: <Icon icon="mdi:folder" className="w-5 h-5" />,
    visibleRoles: [Role.USER, Role.ADMIN, Role.LEADER],
  },
  {
    href: Pages.ADMIN,
    label: "Admin",
    icon: <Icon icon="mdi:cog" className="w-5 h-5" />,
    visibleRoles: [Role.ADMIN],
  },
];
const AppSidebar: React.FC<AppSidebarProps> = ({
  className,
  onExpandedChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { isMobileOrTablet } = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  // Obtener inicial del nombre
  const getInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  // Función para hacer logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  // Manejar redirección después del logout
  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.push(Pages.LOGIN);
    }
  }, [isAuthenticated, user, router]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onExpandedChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onExpandedChange?.(false);
  };

  // Renderizar sidebar diferente según dispositivo
  if (isMobileOrTablet) {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-2",
          className
        )}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const hasRequiredRole = item.visibleRoles.includes(
              user?.role as Role
            );

            if (hasRequiredRole) {
              return (
                <Link key={item.href} href={item.href} className="relative">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
                    {/* Ícono con círculo de fondo cuando está activo */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
                        isActive
                          ? "bg-primary-900 text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      {item.icon}
                    </div>

                    {/* Label (opcional, muy pequeño) */}
                    <span
                      className={cn(
                        "text-xs transition-colors duration-200 mt-1",
                        isActive
                          ? "text-primary-900 font-medium"
                          : "text-gray-500"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // Sidebar para desktop
  return (
    <Sidebar
      variant={isHovered ? "expanded" : "collapsed"}
      className={cn("fixed left-0 top-0 z-50 h-full shadow-lg", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <Image
            src="/logos/orbitly-sliced.png"
            alt="Orbitly Logo"
            width={isHovered ? 160 : 50}
            height={isHovered ? 64 : 50}
            className={cn(
              "transition-all duration-300 object-contain",
              isHovered ? "w-40 h-32" : "w-12 h-12"
            )}
            priority
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const hasRequiredRole = item.visibleRoles.includes(
              user?.role as Role
            );
            if (hasRequiredRole) {
              return (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="block">
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "justify-start transition-all duration-300",
                        !isHovered && "justify-center px-0"
                      )}
                    >
                      <div className="flex-shrink-0">{item.icon}</div>
                      {isHovered && (
                        <span className="ml-3 transition-opacity duration-300">
                          {item.label}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            }
            return null;
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {isHovered ? (
          // Estado expandido
          <div className="flex items-center gap-3 px-3 py-4">
            {/* Avatar con inicial */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitial(user?.name || "")}
              </div>
            </div>

            {/* Información del usuario */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            {/* Botón de logout */}
            <button
              onClick={handleLogout}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>
        ) : (
          // Estado contraído - Solo avatar y logout centrados
          <div className="flex flex-col items-center gap-2 py-4">
            {/* Avatar más pequeño */}
            <div className="w-6 h-6 bg-primary-900 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              {getInitial(user?.name || "")}
            </div>

            {/* Botón de logout más compacto */}
            {/* <button
              onClick={handleLogout}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 group"
              title="Cerrar sesión"
            >
              <LogOut className="w-3 h-3 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
            </button> */}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export { AppSidebar };
