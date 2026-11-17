"use-client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface OTPResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OTPResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: OTPResponsiveModalProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (!isClient) return null;
  if (!isMobile) {
    return (
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            return;
          }
          onOpenChange(open);
        }}
      >
        <DialogContent
          className="w-full  p-0  border-8 overflow-y-auto"
          hideCloseButton
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          return;
        }
        onOpenChange(open);
      }}
    >
      <DrawerContent
        style={{ zIndex: 2147483647 }}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
