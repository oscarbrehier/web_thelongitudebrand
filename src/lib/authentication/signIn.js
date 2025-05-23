import firebase_app from "../firebase/client";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import setSessionCookie from "./setSessionCookie";
import { captureException } from "@sentry/nextjs";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {

    try {

        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();

        const response = await setSessionCookie(idToken);
        return response;

    } catch (err) {

        captureException(err);
        console.error(err);
        throw err;

    };

};