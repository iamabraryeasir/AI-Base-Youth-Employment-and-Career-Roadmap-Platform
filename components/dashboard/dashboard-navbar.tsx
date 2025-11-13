import { getServerSession } from "@/lib/auth/get-session-server";
import LogoutButton from "../auth/logout-button";

export default async function DashboardNavbar() {
  const session = await getServerSession();
  return (
    <nav className="flex w-full items-center justify-between px-8 py-5 border-b">
      <p className="text-xl font-bold">Welcome {session?.user?.name}</p>
      <LogoutButton />
    </nav>
  );
}
