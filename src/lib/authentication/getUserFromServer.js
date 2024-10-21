import { cookies } from "next/headers";
import { adminAuth, adminFirestore } from "@/lib/firestore/firebaseAdmin";

export default async function getUserFromServer() {

    const cookieStore = cookies();
    const authToken = cookieStore.get("authToken")?.value;

    const decodeToken = await adminAuth.verifyIdToken(authToken);
    const userId = decodeToken.uid;

    return userId;

};