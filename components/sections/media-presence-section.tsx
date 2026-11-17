"use client";

import Image from "next/image";
import Container from "../container";

// Sample images array (replace the paths with your actual image paths)
const images = [
  "/assets/media/1.png",
  "/assets/media/2.png",
  "/assets/media/3.png",
  "/assets/media/4.png",
  "/assets/media/5.png",
  "/assets/media/6.png",
  "/assets/media/7.png",
  "/assets/media/8.png",
  "/assets/media/9.png",
  "/assets/media/10.png",
  "/assets/media/11.png",
  "/assets/media/12.png",
  "/assets/media/13.png",
];

const MediaPresenceSection = () => {
  return (
    <div className="py-10">
      <Container>
        <div className="text-center">
          {/* Heading */}
          <h2 className="text-3xl mb-12">Media Presence</h2>

          {/* Custom Layout */}
          <div className="space-y-8">
            {/* Row 1: 5 Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
              {images.slice(0, 5).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Media logo ${index + 1}`}
                    width={140}
                    height={140}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>

            {/* Row 2: 4 Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {images.slice(5, 9).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Media logo ${index + 1}`}
                    width={140}
                    height={140}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>

            {/* Row 3: 4 Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {images.slice(9, 13).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Media logo ${index + 1}`}
                    width={140}
                    height={140}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MediaPresenceSection;
