import { collection, getDocs, query, where } from "@firebase/firestore";
import { database } from "../authentication/firebase";

export default async function getOrders(userId) {

    try {

        const res = await getDocs(query(collection(database, "order"),
            where("userId", "==", userId),
        ));

        return res.empty ? [] : res.docs;

    } catch (err) {

        throw new Error("Failed to fetch orders.");

    };

};