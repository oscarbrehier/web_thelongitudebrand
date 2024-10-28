import firebase_app, { database } from "../firebase/client";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "@firebase/firestore";

const auth = getAuth(firebase_app);

const setSessionCookie = async (idToken) => {

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

};

async function signUp(form) {

    const {
        firstName,
        lastName,
        email,
        password,
        newsletter,
        terms
    } = form;

    try {

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const uid = res.user.uid;
        const idToken = await res.user.getIdToken();

        await setDoc(doc(database, 'users', uid), {
            firstName,
            lastName,
            newsletterSubscriber: newsletter,
            termsAndConditions: terms,
            dateOfBirth: "0000-00-00",
        });

        await setDoc(doc(database, "carts", uid), {
            items: [],
            updatedAt: Timestamp.now()
        });

        const response = await setSessionCookie(idToken);
        return response;

    } catch (err) {

        throw err;

    };

};

async function signIn(email, password) {

    try {

        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();

        const response = await setSessionCookie(idToken);
        return response;

    } catch (e) {

        throw e;

    };

};

async function signOut() {

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

export {
    signUp,
    signIn,
    signOut,
}