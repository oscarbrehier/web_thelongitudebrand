import firebase_app from "./firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {

    try {

        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();

        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken }),
        });

        const resBody = await response.json();

        if (response.ok && resBody.success) {

            return true;

        } else return false;

    } catch (error) {

        console.error("Sign in error", error);
        return false;

    };

};

export async function signOut() {

    try {

        await auth.signOut();

        const response = await fetch("/api/auth/sign-out", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const resBody = await response.json();

        if (response.ok && resBody.success) {

            return true;

        } else return false;

    } catch (error) {

        console.error("Sign out error", error);
        return false;

    };

};