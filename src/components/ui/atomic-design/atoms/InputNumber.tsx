import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input as ShadcnInput } from "../shadcn/input";

export interface InputNumberProps
  extends Omit<React.ComponentProps<typeof ShadcnInput>, "type" | "size"> {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
  allowNegative?: boolean;
  decimalPlaces?: number;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error,
      success,
      min,
      max,
      step = 1,
      showControls = true,
      allowNegative = true,
      decimalPlaces,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");

    const baseClasses =
      "transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0";

    const variantClasses = {
      default:
        "border-border-primary bg-background-primary text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:ring-primary-500/20",
      filled:
        "border-0 bg-background-secondary text-text-primary placeholder:text-text-tertiary focus:bg-background-primary focus:ring-primary-500/20",
      outlined:
        "border-2 border-border-primary bg-transparent text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:ring-primary-500/20",
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Permitir solo números, punto decimal y signo negativo
      if (!allowNegative) {
        value = value.replace(/[^0-9.]/g, "");
      } else {
        value = value.replace(/[^0-9.-]/g, "");
      }

      // Validar formato de número
      const numberRegex = allowNegative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
      if (!numberRegex.test(value)) return;

      // Limitar decimales si se especifica
      if (decimalPlaces !== undefined) {
        const parts = value.split(".");
        if (parts[1] && parts[1].length > decimalPlaces) {
          value = `${parts[0]}.${parts[1].slice(0, decimalPlaces)}`;
        }
      }

      setInputValue(value);
      onChange?.(e);
    };

    const handleIncrement = () => {
      const currentValue = parseFloat(inputValue as string) || 0;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        const formattedValue =
          decimalPlaces !== undefined
            ? newValue.toFixed(decimalPlaces)
            : newValue.toString();
        setInputValue(formattedValue);
        onChange?.({
          target: { value: formattedValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleDecrement = () => {
      const currentValue = parseFloat(inputValue as string) || 0;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        const formattedValue =
          decimalPlaces !== undefined
            ? newValue.toFixed(decimalPlaces)
            : newValue.toString();
        setInputValue(formattedValue);
        onChange?.({
          target: { value: formattedValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className="relative">
        <ShadcnInput
          type="text"
          inputMode="decimal"
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            error && stateClasses.error,
            success && stateClasses.success,
            showControls && "pr-12",
            className
          )}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          {...props}
        />

        {showControls && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              className="h-4 w-4 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
              disabled={
                max !== undefined &&
                (parseFloat(inputValue as string) || 0) >= max
              }
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="h-4 w-4 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
              disabled={
                min !== undefined &&
                (parseFloat(inputValue as string) || 0) <= min
              }
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

export default InputNumber;
