"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center" aria-label="Vedique home">
      <Image
        alt="Vedique"
        src="/assets/revamp/Vedique%20logos-green.png"
        priority
        width={150}
        height={60}
        className="h-auto w-[120px] sm:w-[150px]"
      />
    </Link>
  );
};

export default Logo;