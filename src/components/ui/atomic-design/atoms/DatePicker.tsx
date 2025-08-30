import React, { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Input as ShadcnInput } from "../shadcn/input";

export interface DatePickerProps
  extends Omit<
    React.ComponentProps<typeof ShadcnInput>,
    "type" | "value" | "onChange" | "size"
  > {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  showClearButton?: boolean;
  disabled?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      error,
      success,
      value,
      onChange,
      placeholder = "Seleccionar fecha",
      format = "dd/MM/yyyy",
      minDate,
      maxDate,
      showClearButton = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(
      value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
    );
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || null
    );
    const [inputValue, setInputValue] = useState("");
    const calendarRef = useRef<HTMLDivElement>(null);

    const baseClasses =
      "transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer";

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

    // Formatear fecha para mostrar en el input
    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return format
        .replace("dd", day)
        .replace("MM", month)
        .replace("yyyy", year.toString());
    };

    // Generar días del mes
    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();

      const days = [];

      // Días del mes anterior
      for (let i = 0; i < startingDay; i++) {
        const prevDate = new Date(year, month, -startingDay + i + 1);
        days.push({ date: prevDate, isCurrentMonth: false });
      }

      // Días del mes actual
      for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        days.push({ date: currentDate, isCurrentMonth: true });
      }

      // Días del mes siguiente
      const remainingDays = 42 - days.length; // 6 semanas * 7 días
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        days.push({ date: nextDate, isCurrentMonth: false });
      }

      return days;
    };

    // Verificar si una fecha está deshabilitada
    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    // Verificar si una fecha está seleccionada
    const isDateSelected = (date: Date): boolean => {
      if (!selectedDate) return false;
      return date.toDateString() === selectedDate.toDateString();
    };

    // Verificar si una fecha es hoy
    const isToday = (date: Date): boolean => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) return;

      setSelectedDate(date);
      setInputValue(formatDate(date));
      onChange?.(date);
      setIsOpen(false);
    };

    const handleClear = () => {
      setSelectedDate(null);
      setInputValue("");
      onChange?.(null);
    };

    const handlePreviousMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const handleNextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    // Cerrar calendario al hacer clic fuera
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Actualizar valor cuando cambia la prop
    useEffect(() => {
      setSelectedDate(value || null);
      setInputValue(value ? formatDate(value) : "");
    }, [value, format]);

    const days = getDaysInMonth(currentMonth);
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return (
      <div className="relative" ref={calendarRef}>
        <div className="relative">
          <ShadcnInput
            type="text"
            className={cn(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              error && stateClasses.error,
              success && stateClasses.success,
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            ref={ref}
            value={inputValue}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            {...props}
          />

          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none" />

          {showClearButton && selectedDate && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              zIndex: 50,
              minWidth: "280px",
              padding: "12px",
            }}
          >
            {/* Header del calendario */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <button
                type="button"
                onClick={handlePreviousMonth}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <ChevronLeft
                  style={{ height: "16px", width: "16px", color: "#6b7280" }}
                />
              </button>

              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  fontSize: "14px",
                }}
              >
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>

              <button
                type="button"
                onClick={handleNextMonth}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <ChevronRight
                  style={{ height: "16px", width: "16px", color: "#6b7280" }}
                />
              </button>
            </div>

            {/* Días de la semana */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div
                  key={day}
                  style={{
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "4px",
              }}
            >
              {days.map(({ date, isCurrentMonth }, index) => {
                const isSelected = isDateSelected(date);
                const isTodayDate = isToday(date);
                const isDisabled = isDateDisabled(date);

                const buttonStyle: React.CSSProperties = {
                  height: "32px",
                  width: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  backgroundColor: "transparent",
                };

                // Aplicar estilos según el estado
                if (isSelected) {
                  buttonStyle.backgroundColor = "#2563eb";
                  buttonStyle.color = "#ffffff";
                } else if (isTodayDate) {
                  buttonStyle.backgroundColor = "#dbeafe";
                  buttonStyle.color = "#1d4ed8";
                } else if (isCurrentMonth) {
                  buttonStyle.color = "#111827";
                } else {
                  buttonStyle.color = "#9ca3af";
                }

                if (isDisabled) {
                  buttonStyle.opacity = "0.3";
                  buttonStyle.cursor = "not-allowed";
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    disabled={isDisabled}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.backgroundColor = isTodayDate
                          ? "#bfdbfe"
                          : "#f3f4f6";
                        e.currentTarget.style.color = isTodayDate
                          ? "#1d4ed8"
                          : "#2563eb";
                      } else if (isSelected) {
                        e.currentTarget.style.backgroundColor = "#1d4ed8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDisabled) {
                        if (isSelected) {
                          e.currentTarget.style.backgroundColor = "#2563eb";
                          e.currentTarget.style.color = "#ffffff";
                        } else if (isTodayDate) {
                          e.currentTarget.style.backgroundColor = "#dbeafe";
                          e.currentTarget.style.color = "#1d4ed8";
                        } else {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = isCurrentMonth
                            ? "#111827"
                            : "#9ca3af";
                        }
                      }
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
