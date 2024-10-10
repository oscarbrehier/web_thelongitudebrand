import { client } from "./client";

export default async function getUserByFirebaseId(firebaseId) {

    const query = `*[_type == "user" && firebaseId == $firebaseId][0]`;
    const params = { firebaseId };

    const user = await client.fetch(query, params);
    return user;

};