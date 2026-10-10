"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/migo/cn";
import { useTheme } from "@/lib/migo/theme";

/** Sun/Moon toggle for dark & light mode. Icon shows the mode you will switch TO. */
export function ThemeToggle({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // After mount, theme is reliable. Icon = destination mode (Sun when currently dark).
  const isDark = mounted && theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => toggle()}
      aria-label={label}
      title={label}
      data-theme={theme}
      className={cn(
        "press flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        onDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-cream text-ink hover:bg-line",
        className,
      )}
    >
      {!mounted ? (
        <Moon className="h-5 w-5 opacity-50" />
      ) : isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
