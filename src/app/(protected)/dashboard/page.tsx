"use client";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";
import { CardDescription } from "@/components/pages/dashboard/CardDescription";
import { Skeleton } from "@/components/ui/atomic-design/shadcn/skeleton";

interface StatusCounts {
  open: number;
  finished: number;
  cancelled: number;
}
const DashboardPage = () => {
  const { user } = useAuth();

  const { data, error, loading, fetchData } = useFetch<StatusCounts>();

  useEffect(() => {
    fetchData("project/status-counts");
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Mostrar skeletons mientras carga
          <>
            <CardDescription title="" description="" isLoading={true} />
            <CardDescription title="" description="" isLoading={true} />
            <CardDescription title="" description="" isLoading={true} />
          </>
        ) : (
          // Mostrar datos cuando estén disponibles
          data &&
          Object.entries(data).map(([key, value]) => (
            <CardDescription
              key={key}
              title={"Projects " + key}
              description={value.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
