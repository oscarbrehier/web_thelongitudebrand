import firebase_app from "./firebase";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOut() {

    let error = null;

    try {

        await firebaseSignOut(auth);

    } catch (err) {

        error = err;

    };

    return { error };

};