import { CardContainer } from "@/components/ui/atomic-design/molecules/Card";
import { Text } from "@/components/ui/atomic-design/typography/Text";
import { Title } from "@/components/ui/atomic-design/typography/Title";
import { Skeleton } from "@/components/ui/atomic-design/shadcn/skeleton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface CardDescriptionProps {
  title: string;
  description: string;
  isLoading?: boolean;
  containerClassName?: string;
}

const CardDescription = ({
  title,
  description,
  isLoading = false,
  containerClassName,
}: CardDescriptionProps) => {
  const { isMobileOrTablet } = useIsMobile();
  console.log(isMobileOrTablet);
  return (
    <div>
      <CardContainer
        className={cn(
          "border-solid border-3 border-gray-200 shadow-md ",
          containerClassName
        )}
        cardHeaderExtraClassname="p-1"
        cardFooterExtraClassname="p-1"
      >
        {isLoading ? (
          // Mostrar skeletons mientras carga
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4 bg-gray-200" />
            <Skeleton className="h-12 w-1/2 bg-gray-200" />
          </div>
        ) : (
          // Mostrar contenido real
          <div className="flex flex-col gap-2">
            <Text
              className={cn(
                "text-left text-gray-400 font-semibold text-2xl capitalize",
                isMobileOrTablet && "text-center"
              )}
              text={title}
            />
            <Title
              className={cn(
                "text-left text-5xl",
                isMobileOrTablet && "text-center"
              )}
              title={description}
            />
          </div>
        )}
      </CardContainer>
    </div>
  );
};

export { CardDescription };
