import { verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase/client";

export default async function resetPassword(code, password) {

    if (!code && !password) return null;

    try {

        await verifyPasswordResetCode(auth, code);

    } catch (err) {

        throw err;

    };

};