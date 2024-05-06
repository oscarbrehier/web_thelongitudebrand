import { editCartItem, editItemQuantity, removeFromCart } from "@/lib/cart";

export default function CartItem({ item, updateCart }) {

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

        // <div className="h-auto w-full flex space-x-8">

        //     <a href={`/shop/${item.slug}`} className="h-60 w-64 px-4 flex items-center justify-center">
        //         <img src={item.assets.image} alt="" />
        //     </a>

        //     <div className="h-60 flex space-x-8">
        //         <div className="h-full flex flex-col justify-center">

        //             <p className="uppercase font-helvetica75 text-3xl">{item.name} - {['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}</p>
        //             <p className="uppercase font-helvetica text-xl">{item.price.toFixed(2)} EUR</p>

        //             <div className="h-auto w-auto flex items-center space-x-4 mt-4">
        //                 <button onClick={(event) => editItemQuantity(event, false)} className={`size-8 bg-neutral-100 flex items-center justify-center text-neutral-900`}>-</button>
        //                 <div>{item.quantity}</div>
        //                 <button onClick={(event) => editItemQuantity(event, true)} className={`size-8 bg-neutral-100 flex items-center justify-center text-neutral-900 ${item.quantity == 20 && 'cursor-not-allowed'}`}>+</button>
        //             </div>

        //         </div>

        //         {/* <div className="h-full flex items-center space-x-2">
        //             <p className="text-xl">x</p>
        //             <p className="font-helvetica text-xl font-bold">{item.quantity}</p>
        //         </div> */}

        //     </div>

        // </div>
        <div className="h-[15rem] w-full bg-neutral-200 flex items-center px-4 border-b-[1px] border-neutral-300">

            <a href={`/shop/${item.slug}`} className="size-[10rem] flex items-center justify-center">
                <img className="" src={item.assets.image} alt="" />
            </a>

            <div className="flex flex-col h-full flex-1 px-8 justify-center">
                <p className="uppercase font-helvetica text-lg">{item.name} - {['XS', 'S', 'M', 'L'].filter((size, index) => index == item.size)}</p>
                <p className="uppercase font-helvetica">{item.price.toFixed(2)} EUR</p>
                <div className="h-auto w-auto flex items-center space-x-4 mt-4">
                    <button onClick={(event) => editItemQuantity(event, false)} className={`size-6 text-sm bg-neutral-300 flex items-center justify-center text-neutral-900`}>-</button>
                    <div className="text-sm">{item.quantity}</div>
                    <button onClick={(event) => editItemQuantity(event, true)} className={`size-6 text-sm bg-neutral-300 flex items-center justify-center text-neutral-900 ${item.quantity == 20 && 'cursor-not-allowed'}`}>+</button>
                </div>
            </div>

        </div>

    );

};