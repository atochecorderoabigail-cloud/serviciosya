import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export default function PageContainer({ children, showBottomNav = true }: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "var(--color-bg)" }}>
      <div className="flex-1">{children}</div>
      {showBottomNav && <div className="h-14" />}
    </div>
  );
}
