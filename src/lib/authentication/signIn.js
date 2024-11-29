import firebase_app from "../firebase/client";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import setSessionCookie from "./setSessionCookie";
import { handleSignInSession } from "@/actions/auth/handleSignInSession";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {

    try {

        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();

        const response = await setSessionCookie(idToken);

        await handleSignInSession();

        return response;

    } catch (err) {

        throw err;

    };

};