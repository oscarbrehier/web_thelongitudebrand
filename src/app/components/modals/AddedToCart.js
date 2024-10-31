import { IoClose } from "react-icons/io5";
import { useModalContext } from "@/lib/context/ModalContext";
import Button from "../ui/Button";
import { useCartStore } from "@/lib/stores/useCartStore";
import CartItemSmall from "../CartItemSmall";
import Hyperlink from "../ui/Hyperlink";
import { useMemo } from "react";

export default function AddedToCart() {

    const { closeModal } = useModalContext();

    const { cart, cartLength, total } = useCartStore(state => ({
        cart: state.cart,
        cartLength: state.cart.length,
        total: state.total,
    }));

    const reversedCart = useMemo(() => [...cart].reverse(), [cart]);

    return (

        <div className="
            xl:w-1/4 lg:w-1/3 lg:h-screen fixed z-20 lg:top-0 right-0 bg-cream-300 p-4 flex flex-col justify-between space-y-4
            w-full h-auto bottom-0
        ">

            <div className="w-full h-10 flex justify-between items-center">

                <p className="text-sm lg:block hidden">Your shopping bag ({cartLength} items)</p>
                <p className="text-sm lg:hidden">Added to cart</p>

                <button onClick={closeModal} className="bg-neon-green p-1">
                    <IoClose />
                </button>

            </div>

            <div className="flex-1 w-full overflow-y-scroll space-y-2 lg:block hidden">

                {
                    reversedCart.map((item, index) => (
                        <CartItemSmall key={index} content={item} />
                    ))
                }

            </div>

            <div className="flex-1 w-full overflow-y-scroll space-y-2 lg:hidden">
                <CartItemSmall content={[...cart].reverse()[0]} single />
            </div>

            <div className="h-auto flex flex-col space-y-4">

                <div className="lg:block hidden text-sm capitalize space-y-1">

                    <div className="w-full flex justify-between">
                        <p className="text-xs">shipping cost</p>
                        <p className="text-xs">calculated at checkout</p>
                    </div>

                    <div className="w-full flex justify-between">
                        <p className="text-sm">total</p>
                        <p className="text-sm bg-neon-green">{total} €</p>
                    </div>

                </div>

                <div className="lg:space-y-2 space-y-0 lg:block grid sm:grid-cols-2 gap-2">

                    <Button
                        title="proceed to checkout"
                        size="h-10 w-full"
                    />

                    <Hyperlink
                        title="view shopping bag"
                        to="/cart"
                        size="h-10 w-full"
                        border
                    />

                </div>

            </div>

        </div>

    );

};