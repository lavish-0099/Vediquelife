"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

import MemberCard from "./member-card";
import { TeamMember } from "@prisma/client";
import Link from "next/link";

const LIMIT = 12;

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Nutrition Coaches", value: "NUTRITION_COACH" },
  { label: "Doctors", value: "DOCTOR" },
  { label: "Experts", value: "EXPERT" },
];

export default function TeamMembersNetwork() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("ALL");

  const { ref, inView } = useInView();
  const cancelRef = useRef<AbortController | null>(null);

  // 🔥 LOAD FUNCTION (CLEAN + SAFE)
  const loadMembers = async (pageNumber: number, type: string) => {
    try {
      setLoading(true);

      // ❌ cancel previous request
      cancelRef.current?.abort();
      const controller = new AbortController();
      cancelRef.current = controller;

      const res = await axios.get(
        `/api/team-members?page=${pageNumber}&limit=${LIMIT}&type=${type}`,
        { signal: controller.signal },
      );

      const data: TeamMember[] = res.data;

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setMembers((prev) => (pageNumber === 1 ? data : [...prev, ...data]));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTER CHANGE (SMOOTH RESET)
  useEffect(() => {
    setLoading(true);

    // delay so exit animation plays
    const timer = setTimeout(() => {
      setMembers([]);
      setPage(1);
      setHasMore(true);
      loadMembers(1, filter);
    }, 200); // 🔥 animation gap

    return () => clearTimeout(timer);
  }, [filter]);

  // 🔥 INFINITE SCROLL
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMembers(page, filter);
    }
  }, [inView]);

  return (
    <div className="py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* 🔥 FILTERS (Premium UI) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f.value
                  ? "bg-webprimary text-white shadow-md scale-105"
                  : "bg-white text-webprimary border border-webprimary hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 🔥 GRID (Animated 💀) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {members.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/profile/${member.id}`}>
                  <MemberCard member={member} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 🔥 LOADER */}
        {hasMore && <div ref={ref} className="h-10" />}
      </div>
    </div>
  );
}
