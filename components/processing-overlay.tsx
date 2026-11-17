"use client";

import { Loader, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingOverlayProps {
  message?: string;
  showSuccess?: boolean;
}

export const ProcessingOverlay = ({
  message = "Please wait...",
  showSuccess = false,
}: ProcessingOverlayProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key="processing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4 text-white max-w-[90%] text-center"
        >
          {showSuccess ? (
            <CheckCircle2 className="w-12 h-12 text-green-400 animate-ping-slow" />
          ) : (
            <Loader className="size-5 animate-spin text-white" />
          )}
          <p className="text-lg font-medium break-words">{message}</p>
          <p className="text-sm break-words">
            Please do not refresh, click the back button, or close the tab.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
