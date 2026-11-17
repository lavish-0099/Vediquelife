"use client";

import { useState } from "react";
import Image from "next/image";
import { MemberWithRelations } from "@/types/team-member";
import { Preview } from "../preview";
import { QuoteBanner } from "./quote-banner";
import Link from "next/link";
import { CtaButton } from "../cta-button";
import { Stethoscope } from "lucide-react";

const TABS = ["about", "career", "testimonials"];

export default function MemberProfile({
  member,
}: {
  member: MemberWithRelations;
}) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-white">
      {/* 🔥 HERO */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        {/* IMAGE */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={member.imageUrl || "/placeholder.jpg"}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            {member.name}
          </h1>

          <p className="text-lg text-gray-500 mt-2">
            {member.title || member.type}
          </p>
          <p className="text-sm text-gray-500 mt-2">{member.experience}</p>
          <div className="mt-4 max-w-xl text-webprimary leading-relaxed">
            {member.qualification}
          </div>
          <div className="mt-4 max-w-xl text-gray-600 leading-relaxed">
            I Speak : {member.languages.map((l) => l.name).join(", ")}
          </div>
          <div className="mt-4 max-w-xl text-gray-600 leading-relaxed">
            Consults : Online
          </div>

          <Link
            href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
            className="w-full sm:w-auto"
          >
            <CtaButton
              label="Book A Consult"
              variant="primary"
              icon={<Stethoscope size={18} />}
              iconPosition="left"
              className="w-full mt-4 sm:w-auto justify-center shadow-md hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* 🔥 TABS */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto flex justify-center gap-8 text-sm font-medium">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 capitalize ${
                activeTab === tab
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-500"
              }`}
            >
              {tab === "career" ? "My Journey" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {activeTab === "about" && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {member.about ? <Preview value={member.about} /> : "No about info"}
          </div>
        )}

        {activeTab === "career" && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {member.career ? (
              <Preview value={member.career} />
            ) : (
              "No about info"
            )}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            {member.testimonials.length ? (
              member.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <p className="text-gray-600 italic">"{t.content}"</p>
                  <p className="mt-2 text-sm font-medium text-gray-800">
                    - {t.name}
                  </p>
                </div>
              ))
            ) : (
              <p>No testimonials</p>
            )}
          </div>
        )}
      </div>
      <QuoteBanner quote={member.quote} />
    </div>
  );
}
