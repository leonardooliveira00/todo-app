import { ReactNode } from "react";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto w-full px-4 py-8">{children}</main>
    </div>
  );
}
