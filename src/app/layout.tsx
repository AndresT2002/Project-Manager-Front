import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthProvider";
import "../styles/globals.scss";
import { PrivateComponent } from "@/components/RBAC/PrivateComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Manager",
  description: "Sistema de gestión de proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-50/30`}
      >
        <AuthProvider>
          <PrivateComponent>{children}</PrivateComponent>
        </AuthProvider>
      </body>
    </html>
  );
}
