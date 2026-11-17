"use client";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface PreviewProps {
  value: string;
  className?: string;
}

export const Preview = ({ value, className }: PreviewProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      className={cn("", className)}
      readOnly
    />
  );
};
