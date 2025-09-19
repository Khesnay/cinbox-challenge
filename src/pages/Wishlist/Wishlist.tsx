import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { removeFromWishlist } from "../../store/wishlistSlice";
import { filmService } from "../../services/api";
import { FilmCategory } from "../../types/film";
import "./Wishlist.scss";

export const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getCategoryStats = () => {
    const stats = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<FilmCategory, number>);

    return [
      { category: "horror" as FilmCategory, count: stats.horror || 0 },
      { category: "adventure" as FilmCategory, count: stats.adventure || 0 },
      { category: "drama" as FilmCategory, count: stats.drama || 0 }
    ];
  };

  if (items.length === 0) {
    return (
      <div className="wishlist">
        <div className="container">
          <div className="wishlist__header">
            <h1 className="wishlist__title">My Wishlist</h1>
            <p className="wishlist__subtitle">
              Keep track of films you want to watch
            </p>
          </div>

          <div className="wishlist__empty">
            <div className="wishlist__empty-icon">🎬</div>
            <h2 className="wishlist__empty-title">Your wishlist is empty</h2>
            <p className="wishlist__empty-text">
              Start adding films to your wishlist by browsing our collection
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Films
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryStats = getCategoryStats();

  return (
    <div className="wishlist">
      <div className="container">
        <div className="wishlist__header">
          <h1 className="wishlist__title">My Wishlist</h1>
          <p className="wishlist__subtitle">
            {items.length} film{items.length !== 1 ? "s" : ""} saved for later
          </p>
        </div>

        <div className="wishlist__stats">
          <h3 className="wishlist__stats-title">Collection Overview</h3>
          <div className="wishlist__stats-grid">
            <div className="wishlist__stats-item">
              <div className="wishlist__stats-item-number">{items.length}</div>
              <div className="wishlist__stats-item-label">Total Films</div>
            </div>
            {categoryStats.map(({ category, count }) => (
              <div key={category} className="wishlist__stats-item">
                <div className="wishlist__stats-item-number">{count}</div>
                <div className="wishlist__stats-item-label">{category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="wishlist__grid">
          {items.map((item) => (
            <div
              key={item.id}
              className={`wishlist-item wishlist-item--${item.category}`}
            >
              {item.poster_path ? (
                <img
                  src={filmService.getImageUrl(item.poster_path)}
                  alt={item.title}
                  className="wishlist-item__image"
                />
              ) : (
                <div className="wishlist-item__image-placeholder">
                  No Image Available
                </div>
              )}

              <div className="wishlist-item__content">
                <h3 className="wishlist-item__title">{item.title}</h3>

                <span
                  className={`wishlist-item__category wishlist-item__category--${item.category}`}
                >
                  {item.category}
                </span>

                <div className="wishlist-item__date">
                  Added {formatDate(item.addedAt)}
                </div>

                <div className="wishlist-item__actions">
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="wishlist-item__remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
