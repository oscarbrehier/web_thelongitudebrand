import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/client";

export default async function getUserFromUid(userUid) {

    const res = await getDoc(doc(database, 'users', userUid));

    if (res.exists()) {

        return res.data();

    };

    return null;

};