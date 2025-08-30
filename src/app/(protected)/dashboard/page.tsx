"use client";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Dashboard {user?.name}</h1>
    </div>
  );
};

export default DashboardPage;
