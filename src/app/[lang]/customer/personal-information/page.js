import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import { PersonalInformationForm } from "./PersonalInformationForm";
import { adminFirestore } from "@/lib/firebase/admin";
import { useTranslation } from "@/app/i18n";
import { getUserById } from "@/lib/firestore/getUserById";
import Button from "@/app/components/ui/Button";
import { FetchFail } from "./FetchFail";

export default async function Page(props) {

    const params = await props.params;
    const { lang } = params;
    const { t } = await useTranslation(lang, ["navigation"]);

    const authUser = await getCurrentUser();
    const firestoreUserData = await getUserById(authUser.uid, { email: authUser.email });

    if (!firestoreUserData) {
        return (<FetchFail lang={lang} />);
    }

    firestoreUserData["email"] = authUser.email;
    delete firestoreUserData.updatedAt;

    return (

        <div className="flex-1 w-full flex flex-col">
            <div className="w-full 2md:grid grid-cols-4 gap-2 mt-16 pt-14">
                <div className="col-start-2 col-span-2 h-auto">
                    <h1 className="capitalize mx-2 my-1 text-lg">{t("personal_information")}</h1>
                    {firestoreUserData && <PersonalInformationForm content={firestoreUserData} lang={lang} />}
                </div>
            </div>
        </div>

    );
};