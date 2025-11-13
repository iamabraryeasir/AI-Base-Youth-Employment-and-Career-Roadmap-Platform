import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export const metadata = {
  title: "Auth",
};

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session?.user) {
      redirect("/dashboard");
    }
  } catch (e) {
    throw e;
  }

  return <>{children}</>;
}
