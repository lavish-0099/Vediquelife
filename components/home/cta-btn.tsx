"use client";

import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface CtaBtnProps {
  btnTitle: string;
  btnHref: string;
  btnBg?: string;
  className?: string;
}

const CtaBtn = ({ btnTitle, btnHref, btnBg, className }: CtaBtnProps) => {
  return (
    <>
      <Link href={btnHref}>
        <Button
          style={{
            backgroundColor: btnBg,
          }}
          className={cn(
            className,
            "px-6 py-2 rounded-full relative overflow-hidden group transition",
          )}
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 ease-in-out"></span>
          {btnTitle} <ArrowRightCircle className="ml-1" size={20} />
        </Button>
      </Link>
    </>
  );
};

export default CtaBtn;
