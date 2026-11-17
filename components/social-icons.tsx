"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaPhoneVolume } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Call",
    icon: <FaPhoneVolume size={20} className="text-white" />,
    url: "tel:+911206489403",
    className: "bg-yellow-500 hover:bg-yellow-600 animate-pulse",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp size={20} className="text-white" />,
    url: "https://wa.me/919871100237?text=Hi,%20I%20want%20to%20start%20my%20Nutrition%20Plan.",
    //url: "https://wa.link/k8650y",
    className: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Facebook",
    icon: <FaFacebook size={20} className="text-white" />,
    url: "https://www.facebook.com/Dr.ShikhasNutriHealth",
    className: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={20} className="text-white" />,
    url: "https://www.instagram.com/nutrihealthsystems/",
    className: "bg-pink-600 hover:bg-pink-700",
  },
  {
    name: "Twitter",
    icon: <FaXTwitter size={20} className="text-white" />,
    url: "https://x.com/nutrihealthsys",
    className: "bg-black hover:bg-gray-800",
  },
];

const SocialIcons = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (!isClient) return null;

  const desktopSocialLinks = socialLinks.filter((link) => link.name !== "Call");

  if (isMobile) {
    return (
      <div className="fixed top-1/3 right-0 z-50">
        <div className="relative w-14">
          {/* Panel */}
          <div
            className={cn(
              "absolute right-0 top-0 w-14 bg-white rounded-bl-2xl shadow-xl transition-all duration-300 overflow-hidden",
              "flex flex-col items-center gap-2 px-3 py-4",
              isOpen
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-full opacity-0 pointer-events-none"
            )}
          >
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={cn(
                    "p-2 rounded-full shadow-lg transition-all duration-300",
                    link.className
                  )}
                >
                  {link.icon}
                </div>
              </Link>
            ))}
          </div>

          {/* Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "absolute top-0 h-8 w-8 p-0 rounded-l-full border border-gray-300 shadow-md bg-white transition-all duration-300 hover:bg-white",
              isOpen ? "right-14" : "right-0"
            )}
            aria-label="Toggle social icons"
          >
            {isOpen ? (
              <IoIosArrowForward className="text-black" size={16} />
            ) : (
              <IoIosArrowBack className="text-black" size={16} />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-5 top-1/3 flex flex-col gap-3 z-30">
      {desktopSocialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={cn(
              "p-2 rounded-full shadow-lg transition-all duration-300",
              link.className
            )}
          >
            {link.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
