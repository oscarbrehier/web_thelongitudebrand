'use client'

import firebase_app from "@/lib/authentication/firebase";
import { useAuthContext } from "@/lib/context/AuthContext"
import { getAuth } from "firebase/auth";
import { useTranslation } from "@/app/i18n/client";

const auth = getAuth(firebase_app);

export default function Page({ params: { lang } }) {

    const { user } = useAuthContext();
    const { t } = useTranslation(lang, "dev");

    const handleButton = async () => {

        console.log(t("title"));

    };

    return (

        <div>
            <button onClick={handleButton}>
                click
            </button>
        </div>

    )

}