"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarItems } from "@/data/menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-1 xl:gap-2">
      {navbarItems.map((item) => {
        const hasChildren = item.hasChild && item.children && item.children.length > 0;
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href)) ||
          Boolean(item.children?.some((c) => pathname === c.href));

        if (hasChildren) {
          const isOpen = openDropdown === item.label;

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-150 whitespace-nowrap rounded-full",
                  isActive || isOpen
                    ? "text-[#1e3d34] bg-emerald-50 font-bold"
                    : "text-[#1e3d34]/80 hover:text-[#1e3d34] hover:bg-neutral-100/70"
                )}
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={12}
                  className={cn(
                    "transition-transform duration-200 opacity-70",
                    isOpen && "rotate-180"
                  )}
                />
              </Link>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  "absolute left-0 top-full pt-2 z-50 min-w-[260px] transition-all duration-200 ease-out origin-top-left",
                  isOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-2 overflow-hidden backdrop-blur-md">
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#1e3d34]/60">
                      Explore {item.label}
                    </p>
                  </div>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex flex-col px-3 py-2.5 rounded-xl transition hover:bg-emerald-50/70"
                    >
                      <span className="text-xs font-semibold text-[#1e3d34] group-hover:text-emerald-900 flex items-center justify-between">
                        {child.label}
                        <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-emerald-800">
                          →
                        </span>
                      </span>
                      {child.desc && (
                        <span className="text-[10px] text-neutral-500 mt-0.5 line-clamp-1">
                          {child.desc}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

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
