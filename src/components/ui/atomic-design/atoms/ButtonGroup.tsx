import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outlined";
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = "horizontal",
  size = "default",
  variant = "default",
  className,
}) => {
  const baseClasses = "inline-flex";

  const orientationClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
  };

  const variantClasses = {
    default: "divide-x divide-border-primary",
    outlined: "border border-border-primary rounded-md divide-x divide-border-primary",
  };

  const sizeClasses = {
    sm: "rounded-md",
    default: "rounded-lg",
    lg: "rounded-xl",
  };

  // Aplicar estilos especiales a los botones hijos
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          // Remover bordes redondeados de los botones internos
          orientation === "horizontal" && index === 0 && "rounded-r-none",
          orientation === "horizontal" && index > 0 && index < React.Children.count(children) - 1 && "rounded-none",
          orientation === "horizontal" && index === React.Children.count(children) - 1 && "rounded-l-none",
          orientation === "vertical" && index === 0 && "rounded-b-none",
          orientation === "vertical" && index > 0 && index < React.Children.count(children) - 1 && "rounded-none",
          orientation === "vertical" && index === React.Children.count(children) - 1 && "rounded-t-none",
          // Remover bordes cuando hay divisores
          variant === "default" && orientation === "horizontal" && index > 0 && "border-l-0",
          variant === "default" && orientation === "vertical" && index > 0 && "border-t-0"
        ),
      });
    }
    return child;
  });

  return (
    <div
      className={cn(
        baseClasses,
        orientationClasses[orientation],
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {childrenWithProps}
    </div>
  );
};

export default ButtonGroup;
