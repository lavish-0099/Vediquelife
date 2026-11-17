"use client";

import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CtaVariant = "primary" | "outline" | "secondary";

interface CtaButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  animate?: boolean;
  fullWidth?: boolean;
  variant?: CtaVariant;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function CtaButton({
  label,
  onClick,
  type = "button",
  className,
  animate = true,
  fullWidth = false,
  variant = "primary",
  disabled = false,
  icon,
  iconPosition = "right",
}: CtaButtonProps) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";
  const isSecondary = variant === "secondary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden group",
        "flex items-center justify-center", // 👈 hard center
        "px-6 py-2.5 rounded-full",
        "font-medium text-sm tracking-wide",
        "transition-all",
        fullWidth && "w-full",

        // ===== VARIANTS =====
        isPrimary &&
          "bg-webprimary text-white hover:bg-webyellow hover:text-black",
        isSecondary &&
          "bg-webyellow text-black hover:bg-webprimary hover:text-white",
        isOutline &&
          "bg-white text-webprimary border border-webprimary hover:bg-webprimary hover:text-white",

        className
      )}
      /* 🔑 Mobile pe animation OFF */
      animate={animate ? { x: [0, -4, 4, -4, 4, 0] } : undefined}
      transition={
        animate
          ? {
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }
          : undefined
      }
      whileTap={{ scale: 0.97 }}
    >
      {/* ===== SHIMMER ===== */}
      {animate && !isOutline && (
        <motion.span
          className="pointer-events-none absolute inset-0"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
          }}
        />
      )}

      {/* ===== CONTENT ===== */}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {icon && iconPosition === "left" && icon}

        <span className="text-center">{label}</span>

        {icon && iconPosition === "right" && icon}

        {!icon && (
          <ArrowRightCircle
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </span>
    </motion.button>
  );
}
