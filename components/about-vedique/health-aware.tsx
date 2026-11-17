import Image from "next/image";

// Banner photo: /public/assets/about/about-banner-2.jpg
export default function HealthAware() {
  return (
    /* thin white strip under the banner, before the footer */
    <section className="w-full bg-white pb-3 sm:pb-4">
      <div className="relative w-full min-h-[420px] lg:min-h-[440px] overflow-hidden bg-[#1e3d34]">
        <Image
          src="/assets/about/about-banner-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
