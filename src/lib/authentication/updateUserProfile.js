import { doc, updateDoc } from "@firebase/firestore";
import { database } from "../firebase/firebase";

export default async function updateUserProfile(userUid, data) {

    try {

        await updateDoc(doc(database, "users", userUid), data);

    } catch (error) {

        return error;

    };

};