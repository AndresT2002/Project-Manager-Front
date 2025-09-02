import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input as ShadcnInput } from "../shadcn/input";

export interface InputProps
  extends Omit<React.ComponentProps<typeof ShadcnInput>, "size"> {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "default", size = "md", error, success, ...props },
    ref
  ) => {
    const baseClasses =
      "transition-all duration-20 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-2 focus:border-blue-500";

    const variantClasses = {
      default:
        "border-border-primary bg-background-primary text-text-primary placeholder:text-text-tertiary",
      filled:
        "border-0 bg-background-secondary text-text-primary placeholder:text-text-tertiary focus:bg-background-primary",
      outlined:
        "border-2 border-border-primary bg-transparent text-text-primary placeholder:text-text-tertiary",
    };

    const sizeClasses = {
      sm: "h-8 px-3 text-sm rounded-md",
      md: "h-10 px-4 text-base rounded-lg",
      lg: "h-12 px-4 text-lg rounded-xl",
    };

    const stateClasses = {
      error: "border-error focus:border-error focus:ring-error/20",
      success: "border-success focus:border-success focus:ring-success/20",
    };

    return (
      <ShadcnInput
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          error && stateClasses.error,
          success && stateClasses.success,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
