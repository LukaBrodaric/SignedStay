import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Providers } from "@/components/Providers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any).role;

  return (
    <Providers>
      <div className="flex h-screen">
        <Sidebar role={role} />
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </Providers>
  );
}
