import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "@/components/ui/toastContainer";

export const metadata: Metadata = {
  title: "FinTracker",
  description: "Controla tus ingresos, gastos y ahorros en un solo lugar.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-text-main">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
