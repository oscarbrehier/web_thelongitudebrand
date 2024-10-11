import { useCartContext } from "@/lib/context/CartContext";

export default function CartItem({ index, item, updateCart }) {

    const { editItemQuantity, removeFromCart } = useCartContext();

    async function handleItemUpdate(event, direction) {

        event.preventDefault();

        const {productId} = item;

        if (!direction && item.quantity === 1) {

            removeFromCart(productId);

        } else if (direction && item.quantity === 20) {

            return;

        } else {

            // const newQuantity = direction ? item.quantity + 1 : item.quantity - 1;
            // editCartItem(item.item_id, 'quantity', newQuantity);
            editItemQuantity(productId, direction);

        };

        // updateCart();

    };

    return (

        <div className="w-full h-auto grid sm:grid-cols-4">

            <div className="h-full col-span-3 flex">

                <p className="font-playfair italic xl:pr-32 xl:block hidden">{index + 1}</p>

                <div className="2md:w-52 max-w-40">
                    <img className=" bg-cream-200 py-3 px-2" src={item.cover} alt="" />
                </div>

                <div className="px-2 flex flex-col justify-between">

                    <div>

                        <p className="text-sm 2md:font-normal font-medium">{item.name}</p>

                        <div className="h-2 w-full"></div>

                        <p className="text-sm">Size: {['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}</p>

                        <div className="flex 2md:items-start items-center text-sm space-x-2">

                            <p className="capitalize">quantity:</p>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => handleItemUpdate(event, "down")}>-</button>

                            <button>{item.quantity}</button>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => handleItemUpdate(event, "up")}>+</button>

                        </div>

                        <p className="sm:hidden block text-sm mt-4">{item.price.toFixed(2) * item.quantity} EUR</p>

                    </div>

                    <div>
                        <button onClick={() => {
                            removeFromCart(item.productId);
                        }} className="text-[10px] underline capitalize py-2">remove</button>
                    </div>

                </div>

            </div>

            <div className="2md:block sm:flex justify-end hidden">
                <p className="text-sm">{item.price.toFixed(2) * item.quantity} EUR</p>
            </div>

        </div>

    );

};