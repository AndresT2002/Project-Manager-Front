import { CardContainer } from "@/components/ui/atomic-design/molecules/Card";
import { Text } from "@/components/ui/atomic-design/typography/Text";
import { Title } from "@/components/ui/atomic-design/typography/Title";
import { Skeleton } from "@/components/ui/atomic-design/shadcn/skeleton";

interface CardDescriptionProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

const CardDescription = ({
  title,
  description,
  isLoading = false,
}: CardDescriptionProps) => {
  return (
    <div>
      <CardContainer className="border-solid border-3 border-gray-200 shadow-md p-6">
        {isLoading ? (
          // Mostrar skeletons mientras carga
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-12 w-1/2 bg-gray-200" />
          </div>
        ) : (
          // Mostrar contenido real
          <>
            <Text
              className="text-left text-gray-400 font-semibold text-xl capitalize"
              text={title}
            />
            <Title className="text-left text-5xl" title={description} />
          </>
        )}
      </CardContainer>
    </div>
  );
};

export { CardDescription };
