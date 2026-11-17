import Link, { LinkProps } from "next/link";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  thumbnailClassName?: string;
  href: LinkProps["href"];
  bundle: {
    image: string;
    title: string;
    description?: string;
    bgColor?: string;
  };
}

const BundleCard: React.FC<Props> = ({
  bundle,

  className = "",
  thumbnailClassName = "w-36 lg:w-32 xl:w-40 2xl:w-36 3xl:w-[180px] ltr:pr-1.5 rtl:pl-1.5 2xl:ltr:pr-2.5 2xl:rtl:pl-2.5",
  href,
}) => {
  const { image, title, description, bgColor } = bundle;

  return (
    <Link href={`/${href}`} className={cn("group flex", className)}>
      <div
        className="relative flex items-center rounded-md w-full overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className={cn("flex shrink-0", thumbnailClassName)}>
          <Image
            src={image ?? "/assets/placeholder/collection.svg"}
            alt={title}
            width={100}
            height={100}
            className="object-cover mx-auto transition duration-200 ease-in-out transform bg-sink-thumbnail group-hover:scale-105"
          />
        </div>
        <div className="py-3 lg:py-5 ltr:pr-4 rtl:pl-4 lg:ltr:pr-3 lg:rtl:pl-3 xl:ltr:pr-4 xl:rtl:pl-4">
          <h1 className="font-semibold text-lg">{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default BundleCard;
