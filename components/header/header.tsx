"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Container from "@/components/container";
import MobileMenuIcon from "@/components/header/mobile-menu-icon";
import { Navbar } from "@/components/header/navbar";
import CartIcon from "./cart-icon";
import SearchIcon from "./search-icon";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isHomePage?: boolean;
}

export const Header = ({ isHomePage }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-none fixed left-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled ? "top-3" : "top-[52px]",
      )}
    >
      <Container>
        {/* Floating pill navigation */}
        <div
          className={cn(
            "pointer-events-auto relative flex h-14 items-center justify-between rounded-full px-5 transition-all duration-300 md:px-7",
            scrolled
              ? "bg-white/95 shadow-lg backdrop-blur-md"
              : "bg-white shadow-sm border border-neutral-200/60",
            !isHomePage && "border border-[#e0cfc1]",
          )}
        >
          {/* Mobile + tablet: hamburger on the left */}
          <div className="lg:hidden flex-shrink-0 mr-3">
            <MobileMenuIcon />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
            <Navbar />
          </div>

          {/* Right side: Search + Bag */}
          <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
            <SearchIcon />
            <CartIcon />
          </div>
        </div>
      </Container>
    </header>
  );
};