import { cn } from "@/lib/utils";

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {title}
    </h1>
  );
};

export { Title };
