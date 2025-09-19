import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { FilmCategory } from "../../types/film";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilmDetails } from "../../store/filmSlice";
import { addToWishlist } from "../../store/wishlistSlice";
import { filmService } from "../../services/api";
import "./FilmDetail.scss";

export const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { currentFilm, loading } = useAppSelector((state) => state.films);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const category: FilmCategory = location.state?.category || "popular";

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmDetails(parseInt(id)));
    }
  }, [id, dispatch]);

  const handleAddToWishlist = () => {
    if (currentFilm) {
      dispatch(
        addToWishlist({
          film: {
            id: currentFilm.id,
            title: currentFilm.title,
            poster_path: currentFilm.poster_path
          },
          category
        })
      );
    }
  };

  const isInWishlist = currentFilm
    ? wishlistItems.some((item) => item.id === currentFilm.id)
    : false;

  useEffect(() => {
    console.log("=== FilmDetail Debug Info ===");
    console.log("Category:", category);
    console.log("Current film:", currentFilm);
    console.log("Is in wishlist:", isInWishlist);
    console.log("Wishlist items:", wishlistItems);
  }, [category, currentFilm, isInWishlist, wishlistItems]);

  // Also add debug to the getButtonClass function:
  const getButtonClass = (category: FilmCategory): string => {
    console.log("getButtonClass called with:", category);

    switch (category) {
      case "horror":
        console.log("Returning: btn btn-action");
        return "btn btn-horror";
      case "drama":
        console.log("Returning: btn btn-drama");
        return "btn btn-drama";
      case "adventure":
        return "btn btn-adv";
      default:
        console.log("Returning: btn btn-primary");
        return "btn btn-primary";
    }
  };

  const getCategoryButtonText = (category: FilmCategory): string => {
    switch (category) {
      case "adventure":
        return "ADD TO ACTION LIST";
      case "drama":
        return "Add to Drama Collection";
      default:
        return "Add to Wishlist";
    }
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading.details) {
    return (
      <div className="film-detail">
        <div className="container">
          <div className="film-detail__loading">
            <div className="spinner"></div>
            Loading film details...
          </div>
        </div>
      </div>
    );
  }

  if (!currentFilm) {
    return (
      <div className="film-detail">
        <div className="container">
          <div className="film-detail__error">
            <h2>Film not found</h2>
            <p>
              <Link to="/">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const releaseYear = currentFilm.release_date
    ? new Date(currentFilm.release_date).getFullYear().toString()
    : "";

  return (
    <div className="film-detail">
      <div className="container">
        <div className="film-detail__content">
          <div className="film-detail__poster-container">
            {currentFilm.poster_path ? (
              <img
                src={filmService.getImageUrl(currentFilm.poster_path, "w400")}
                alt={currentFilm.title}
                className="film-detail__poster"
              />
            ) : (
              <div className="film-detail__poster-placeholder">
                No Image Available
              </div>
            )}
          </div>

          <div className="film-detail__info">
            <h1
              className={`film-detail__title film-detail__title--${category}`}
            >
              {currentFilm.title}
            </h1>

            <div className="film-detail__meta">
              <div className="film-detail__rating">
                {currentFilm.vote_average.toFixed(1)}
              </div>
              {releaseYear && (
                <div className="film-detail__year">{releaseYear}</div>
              )}
              {currentFilm.runtime && (
                <div className="film-detail__runtime">
                  {formatRuntime(currentFilm.runtime)}
                </div>
              )}
            </div>

            <p className="film-detail__overview">
              {currentFilm.overview ||
                "No description available for this film."}
            </p>

            {currentFilm.genres && currentFilm.genres.length > 0 && (
              <div className="film-detail__genres">
                <h3 className="film-detail__genres-title">Genres</h3>
                <div className="film-detail__genres-list">
                  {currentFilm.genres.map((genre) => (
                    <span key={genre.id} className="film-detail__genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="film-detail__actions">
              {isInWishlist ? (
                <div className="film-detail__wishlist-status">
                  Already in your wishlist
                </div>
              ) : (
                <button
                  className={getButtonClass(category)}
                  onClick={handleAddToWishlist}
                >
                  {getCategoryButtonText(category)}
                </button>
              )}
              <Link to="/" className="btn btn-secondary">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
