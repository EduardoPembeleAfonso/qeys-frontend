import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex bg-white">
      {children}
    </div>
  );
}
