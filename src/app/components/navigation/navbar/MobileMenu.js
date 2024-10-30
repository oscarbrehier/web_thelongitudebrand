import Link from "next/link";

export default function MobileMenu({ active, lang, auth, openModal }) {

    return (

        <div className={`${active ? "flex" : "hidden"} h-auto w-full bg-neon-green flex-col items-center pt-8 pb-10 children:capitalize space-y-2 `}>

            <Link href="/shop">shop</Link>
            {
                auth
                ? <Link href="/customer/personal-information">account</Link>
                : <button onClick={() => openModal('sign_in')}>log in</button>
            }

        </div>

    );

};