// import { createSlice, current } from '@reduxjs/toolkit';

// const initialState = {
//     items: [],
// };

// // const cartSlice = createSlice({
// //     name: 'cart',
// //     initialState,
// //     reducers: {
// //         addToCart: (state, action) => {
// //             const { id } = action.payload;

// //             console.log(id)

// //             if (state.items[id]) {
// //                 state.items[id].quantity += 1;
// //             } else {
// //                 state.items[id] = { ...action.payload, quantity: 1 };
// //             }
// //         },
// //         removeFromCart: (state, action) => {
// //             delete state.items[action.payload.id];
// //         },
// //     },
// // });

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {

//             // const cartItems = current(state.items);
//             // let { value } = action.payload;

//             // state.items.push(action.payload);

//             const { value } = action.payload;
            
//             // Check if the item already exists in the cart based on value
//             const existingItem = state.items.find(item => item.value === value);
//             if (existingItem) {
//                 // If item exists, increment its quantity by 1
//                 existingItem.quantity += 1;
//             } else {
//                 // If item doesn't exist, add it to the cart
//                 state.items.push({ value, quantity: 1 });
//             }

//         },
//         removeFromCart: (state, action) => {
//             state.items = state.items.filter((item) => item.uuid !== action.payload);
//         },
//         emptyCart: (state) => {
//             state.items = [];
//         },
//     },
// });

// export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {

            return { items: updateCartItems };

        },
        updateItemQty: (state, action) => {

            return { items: updateCartItems }; 

        },
        removeItem: (state, action) => {

            return { items: updateCartItems };

        },
    },
});

export const { addItem, updateItemQty, removeItem } = cartSlice.actions;
export default cartSlice;