import { createClient } from "@sanity/client"

export const client = createClient({
   projectId: "xgcgiqjg", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: false, 
});