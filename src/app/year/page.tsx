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
    // First, try to parse the title assuming it contains numbers
    const numberMatch = title.match(/\d+/);
    if (numberMatch) {
      const age = parseInt(numberMatch[0]);
      return age >= 23;
    }

    // If no numbers found, handle word format
    const yearWords = title.toLowerCase().split(" ");

    // Convert word numbers to numeric values
    const wordToNumber: { [key: string]: number } = {
      twenty: 20,
      thirty: 30,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
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
    };

    let totalAge = 0;

    if (yearWords.length === 2) {
      // Handle cases like "Twenty Three"
      if (wordToNumber[yearWords[0]] && wordToNumber[yearWords[1]]) {
        totalAge = wordToNumber[yearWords[0]] + wordToNumber[yearWords[1]];
      }
      // Handle cases like "Twenty" + single digit
      else if (yearWords[0] === "twenty" && wordToNumber[yearWords[1]]) {
        totalAge = 20 + wordToNumber[yearWords[1]];
      }
    } else if (yearWords.length === 1) {
      // Handle single word numbers
      totalAge = wordToNumber[yearWords[0]] || 0;
    }

    return totalAge >= 23;
  };

  return (
    <div className="min-h-screen   p-8">
      <div className="max-w-7xl mx-auto border-2 border-gray-300 rounded-lg min-h-[80vh] p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reviews?.map((review) => (
            <Dialog key={review?.slug?.current}>
              <DialogTrigger asChild>
                <div
                  className="transform cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
                  style={{
                    transform: getRandomRotation(),
                  }}
                >
                  <div className="bg-white p-2 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        alt={review?.title || "Birthday memory"}
                        src={
                          review?.mainImage?.asset?.url || "/fallback-image.jpg"
                        }
                        fill
                        className="object-cover rounded-md"
                        priority
                      />
                    </div>
                    <p className="text-center font-handwriting text-sm truncate">
                      {review.title}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className=" max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] bg-white ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                  <div className="relative  w-full h-[300px]  lg:h-[400px] rounded-xl overflow-hidden ">
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
                        {review.description}
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
