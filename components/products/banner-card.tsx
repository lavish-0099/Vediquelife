"use client";

import { cn } from "@/lib/utils";
import Container from "@/components/container";
import CourseRatingDetails from "@/components/courses/course-rating-details";

import CourseAuthor from "@/components/courses/course-author";
import CourseUpdateDetails from "@/components/courses/course-update-details";

import guestAuthor from "@/public/assets/guest-user.webp";
import ProductBreadcum from "./product-breadcum";

interface BannerCardProps {
  product: {
    title: string;
    short_description: string | null;
    imageUrl: string | null;
    price: number | null;
  };
  className?: string;
}
const BannerCard = ({ product, className }: BannerCardProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center bg-webblue backdrop-blur-md text-white shadow-md",
        className
      )}
    >
      <Container>
        <div className="flex justify-between items-start flex-col lg:flex-row">
          <div className="w-full ">
            <h1 className="text-2xl lg:text-4xl my-2 text-center lg:text-left">
              {product.title}
            </h1>
            <ProductBreadcum currentProduct={product.title} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BannerCard;
