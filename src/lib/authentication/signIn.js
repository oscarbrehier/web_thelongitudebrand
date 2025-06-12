import firebase_app from "../firebase/client";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import setSessionCookie from "./setSessionCookie";
import { captureException } from "@sentry/nextjs";

const auth = getAuth(firebase_app);

export default async function signIn(email, password, setCartSync) {

    try {

        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();
        const { user } = userCreds;

        setCartSync(true);

        const response = await setSessionCookie(idToken);
        return {
            result: response,
            user: {
                uid: user.uid,
                email: user.email
            }
        };

    } catch (err) {

        captureException(err);
        throw err;

    };

};