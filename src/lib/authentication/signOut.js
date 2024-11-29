import firebase_app from "../firebase/client";
import { getAuth } from "firebase/auth";
import { captureException } from "@sentry/nextjs";
import { handleSignOutSession } from "@/actions/auth/handleSignOutSession";

const auth = getAuth(firebase_app);

export default async function signOut() {

    try {

        const [error, result] = await handleSignOutSession();

        if (result) {
            
            await auth.signOut();
            return true;

        };


        return false;

    } catch (err) {

        captureException(err);
        return false;

    };

};