"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightCircle } from "lucide-react";

const InvitationModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100 && !hasTriggered) {
        setShowModal(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="w-full max-w-3xl p-0 rounded-xl overflow-hidden shadow-2xl bg-white  animate-fade-in">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side Image */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src="/assets/dr-shikha.png"
              alt="Dr. Shikha Sharma"
              fill
              className="object-cover object-left"
              priority
            />
          </div>

          {/* Right Side Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center px-5 md:px-10 py-8">
            <h2 className="text-2xl text-green-800 mb-4">
              You're Invited to an Exclusive Webinar!
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Join Dr. Shikha Sharma for an exclusive session on personalized
              Vedique Diet and proven wellness strategies.
            </p>

            <Link href="https://wa.me/919871100237?text=Yes%20I%20want%20to%20join%20the%20webinar">
              <Button className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full relative overflow-hidden group transition">
                <span className="absolute inset-0 w-full h-full bg-white/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 ease-in-out"></span>
                Join the Webinar <ArrowRightCircle className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationModal;
