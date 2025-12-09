interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
