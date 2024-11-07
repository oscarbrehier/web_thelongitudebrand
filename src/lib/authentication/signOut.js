import firebase_app from "../firebase/client";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOut() {

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

    } catch (e) {

        throw e;

    };

};