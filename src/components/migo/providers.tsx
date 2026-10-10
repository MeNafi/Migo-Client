"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { ConfirmHost } from "@/components/ui/confirm";
import { initTheme, useTheme } from "@/lib/migo/theme";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 10_000, retry: 1, refetchOnWindowFocus: false } } }));
  const theme = useTheme((s) => s.theme);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { initTheme(); setMounted(true); }, []);
  return (
    <QueryClientProvider client={client}>
      {children}
      <ConfirmHost />
      <Toaster position="top-center" richColors closeButton theme={mounted ? theme : "system"} />
    </QueryClientProvider>
  );
}
