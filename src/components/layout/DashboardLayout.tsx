"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/ui/atomic-design/organisms/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { isMobileOrTablet } = useIsMobile();

  const handleSidebarExpandedChange = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar onExpandedChange={handleSidebarExpandedChange} />
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          // Solo aplicar margen lateral en desktop
          !isMobileOrTablet && (isSidebarExpanded ? "ml-64" : "ml-16"),
          // Aplicar padding bottom en mobile/tablet para la barra inferior
          isMobileOrTablet && "pb-20", // Espacio para la barra de navegación inferior
          className
        )}
      >
        <div
          className={cn(
            "p-8",
            // Ajustar padding en mobile/tablet
            isMobileOrTablet && "pb-4"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export { DashboardLayout };
