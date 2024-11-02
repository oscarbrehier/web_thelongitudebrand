import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Content from "./content";
import { adminFirestore } from "@/lib/firebase/admin";

export default async function Page({
    params: {
        lang
    }
}) {

    const user = await getCurrentUser();
    const firestoreUser = await adminFirestore
        .collection("users")
        .doc(user.uid)
        .get();

    const content = firestoreUser.exists ? firestoreUser.data() : null;
    content["email"] = user.email;

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <h1 className="capitalize mx-2 my-1 text-lg">personal information</h1>

                <Content content={content} lang={lang} />

            </div>
        </div>

    );

};