import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

export interface ButtonFieldProps extends React.ComponentProps<typeof Button> {
  label?: string;
  labelVariant?: "default" | "required" | "optional";
  labelSize?: "sm" | "md" | "lg";
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
  labelPosition?: "top" | "left" | "bottom";
}

const ButtonField = forwardRef<HTMLButtonElement, ButtonFieldProps>(
  (
    {
      label,
      labelVariant = "default",
      labelSize = "md",
      helperText,
      errorMessage,
      successMessage,
      className,
      labelClassName,
      buttonClassName,
      labelPosition = "top",
      error,
      success,
      ...props
    },
    ref
  ) => {
    const hasError = !!errorMessage || error;
    const hasSuccess = !!successMessage || success;

    const renderContent = () => {
      const buttonElement = (
        <Button
          ref={ref}
          error={hasError}
          success={hasSuccess}
          className={buttonClassName}
          {...props}
        />
      );

      const labelElement = label && (
        <Label
          variant={labelVariant}
          size={labelSize}
          error={hasError}
          success={hasSuccess}
          className={labelClassName}
        >
          {label}
        </Label>
      );

      const messageElement = (helperText || errorMessage || successMessage) && (
        <div className="space-y-1">
          {helperText && !hasError && !hasSuccess && (
            <p className="text-sm text-text-tertiary">{helperText}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-error">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-success">{successMessage}</p>
          )}
        </div>
      );

      switch (labelPosition) {
        case "left":
          return (
            <div className="flex items-center gap-4">
              {labelElement}
              <div className="flex-1">
                {buttonElement}
                {messageElement}
              </div>
            </div>
          );
        case "bottom":
          return (
            <div className="space-y-2">
              {buttonElement}
              {labelElement}
              {messageElement}
            </div>
          );
        default: // top
          return (
            <div className="space-y-2">
              {labelElement}
              {buttonElement}
              {messageElement}
            </div>
          );
      }
    };

    return (
      <div className={cn("space-y-2", className)}>
        {renderContent()}
      </div>
    );
  }
);

ButtonField.displayName = "ButtonField";

export default ButtonField;
