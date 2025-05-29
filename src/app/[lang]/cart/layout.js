"use client";
import { useAuthContext } from "@/lib/context/AuthContext";
import LoadingPanel from "@/app/components/LoadingPanel";
import { useCartStore } from "@/lib/stores/useCartStore";

export default function Layout(props) {

    const {
        children
    } = props;

    const { loadingCart } = useCartStore((state) => ({ loadingCart: state.loadingCart }));

    return (

            <div className={`min-h-screen w-full ${loadingCart && "grid"}`}>

                <section className={`w-full min-h-screen flex flex-col ${loadingCart && "col-start-1 row-start-1"}`}>

                    {!loadingCart && children}

                </section>

                {loadingCart && (

                    <div className="size-full flex pt-16 col-start-1 row-start-1 z-10">
                        <LoadingPanel/>
                    </div>

                )}

            </div>

    );
}