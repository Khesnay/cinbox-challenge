import React, { useEffect } from "react";
import { FilmCategory, Film } from "../../types/film";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchFilmsByCategory } from "../../store/filmSlice";
import FilmCard from "../FilmCard/FilmCard";
import "./FilmCarousel.scss";

interface FilmCarouselProps {
  category: FilmCategory;
  title: string;
  subtitle?: string;
}

export const FilmCarousel: React.FC<FilmCarouselProps> = ({
  category,
  title,
  subtitle
}) => {
  const dispatch = useAppDispatch();

  const { adventureFilms, horrorFilms, dramaFilms, loading, error } =
    useAppSelector((state) => state.films);

  /** */
  const films: Array<Film> =
    category === "adventure"
      ? adventureFilms
      : category === "horror"
      ? horrorFilms
      : dramaFilms;
  const isLoading = loading[category];

  // Debug logging
  console.log("FilmCarousel Debug:", {
    category,
    filmsCount: films?.length || 0,
    adventureFilms: adventureFilms?.length || 0,
    horrorFilms: horrorFilms?.length || 0,
    dramaFilms: dramaFilms?.length || 0,
    loading,
    error
  });

  useEffect(() => {
    console.log(`Dispatching fetchFilmsByCategory for ${category}`);
    dispatch(fetchFilmsByCategory(category));
  }, [dispatch, category]);

  if (isLoading) {
    return (
      <div className={`film-carousel ${category}`}>
        <div className="film-carousel__header">
          <h2
            className={`film-carousel__title film-carousel__title--${category}`}
          >
            {title}
          </h2>
          {subtitle && <p className="film-carousel__subtitle">{subtitle}</p>}
        </div>
        <div className="film-carousel__loading">
          <div className="spinner"></div>
          Loading films...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="film-carousel">
        <div className="film-carousel__header">
          <h2
            className={`film-carousel__title film-carousel__title--${category}`}
          >
            {title}
          </h2>
        </div>
        <div className="film-carousel__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="film-carousel">
      <div className="film-carousel__header">
        <h2
          className={`film-carousel__title film-carousel__title--${category}`}
        >
          {title}
        </h2>
        {subtitle && <p className="film-carousel__subtitle">{subtitle}</p>}
      </div>
      <div className="film-carousel__content">
        <div className="film-carousel__scroll-container">
          {(films ?? []).length > 0 ? (
            (films ?? [])
              .slice(0, 20)
              .map((film) => (
                <FilmCard key={film.id} film={film} category={category} />
              ))
          ) : (
            <div className="film-carousel__no-films">
              <p>No films available for {category} category</p>
              <p>Check console for API errors</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
