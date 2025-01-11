"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sanityStore } from "@/Store/sanityStore";
import Link from "next/link";
import React, { useEffect } from "react";

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
        <p>days</p>
        {reviews?.map((review) => (
          <React.Fragment key={review?.slug?.current}>
            <Dialog>
              <DialogTrigger asChild>
                <div>{review.title}</div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{review.title}</DialogTitle>
                  <DialogDescription>
                nothing
                  </DialogDescription>
                </DialogHeader>
                <Link href={`/year/${review?.slug?.current}`}>
                  <Button>Review</Button>
                </Link>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
}
