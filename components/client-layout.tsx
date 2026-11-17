"use client";

import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBottomBarVisible = useCartStore((state) => state.isBottomBarVisible);

  return (
    <div
      className={cn(
        "min-h-screen",
        isBottomBarVisible && "pb-[calc(70px+env(safe-area-inset-bottom))]"
      )}
    >
      {children}
    </div>
  );
}
