"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Container from "@/components/container";
import TestimonialCard from "@/components/vedique-nutrition-plans/testimonials/testimonial-card";

import { cn } from "@/lib/utils";

const CLIENT_TESTIMONIALS = [
  { id: 1, videoUrl: "https://www.youtube.com/embed/zic3IF8ARzE" },
  { id: 2, videoUrl: "https://www.youtube.com/embed/MESKjzHhW9c" },
  { id: 3, videoUrl: "https://www.youtube.com/embed/XEjp3zhuUeI" },
  { id: 4, videoUrl: "https://www.youtube.com/embed/PtymK8dtzCE" },
  { id: 5, videoUrl: "https://www.youtube.com/embed/nRfFkeDf1jY" },
];

interface ClientTestimonialsProps {
  className?: string;
}

const ClientTestimonials = ({ className }: ClientTestimonialsProps) => {
  return (
    <section
      className={cn(
        "w-full py-8 md:py-12  bg-gradient-to-br from-[#eaf7ee] via-[#f3fbf6] to-[#ffffff]",
        className,
      )}
    >
      <Container>
        {/* ================= HEADER ================= */}

        <div className="flex justify-center items-center flex-col px-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold  mb-3 text-center">
            Real Stories,
            <span className="text-webprimary"> Real Results</span>
          </h2>

          <p className="text-[#3f5f3e] text-base sm:text-lg text-center max-w-2xl">
            Don&apos;t just take our word for it. Hear directly from people who
            transformed their health with Vedique.
          </p>
        </div>

        {/* ================= CAROUSEL ================= */}
        <div className="w-full mt-6 relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="min-h-full">
              {CLIENT_TESTIMONIALS.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <TestimonialCard testimonial={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 bg-white/80 hover:bg-white shadow-md" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 bg-white/80 hover:bg-white shadow-md" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
};

export default ClientTestimonials;
