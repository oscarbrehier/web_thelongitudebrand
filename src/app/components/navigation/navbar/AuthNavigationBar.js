import { useTranslation } from "@/app/i18n";
import { isUserAuthenticated } from "@/lib/authentication/firebaseAdmin";
import Link from "next/link";
import InteractiveNavItems from "./InteractiveNavItems";

export default async function AuthNavigationBar({ lang }) {

    const isAuth = await isUserAuthenticated();
    const { t } = await useTranslation();

    return (

        <div className="md:h-10 h-auto w-full md:grid lg:grid-cols-4 md:grid-cols-3 gap-2 flex flex-col items-center justify-between md:p-0 pt-2 bg-neon-green text-xs z-20 top-4">

            <div className="md:w-1/4 w-full md:block flex justify-center">
                <Link href="/">the<span className="font-semibold">longitude</span>brand</Link>
            </div>

            <div className="h-full w-full md:flex hidden items-center justify-end lg:col-span-2">
                <Link className="text-black" href="/shop">{t('shop')}</Link>
            </div>

            <InteractiveNavItems authenticated={isAuth} lang={lang} />

        </div>

    );

};