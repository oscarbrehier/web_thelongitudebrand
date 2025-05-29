import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Content from "./content";
import { adminFirestore } from "@/lib/firebase/admin";
import { useTranslation } from "@/app/i18n";

export default async function Page(props) {

    const params = await props.params;

    
    const {
        lang
    } = params;
    const { t } = await useTranslation(lang, "customer");
    
    const user = await getCurrentUser();
    const firestoreUser = await adminFirestore
        .collection("users")
        .doc(user.uid)
        .get();

    const content = firestoreUser.exists ? firestoreUser.data() : null;
    content["email"] = user.email;

    return (

        <div className="flex-1 w-full flex flex-col">

            {/* <h1 className="capitalize font-playfair text-5xl italic mt-10">personal information</h1> */}

            <div className="w-full 2md:grid grid-cols-4 gap-2 mt-16 pt-14">

                <div className="col-start-2 col-span-2 h-auto">

                    <h1 className="capitalize mx-2 my-1 text-lg">personal information</h1>
                    {content && <Content content={content} lang={lang} />}

                </div>

            </div>

        </div>


    );
};