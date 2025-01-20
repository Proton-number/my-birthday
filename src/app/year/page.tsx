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
import React, { useEffect } from "react";

function Years() {
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

  // Calculate a random rotation between -10 and 10 degrees
  const getRandomRotation = () => `rotate(${Math.random() * 20 - 10}deg)`;

  // Updated function to handle years Twenty Three and above
  const shouldShowButton = (title: string): boolean => {
    const yearWords = title.toLowerCase().split(" ");

    // Convert word numbers to numeric values
    const wordToNumber: { [key: string]: number } = {
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    if (yearWords.length === 2 && yearWords[0] === "twenty") {
      const secondWord = yearWords[1];
      const secondNumber = wordToNumber[secondWord] || 0;
      return secondNumber >= 3; // Will return true for "Twenty Three" and above
    }

    return false;
  };

  return (
    <div className="min-h-screen   p-8">
      <div className="max-w-6xl mx-auto border-2 border-gray-400 rounded-lg min-h-[80vh] p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
          {reviews?.map((review) => (
            <Dialog key={review?.slug?.current}>
              <DialogTrigger asChild>
                <div
                  className="transform cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
                  style={{
                    transform: getRandomRotation(),
                  }}
                >
                  <div className="bg-white p-2 shadow-lg">
                    <div className="relative h-40 w-full mb-4">
                      <Image
                        alt={review?.title || "Birthday memory"}
                        src={
                          review?.mainImage?.asset?.url || "/fallback-image.jpg"
                        }
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <p className="text-center font-handwriting text-lg mb-2">
                      {review.title}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="lg:max-w-[800px] bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                    <Image
                      alt={review?.title || "Birthday memory"}
                      src={
                        review?.mainImage?.asset?.url || "/fallback-image.jpg"
                      }
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-between p-4">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-2">
                        {review.title}
                      </DialogTitle>
                      <DialogDescription className="text-lg">
                        A snapshot of memories from this year.
                      </DialogDescription>
                    </DialogHeader>
                    {shouldShowButton(review.title) && (
                      <Link
                        href={`/year/${review?.slug?.current}`}
                        className="mt-4"
                      >
                        <Button className="w-full">Read More</Button>
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
