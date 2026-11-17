"use client";

import Image from "next/image";
import { useState } from "react";
import { SuccessStoryWithCategory } from "@/types/success-stories";
import VideoPopup from "./video-popup"; // Directly use VideoPopup here
import { FaCirclePlay } from "react-icons/fa6";

interface SuccessStoryCardProps {
  story: SuccessStoryWithCategory;
}

const SuccessStoryCard = ({ story }: SuccessStoryCardProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    if (story.videoUrl) {
      setShowVideo(true);
    }
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="relative bg-webblue border border-webblue rounded-lg shadow-lg p-4 mb-4 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
      >
        {/* Background Image */}
        <div className="relative overflow-hidden w-full h-60 rounded-md">
          <Image
            src={story.imageUrl || "/placeholder.jpg"}
            alt={story.name}
            fill
            className="object-cover rounded-md"
          />
        </div>

        {/* Video Icon - centered */}
        <div className="absolute bottom-14 right-6 z-10">
          <div className="bg-white rounded-full p-1">
            <FaCirclePlay className="size-10 text-webprimary" />
          </div>
        </div>

        {/* Title - centered */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-webblue bg-opacity-90 text-white text-center">
          <h3 className="text-lg  truncate">{story.name}</h3>
        </div>
      </div>

      {showVideo && story.videoUrl && (
        <VideoPopup
          videoUrl={`${story.videoUrl}?autoplay=1`}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default SuccessStoryCard;
