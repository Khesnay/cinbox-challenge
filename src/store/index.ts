import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./filmSlice";
import wishlistReducer from "./wishlistSlice";


export const store = configureStore({
    reducer: {
        films: filmReducer,
        wishlist: wishlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;