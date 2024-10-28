import firebase_app from "../firebase/client";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import getUserFromUid from "./getUserFromUid";

const auth = getAuth(firebase_app);

export default async function secureSignIn(form) {

    let result = null, error = null;
    const { email, password } = form;

    try {

        result = await signInWithEmailAndPassword(auth, email, password);

        const res = await getUserFromUid(result.user.uid);

        if (!res.admin) {

            await signOut(auth);

        };

    } catch (err) {

        error = err;

    };

    return { result, error };

};