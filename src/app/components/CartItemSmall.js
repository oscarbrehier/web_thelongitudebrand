import { DIRECTION, MIN_QUANTITY, MAX_QUANTITY } from "@/lib/constants/cart.config";
import SanityImage from "./ui/SanityImage";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useModalContext } from "@/lib/context/ModalContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "./ui/loadingSpinner";
import delay from "@/lib/utils/delay";
import Link from "next/link";

export default function CartItemSmall({
    lang,
    content,
    single = false,
    allowModifications = true,
    clickable = false,
    backgroundColor = {
        card: "transparent",
        image: "cream-100"
    }
}) {

    if (!content) return null;

    const { productId, name, size, quantity, price, image_ref } = content;

    const [loading, setLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState(false);

    const { editItemQuantity, removeFromCart } = useCartStore(state => ({
        editItemQuantity: state.editItemQuantity,
        removeFromCart: state.removeFromCart
    }));

    const { user } = useAuthContext();
    const { closeModal } = useModalContext();

    const resetModalTimeout = () => {

        if (timeoutId) clearTimeout(timeoutId);
        const id = setTimeout(() => closeModal("added_cart"), 5000);
        setTimeoutId(id);

    };

    function handleItemUpdate(event, direction) {

        event.preventDefault();

        if (direction == DIRECTION.DOWN && quantity === MIN_QUANTITY) {

            resetModalTimeout();
            handleRemoveItem();

        } else if (direction === DIRECTION.UP && quantity === MAX_QUANTITY) {

            return;

        } else {

            resetModalTimeout();
            editItemQuantity(productId, direction, user);

        };

    };

    const handleRemoveItem = async () => {

        if (single) {

            setLoading(true);
            await delay(1000);
            setLoading(false);
            closeModal("added_cart");

        };

        await removeFromCart(productId, user);

    };


    useEffect(() => {

        const id = setTimeout(() => {
            closeModal("added_cart");
        }, 5000);
        setTimeoutId(id);

        return () => clearTimeout(id);

    }, [closeModal]);

    return (

        <>

            {
                loading && single ? (

                    <div className="h-32 flex items-center justify-center">
                        <LoadingSpinner color="border-e-cream-300" />
                    </div>

                ) : (


                    <div className={`h-32 w-full flex space-x-2 ${"bg-" + backgroundColor.card}`}>

                        {
                            clickable ?
                                (

                                    <Link href={`/shop/${name}`} className={`h-full flex items-center p-2 ${"bg-" + backgroundColor.image}`}>
                                        <SanityImage
                                            className="xl:w-20 w-16"
                                            source={image_ref}
                                            quality={0}
                                            alt={name} />
                                    </Link>

                                ) : (

                                    <div className={`h-full flex items-center p-2 ${"bg-" + backgroundColor.image}`}>
                                        <SanityImage
                                            className="xl:w-20 w-16"
                                            source={image_ref}
                                            quality={0}
                                            alt={name} />
                                    </div>

                                )
                        }

                        <div className="flex-1 h-full flex flex-col justify-between children:text-sm">

                            <div className="w-full flex justify-between">
                                <p>{name}</p>
                                <p>{price} €</p>
                            </div>

                            <div>

                                <p>Size: {size}</p>

                                <div className="flex 2md:items-start items-center text-sm space-x-2">

                                    <p>Quantity:</p>

                                    {
                                        allowModifications && (
                                            <button
                                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                                onClick={(event) => handleItemUpdate(event, DIRECTION.DOWN)}>-</button>
                                        )
                                    }

                                    <button>{quantity}</button>

                                    {
                                        allowModifications && (
                                            <button
                                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                                onClick={(event) => handleItemUpdate(event, DIRECTION.UP)}>+</button>
                                        )
                                    }

                                </div>

                            </div>

                            {allowModifications ? (
                                <div>
                                    <button onClick={handleRemoveItem} className="text-[10px] underline capitalize">remove</button>
                                </div>
                            ) : (
                                <div></div>
                            )}

                        </div>

                    </div>


                )
            }

        </>

    );

};