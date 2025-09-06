"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/ui/sidebar";
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

  const handleSidebarExpandedChange = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar onExpandedChange={handleSidebarExpandedChange} />
      <main
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isSidebarExpanded ? "ml-64" : "ml-16",
          className
        )}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export { DashboardLayout };
