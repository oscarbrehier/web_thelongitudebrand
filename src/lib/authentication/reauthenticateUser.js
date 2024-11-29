import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../firebase/client";

export default async function reauthenticateUser(password) {

    const user = auth.currentUser;

    const crendential = EmailAuthProvider.credential(user.email, password);

    try {

        await reauthenticateWithCredential(user, crendential);

    } catch (err) {

        throw err.code;

    };

};