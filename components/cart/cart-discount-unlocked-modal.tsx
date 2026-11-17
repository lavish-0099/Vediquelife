"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useDiscountModalStore } from "@/store/discount-modal-store";

export default function DiscountUnlockedModal() {
  const { open, percent, amount, type, close } = useDiscountModalStore();

  useEffect(() => {
    if (!open) return;

    confetti({
      particleCount: 90,
      spread: 80,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.6 },
      scalar: 1.2,
    });

    const audio = new Audio("/sounds/success.mp3");
    audio.play().catch(() => {});
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-sm text-center p-8">
        <div className="flex flex-col items-center gap-3">
          <PartyPopper className="w-10 h-10 text-yellow-500 animate-bounce" />

          <h2 className="text-xl font-bold text-green-600">
            🎉 Discount Unlocked!
          </h2>

          {type === "coupon" && (
            <p className="text-gray-600">
              You saved{" "}
              <span className="font-semibold text-green-600">₹{amount}</span>{" "}
              with your coupon.
            </p>
          )}

          {type === "cart" && (
            <p className="text-gray-600">
              You unlocked extra{" "}
              <span className="font-semibold text-green-600">{percent}%</span>{" "}
              cart discount.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
