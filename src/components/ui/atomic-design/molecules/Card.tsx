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
  cardHeaderExtraClassname?: string;
  cardContentExtraClassname?: string;
  cardFooterExtraClassname?: string;
}

const CardContainer: React.FC<CardProps> = ({
  title,
  description,
  children,
  footer,
  className,
  cardHeaderExtraClassname,
  cardContentExtraClassname,
  cardFooterExtraClassname,
}) => {
  return (
    <Card className={cn("bg-white rounded-lg shadow-md", className)}>
      <CardHeader className={cn(cardHeaderExtraClassname)}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn(cardContentExtraClassname)}>
        {children}
      </CardContent>
      <CardFooter className={cn(cardFooterExtraClassname)}>{footer}</CardFooter>
    </Card>
  );
};

export { CardContainer };
