import CategoryNavbar from "@/component/CategoryNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full sm:p-10 sm:gap-20">
      <CategoryNavbar categories={["all", "3d-printer"]} />
      {children}
    </div>
  );
}
