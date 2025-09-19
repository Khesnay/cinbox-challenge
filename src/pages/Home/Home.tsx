import React from "react";

import { FilmCarousel } from "../../components/FilmCarousel/Filmcarousel";
import "./Home.scss";

//Asset

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home__hero">
          <div className="home__hero-content">
            <h1 className="home__title">Discover Amazing Films</h1>
            <p className="home__subtitle">
              Explore our curated collection of popular movies, action-packed
              adventures, and compelling dramas. Find your next favorite film
              and add it to your wishlist.
            </p>
          </div>
        </div>

        <div className="home__carousels">
          <FilmCarousel
            category="horror"
            title="Horror Movies"
            subtitle="It's spooky!"
          />

          <FilmCarousel
            category="adventure"
            title="Action & Adventure"
            subtitle="Heart-pounding thrills and excitement"
          />

          <FilmCarousel
            category="drama"
            title="Drama Films"
            subtitle="Compelling stories and powerful performances"
          />
        </div>
      </div>
    </div>
  );
};
