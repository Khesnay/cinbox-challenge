import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
//Types
import { Film, FilmDetails, FilmCategory } from "../types/film";

import { filmService } from "../services/api";

interface FilmState {
  dramaFilms: Film[];
  adventureFilms: Film[];
  horrorFilms: Film[];
  currentFilm: FilmDetails | null;
  loading: {
    drama: boolean;
    adventure: boolean;
    horror: boolean;
    details: boolean;
  };
  error: string | null;
}

const initialState: FilmState = {
  dramaFilms: [],
  adventureFilms: [],
  horrorFilms: [],
  currentFilm: null,
  loading: {
    drama: false,
    adventure: false,
    horror: false,
    details: false
  },
  error: null
};

/** Async thunk for Api calls
 * @param category - FilmCategory (adventure, horror, drama)
 * @returns {Promise<{category: FilmCategory, film: Film[]}>}
 * @throws {string | unknown} - Error message if the API call fails
 * @description Fetches films by category using the filmService and handles errors appropriately.
 */

export const fetchFilmsByCategory = createAsyncThunk(
  "films/fetchByGenre",
  async (category: FilmCategory, { rejectWithValue }) => {
    try {
      let genreId: number;

      switch (category) {
        case "drama":
          genreId = 53;
          break;
        case "adventure":
          genreId = 12;
          break;
        case "horror":
          genreId = 27;
          break;
        default:
          throw new Error("Invalid category");
      }
      console.log(
        `Fetching films for category: ${category} with genre ID: ${genreId}`
      );
      const response = await filmService.getFilmByGenreID(genreId);
      console.log("API response for", category, ":", response);
      console.log("Films count:", response.results?.length || 0);
      return { category, film: response.results || [] };
    } catch (error) {
      console.error(`Error fetching films for category ${category}:`, error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(`An unknown error occurred: \n ${error}`);
    }
  }
);

/**
 * Async thunk to fetch film details by ID
 * @param id - Film ID
 * @returns {Promise<FilmDetails>}
 * @throws {string | unknown} - Error message if the API call fails
 * @description Fetches detailed information about a film using its ID and handles errors appropriately.
 */
export const fetchFilmDetails = createAsyncThunk(
  "films/fetchDetails",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await filmService.getFilmDetailsByID(id);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(`An unknown error occurred: \n ${error}`);
    }
  }
);

/**
 * Film slice for Redux store
 * @module store/filmSlice
 * @description Manages film-related state including fetching films by category and film details.
 * @see {@link fetchFilmsByGenre}
 * @see {@link fetchFilmDetails}
 */

const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsByCategory.pending, (state: FilmState, action) => {
        const category: FilmCategory = action.meta.arg;
        state.loading[category] = true;
        state.error = null;
      })
      .addCase(
        fetchFilmsByCategory.fulfilled,
        (
          state: FilmState,
          action: PayloadAction<{ category: FilmCategory; film: Film[] }>
        ) => {
          const category: FilmCategory = action.payload.category;
          state.loading[category] = false;
          state.error = null;
          switch (action.payload.category) {
            case "drama":
              state.dramaFilms = action.payload.film;
              break;
            case "adventure":
              state.adventureFilms = action.payload.film;
              break;
            case "horror":
              state.horrorFilms = action.payload.film;
              break;
            default:
              break;
          }
        }
      )
      .addCase(fetchFilmsByCategory.rejected, (state, action) => {
        state.loading[action.meta.arg] = false;
        state.error = (action.payload as string) || "Failed to fetch films";
      })
      .addCase(fetchFilmDetails.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(
        fetchFilmDetails.fulfilled,
        (state, action: PayloadAction<FilmDetails>) => {
          state.loading.details = false;
          state.currentFilm = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchFilmDetails.rejected, (state, action) => {
        state.loading.details = false;
        state.error =
          (action.payload as string) || "Failed to fetch film details";
      });
  }
});

export const { clearCurrentFilm, clearError } = filmSlice.actions;
export default filmSlice.reducer;
