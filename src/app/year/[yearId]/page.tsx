import { fetchReview } from "@/lib/fetchReview";
import Year from "./Year";

import { Metadata } from "next";

type Props = {
  params: Promise<{ yearId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yearId } = await params;

  const review = await fetchReview(yearId);

  return {
    title: review?.title || "Year Review",
    description: review?.description || "A year in review",
    openGraph: {
      title: review?.title || "Year Review",
      description: review?.description || "A year in review",
      images: [review?.mainImage?.asset?.url || "/default-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default function Page() {
  return <Year />;
}
