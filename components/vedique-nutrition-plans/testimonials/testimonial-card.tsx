"use client";

import { useState } from "react";
import { IoMdPlayCircle } from "react-icons/io";
import VideoPopup from "@/components/success-stories/video-popup";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SuccessStoryWithCategory } from "@/types/success-stories";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    videoUrl: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoId = testimonial.videoUrl.split("/").pop();
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-6">
        <div className="relative cursor-pointer" onClick={openModal}>
          <Image
            src={thumbnailUrl}
            alt="Video Thumbnail"
            width={300}
            height={300}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <IoMdPlayCircle
                className={cn("w-20 h-20 text-rose-300 cursor-pointer")}
              />
              <div className="w-20 h-20 rounded-full absolute inset-0 border-2 border-rose-500"></div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <VideoPopup videoUrl={testimonial.videoUrl} onClose={closeModal} />
      )}
    </>
  );
};

export default TestimonialCard;
