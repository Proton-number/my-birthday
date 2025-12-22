import sanityClient from "@/Client";

export async function fetchReview(yearId: string) {
  try {
    const query = `*[_type == "post" && slug.current == $slug]{
            title,
            _id,
            slug,
            mainImage{
                asset -> {
                    _id,
                    url
                }
            },
            body,
        }`;
    const data = await sanityClient.fetch(query, { slug: yearId });
    if (data?.[0]) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching single review:", error);
    return null;
  }
}
