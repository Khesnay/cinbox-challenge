import { FilmCategory } from "./film";


/** * Types and interfaces for wishlist data
 * @module types/wishlist
 * @interface WishlistItem
 * @description Represents an item in the wishlist, including film ID and category.
 */
export interface WishlistItem {
    id: number;
    title: string;
    category: FilmCategory;
    poster_path: string;
    addedAt: string;
}


/** * Interface for the wishlist structure
 * @module types/wishlist
 * @interface WishlistState
 * @description Represents a wishlist containing multiple wishlist items.
 */

export interface WishlistState {
    items: WishlistItem[];
    loading: boolean;
    error: string | null;
}