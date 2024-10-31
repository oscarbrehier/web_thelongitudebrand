import { DIRECTION, MIN_QUANTITY, MAX_QUANTITY } from "@/lib/constants/cart.config";
import SanityImage from "./ui/SanityImage";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useModalContext } from "@/lib/context/ModalContext";
import { useState } from "react";
import LoadingSpinner from "./ui/loadingSpinner";
import delay from "@/lib/utils/delay";

export default function CartItemSmall({
    content,
    single = false,
}) {    

    if (!content) return null;

    const { productId, name, cover, size, quantity, price, image_ref } = content;

    const [loading, setLoading] = useState(false);

    const { editItemQuantity, removeFromCart } = useCartStore(state => ({
        editItemQuantity: state.editItemQuantity,
        removeFromCart: state.removeFromCart
    }));

    const { user } = useAuthContext();
    const { closeModal } = useModalContext();

    function handleItemUpdate(event, direction) {

        event.preventDefault();

        if (direction == DIRECTION.DOWN && quantity === MIN_QUANTITY) {

            handleRemoveItem();

        } else if (direction === DIRECTION.UP && quantity === MAX_QUANTITY) {

            return;

        } else {

            editItemQuantity(productId, direction, user);

        };

    };

    const handleRemoveItem = async () => {
        
        if (single) {
            
            setLoading(true);
            await delay(1000);
            setLoading(false);
            closeModal();
            
        };
        
        await removeFromCart(productId, user);

    };

    return (

        <>

            {
                loading && single ? (

                    <div className="h-32 flex items-center justify-center">
                        <LoadingSpinner color="border-e-cream-300" />
                    </div>

                ) : (


                    <div className="h-32 w-full flex space-x-2 pr-4">

                        <div className="h-full flex items-center bg-cream-200 p-2">
                            <SanityImage
                                className="xl:w-20 w-16"
                                source={image_ref}
                                quality={0}
                                alt={name} />
                        </div>

                        <div className="flex-1 h-full flex flex-col justify-between children:text-sm">

                            <div className="w-full flex justify-between">
                                <p>{name}</p>
                                <p>{price} €</p>
                            </div>

                            <div>

                                <p>Size: {['XS', 'S', 'M', 'L'].filter((s, i) => i == size)}</p>

                                <div className="flex 2md:items-start items-center text-sm space-x-2">

                                    <p>Quantity:</p>

                                    <button
                                        className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                        onClick={(event) => handleItemUpdate(event, DIRECTION.DOWN)}>-</button>

                                    <button>{quantity}</button>

                                    <button
                                        className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                        onClick={(event) => handleItemUpdate(event, DIRECTION.UP)}>+</button>

                                </div>

                            </div>

                            <div>
                                <button onClick={handleRemoveItem} className="text-[10px] underline capitalize">remove</button>
                            </div>

                        </div>

                    </div>


                )
            }

        </>

    );

};