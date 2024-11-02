import { IoClose } from "react-icons/io5";
import { useModalContext } from "@/lib/context/ModalContext";
import Button from "../ui/Button";
import { useCartStore } from "@/lib/stores/useCartStore";
import CartItemSmall from "../CartItemSmall";
import Hyperlink from "../ui/Hyperlink";
import { useMemo } from "react";
import { useAuthContext } from "@/lib/context/AuthContext";

export default function AddedToCart() {

    const { closeModal } = useModalContext();

    const { isAuth } = useAuthContext();

    const { cart, cartLength, total } = useCartStore(state => ({
        cart: state.cart,
        cartLength: state.cart.length,
        total: state.total,
    }));

    const reversedCart = useMemo(() => [...cart].reverse(), [cart]);

    return (

        <div className="
            xl:w-1/2 lg:w-1/3 xl:pl-4 lg:pl-3 lg:h-auto fixed z-20 lg:bottom-4 lg:right-4 flex flex-col justify-between space-y-4
            w-full h-auto bottom-0 right-0
        ">

            <div className="bg-cream-200 p-4 space-y-4">

                <div className="w-full h-10 flex justify-between items-center">

                    <p className="text-sm">Added to cart</p>

                    <button onClick={closeModal} className="bg-neon-green p-1">
                        <IoClose />
                    </button>

                </div>

                {cartLength > 0 ? (

                    <>
                        <div className="w-full space-y-2">
                            <CartItemSmall content={reversedCart[0]} single />
                        </div>

                        <div className="h-auto flex flex-col space-y-4">

                            <div className="space-y-0 grid sm:grid-cols-2 gap-2">

                                <Button
                                    title="continue shopping"
                                    size="h-10 w-full"
                                    border
                                />

                                <Hyperlink
                                    title="view shopping bag"
                                    to="/cart"
                                    size="h-10 w-full"
                                    onClick={() => closeModal()}
                                />



                            </div>

                        </div>

                    </>

                ) : (

                    <>

                        <div className="flex-1 w-full pt-10 flex flex-col">

                            <p className="text-lg">Your cart is empty</p>
                            <p className="text-sm">Discover our products by clicking the our suggestions for you, or sign in to save your favorite products.</p>

                        </div>

                        <div className="space-y-2">

                            <Hyperlink
                                title="continue shopping"
                                size="h-10 w-full"
                                to="/shop"
                            />

                            <Hyperlink
                                title={isAuth ? "view your wishlist" : "sign in"}
                                size="h-10 w-full"
                                to={isAuth ? "/customer/wishlist" : "/auth/sign-in"}
                                border
                                margin={false}
                            />

                        </div>

                    </>

                )}

            </div>

        </div>

    );

};