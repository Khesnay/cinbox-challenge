import React from "react";

//Types
import { Film, FilmCategory } from "../../types/film";
import { useNavigate } from "react-router-dom";

//Styles
import "./FilmCard.scss";

//Assets
import placeholder from "../../assets/img/images.png";

interface FilmCardProps {
  film: Film;
  category: FilmCategory;
}

const FilmCard: React.FC<FilmCardProps> = ({ film, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/films/${film.id}`, { state: { category } });
  };

  const getReleaseYear = (dateString: string) => {
    if (!dateString) return "Available soon";
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="film-card" onClick={handleClick}>
      <div className="film-card__img-cnt">
        {film.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
            alt={film.title}
            className="film-card__img"
            loading="lazy"
          />
        ) : (
          <img
            src={placeholder}
            alt=""
            className="film-card__img"
            loading="lazy"
          />
        )}
      </div>
      <div className="film-card__content">
        <h3 className="film-card__title">{film.title}</h3>
        <p className="film-card__year">{getReleaseYear(film.release_date)}</p>
      </div>
    </div>
  );
};

export default FilmCard;
