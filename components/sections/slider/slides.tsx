import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { IoIosArrowDroprightCircle } from "react-icons/io";

import { cn } from "@/lib/utils";
import Link from "next/link";
import useWindowSize from "@/hooks/use-window-size";

interface SlidesProps {
  banners: {
    id: number;
    title: string;
    spanTxt: string;
    btnTxt: string;
    image: string;
    href?: string;
    points?: string[];
  }[];
}

const Slides = ({ banners }: SlidesProps) => {
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width <= 767;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Swiper
        className="w-full"
        cssMode={true}
        spaceBetween={20}
        slidesPerView={1}
        mousewheel={true}
        keyboard={true}
        pagination={{ clickable: true }}
        loop={true}
        direction="horizontal"
        autoplay={{
          delay: 6000,
        }}
        modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard]}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
              <div className="md:w-2/5 flex flex-col items-start justify-end md:items-start p-4 text-left">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg text-white font-semibold break-words mb-4">
                  {banner.spanTxt}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-white">
                  {banner.points?.map((point, index) => (
                    <div
                      key={index}
                      className="flex text-sm font-semibold items-center"
                    >
                      <span className="mr-2">
                        <IoIosArrowDroprightCircle className="text-md" />
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
                <Link href={banner.href || "/"}>
                  <button className="bg-webprimary hover:bg-webprimary text-white py-2 px-4 text-lg rounded-full">
                    {banner.btnTxt}
                  </button>
                </Link>
              </div>
              <div className="md:w-3/5 flex justify-center md:justify-end p-4">
                <Image
                  src={banner.image || "/assets/images/default-category.jpg"}
                  alt={banner.title || "Banner Image"}
                  width={isMobile ? 320 : 470}
                  height={isMobile ? 320 : 470}
                  className={cn(
                    "rounded-lg md:rounded-none"
                    //banner.id === 2 && "md:mt-24"
                  )}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slides;
