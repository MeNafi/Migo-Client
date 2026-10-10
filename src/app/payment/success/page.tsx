import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <CheckCircle2 className="h-12 w-12 text-success" />
      <h1 className="mt-4 text-2xl font-bold">Payment received</h1>
      <p className="mt-2 text-muted">SSLCommerz checkout completed.</p>
      <Link href="/payments" className="mt-6"><Button>Back to payments</Button></Link>
    </div>
  );
}
