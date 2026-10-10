import Image from "next/image";
import { cn } from "@/lib/migo/cn";

/** `invert` = white logo for dark backgrounds. `wordmark={false}` = the M mark only. Black artwork auto-inverts in dark mode. */
export function Logo({ className, wordmark = true, invert = false }: { className?: string; wordmark?: boolean; invert?: boolean }) {
  const src = `/${wordmark ? "logo" : "mark"}-${invert ? "white" : "black"}.png`;
  return <Image src={src} alt="Migo" width={wordmark ? 376 : 138} height={100} priority className={cn(wordmark ? "h-8 w-auto" : "h-9 w-auto", !invert && "dark:invert", className)} />;
}
