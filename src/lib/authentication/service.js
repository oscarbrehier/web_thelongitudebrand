import firebase_app, { database } from "../firebase/firebase";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "@firebase/firestore";

const auth = getAuth(firebase_app);

async function signUp(form) {

    let firebase;
    let error;

    const {
        firstName,
        lastName,
        email,
        password,
        newsletter,
        terms
    } = form;

    try {

        firebase = await createUserWithEmailAndPassword(auth, email, password);

        const uid = firebase.user.uid;

        if (uid) {

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

        };

    } catch (err) {

        error = err;
        throw err;

    };

    return { result: firebase, error };

};

async function signIn(email, password) {

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