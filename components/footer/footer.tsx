"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/container";
import Image from "next/image";
const exploreLinks = [
  { title: "Vedique Diet", href: "/vedique-diet" },
  { title: "Vedique Wellness", href: "/vedique-wellness" },
  { title: "Vedique Shop", href: "/products" },
  { title: "Free Resources", href: "/blog" },
];

const infoLinks = [
  { title: "About Us", href: "/about" },
  { title: "Testimonials", href: "/#testimonials" },
  { title: "Contact", href: "/contact" },
  { title: "Policies", href: "/privacy-policy" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#1e3d34] text-white py-16 lg:py-24 border-t border-[#2a5045]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================= LEFT SECTION ================= */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            {/* VÉDIQUE LOGO */}
            <Link href="/" aria-label="Vedique home" className="inline-block mb-10">
              <Image
                src="/assets/revamp/vedique-logo-offwhite.png"
                alt="Vedique"
                width={800}
                height={200}
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </Link>

            {/* STAY CONNECTED */}
            <div className="w-full max-w-md">
              <h4 className="text-sm sm:text-base font-bold text-white mb-3 tracking-wide">
                Stay connected
              </h4>

              {/* Newsletter Pill Input + Circular Arrow Button */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2.5 w-full">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mindful wellness, delivered occasionally."
                    required
                    className="w-full rounded-full border border-white/40 bg-transparent px-5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-10 h-10 rounded-full border border-white/50 flex-shrink-0 flex items-center justify-center text-white hover:bg-white hover:text-[#1e3d34] transition-all duration-200 group-active:scale-95"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              {subscribed && (
                <p className="text-xs text-emerald-300 mt-2 font-medium">
                  Thank you for subscribing to mindful wellness.
                </p>
              )}
            </div>
          </div>

          {/* ================= CENTER VERTICAL DIVIDER ================= */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-center h-full">
            <div className="w-px h-36 bg-white/20" />
          </div>

          {/* ================= RIGHT SECTION (2 COLUMNS) ================= */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-12 pl-0 lg:pl-6">
            {/* COLUMN 1: EXPLORE */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-5 tracking-wide">
                Explore
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                {exploreLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: INFORMATION */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-5 tracking-wide">
                Information
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                {infoLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors block"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SUBTLE BOTTOM COPYRIGHT */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-3">
          <p>© {new Date().getFullYear()} Vedique. All rights reserved.</p>
          <p>Ayurvedic Wisdom Backed by Clinical Science</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
