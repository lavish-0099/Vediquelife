"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarItems } from "@/data/menu";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 xl:gap-2">
      {navbarItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "px-3 py-1.5 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-150 whitespace-nowrap rounded-full",
              isActive
                ? "text-[#1e3d34] bg-emerald-50 font-bold"
                : "text-[#1e3d34]/80 hover:text-[#1e3d34] hover:bg-neutral-100/70"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
