"use client";

import { sanityStore } from "@/Store/sanityStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";
import FloatingButton from "@/components/FloatingButton";

export default function Page() {
  const { yearId } = useParams();
  const { singleReview, fetchSingleReview, error } = sanityStore();

  useEffect(() => {
    if (yearId && typeof yearId === "string") {
      fetchSingleReview(yearId);
    }
  }, [yearId, fetchSingleReview]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!singleReview) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col  p-10 items-justify relative ">
      <div className="max-w-4xl mx-auto font-mono pb-8">
        <PortableText value={singleReview.body} />
      </div>

      <FloatingButton />
    </div>
  );
}
