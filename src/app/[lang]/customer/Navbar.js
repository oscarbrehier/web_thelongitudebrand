'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { storageKeys } from "@/lib/constants/settings.config";
import { useCartStore } from "@/lib/stores/useCartStore";
import { signOut } from "@/lib/authentication/service";

export default function Navbar({ categories }) {

    const pathname = usePathname();
    const router = useRouter();

    const { clearCart } = useCartStore((state) => ({ clearCart: state.clearCart }));

    const handleSignOut = async () => {

        clearCart();
        localStorage.removeItem(storageKeys.CART);

        const res = await signOut();

        if (!res) console.error("error signing out");
        router.push("/shop");

    };

    return (

        <div className="w-full flex justify-between">

            <div className="w-auto flex xs:flex-row flex-col xs:items-center items-start text-sm xs:space-x-2 xs:space-y-0 space-y-1 cursor-pointer">

                {
                    categories && categories.map((category, index) => (
                        <Link
                            href={`/customer/${category}`}
                            key={index}
                            className={`${pathname.toString().includes(`/customer/${category}`) && 'bg-neon-green'}`}
                        >
                            {category.replace(/-/g, ' ')}
                        </Link>
                    ))
                }


            </div>

            <button onClick={handleSignOut} className="text-sm hover:bg-neon-green">log out</button>

        </div>

    );

};