"use client"
import { useCartStore } from "@/lib/stores/useCartStore";
import CartItemSmall from "./CartItemSmall";

export default function CartView({
    lang
}) {

    const { cart, total } = useCartStore((state) => ({
        cart: state.cart,
        total: state.total
    }));

    return (

        <div className="w-full h-auto">
            <h2 className="capitalize mx-2 my-1 text-lg">summary ({cart?.length} items)</h2>

            <div className="text-sm capitalize space-y-1 mt-4">

                <div className="w-full flex justify-between">
                    <p className="text-xs">shipping cost</p>
                    <p className="text-xs">calculated at checkout</p>
                </div>

                <div className="w-full flex justify-between">
                    <p className="text-sm">subtotal</p>
                    <p className="text-sm bg-neon-green">{total} €</p>
                </div>

            </div>

            <div className="mt-6 flex flex-col space-y-2">
                {cart && cart.map((item) => (
                    <CartItemSmall
                        content={item}
                        allowModifications={false}
                        imageBg="cream-300"
                    />
                ))}
            </div>

        </div>

    );

};