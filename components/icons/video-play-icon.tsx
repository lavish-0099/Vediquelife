// components/icons/video-play-icon.tsx
"use client";

import { useState } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import { cn } from "@/lib/utils";
import VideoPopup from "../success-stories/video-popup";

interface VideoPlayIconProps {
  isFree?: boolean;
  videoUrl: string | null;
  className?: string;
}

const VideoPlayIcon = ({
  isFree = true,
  videoUrl,
  className,
}: VideoPlayIconProps) => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const openVideoPopup = () => {
    if (isFree && videoUrl) {
      setShowVideoPopup(true);
    }
  };

  const closeVideoPopup = () => {
    setShowVideoPopup(false);
  };

  return (
    <>
      <div className="relative inline-block" onClick={openVideoPopup}>
        <IoMdPlayCircle
          className={cn("w-20 h-20 text-rose-500 cursor-pointer", className)}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full animate-ping absolute inset-0 border-2 border-rose-500 cursor-pointer" />
        </div>
      </div>

      {showVideoPopup && videoUrl && (
        <VideoPopup videoUrl={videoUrl} onClose={closeVideoPopup} />
      )}
    </>
  );
};

export default VideoPlayIcon;
