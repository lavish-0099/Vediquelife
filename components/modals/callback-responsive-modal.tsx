"use-client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface CallbackResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CallbackResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: CallbackResponsiveModalProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (!isClient) return null;
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="shadow-2xl flex items-center justify-center border-webprimary border-8">
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="rounded-t-2xl px-4 pb-6 pt-4 "
        style={{ zIndex: 2147483647 }}
      >
        <div className="w-full max-w-sm mx-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
