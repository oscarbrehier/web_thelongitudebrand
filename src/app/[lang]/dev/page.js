'use client'

import firebase_app from "@/lib/authentication/firebase";
import { useAuthContext } from "@/lib/context/AuthContext"
import { getAuth } from "firebase/auth";
import useTranslation from "i18n/client";
import { useEffect } from "react"
const auth = getAuth(firebase_app);
import { v4 as uuidv4 } from 'uuid';

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