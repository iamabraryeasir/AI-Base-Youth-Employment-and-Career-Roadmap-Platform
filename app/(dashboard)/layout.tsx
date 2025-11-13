import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      redirect("/");
    }
  } catch (e) {
    throw e;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex-1 flex-col">
        <DashboardNavbar />
        <main className="p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
