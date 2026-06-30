type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {children}
    </main>
  );
}