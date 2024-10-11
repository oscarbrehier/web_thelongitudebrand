import { database } from "@/lib/authentication/firebase";
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "@firebase/firestore";

export default async function addToWishlist(productId, userId) {

    const ref = doc(database, "wishlist", userId);
    const snapshot = await getDoc(ref);

    try {

        if (snapshot.exists()) {

            await updateDoc(ref, {
                items: arrayUnion(productId),
                updatedAt: Timestamp.now(),
            });

        } else {

            const createRef = doc(database, "wishlist", userId);

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