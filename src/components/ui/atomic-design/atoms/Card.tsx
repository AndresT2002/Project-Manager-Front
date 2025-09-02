import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/atomic-design/shadcn/card";
import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardContainer: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className,
}) => {
  return (
    <Card className={cn("bg-white rounded-lg shadow-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export { CardContainer };
