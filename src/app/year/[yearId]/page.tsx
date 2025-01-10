"use client";

import { sanityStore } from "@/Store/sanityStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";

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
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">{singleReview?.title}</h1>
      <div className="prose max-w-prose">
        <PortableText value={singleReview.body} />
      </div>
    </div>
  );
}
