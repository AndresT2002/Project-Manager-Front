import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import DatePicker from "../atoms/DatePicker";
import Label from "../atoms/Label";

export interface DatePickerFieldProps
  extends React.ComponentProps<typeof DatePicker> {
  label?: string;
  labelVariant?: "default" | "required" | "optional";
  labelSize?: "sm" | "md" | "lg";
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(
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
      inputClassName,
      error,
      success,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `datepicker-${generatedId}`;
    const hasError = !!errorMessage || error;
    const hasSuccess = !!successMessage || success;

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label
            htmlFor={inputId}
            variant={labelVariant}
            size={labelSize}
            error={hasError}
            success={hasSuccess}
            className={labelClassName}
          >
            {label}
          </Label>
        )}

        <DatePicker
          ref={ref}
          id={inputId}
          error={hasError}
          success={hasSuccess}
          className={inputClassName}
          {...props}
        />

        {(helperText || errorMessage || successMessage) && (
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
        )}
      </div>
    );
  }
);

DatePickerField.displayName = "DatePickerField";

export default DatePickerField;
