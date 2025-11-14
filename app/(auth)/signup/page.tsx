import { inter } from "@/app/layout";
import SignupForm from "@/components/auth/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <section className="max-w-5xl mx-auto pb-12">
      <header className="flex flex-col gap-2 py-8">
        <h1
          className={`flex items-center gap-3 text-2xl font-bold font-in ${inter.className}`}
        >
          <Image
            src="/icons/auth-star.svg"
            alt="Sign up icon"
            width={28}
            height={28}
          />
          Sign Up
        </h1>
        <p>Find your path. Build your future.</p>
      </header>

      <section className="grid grid-cols-2 gap-18">
        {/* left */}
        <SignupForm />

        {/* right */}
        <div className="hidden md:block">
          <Image
            src="/images/auth-side.png"
            alt="Auth Side Image"
            width={440}
            height={760}
          />
        </div>
      </section>
    </section>
  );
}
