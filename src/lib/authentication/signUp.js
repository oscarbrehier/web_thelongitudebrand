import firebase_app, { database } from "../firebase/client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import setSessionCookie from "./setSessionCookie";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import createCustomer from "../../actions/stripe/createCustomer";
import createUser from "../firestore/createUser";
import { captureException } from "@sentry/nextjs";

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
        console.log("Starting sign up process for:", email);
        
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Firebase user created successfully");
        
        const stripeCustomer = await createCustomer(`${firstName} ${lastName}`, email);
        console.log("Stripe customer created:", stripeCustomer?.id);

        if (stripeCustomer?.errors) {
            console.error("Stripe customer creation failed:", stripeCustomer.errors);
            throw new Error("Failed to create customer.");
        }

        const userUid = firebaseUser.user.uid;
        console.log("Creating user document in Firestore");

        await createUser(userUid, {
            firstName,
            lastName,
            newsletterSubscriber: newsletter,
            termsAndConditions: terms,
            dateOfBirth: "0000-00-00",
            stripeCustomerId: stripeCustomer.id,
        });
        console.log("User document created successfully");

        const idToken = await firebaseUser.user.getIdToken();
        console.log("Got ID token, setting session cookie");
        
        const cookieResult = await setSessionCookie(idToken);
        if (!cookieResult) {
            console.error("Failed to set session cookie");
            throw new Error("Failed to set session cookie");
        }
        console.log("Session cookie set successfully");

    } catch (err) {
        console.error("Failed to sign up user:", err);
        captureException(err);
        throw err;
    }
}