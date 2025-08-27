import React, { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input as ShadcnInput } from "../shadcn/input";

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  showCharacterCount?: boolean;
  maxLength?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error,
      success,
      autoResize = true,
      minRows = 3,
      maxRows = 10,
      showCharacterCount = false,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [characterCount, setCharacterCount] = useState(0);

    const baseClasses =
      "transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none";

    const variantClasses = {
      default:
        "border-border-primary bg-background-primary text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:ring-primary-500/20",
      filled:
        "border-0 bg-background-secondary text-text-primary placeholder:text-text-tertiary focus:bg-background-primary focus:ring-primary-500/20",
      outlined:
        "border-2 border-border-primary bg-transparent text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:ring-primary-500/20",
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm rounded-md",
      md: "px-4 py-3 text-base rounded-lg",
      lg: "px-4 py-4 text-lg rounded-xl",
    };

    const stateClasses = {
      error: "border-error focus:border-error focus:ring-error/20",
      success: "border-success focus:border-success focus:ring-success/20",
    };

    // Función para calcular altura automática
    const adjustHeight = (element: HTMLTextAreaElement) => {
      if (!autoResize) return;

      element.style.height = "auto";
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;

      const scrollHeight = element.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

      element.style.height = `${newHeight}px`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setCharacterCount(newValue.length);

      if (autoResize) {
        adjustHeight(e.target);
      }

      onChange?.(e);
    };

    // Ajustar altura cuando cambia el valor
    useEffect(() => {
      if (autoResize && ref && typeof ref !== "function") {
        const element = ref.current;
        if (element) {
          adjustHeight(element);
        }
      }
    }, [inputValue, autoResize, ref]);

    // Actualizar valor cuando cambia la prop
    useEffect(() => {
      setInputValue(value || "");
      setCharacterCount((value as string)?.length || 0);
    }, [value]);

    return (
      <div className="relative">
        <textarea
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            error && stateClasses.error,
            success && stateClasses.success,
            className
          )}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          maxLength={maxLength}
          rows={minRows}
          {...props}
        />

        {showCharacterCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-text-tertiary">
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
