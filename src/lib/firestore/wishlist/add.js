import { database } from "@/lib/firebase/client";
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "@firebase/firestore";

export default async function addToWishlist(productId, userId) {

    const ref = doc(database, "wishlists", userId);
    const snapshot = await getDoc(ref);

    try {

        if (snapshot.exists()) {

            await updateDoc(ref, {
                items: arrayUnion(productId),
                updatedAt: Timestamp.now(),
            });

        } else {

            const createRef = doc(database, "wishlists", userId);

            await setDoc(createRef, {
                items: [
                    productId
                ],
                updatedAt: Timestamp.now(),
            });

        };

    } catch (err) {

        console.error(err);

    };

};