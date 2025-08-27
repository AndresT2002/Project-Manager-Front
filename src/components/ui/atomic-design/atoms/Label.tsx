import React from "react";
import { cn } from "@/lib/utils";
import { Label as ShadcnLabel } from "../shadcn/label";

export interface LabelProps extends React.ComponentProps<typeof ShadcnLabel> {
  variant?: "default" | "required" | "optional";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  LabelProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error,
      success,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "transition-colors duration-200";

    const variantClasses = {
      default: "text-text-primary",
      required:
        'text-text-primary after:content-["*"] after:ml-1 after:text-error',
      optional:
        'text-text-secondary after:content-["(opcional)"] after:ml-1 after:text-text-tertiary',
    };

    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    const stateClasses = {
      error: "text-error",
      success: "text-success",
    };

    return (
      <ShadcnLabel
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          error && stateClasses.error,
          success && stateClasses.success,
          className
        )}
        {...props}
      >
        {children}
      </ShadcnLabel>
    );
  }
);

Label.displayName = "Label";

export default Label;
