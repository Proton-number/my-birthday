import sanityClient from "@/Client";
import { create } from "zustand";
interface Image {
  asset?: {
    _id: string;
    url: string;
  };
  alt: string;
}

interface Reviews {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  mainImage?: Image;
  body: any;
  _id: string;
}



interface SanityStore {
  error: null | string;
  reviews: Array<Reviews> | null;
  fetchReviews: () => Promise<void>;
  singleReview: Reviews | null;
  fetchSingleReview: (yearId: string) => Promise<void>;
}
export const sanityStore = create<SanityStore>((set) => ({
  error: null,
  reviews: null,
  singleReview: null,
  fetchReviews: async () => {
    const REVIEW_QUERY = `*[_type == "post"] | order(_createdAt asc) [0...4]{
            title, 
            description,  
            slug, 
            projectUrl,
            mainImage{
                asset->{
                    _id, 
                    url
                }, 
                alt
            }, 
            body
        }`;
    try {
      const response = await sanityClient.fetch<Array<Reviews>>(REVIEW_QUERY);
      if (!response?.length) {
        console.log("PRojects");
        set({ reviews: [], error: "No projects found" });
        return;
      } else {
        console.log(" noPRojects");
      }
      set({ reviews: response, error: null });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: "Failed to fetch projects", reviews: null });
    }
  },
  fetchSingleReview: async (yearId) => {
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
        set({ singleReview: data[0], error: null });
      } else {
        set({
          singleReview: null,
          error: "No review found for the provided ID",
        });
      }
      //   if (data[0]?.title) {
      //     document.title = data[0].title;
      //   }
    } catch (error) {
      console.error("Error fetching single review:", error);
      set({ singleReview: null, error: "Failed to fetch single review" });
    }
  },
}));