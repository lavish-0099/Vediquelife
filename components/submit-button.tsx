"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isValid: boolean;
  isPending: boolean;
  submitText: string;
  adminOnly?: boolean;
}

export const SubmitButton = ({
  isValid,
  isPending,
  submitText,
  adminOnly = false,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn(
        "w-full bg-webprimary",
        adminOnly &&
          "bg-webyellow hover:bg-webpink text-webtertiary hover:text-white w-auto"
      )}
      disabled={isPending || !isValid}
    >
      {isPending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        submitText
      )}
    </Button>
  );
};
