import React from "react";
import { cn } from "@/lib/utils";

export interface FormTemplateProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  footer?: React.ReactNode;
  footerClassName?: string;
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  title,
  subtitle,
  children,
  className,
  headerClassName,
  titleClassName,
  subtitleClassName,
  contentClassName,
  footer,
  footerClassName,
}) => {
  return (
    <div className={cn("max-w-2xl mx-auto space-y-8", className)}>
      {(title || subtitle) && (
        <div className={cn("text-center space-y-2", headerClassName)}>
          {title && (
            <h1
              className={cn(
                "text-2xl font-bold text-text-primary",
                titleClassName
              )}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className={cn("text-base text-text-secondary", subtitleClassName)}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={cn("space-y-6", contentClassName)}>{children}</div>

      {footer && (
        <div className={cn("flex justify-end space-x-4", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default FormTemplate;
