"use client";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import Container from "@/components/container";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useMemo, useState } from "react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Dr.ShikhasNutriHealth",
    icon: <FaFacebook className="size-4 text-blue-500 hover:text-blue-700" />,
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@vediquediet",
    icon: <FaYoutube className="size-4 text-red-500 hover:text-red-700" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vedique/",
    icon: <FaInstagram className="size-4 text-pink-500 hover:text-pink-700" />,
  },
  {
    name: "Twitter",
    href: "https://x.com/vedique",
    icon: <FaTwitter className="size-4 text-blue-400 hover:text-blue-600" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/vediquediet/",
    icon: <FaLinkedin className="size-4 text-blue-500 hover:text-blue-700" />,
  },
];

const Topbar = () => {
  const { cartRules } = useCartStore();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const messages = useMemo(() => {
    const ruleMessages =
      cartRules?.map(
        (rule) =>
          `🔥 Get an additional ${rule.discountPercent}% OFF on orders above ₹${rule.minOrderValue}`,
      ) || [];

    const staticMessages = [
      "🎉 Get 10% Instant Discount on all Products",
      "🌿 Boost your immunity with Vedique supplements",
    ];

    return [...ruleMessages, ...staticMessages];
  }, [cartRules]);

  useEffect(() => {
    if (!messages.length) return;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 text-white bg-[#1e3d34] border-b border-[#264f43] py-2 tracking-wider text-[11px] md:text-xs">
      <Container>
        <div className="w-full flex items-center justify-between font-medium">
          {/* Promo offer */}
          <div className="flex items-center gap-2">
            <span className="uppercase font-semibold tracking-wider">
              GET AN ADDITIONAL 5% OFF ON ORDERS ABOVE 1999
            </span>
          </div>

          {/* Talk to us phone */}
          <div className="flex items-center gap-2">
            <span className="uppercase text-white/80 font-medium">Talk to us:</span>
            <a
              href="tel:+919266682753"
              className="text-white hover:text-white/80 font-semibold transition"
            >
              +91 92666 82753
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
