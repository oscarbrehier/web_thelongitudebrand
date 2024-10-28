import { database } from "@/lib/firebase/client";
import { arrayRemove, doc, Timestamp, updateDoc } from "@firebase/firestore";

export default async function removeFromWishlist(productId, userId) {

    const ref = doc(database, "wishlists", userId);

    try {

        await updateDoc(ref, {
            items: arrayRemove(productId),
            updatedAt: Timestamp.now(),
        });

    } catch (err) {

        console.error(err);

    };

};