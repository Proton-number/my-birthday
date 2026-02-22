import Year from "./Year";
import sanityClient from "@/Client";

import { Metadata } from "next";

type Props = {
  params: Promise<{ yearId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yearId } = await params;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    mainImage{
      asset->{ url }
    }
  }`;
  const review = await sanityClient.fetch(query, { slug: yearId });

  return {
    title: review?.title || "Year Review",
    description: review?.description || "A year in review",
    openGraph: {
      title: review?.title || "Year Review",
      description: review?.description || "A year in review",
      images: [
        {
          url: review?.mainImage?.asset?.url || "/default-image.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: review?.title || "Year Review",
      description: review?.description || "A year in review",
      images: [
        {
          url: review?.mainImage?.asset?.url || "/default-image.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default function Page() {
  return <Year />;
}
