"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DownloadBroucherBtnProps {
  btnTitle: string;
  className?: string;
}

export const DownloadBroucherBtn = ({
  btnTitle,
  className,
}: DownloadBroucherBtnProps) => {
  return (
    <div>
      <Link href="./OneHealthAdvisoryBrochure.pdf" target="_blank">
        <Button
          className={cn(
            "px-6 py-2 rounded-full relative overflow-hidden group transition",
            className
          )}
        >
          {/* Sliding effect */}
          <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 ease-in-out"></span>
          {/* Button Content */}
          {btnTitle} <Download className="ml-2" size={20} />
        </Button>
      </Link>
    </div>
  );
};
