import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Content from "./content";
import { adminFirestore } from "@/lib/firebase/admin";

export default async function Page(props) {

    const params = await props.params;

    const {
        lang
    } = params;

    const user = await getCurrentUser();
    const firestoreUser = await adminFirestore
        .collection("users")
        .doc(user.uid)
        .get();

    const content = firestoreUser.exists ? firestoreUser.data() : null;
    content["email"] = user.email;

    return (

        <div className="flex-1 w-full flex flex-col">

            <h1 className="capitalize font-playfair text-5xl italic">personal information</h1>

            <div className="w-full mt-14 2md:grid grid-cols-4 gap-2">

                <div className="col-start-2 col-span-2 h-auto">

                    {content && <Content content={content} lang={lang} />}

                </div>

            </div>

        </div>


    );
};