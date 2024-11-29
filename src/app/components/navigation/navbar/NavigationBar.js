import { storageKeys } from "@/lib/constants/settings.config";
import NavigationBarInteractive from "./NavigationBarInteractive";
import { cookies } from "next/headers";
import { getCache } from "@/lib/redis";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";

export default async function NavigationBar({
    lang
}) {

    const getAuthFromCache = async () => {

        const sessionId = cookies().get(storageKeys.SESSION_ID)?.value;
        if (!sessionId) return;

        const currentUser = await getCurrentUser();

        const [error, result] = await getCache({
            key: `user-${sessionId}`,
            fn: () => currentUser?.uid ? true : false,
        });

        if (error) return;

        return result;

    };

    const isAuth = await getAuthFromCache();

    return (

        <NavigationBarInteractive
            lang={lang}
            isAuth={isAuth}
        />

    );

};