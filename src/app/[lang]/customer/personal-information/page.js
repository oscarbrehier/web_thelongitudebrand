import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Content from "./content";
import { adminFirestore } from "@/lib/firebase/admin";
import { useTranslation } from "@/app/i18n";

export default async function Page({
    params: {
        lang
    }
}) {

    const user = await getCurrentUser();

    const { t } = await useTranslation(lang, "customer")

    if (!user?.uid) return;

    const firestoreUser = await adminFirestore
        .collection("users")
        .doc(user.uid)
        .get();

    const content = firestoreUser.exists ? firestoreUser.data() : null;
    content["email"] = user.email;
    content["lastPasswordUpdate"] = null;

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <h1 className="capitalize mx-2 my-1 text-lg">{t("personal_information")}</h1>

                    {content && <Content content={content} lang={lang} />}

            </div>
        </div>

    );

};