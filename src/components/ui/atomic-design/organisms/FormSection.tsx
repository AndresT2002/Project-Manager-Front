import React from "react";
import { cn } from "@/lib/utils";

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  contentClassName,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3
              className={cn(
                "text-lg font-semibold text-text-primary",
                titleClassName
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={cn(
                "text-sm text-text-secondary",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div className={cn("space-y-4", contentClassName)}>{children}</div>
    </div>
  );
};

export default FormSection;
