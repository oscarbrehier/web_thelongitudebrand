import { useModalContext } from "@/lib/context/ModalContext";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import CartItemSmall from "../cart/CartItemSmall";
import { IoClose } from "react-icons/io5";
import Hyperlink from "../ui/Hyperlink";
import Button from "../ui/Button";
import checkout from "@/lib/checkout";
import { usePathname, useRouter } from "next/navigation";
import { captureException } from "@sentry/nextjs";

export default function AddedToCart() {

    const router = useRouter();
	const pathname = usePathname();
    const { closeModal } = useModalContext();
    const { isAuth, user } = useAuthContext();
    const { cart, cartLength, cartTotal } = useCartStore(state => ({
        cart: state.cart,
        cartLength: state.cart.length,
        cartTotal: state.total
    }));
    const cartLastItem = cartLength > 0 ? cart[cartLength - 1] : null;

    const redirectToCheckout = async () => {
        try {
            const url = await checkout(user, cart, cartTotal, pathname);
            if (!url) throw new Error("checkout creation failure");
            router.push(url);
            closeModal();
        } catch (err) {
			console.log(err);
            captureException(err);
        }
    };

    return (

        <div className="
            xl:w-1/2 lg:w-1/3 xl:pl-4 lg:pl-3 lg:h-auto fixed z-40 lg:bottom-4 lg:right-4 flex flex-col justify-between space-y-4
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
                            <CartItemSmall content={cartLastItem} single />
                        </div>

                        <div className="h-auto flex flex-col space-y-4">

                            <div className="space-y-0 grid sm:grid-cols-2 gap-2">

                                <Button
                                    title="checkout"
                                    onClick={redirectToCheckout}
                                    size="h-10 w-full"
                                    border
                                />

                                <Hyperlink
                                    to="/cart"
                                    size="h-10 w-full"
                                    onClick={() => closeModal()}
                                >
                                    view shopping bag
                                </Hyperlink>

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
                                size="h-10 w-full"
                                to="/shop"
                            >
                                continue shopping
                            </Hyperlink>

                            <Hyperlink
                                size="h-10 w-full"
                                to={isAuth ? "/customer/wishlist" : "/auth/sign-in"}
                                border
                                margin={false}
                            >
                                {isAuth ? "view your wishlist" : "sign in"}
                            </Hyperlink>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

};