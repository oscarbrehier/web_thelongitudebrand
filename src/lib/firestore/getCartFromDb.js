import { doc, getDoc } from "@firebase/firestore";
import { database } from "../authentication/firebase";

export default async function getCartFromDb(userId) {

    const ref = doc(database, 'carts', userId);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {

        return snapshot.data();

    } else {

        return null;

    };

};