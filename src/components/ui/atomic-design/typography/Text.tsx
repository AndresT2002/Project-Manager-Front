import { cn } from "@/lib/utils";

const Text = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}>
      {text}
    </p>
  );
};

export { Text };
