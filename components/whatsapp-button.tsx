"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
export const WhatsAppButton = () => {
  return (
    <Link
      //href="https://wa.link/k8650y"
      href="https://wa.me/919871100237?text=Hi,%20I%20want%20to%20start%20my%20Nutrition%20Plan."
      target="_blank"
      rel="noopener noreferrer"
    >
      <button
        className="fixed bottom-32 md:bottom-[70px] right-4 md:right-20 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center z-30 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>

          <span className="relative hidden md:inline-block z-10">
            <FaWhatsapp size={28} />
          </span>
          <span className="relative block md:hidden z-10">
            <FaWhatsapp size={22} />
          </span>
        </div>
      </button>
    </Link>
  );
};
