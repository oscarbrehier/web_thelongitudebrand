import { cookies } from "next/headers";
import { adminAuth } from "../firebase/admin";
import { storageKeys } from "../constants/settings.config";

export default async function getUserFromServer() {

    const cookieStore = cookies();
    const authToken = cookieStore.get(storageKeys.AUTH_TOKEN)?.value;

    const decodeToken = await adminAuth.verifyIdToken(authToken);
    const userId = decodeToken.uid;

    return userId;

};