import CategoryNavbar from "@/component/CategoryNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row h-full sm:p-10 sm:gap-20">
      <CategoryNavbar categories={["All", "3D Printer"]} />
      {children}
    </div>
  );
}
