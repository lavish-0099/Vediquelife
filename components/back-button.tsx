"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader, Undo2 } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  backLink: string;
}

export const BackButton = ({ backLink }: BackButtonProps) => {
  return (
    <Link href={backLink}>
      <Button variant="outline">
        <Undo2 className="h-4 w-4 text-webpink" />
      </Button>
    </Link>
  );
};
