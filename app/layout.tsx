import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { auth } from "@/auth";
import { UserCountryProvider } from "@/context/user-country-context";
import { CartSyncOnLogin } from "@/components/cart-sync-on-login";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ClientLayout from "@/components/client-layout";
import CartDiscountUnlockedModal from "@/components/cart/cart-discount-unlocked-modal";
import CartInitializer from "@/components/cart/cart-initializer";

const celebes = localFont({
  src: [
    {
      path: "../public/fonts/Celebes-Light-BF64001372cdbe6.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Celebes-Light-BF64001372cdbe6.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Celebes-SemiBold-BF64001373561ed.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Celebes-SemiBold-BF64001373561ed.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-celebes",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const meta = {
  title: "Vedique - Where Nature Nurtures You",
  description:
    "Discover Vedique, your ultimate destination for authentic Ayurvedic products crafted from nature's finest ingredients.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/about.webp`,
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,

    type: "website",
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [meta.image],
    card: "summary_large_image",
  },
  other: {
    "facebook-domain-verification": "x1u3jw7cgf52qdfmdacgk8vw23pjjd",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID as string} />
      <html lang="en">
        <body className={`${celebes.variable} ${poppins.variable}`} suppressHydrationWarning={true}>
          <CartInitializer />
          <ClientLayout>
            <ConfettiProvider />
            <ToastContainer />
            <CartSyncOnLogin />
            <CartDiscountUnlockedModal />
            <Toaster />
            <NextTopLoader
              color="#46604d"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={false}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #46604d,0 0 5px #46604d"
            />
            <TooltipProvider>
              <UserCountryProvider>{children}</UserCountryProvider>
            </TooltipProvider>
          </ClientLayout>
        </body>
      </html>
    </SessionProvider>
  );
}
