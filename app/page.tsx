import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <span>Welcome To Our Website</span>

      <Link href="/signup">
        <Button variant="default">Signup</Button>
      </Link>
    </div>
  );
}
