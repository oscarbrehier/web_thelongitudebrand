import { client } from "./client";

export default async function createUser(id, email) {

    let doc = {
        _type: 'user',
        firebaseId: id,
        email,
    };

    try {

        client.create(doc);
        return;
 
    } catch (err) {

        throw new Error(err);

    };

};