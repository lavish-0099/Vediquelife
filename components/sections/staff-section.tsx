"use client";

import Container from "@/components/container";
import Image from "next/image";

const StaffSection = () => {
  const doctors = [
    { name: "Dr. Charu Sethi", image: "/assets/images/dr-charu.png" },
    { name: "Dr. Aman Chabbra", image: "/assets/images/dr-aman.png" },
    { name: "Dr. Reena Rawat", image: "/assets/images/dr-reena-rawat.png" },
    { name: "Dr. Roopali Sawant", image: "/assets/images/dr-rupali.png" },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row bg-orange-50 py-10 px-6 relative items-center z-10  overflow-hidden">
      {/* Staff Section */}
      <Container>
        {/* Our Doctors Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-webprimary mb-6 text-center">
            Recommended by <span className="text-websecondary"> Doctors</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-md shadow-lg"
                />
                <p className="text-sm font-semibold text-gray-800 mt-4">
                  {doctor.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StaffSection;
