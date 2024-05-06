import createUser from "../sanity/createUser";
import firebase_app from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function register(email, password) {

    let firebase;
    let sanity;
    let error;

    try {

        firebase = await createUserWithEmailAndPassword(auth, email, password);
        sanity = await createUser(firebase.user.uid, email);

    } catch (err) {

        error = err;

    };

    return { result: firebase, error };

};