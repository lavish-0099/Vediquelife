"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hooks/use-window-size";
import { cn } from "@/lib/utils";

interface StaffSectionProps {
  className?: string;
}

const StaffSection = ({ className }: StaffSectionProps) => {
  const doctors = [
    { name: "Dr. Reena Rawat", image: "/assets/staff/dr-reena-rawat.png" },
    { name: "Dr. Charu Sethi", image: "/assets/staff/dr-charu.png" },
    { name: "Dr. Shilpa Oberoi", image: "/assets/staff/dr-shilpa.png" },
    { name: "Dr. Akanksha Chaturvedi", image: "/assets/staff/dr-akanksha.png" },
  ];

  const nutritionists = [
    { name: "Yogita Kumari", image: "/assets/staff/yogita.png" },
    { name: "Rashi Bharti", image: "/assets/staff/rashi.webp" },
    { name: "Aarti Chaurasiya", image: "/assets/staff/aarti-chaurasiya.png" },
    { name: "Anshu Tomar", image: "/assets/staff/anshu.jpg" },
  ];

  const { width } = useWindowSize();
  const isMobile = width !== undefined && width <= 767;

  return (
    <div
      className={cn(
        "w-full flex flex-col lg:flex-row  py-10 px-6 relative items-center  my-10 overflow-hidden",
        className
      )}
    >
      {/* Staff Section */}
      <Container>
        {/* Our Doctors Section */}
        <div className="mb-10">
          <h2 className="text-4xl text-webblue mb-6 text-center">
            Our <span className="text-webprimary"> Doctors</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={isMobile ? 350 : 250}
                  height={isMobile ? 350 : 250}
                  className="rounded-md shadow-lg"
                />
                <p className="text-sm font-semibold text-gray-800 mt-4">
                  {doctor.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Nutritionists Section */}
        <div>
          <h2 className="text-4xl text-webblue mb-6 text-center">
            50+ Vedique
            <span className="text-webprimary"> Nutrition Coaches</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nutritionists.map((nutritionist, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={nutritionist.image}
                  alt={nutritionist.name}
                  width={isMobile ? 350 : 250}
                  height={isMobile ? 350 : 250}
                  className="rounded-md shadow-lg"
                />
                <p className="text-sm font-semibold text-gray-800 mt-4">
                  {nutritionist.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/nutrition-coach-network">
              <Button variant="default" size="lg">
                Show All
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StaffSection;
