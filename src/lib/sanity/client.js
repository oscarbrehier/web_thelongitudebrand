import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
   projectId: "xgcgiqjg",
   dataset: "production",
   apiVersion: "2024-03-11",
   useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
   return builder.image(source);
};