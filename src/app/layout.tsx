import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/migo/providers";
import { APP_URL } from "@/lib/migo/api";
import "./globals.css";

const title = "Migo — Daily ride-sharing for Dhaka";
const description = "Share your daily commute. Match with verified commuters on your route, verify pickup with OTP, track live, and pay securely with SSLCommerz.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: { default: title, template: "%s · Migo" },
  description,
  applicationName: "Migo",
  keywords: ["ride sharing", "Dhaka", "carpool", "commute", "Migo"],
  openGraph: { type: "website", siteName: "Migo", title, description, locale: "en_BD" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="migo" className="light" suppressHydrationWarning>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
