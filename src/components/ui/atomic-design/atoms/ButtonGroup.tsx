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
    outlined:
      "border border-border-primary rounded-md divide-x divide-border-primary",
  };

  const sizeClasses = {
    sm: "rounded-md",
    default: "rounded-lg",
    lg: "rounded-xl",
  };

  // Aplicar estilos especiales a los botones hijos
  const childrenWithProps = React.Children.map(children, (child, index) => {
    const childCount = React.Children.count(children);
    const isFirst = index === 0;
    const isLast = index === childCount - 1;
    const isMiddle = !isFirst && !isLast;

    if (React.isValidElement(child)) {
      // Usar un wrapper div en lugar de modificar directamente el elemento
      return (
        <div
          key={index}
          className={cn(
            // Estilos base del wrapper
            orientation === "horizontal" ? "inline-block" : "block",
            // Remover bordes redondeados de los botones internos
            orientation === "horizontal" && isFirst && "rounded-r-none",
            orientation === "horizontal" && isMiddle && "rounded-none",
            orientation === "horizontal" && isLast && "rounded-l-none",
            orientation === "vertical" && isFirst && "rounded-b-none",
            orientation === "vertical" && isMiddle && "rounded-none",
            orientation === "vertical" && isLast && "rounded-t-none",
            // Remover bordes cuando hay divisores
            variant === "default" &&
              orientation === "horizontal" &&
              !isFirst &&
              "border-l-0",
            variant === "default" &&
              orientation === "vertical" &&
              !isFirst &&
              "border-t-0"
          )}
        >
          {child}
        </div>
      );
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
