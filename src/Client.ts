import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "k525kfu7",
  dataset: "production",
  apiVersion: "2024-01-09", // Use current date
  useCdn: true,
});

export default sanityClient;
