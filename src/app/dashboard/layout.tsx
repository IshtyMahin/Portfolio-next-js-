import Sidebar from "@/components/dashboard/Sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 pl-2">{children}</main>
    </div>
  );
}
