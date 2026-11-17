"use client";

import Container from "@/components/container";

const Copyrights = () => {
  return (
    <div className="mt-4 py-3 mb-10 md:mb-0 flex justify-center items-center bg-webprimary text-white font-bold">
      <Container>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Ranfort Wellness Pvt. Ltd. All
          rights reserved.
        </p>
      </Container>
    </div>
  );
};

export default Copyrights;
