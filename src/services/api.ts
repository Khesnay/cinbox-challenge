import axios from "axios";
//Types
import { FilmDetails, ApiResponse } from "../types/film";

/**
 * @module services/api
 * @description services providing API calls to The Movie Database (TMDb)
 *
 * API prodive genre based movie discovery and movie details fetching.
 * @function getFilmByGenreID
 *
 * Movie details fetching by ID.
 * @function getFilmDetailsByID
 *
 * Image URL construction.
 * @function getImageUrl
 *
 */

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://api.themoviedb.org/3";

// Debug logging
console.log("API Configuration:", {
  API_KEY: API_KEY ? "Set" : "Missing",
  BASE_URL
});

//Axios instance with base URL and params
export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const filmService = {
  /**
   * Fetch films by category
   * @param id - category ID (genre ID check themoviedb.org)
   * @returns promise resolving to ApiResponse
   */
  getFilmByGenreID: (id: number): Promise<ApiResponse> =>
    api
      .get("/discover/movie", {
        params: {
          with_genres: id,
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc'
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),

  /**
   * Fetch film details by its ID
   * @param id - film ID
   * @returns
   */
  getFilmDetailsByID: (id: number): Promise<FilmDetails> =>
    api
      .get<FilmDetails>(`/movie/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),

  /**
   * Fetch image URL by path and size
   * @param path
   * @param size
   * @returns string
   */
  getImageUrl: (path: string, size: string = "w500"): string =>
    `https://image.tmdb.org/t/p/${size}${path}`
};
