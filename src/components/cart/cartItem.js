import { editCartItem, editItemQuantity, removeFromCart } from "@/lib/cart";

export default function CartItem({ index, item, updateCart }) {

    async function editItemQuantity(event, direction) {

        event.preventDefault();

        if (!direction && item.quantity === 1) {

            removeFromCart(item.item_id);

        } else if (direction && item.quantity === 20) {
            return;
        } else {

            const newQuantity = direction ? item.quantity + 1 : item.quantity - 1;
            editCartItem(item.item_id, 'quantity', newQuantity);

        };

        updateCart();

    };


    return (

        // <div className="h-[15rem] w-full bg-neutral-200 flex items-center px-4 border-b-[1px] border-neutral-300">

        //     <a href={`/shop/${item.slug}`} className="size-[10rem] flex items-center justify-center">
        //         <img className="" src={item.assets.image} alt="" />
        //     </a>

        //     <div className="flex flex-col h-full flex-1 px-8 justify-center">
        //         <p className="uppercase font-helvetica text-lg">{item.name} - {['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}</p>
        //         <p className="uppercase font-helvetica">{item.price.toFixed(2)} EUR</p>
        //         <div className="h-auto w-auto flex items-center space-x-4 mt-4">
        //             <button onClick={(event) => editItemQuantity(event, false)} className={`size-6 text-sm bg-neutral-300 flex items-center justify-center text-neutral-900`}>-</button>
        //             <div className="text-sm">{item.quantity}</div>
        //             <button onClick={(event) => editItemQuantity(event, true)} className={`size-6 text-sm bg-neutral-300 flex items-center justify-center text-neutral-900 ${item.quantity == 20 && 'cursor-not-allowed'}`}>+</button>
        //         </div>
        //     </div>

        // </div>

        <div className="w-full h-auto grid sm:grid-cols-4">

            <div className="h-full flex col-span-3">

                <p className="font-playfair italic xl:pr-32 xl:block hidden">{index + 1}</p>

                <img className="2md:h-52 max-h-40 bg-cream-200 py-3 px-1" src={item.assets.image} alt="" />

                <div className="px-2 flex flex-col justify-between">

                    <div>

                        <p className="text-sm">{item.name}</p>

                        <div className="h-2 w-full"></div>

                        <p className="text-sm">Size: {['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}</p>

                        <div className="flex 2md:items-start items-center text-sm space-x-2">

                            <p className="capitalize">quantity:</p>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => editItemQuantity(event, false)}>-</button>

                            <button>{item.quantity}</button>

                            <button
                                className="2md:bg-transparent bg-cream-400 2md:size-auto size-6 2md:block flex items-center justify-center"
                                onClick={(event) => editItemQuantity(event, true)}>+</button>

                        </div>

                        <p className="sm:hidden block text-sm mt-4">{item.price.toFixed(2)} EUR</p>

                    </div>

                    <p className="text-[10px] underline capitalize py-2">remove</p>

                </div>

            </div>

            <div className="2md:block sm:flex justify-end hidden">
                <p className="text-sm">{item.price.toFixed(2)} EUR</p>
            </div>

        </div>

    );

};