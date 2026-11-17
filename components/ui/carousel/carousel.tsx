"use client";

import { useRef, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Swiper,
  Navigation,
  Autoplay,
  Pagination,
  Grid,
} from "@/components/ui/carousel/slider";
import "swiper/css/autoplay";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Swiper as SwiperTypes } from "swiper/types";

type CarouselPropsType = {
  className?: string;
  buttonGroupClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  buttonSize?: "default" | "small";
  centeredSlides?: boolean;
  loop?: boolean;
  slidesPerColumn?: number;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  grid?: {} | any;
  onSlideChange?: (swiper: SwiperTypes) => void;
};

export default function Carousel({
  children,
  className = "",
  buttonGroupClassName = "",
  prevActivateId = "",
  nextActivateId = "",
  prevButtonClassName = "left-3.5 lg:left-4 xl:left-5",
  nextButtonClassName = "right-3.5 lg:right-4 xl:right-5",
  buttonSize = "default",
  breakpoints,
  navigation = true,
  pagination = false,
  loop = false,
  grid,
  autoplay,
  onSlideChange,
  ...props
}: React.PropsWithChildren<CarouselPropsType>) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperTypes | null>(
    null
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  }, [swiperInstance]);

  const buttonClasses = `w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded-full absolute transition duration-300 hover:bg-gray-700 hover:text-white focus:outline-none transform shadow-navigation bg-gray-300`;

  return (
    <div
      className={`carouselWrapper relative ${className} ${
        pagination ? "dotsCircle" : "dotsCircleNone"
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        breakpoints={breakpoints}
        pagination={pagination}
        grid={grid}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!,
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          if (onSlideChange) onSlideChange(swiper);
        }}
        onSwiper={setSwiperInstance}
        loop={loop}
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`}
        >
          {!isBeginning && (
            <div
              ref={prevRef}
              className={`${buttonClasses} ${prevButtonClassName}`}
            >
              <IoIosArrowBack />
            </div>
          )}
          {!isEnd && (
            <div
              ref={nextRef}
              className={`${buttonClasses} ${nextButtonClassName}`}
            >
              <IoIosArrowForward />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
