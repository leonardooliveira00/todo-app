import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <DashboardHeader />
      <main>{children}</main>
    </div>
  );
}
