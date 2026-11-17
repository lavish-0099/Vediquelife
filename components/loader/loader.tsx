"use client";
import { TbLoader3 } from "react-icons/tb";

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white z-50 h-screen">
    <TbLoader3 className="animate-spin h-16 w-16 text-webprimary" />
  </div>
);

export default Loader;
