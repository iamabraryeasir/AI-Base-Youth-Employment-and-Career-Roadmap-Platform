"use server";

import { auth } from "@/lib/auth";

export async function loginHandler(formData: FormData) {
  try {
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Call Better Auth sign-in API. The exact return shape can vary by adapter/version,
    // so handle common shapes conservatively.
    const res = await auth.api.signInEmail?.({
      body: {
        email,
        password,
        callbackURL: process.env.NEXT_PUBLIC_BASE_URL + "/dashboard",
      },
    });

    // If the library returns an error shape, surface it.
    // Check a few possible locations for failure info.
    if (!res || (res as any).error) {
      const msg = (res as any)?.error?.message || "Login failed";
      throw new Error(msg);
    }

    // If a session or user is returned, consider it success.
    const success = Boolean(
      (res as any).session || (res as any).user || (res as any).ok
    );

    if (!success) throw new Error("Login failed");

    return { success: true, message: "Logged in successfully" };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
