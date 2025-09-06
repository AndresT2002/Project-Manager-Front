"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField, ButtonField } from "@/components/ui/atomic-design";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useValidateSession } from "@/hooks/useValidateSession";
import { CardContainer } from "@/components/ui/atomic-design/molecules/Card";
import { Text } from "@/components/ui/atomic-design/typography/Text";
import Link from "next/link";
import Image from "next/image";
import SplitText from "@/components/animated/SplitText";
import { Pages } from "@/types/enums";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Esquema de validación con Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email invalid")
    .required("Email is required")
    .max(100, "Email is too long"),
  password: Yup.string()
    .required("Password is required")
    .max(50, "Password is too long"),
});

interface LoginFormValues {
  email: string;
  password: string;
}
const currentYear = new Date().getFullYear();

export default function LoginPage() {
  const { login, error: authError, clearError } = useAuth();
  const { isSessionValidating } = useValidateSession("/dashboard");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // Limpiar errores cuando cambian los valores del formulario
  useEffect(() => {
    if (authError) {
      clearError();
    }
  }, []);

  const handleSubmit = useCallback(
    async (
      values: LoginFormValues,
      {
        setSubmitting,
        setErrors,
      }: {
        setSubmitting: (isSubmitting: boolean) => void;
        setErrors: (errors: Record<string, string>) => void;
      }
    ) => {
      try {
        await login(values);
        router.push(Pages.DASHBOARD);
      } catch (err) {
        const error = err as Error;
        const errorMessage = error.message;
        toast.error(errorMessage, {
          description:
            "Please validate your credentials and try again or contact support",
          position: "top-right",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [login]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Mostrar loading mientras se verifica la autenticación inicial
  if (isSessionValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <Shield className="h-6 w-6 text-primary-600 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Verifying session...
            </h3>
            <p className="text-sm text-text-secondary">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center flex-col gap-4"
      style={{
        backgroundImage: 'url("/animations/background.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center ">
        <div className="flex items-center justify-center px-4 mb-4">
          <Image
            src="/logos/orbitly-sliced.png"
            alt="Orbitly Logo"
            width={300}
            height={120}
            className="w-auto h-auto max-w-[450px] max-h-[300px] object-contain"
            priority
          />
        </div>

        {/* <Title title="Welcome Back" className="text-white" /> */}
        <SplitText
          text="Welcome back!"
          className="text-5xl font-bold text-center text-white drop-shadow-lg"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          // onLetterAnimationComplete={handleAnimationComplete}
        />
        <Text
          text="Enter your credentials to access your account."
          className="text-white"
        />
      </div>
      <CardContainer className="w-full mx-5 lg:w-1/4 border-none shadow-secondary-600 shadow-lg rounded-lg min-h-[350px] bg-gray-50">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <InputField
              label="Email"
              placeholder="you@example.com"
              type="email"
              name="email"
              required
              labelClassName="text-gray-600"
              errorMessage={
                formik.touched.email && formik.errors.email
                  ? String(formik.errors.email)
                  : ""
              }
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              success={formik.touched.email && !formik.errors.email}
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              name="password"
              required
              labelClassName="text-gray-600"
              errorMessage={
                formik.touched.password && formik.errors.password
                  ? String(formik.errors.password)
                  : ""
              }
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              success={formik.touched.password && !formik.errors.password}
            />
            <div className="text-sm text-end text-primary-700 hover:text-primary-500 transition-colors">
              <Link href={Pages.REGISTER}>Forgot your password?</Link>
            </div>
            <ButtonField
              type="submit"
              variant="primary"
              fullWidth
              className="h-12 text-lg"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
            >
              Login
            </ButtonField>
          </div>
        </form>
      </CardContainer>
      <div className="mt-4 text-white/80">
        Don&apos;t have an account?{" "}
        <Link
          href={Pages.REGISTER}
          className="text-white hover:text-primary-500 transition-colors"
        >
          Sign up
        </Link>
      </div>
      {/* Footer */}
      <footer className="mt-20 py-8 text-center relative z-10 text-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-white mb-4 md:mb-0">
              © {currentYear} Orbitly project manager. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-white">
              <a href="#" className="hover:text-primary-600 transition-colors">
                Terms of service
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-primary-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
