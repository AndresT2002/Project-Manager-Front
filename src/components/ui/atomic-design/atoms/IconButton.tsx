import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  loading?: boolean;
  size?: "sm" | "default" | "lg" | "xl";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  rounded?: boolean;
  tooltip?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      loading = false,
      size = "default",
      variant = "default",
      rounded = false,
      tooltip,
      disabled,
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
          baseStyles.width = "28px";
          baseStyles.height = "28px";
          baseStyles.fontSize = "12px";
          break;
        case "default":
          baseStyles.width = "36px";
          baseStyles.height = "36px";
          baseStyles.fontSize = "14px";
          break;
        case "lg":
          baseStyles.width = "44px";
          baseStyles.height = "44px";
          baseStyles.fontSize = "16px";
          break;
        case "xl":
          baseStyles.width = "52px";
          baseStyles.height = "52px";
          baseStyles.fontSize = "18px";
          break;
      }

      // Aplicar bordes redondeados
      if (rounded) {
        baseStyles.borderRadius = "50%";
      }

      return baseStyles;
    };

    // Mapear tamaños para iconos
    const getIconSize = (): React.CSSProperties => {
      const iconSizes = {
        sm: { height: "14px", width: "14px" },
        default: { height: "16px", width: "16px" },
        lg: { height: "20px", width: "20px" },
        xl: { height: "24px", width: "24px" },
      };
      return iconSizes[size];
    };

    return (
      <button
        ref={ref}
        style={getBaseStyles()}
        className={cn(className)}
        disabled={isDisabled}
        title={tooltip}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => !isDisabled && setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...props}
      >
        {loading ? (
          <Loader2
            style={{
              ...getIconSize(),
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <div style={getIconSize()}>{icon}</div>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
