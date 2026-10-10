import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Page() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center"><h1 className="text-2xl font-bold">Payment cancelled</h1><Link href="/payments" className="mt-6"><Button>Return</Button></Link></div>;
}
