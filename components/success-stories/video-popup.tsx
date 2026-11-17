"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReactDOM from "react-dom";
import VideoPlayer from "@/components/video-player";

interface VideoPopupProps {
  videoUrl: string | null;
  onClose: () => void;
}

const VideoPopup = ({ videoUrl, onClose }: VideoPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // allow animation to finish
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const popupContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl border-8 border-webpink rounded-xl bg-white shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="hidden md:flex absolute top-2 right-2 z-10 p-2 rounded-full bg-white border border-gray-300 text-webpink hover:text-white hover:bg-webpink hover:shadow-md transition"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="w-full aspect-video bg-black">
              <VideoPlayer videoUrl={videoUrl} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof window !== "undefined"
    ? ReactDOM.createPortal(popupContent, document.body)
    : null;
};

export default VideoPopup;
