"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import Container from "../container";
import { SuccessStoryWithCategory } from "@/types/success-stories";
import SuccessStoryCard from "./success-story-card";

const LIMIT = 9;

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStoryWithCategory[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadCoaches();
    }
  }, [inView]);

  const loadCoaches = async () => {
    setLoading(true);
    const res = await axios.get(
      `/api/success-stories?page=${page}&limit=${LIMIT}`
    );
    const data: SuccessStoryWithCategory[] = res.data;

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setStories((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 py-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-6">
          {stories.map((story) => (
            <SuccessStoryCard key={story.id} story={story} />
          ))}
        </div>

        {hasMore && (
          <div ref={ref} className="flex justify-center mt-6">
            {loading && <Spinner />}
          </div>
        )}
      </Container>
    </div>
  );
}
