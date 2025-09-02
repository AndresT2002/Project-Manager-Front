import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import { FormikErrors } from "formik";

export interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string;
  labelVariant?: "default" | "required" | "optional";
  labelSize?: "sm" | "md" | "lg";
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errors?: FormikErrors<string | undefined>;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
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
      errors,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
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

        <Input
          ref={ref}
          id={inputId}
          error={hasError}
          success={hasSuccess}
          className={cn("h-12", inputClassName)}
          {...props}
        />

        {(helperText || errorMessage || successMessage) && (
          <div className="space-y-1">
            {helperText && !hasError && !hasSuccess && (
              <p className="text-sm text-text-tertiary">{helperText}</p>
            )}
            {typeof errors === "string" && (
              <p className="text-sm text-error">{errors}</p>
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

InputField.displayName = "InputField";

export default InputField;
