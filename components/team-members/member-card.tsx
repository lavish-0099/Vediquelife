"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TeamMember } from "@prisma/client";

interface MemberCardProps {
  member: TeamMember;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <motion.div
      layout
      className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      {/* Image */}
      <Image
        src={member.imageUrl || "/placeholder.jpg"}
        alt={member.name}
        fill
        className="object-cover group-hover:scale-105 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm opacity-80">{member.title || member.type}</p>
      </div>
    </motion.div>
  );
}
