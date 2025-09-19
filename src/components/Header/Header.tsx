import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./Header.scss";

//Assets
import home from "../../assets/icons/home.svg";
import list from "../../assets/icons/list.svg";

export const Header: React.FC = () => {
  const location = useLocation();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            CinBox
          </Link>
          <nav className="header__nav">
            <Link
              to="/"
              className={`header__link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <img className="header__icon" src={home} alt="Home" />
            </Link>
            <Link
              to="/wishlist"
              className={`header__link ${
                location.pathname === "/wishlist" ? "active" : ""
              }`}
            >
              <img className="header__icon" src={list} alt="Wishlist" />
              {wishlistItems.length > 0 && (
                <span className="header__wishlist-count">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
