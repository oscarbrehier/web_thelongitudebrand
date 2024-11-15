import firebase_app, { database } from "../firebase/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import setSessionCookie from "./setSessionCookie";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import createCustomer from "../../actions/stripe/createCustomer";
import createUser from "../firestore/createUser";

const auth = getAuth(firebase_app);

export default async function signUp(form) {

    const {
        firstName,
        lastName,
        email,
        password,
        newsletter,
        terms
    } = form;

    try {

        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        const stripeCustomer = await createCustomer(`${firstName} ${lastName}`, email);

        if (stripeCustomer?.errors) throw new Error("Failed to create customer.");

        const userUid = firebaseUser.user.uid;

        await createUser(userUid, {
            firstName,
            lastName,
            newsletterSubscriber: newsletter,
            termsAndConditions: terms,
            dateOfBirth: "0000-00-00",
            stripeCustomerId: stripeCustomer.id,
        });

        const idToken = await firebaseUser.user.getIdToken();
        await setSessionCookie(idToken);

    } catch (err) {

        console.error("Failed to sign up user");
        throw err;

    };

};