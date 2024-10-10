import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import createUser from "../sanity/createUser";
import firebase_app, { database } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


const auth = getAuth(firebase_app);

export default async function register(form) {

    let firebase;
    let sanity;
    let error;

    const { 
        firstName,
        lastName,
        email,
        password,
        newsletter,
        termsAndConditions
    } = form;

    try {

        firebase = await createUserWithEmailAndPassword(auth, email, password);
        sanity = await createUser(firebase.user.uid, email);

        const uid = firebase.user.uid;
       
        if (uid) {

            await setDoc(doc(database, 'users', uid), {
                firstName,
                lastName,
                newsletterSubscriber: newsletter,
                termsAndConditions: termsAndConditions,
                dateOfBirth: "0000-00-00",
            });

        };

    } catch (err) {

        error = err;

    };

    return { result: firebase, error };

};