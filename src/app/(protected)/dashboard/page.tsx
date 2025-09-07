"use client";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { useEffect } from "react";
import { CardDescription } from "@/components/pages/dashboard/CardDescription";
import { Skeleton } from "@/components/ui/atomic-design/shadcn/skeleton";
import { Text } from "@/components/ui/atomic-design/typography/Text";
import { Title } from "@/components/ui/atomic-design/typography/Title";
import AnimatedContent from "@/components/animated/AnimatedContent";
import FadeContent from "@/components/animated/FadeContent";

interface StatusCounts {
  open: number;
  finished: number;
  cancelled: number;
}

// Datos mock para las cards inferiores mientras no tengamos endpoints
const mockProjectProgress = [
  { name: "Project A", progress: 75 },
  { name: "Project B", progress: 45 },
  { name: "Project C", progress: 90 },
  { name: "Project D", progress: 30 },
  { name: "Project E", progress: 60 },
];

const mockUpcomingDeadlines = [
  { project: "Project A", task: "Design Mockups", date: "July 15, 2024" },
  { project: "Project C", task: "User Testing", date: "July 20, 2024" },
  { project: "Project E", task: "Bug Fixing", date: "July 25, 2024" },
];
const DashboardPage = () => {
  const { user } = useAuth();

  const { data, error, loading, fetchData } = useFetch<StatusCounts>();

  useEffect(() => {
    fetchData("project/status-counts");
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col">
        <Title title="Dashboard" className="text-left" />
        <Text
          className="text-gray-600 text-lg"
          text={`Welcome back, ${user?.name}!`}
        />
      </div>

      {/* Top row - 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            <CardDescription title="" description="" isLoading={true} />
            <CardDescription title="" description="" isLoading={true} />
            <CardDescription title="" description="" isLoading={true} />
          </>
        ) : (
          <>
            <FadeContent duration={2000} easing="ease-out" initialOpacity={0.2}>
              <CardDescription
                title="Projects in Progress"
                description={data?.open?.toString() || "7"}
              />
            </FadeContent>

            <FadeContent duration={2000} easing="ease-out" initialOpacity={0.2}>
              <CardDescription
                title="Tasks Completed"
                description={data?.finished?.toString() || "125"}
              />
            </FadeContent>

            <FadeContent duration={2000} easing="ease-out" initialOpacity={0.2}>
              <CardDescription
                title="Upcoming Deadlines"
                description={data?.cancelled?.toString() || "3"}
              />
            </FadeContent>
          </>
        )}
        {error && (
          <Text className="text-red-500" text={"Error fetching data"} />
        )}
      </div>

      {/* Bottom row - Project Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Progress
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </div>
          ) : (
            <div className="space-y-4">
              {mockProjectProgress.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{project.name}</span>
                    <span className="text-gray-900 font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines Card - Ocupa 1 columna */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Deadlines
          </h3>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full bg-gray-200 rounded" />
              <Skeleton className="h-16 w-full bg-gray-200 rounded" />
              <Skeleton className="h-16 w-full bg-gray-200 rounded" />
            </div>
          ) : (
            <div className="space-y-3">
              {mockUpcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {deadline.project} - {deadline.task}
                    </p>
                    <p className="text-sm text-gray-500">{deadline.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
