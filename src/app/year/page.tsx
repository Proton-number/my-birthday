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
import { motion, useReducedMotion } from "motion/react";

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

const parseAgeFromTitle = (title: string): number => {
  const numberMatch = title.match(/\d+/);
  if (numberMatch) {
    return parseInt(numberMatch[0]);
  }

  // split on spaces AND hyphens so "twenty-one" works
  const words = title
    .toLowerCase()
    .trim()
    .split(/[\s-]+/);
  let total = 0;

  for (const word of words) {
    if (wordToNumber[word] !== undefined) {
      total += wordToNumber[word];
    }
  }

  return total;
};

// Stable tilt between -9 and 9 degrees, derived from a string (no Math.random in render)
const rotationFor = (key: string): number => {
  let hash = 0;
  for (const char of key) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return (Math.abs(hash) % 1800) / 100 - 9;
};

function Years() {
  const { reviews, fetchReviews } = sanityStore();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    fetchReviews().catch((error) => {
      console.error("Error encountered when fetching:", error);
    });
  }, [fetchReviews]);

  const sortedReviews = useMemo(() => {
    if (!reviews) return [];

    return [...reviews].sort((a, b) => {
      const ageA = parseAgeFromTitle(a.title);
      const ageB = parseAgeFromTitle(b.title);
      return ageA - ageB; // Ascending order
    });
  }, [reviews]);

  // Check if a review should show the button (age 23+)
  const shouldShowButton = (title: string): boolean => {
    const age = parseAgeFromTitle(title);
    return age >= 23;
  };

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
      <div className="max-w-5xl mx-auto border-2 border-gray-300 rounded-lg min-h-[80vh] p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sortedReviews.map((review, index) => {
            const slug = review?.slug?.current ?? String(index);
            const rotation = rotationFor(slug);
            const imageSrc =
              review?.mainImage?.asset?.url || "/fallback-image.jpg";
            const imageAlt =
              review?.mainImage?.alt || review?.title || "Birthday memory";

            return (
              <Dialog key={slug}>
                <DialogTrigger asChild>
                  <motion.button
                    type="button"
                    // dropped onto the table: falls from above, settles at its tilt
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: -120,
                            rotate: rotation + (rotation > 0 ? 25 : -25),
                            scale: 0.9,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotate: rotation,
                      scale: 1,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      damping: 12,
                      mass: 0.9,
                      delay: (index % 5) * 0.09,
                    }}
                    // picked up off the table: straightens, lifts, enlarges
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: 0,
                            scale: 1.1,
                            y: -8,
                            zIndex: 10,
                            transition: {
                              type: "spring",
                              stiffness: 250,
                              damping: 18,
                            },
                          }
                    }
                    whileTap={{ scale: 0.97 }}
                    className="relative cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    {/* washi tape */}
                    <span
                      aria-hidden
                      className="absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-2 bg-amber-200/70 shadow-sm"
                    />
                    <div className="bg-white p-2 shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                      <div className="relative mb-4 h-32 w-full">
                        <Image
                          alt={imageAlt}
                          src={imageSrc}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="rounded-md object-cover"
                          priority={false}
                        />
                      </div>
                      <p className="truncate text-center font-handwriting text-sm">
                        {review.title}
                      </p>
                    </div>
                  </motion.button>
                </DialogTrigger>

                <DialogContent className="max-w-[350px] bg-white sm:max-w-[500px] lg:max-w-[800px]">
                  <div className="grid grid-cols-1 gap-6 p-1 md:grid-cols-2">
                    {/* curtain-wipe reveal: bottom to top, with a gentle zoom settle */}
                    <div className="relative h-[300px] w-full overflow-hidden rounded-xl lg:h-[400px]">
                      <motion.div
                        className="absolute inset-0"
                        initial={
                          reduceMotion
                            ? false
                            : {
                                clipPath: "inset(100% 0% 0% 0%)",
                                scale: 1.12,
                              }
                        }
                        animate={{
                          clipPath: "inset(0% 0% 0% 0%)",
                          scale: 1,
                        }}
                        transition={{
                          duration: 1.1,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.1,
                        }}
                      >
                        <Image
                          alt={imageAlt}
                          src={imageSrc}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={false}
                        />
                      </motion.div>
                    </div>

                    <div className="flex flex-col justify-between p-4">
                      <DialogHeader>
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <DialogTitle className="mb-2 text-2xl font-bold">
                            {review.title}
                          </DialogTitle>
                        </motion.div>
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                        >
                          <DialogDescription className="text-sm">
                            {review.description}
                          </DialogDescription>
                        </motion.div>
                      </DialogHeader>

                      {shouldShowButton(review.title) && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 }}
                          className="mt-4"
                        >
                          <Link href={`/year/${review?.slug?.current}`}>
                            <Button className="w-full">Go to review</Button>
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Years;
