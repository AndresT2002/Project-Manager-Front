"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  InputField,
  Button,
  ButtonField,
  FormSection,
  FormTemplate,
} from "@/components/ui/atomic-design";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

// Esquema de validación con Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio")
    .max(100, "El correo electrónico es demasiado largo"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    // .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña es demasiado larga"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          // Usuario ya está autenticado, redirigir al dashboard
          console.log("Usuario ya autenticado, redirigiendo...");
          router.push("/dashboard");
          return;
        }
      } catch (error) {
        console.log("Usuario no autenticado, mostrando login");
        // Usuario no está autenticado, continuar mostrando el login
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleSubmit = async (
    values: LoginFormValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: Record<string, string>) => void;
    }
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Manejar errores específicos del servidor
        if (errorData.error?.includes("email")) {
          setErrors({ email: errorData.error });
        } else if (
          errorData.error?.includes("contraseña") ||
          errorData.error?.includes("password")
        ) {
          setErrors({ password: errorData.error });
        } else {
          setError(errorData.error || "Error al iniciar sesión");
        }
        return;
      }

      // Login exitoso
      router.push("/dashboard"); // Cambiar según tu ruta de dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <Shield className="h-6 w-6 text-primary-600 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Verificando sesión...
            </h3>
            <p className="text-sm text-text-secondary">Un momento por favor</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-200 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-200 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-primary-300 animate-pulse">
        <Sparkles className="h-8 w-8" />
      </div>
      <div className="absolute top-20 right-16 text-secondary-300 animate-pulse delay-1000">
        <Zap className="h-6 w-6" />
      </div>
      <div className="absolute bottom-20 left-16 text-accent-300 animate-pulse delay-2000">
        <Shield className="h-7 w-7" />
      </div>

      <FormTemplate
        title="Bienvenido de vuelta"
        subtitle="Accede a tu cuenta para continuar gestionando tus proyectos"
        className="relative z-10"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            errors,
            values,
          }: {
            isSubmitting: boolean;
            errors: Record<string, string>;
            values: LoginFormValues;
          }) => (
            <Form className="space-y-6">
              <FormSection
                title="Credenciales de acceso"
                description="Ingresa tu email y contraseña para continuar"
              >
                <div className="space-y-4">
                  {/* Email Field */}
                  <Field name="email">
                    {({
                      field,
                      meta,
                    }: {
                      field: any;
                      meta: { touched: boolean; error: string; value: string };
                    }) => (
                      <InputField
                        {...field}
                        label="Correo electrónico"
                        labelVariant="required"
                        type="email"
                        placeholder="tu@email.com"
                        leftIcon={
                          <Mail className="h-4 w-4 text-text-tertiary" />
                        }
                        errorMessage={
                          meta.touched && meta.error ? meta.error : ""
                        }
                        helperText={
                          !meta.error && (!meta.touched || meta.value)
                            ? "Ingresa tu correo electrónico registrado"
                            : ""
                        }
                        disabled={isLoading || isSubmitting}
                        success={meta.touched && !meta.error && meta.value}
                      />
                    )}
                  </Field>

                  {/* Password Field */}
                  <div className="relative">
                    <Field name="password">
                      {({
                        field,
                        meta,
                      }: {
                        field: any;
                        meta: {
                          touched: boolean;
                          error: string;
                          value: string;
                        };
                      }) => (
                        <InputField
                          {...field}
                          label="Contraseña"
                          labelVariant="required"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          leftIcon={
                            <Lock className="h-4 w-4 text-text-tertiary" />
                          }
                          errorMessage={
                            meta.touched && meta.error ? meta.error : ""
                          }
                          helperText={
                            !meta.error && (!meta.touched || meta.value)
                              ? "Mínimo 8 caracteres"
                              : ""
                          }
                          disabled={isLoading || isSubmitting}
                          success={meta.touched && !meta.error && meta.value}
                        />
                      )}
                    </Field>

                    {/* Password Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
                      disabled={isLoading || isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                      <p className="text-sm text-error font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <ButtonField
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isLoading || isSubmitting}
                      loadingText="Iniciando sesión..."
                      disabled={
                        isSubmitting ||
                        isLoading ||
                        !values.email.trim() ||
                        !values.password.trim() ||
                        Object.keys(errors).length > 0
                      }
                      fullWidth
                      leftIcon={
                        !(isLoading || isSubmitting) && (
                          <ArrowRight className="h-4 w-4" />
                        )
                      }
                      successMessage={
                        isLoading || isSubmitting
                          ? "Verificando credenciales..."
                          : ""
                      }
                      helperText={
                        (!values.email.trim() || !values.password.trim()) &&
                        !isSubmitting &&
                        !isLoading
                          ? "Completa todos los campos para continuar"
                          : ""
                      }
                    >
                      {isLoading || isSubmitting
                        ? "Iniciando sesión..."
                        : "Iniciar sesión"}
                    </ButtonField>
                  </div>
                </div>
              </FormSection>

              {/* Additional Info */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
                  <Shield className="h-4 w-4" />
                  <span>Conexión segura y encriptada</span>
                </div>

                <div className="text-xs text-text-tertiary">
                  ¿Olvidaste tu contraseña?{" "}
                  <button
                    type="button"
                    className="text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors"
                    onClick={() => {
                      /* Implementar lógica de recuperación */
                    }}
                  >
                    Recupérala aquí
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </FormTemplate>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto mt-16 px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-soft">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              Seguridad Avanzada
            </h3>
            <p className="text-sm text-text-secondary">
              Tus datos están protegidos con encriptación de nivel empresarial
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-soft">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full">
              <Zap className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              Acceso Rápido
            </h3>
            <p className="text-sm text-text-secondary">
              Gestiona tus proyectos de manera eficiente y rápida
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-soft">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full">
              <Sparkles className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              Experiencia Premium
            </h3>
            <p className="text-sm text-text-secondary">
              Interfaz moderna y intuitiva diseñada para tu comodidad
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-text-tertiary mb-4 md:mb-0">
              © 2024 Project Manager. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-text-tertiary">
              <a href="#" className="hover:text-primary-600 transition-colors">
                Términos de servicio
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Soporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
