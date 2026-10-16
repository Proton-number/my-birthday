import { cache } from "react";
import { notFound } from "next/navigation";
import Year from "./Year";
import sanityClient from "@/Client";

import { Metadata } from "next";

type Props = {
  params: Promise<{ yearId: string }>;
};

type Review = {
  title?: string;
  description?: string;
  mainImage?: { asset?: { url?: string } };
};

// Re-generate this page in the background at most once a minute
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const reviewQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  mainImage{
    asset->{ url }
  }
}`;

// cache() dedupes the fetch if metadata and the page both ask for the same slug
const getReview = cache(
  async (slug: string): Promise<Review | null> =>
    sanityClient.fetch(reviewQuery, { slug }),
);

// Pre-build every year page at build time
export async function generateStaticParams() {
  const slugs: { yearId: string }[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)]{ "yearId": slug.current }`,
  );
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yearId } = await params;
  const review = await getReview(yearId);

  const title = review?.title || "Year Review";
  const description = (review?.description || "A year in review").slice(0, 160);

  // Ask Sanity's CDN for a properly cropped 1200x630 preview image
  const sanityUrl = review?.mainImage?.asset?.url;
  const image = sanityUrl
    ? `${sanityUrl}?w=1200&h=630&fit=crop&fm=jpg`
    : "/default-image.jpg";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { yearId } = await params;
  const review = await getReview(yearId);

  // Unknown slug -> proper 404 instead of an empty page
  if (!review) notFound();

  return <Year />;
}
