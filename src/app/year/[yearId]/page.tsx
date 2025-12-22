import { fetchReview } from "@/lib/fetchReview";
import Year from "./Year";

import { Metadata } from "next";

type Props = {
  params: { yearId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = await fetchReview(params.yearId);

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

export default function page() {
  return <Year />;
}
