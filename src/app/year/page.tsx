"use client";

import { Card } from "@/components/ui/card";
import { sanityStore } from "@/Store/sanityStore";
import Link from "next/link";
import { useEffect } from "react";

export default function Years() {
  const { reviews, fetchReviews } = sanityStore();

  useEffect(() => {
    const loadReviews = async (): Promise<void> => {
      try {
        await fetchReviews();
      } catch (error) {
        console.error("Error encountered when fetching:", error);
      }
    };
    loadReviews();
  }, [fetchReviews]);

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <Card className="p-5 bg-transparent w-[350px]">
        <p>This will show the birthdays...</p>
        {reviews?.map((review) => (
          <Link
            key={review?.slug?.current}
            href={`/year/${review?.slug?.current}`}
          >
            <div>{review.title}</div>
          </Link>
        ))}
      </Card>
    </div>
  );
}
