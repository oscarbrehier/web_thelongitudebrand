import { useAuthContext } from "@/lib/context/AuthContext";
import { useCartStore } from "@/lib/stores/useCartStore";
import Link from "next/link";
import { DIRECTION, MIN_QUANTITY, MAX_QUANTITY } from "@/lib/constants/cart.config";
import SanityImage from "@/app/components/ui/SanityImage";

export default function CartItemBig({ index, item }) {

    const { productId, name, cover, size, quantity, price, image_ref } = item;

    const editItemQuantity = useCartStore(state => state.editItemQuantity);
    const removeFromCart = useCartStore(state => state.removeFromCart);

    const { user } = useAuthContext();

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

        await removeFromCart(productId, user);

    };

    return (

        <div className="w-full h-auto grid sm:grid-cols-4">

            <div className="h-full col-span-3 flex">

                <p className="font-playfair italic xl:pr-32 xl:block hidden">{index + 1}</p>

                <Link href={`/shop/${name}`} className="2md:w-52 max-w-40">

                    <SanityImage 
                        className="bg-cream-200 py-3 px-2" 
                        source={image_ref} 
                        quality={10}
                        alt={name}
                    />

                </Link>

                <div className="px-2 flex flex-col justify-between">

                    <div>

                        <p className="text-sm 2md:font-normal font-medium">{name}</p>

                        <div className="h-2 w-full"></div>

                        <p className="text-sm">Size: {size}</p>

                        <div className="flex 2md:items-start items-center text-sm space-x-2">

                            <p className="capitalize">quantity:</p>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => handleItemUpdate(event, DIRECTION.DOWN)}>-</button>

                            <button>{quantity}</button>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => handleItemUpdate(event, DIRECTION.UP)}>+</button>

                        </div>

                        <p className="sm:hidden block text-sm mt-4">{price.toFixed(2) * quantity} €</p>

                    </div>

                    <div>
                        <button onClick={handleRemoveItem} className="text-[10px] underline capitalize py-2">remove</button>
                    </div>

                </div>

            </div>

            <div className="2md:block sm:flex justify-end hidden">
                <p className="text-sm">{price.toFixed(2) * quantity} €</p>
            </div>

        </div>

    );

};