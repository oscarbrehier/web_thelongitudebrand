// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './features/cartSlice';

// export default configureStore({
//     reducer: {
//         cart: cartReducer,
//     },
// });

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";

const store = configureStore({
    reducer: { cart: cartSlice.reducer },
});

export default store;