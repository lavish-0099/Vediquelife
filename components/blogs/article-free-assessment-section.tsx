"use client";

import FreeAssessmentBtn from "@/components/home/cta-btn";

const ArticleFreeAssessmentSection = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start bg-white rounded-md p-4 shadow-sm transition mb-10">
      <h1 className="text-2xl font-bold">
        Want to schedule a Health Assessment
      </h1>

      <FreeAssessmentBtn
        btnTitle="Schedule a Health Assessment"
        submitBtnTitle="Schedule a Callback"
        className="bg-webprimary text-white hover:bg-webblue p-4 text-lg mt-4"
      />
    </div>
  );
};

export default ArticleFreeAssessmentSection;
