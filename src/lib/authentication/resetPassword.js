import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default async function resetPassword(code, password) {

    if (!code && !password) return null;

    try {

        await verifyPasswordResetCode(auth, code);

    } catch (err) {

        throw err;

    };

};