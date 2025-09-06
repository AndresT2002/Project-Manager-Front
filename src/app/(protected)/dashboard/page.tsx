"use client";
import { useAuth } from "@/hooks/useAuth";
import { CardContainer } from "@/components/ui/atomic-design/atoms/Card";

const DashboardPage = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardContainer className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Statistics
          </h3>
          <p className="text-gray-600">General information about the system</p>
        </CardContainer>

        <CardContainer className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
          <p className="text-gray-600">Manage your active projects</p>
        </CardContainer>

        <CardContainer className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2"> Team</h3>
          <p className="text-gray-600">Manage team members</p>
        </CardContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
