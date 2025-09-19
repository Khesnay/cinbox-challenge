

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//Types
import { WishlistState, WishlistItem } from '../types/wishlist';
import { FilmCategory } from '../types/film';


const initialState: WishlistState = {
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
    loading: false,
    error: null,
};

interface AddToWishlistPayload {
    film: {
        id: number;
        title: string;
        poster_path: string | null;
    };
    category: FilmCategory;
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        /**
         * Add item to wishlist with category
         * @param state
         * @param action
         */
        addToWishlist: (state: WishlistState, action: PayloadAction<AddToWishlistPayload>): void => {
            const { film, category } = action.payload;

            //Check if the state item already exists in the wishlist
            const itemExist = state.items.find(item => item.id === film.id && item.category === category);

            if (!itemExist) {
                const newItem: WishlistItem = {
                    ...film,
                    category,
                    addedAt: new Date().toISOString(),
                };
                state.items.push(newItem);

                //Update localStorage to persist wishlist
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },

        /**
         * Remove item from wishlist by its ID
         * @param state
         * @param action
         */
        removeFromWishlist: (state: WishlistState, action: PayloadAction<number>): void => {
            state.items = state.items.filter(item => item.id !== action.payload);

            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },

        /**
         * Clear entire wishlist
         * @param state
         */
        clearWishlist: (state: WishlistState): void => {
            state.items = [];
            localStorage.removeItem('wishlist');
        },
    },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
