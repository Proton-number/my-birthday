import sanityClient from "@/Client";

export async function fetchReview(yearId: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    mainImage{
      asset->{ url }
    }
  }`;

  return sanityClient.fetch(query, { slug: yearId });
}
