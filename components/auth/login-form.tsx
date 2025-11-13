"use client";

import { useState, useTransition } from "react";
import { Field, FieldLabel, FieldSeparator, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { loginHandler } from "@/actions/loginHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const toastId = toast.loading("Signing you in...");
      const res = await loginHandler(formData);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        router.push("/dashboard");
      } else {
        toast.error(res.message, { id: toastId });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Your Email</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              required
            />
          </Field>

          <FieldSeparator />

          <Button type="submit" className="w-full" size="lg">
            <LoadingSwap isLoading={isPending}>Sign In</LoadingSwap>
          </Button>
        </FieldSet>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
