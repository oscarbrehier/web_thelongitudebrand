import { doc, getDoc } from "@firebase/firestore";
import { database } from "../firebase/client";

export default async function getUserCustomerId(userId) {

    if (!userId) throw new Error("Invalid parameter `userId` for getUserCustomerId");

    try {

        const user = await getDoc(doc(database, "users", userId));
        return user.exists ? user.data().stripeCustomerId : null;

    } catch (err) {

        throw new Error("Could not retrieve user customer ID");

    };

};