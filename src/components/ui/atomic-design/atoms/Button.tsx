import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button as ShadcnButton, buttonVariants } from "../shadcn/button";

export interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const isDisabled = disabled || loading;

    // Definir estilos base según la variante
    const getBaseStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        whiteSpace: "nowrap",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease-in-out",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        outline: "none",
        border: "none",
      };

      // Aplicar estilos según la variante
      switch (variant) {
        case "default":
          baseStyles.backgroundColor = isHovered ? "#1d4ed8" : "#2563eb";
          baseStyles.color = "#ffffff";
          baseStyles.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          break;
        case "destructive":
          baseStyles.backgroundColor = isHovered ? "#dc2626" : "#ef4444";
          baseStyles.color = "#ffffff";
          baseStyles.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          break;
        case "outline":
          baseStyles.backgroundColor = isHovered ? "#f3f4f6" : "transparent";
          baseStyles.color = "#111827";
          baseStyles.border = "1px solid #e5e7eb";
          break;
        case "secondary":
          baseStyles.backgroundColor = isHovered ? "#16a34a" : "#22c55e";
          baseStyles.color = "#ffffff";
          baseStyles.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          break;
        case "ghost":
          baseStyles.backgroundColor = isHovered ? "#f3f4f6" : "transparent";
          baseStyles.color = "#111827";
          break;
        case "link":
          baseStyles.backgroundColor = "transparent";
          baseStyles.color = "#2563eb";
          baseStyles.textDecoration = isHovered ? "underline" : "none";
          baseStyles.textUnderlineOffset = "4px";
          break;
      }

      // Aplicar estilos según el tamaño
      switch (size) {
        case "sm":
          baseStyles.height = "32px";
          baseStyles.padding = "0 12px";
          baseStyles.fontSize = "12px";
          break;
        case "default":
          baseStyles.height = "36px";
          baseStyles.padding = "0 16px";
          baseStyles.fontSize = "14px";
          break;
        case "lg":
          baseStyles.height = "40px";
          baseStyles.padding = "0 24px";
          baseStyles.fontSize = "16px";
          break;
        case "icon":
          baseStyles.width = "36px";
          baseStyles.height = "36px";
          baseStyles.padding = "0";
          break;
      }

      // Aplicar ancho completo
      if (fullWidth) {
        baseStyles.width = "100%";
      }

      // Aplicar bordes redondeados
      if (rounded) {
        switch (size) {
          case "sm":
            baseStyles.borderRadius = "6px";
            break;
          case "default":
            baseStyles.borderRadius = "8px";
            break;
          case "lg":
            baseStyles.borderRadius = "12px";
            break;
          case "icon":
            baseStyles.borderRadius = "50%";
            break;
        }
      }

      return baseStyles;
    };

    return (
      <button
        ref={ref}
        style={getBaseStyles()}
        className={cn(className)}
        disabled={isDisabled}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => !isDisabled && setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...props}
      >
        {loading ? (
          <>
            <Loader2
              style={{
                height: "16px",
                width: "16px",
                animation: "spin 1s linear infinite",
              }}
            />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && (
              <span style={{ display: "flex", alignItems: "center" }}>
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span style={{ display: "flex", alignItems: "center" }}>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
