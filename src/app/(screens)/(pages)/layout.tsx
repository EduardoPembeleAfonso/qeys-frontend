import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="flex w-full h-full bg-secondaryColor">
      {children}
    </div>
  );
}
