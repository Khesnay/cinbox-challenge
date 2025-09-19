/**
 * Types and interfaces for film data
 * @module types/film
 * @interface Film
 * @description Represents a film with its basic details, based on The Movie Database (TMDb) API response structure.
 */
export interface Film {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

/**
 * Extended film details interface
 * @module types/film
 * @interface FilmDetails
 * @extends {Film}
 * @description Represents detailed information about a film, extending the basic Film interface.
 */

export interface FilmDetails extends Film {
    runtime: number;
    genres: { id: number; name: string }[];
    homepage: string | null;
    tagline: string | null;
}

/**
 * Type representing film categories
 * @module types/film
 * @type {('popular' | 'adventure' | 'horror' | 'drama')} FilmCategory
 * @description Represents the different categories of films available.
 */
export type FilmCategory = 'adventure' | 'horror' | 'drama';


/**
 * Interface for API response containing a list of films
 * @module types/film
 * @interface ApiResponse
 * @description Represents the structure of the API response when fetching a list of films.
 */
export interface ApiResponse {
    results: Film[]
    total_pages: number;
    total_results: number;
}