import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
   projectId: "xgcgiqjg",
   dataset: "production",
   apiVersion: "2025-06-11",
   useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
   return builder.image(source);
};