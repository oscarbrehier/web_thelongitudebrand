import { createClient } from "@sanity/client"

export const client = createClient({
   projectId: "xgcgiqjg", 
   token: 'skTXgS94GRqOkkqtqbdPk02HMBME7aUHQIkRYWisEezY7u5GvrClqDsrB4uz5X8kUCehvakWAeB1dPJkneJZMvZ5EdUIEcq05JL7ZvIx3o84WVnUYQYRQ3gmazeK5SsmWXAw9v0tUq63XKZXD4natAH8HsCrm7PhymQh4K7w1EVGq37ooDNk',
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: false, 
});