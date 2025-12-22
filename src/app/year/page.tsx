"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sanityStore } from "@/Store/sanityStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";

// Utility function to parse age from title
const parseAgeFromTitle = (title: string): number => {
  // First, try to extract numbers directly
  const numberMatch = title.match(/\d+/);
  if (numberMatch) {
    return parseInt(numberMatch[0]);
  }

  // Word to number mapping
  const wordToNumber: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  const words = title.toLowerCase().trim().split(/\s+/);
  let total = 0;

  for (const word of words) {
    if (wordToNumber[word] !== undefined) {
      total += wordToNumber[word];
    }
  }

  return total;
};

function Years() {
  const { reviews, fetchReviews } = sanityStore();

  useEffect(() => {
    fetchReviews().catch((error) => {
      console.error("Error encountered when fetching:", error);
    });
  }, [fetchReviews]);

  // Sort reviews by age in ascending order
  const sortedReviews = useMemo(() => {
    if (!reviews) return [];

    return [...reviews].sort((a, b) => {
      const ageA = parseAgeFromTitle(a.title);
      const ageB = parseAgeFromTitle(b.title);
      return ageA - ageB; // Ascending order (oldest to newest)
    });
  }, [reviews]);

  // Check if a review should show the button (age 23+)
  const shouldShowButton = (title: string): boolean => {
    const age = parseAgeFromTitle(title);
    return age >= 23;
  };

  const getRandomRotation = () => `rotate(${Math.random() * 20 - 10}deg)`;

  if (!reviews) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-lg">Loading memories...</p>
      </div>
    );
  }

  if (sortedReviews.length === 0) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-lg">No memories to display yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto border-2 border-gray-300 rounded-lg min-h-[80vh] p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sortedReviews.map((review) => (
            <Dialog key={review?.slug?.current}>
              <DialogTrigger asChild>
                <div
                  className="transform cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
                  style={{
                    transform: getRandomRotation(),
                  }}
                >
                  <div className="bg-white p-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        alt={
                          review?.mainImage?.alt ||
                          review?.title ||
                          "Birthday memory"
                        }
                        src={
                          review?.mainImage?.asset?.url || "/fallback-image.jpg"
                        }
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover rounded-md"
                        priority={false}
                      />
                    </div>
                    <p className="text-center font-handwriting text-sm truncate">
                      {review.title}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                  <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      alt={
                        review?.mainImage?.alt ||
                        review?.title ||
                        "Birthday memory"
                      }
                      src={
                        review?.mainImage?.asset?.url || "/fallback-image.jpg"
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-2">
                        {review.title}
                      </DialogTitle>
                      <DialogDescription className="text-sm">
                        {review.description}
                      </DialogDescription>
                    </DialogHeader>
                    {shouldShowButton(review.title) && (
                      <Link
                        href={`/year/${review?.slug?.current}`}
                        className="mt-4"
                      >
                        <Button className="w-full">Go to review</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Years;
