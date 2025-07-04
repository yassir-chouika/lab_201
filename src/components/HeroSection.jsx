import React from "react";
import useFadeUpOnScroll from "../hooks/useFadeUpOnScroll";

const HeroSection = () => {
  useFadeUpOnScroll();

  return (
    <section className="hero-global">
      <section className="hero fade-up">
        <video autoPlay loop muted playsInline>
          <source
            src="/hero_vid.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-content">
          <p className="hero-top-text">
            Une traversée cosmique au cœur du disco électronique.
          </p>
          <h1 className="hero-artist-name">Lindstrøm</h1>
          <p className="hero-sub-text">
            Revient avec un album solaire et introspectif.
          </p>

          <div className="hero-buttons">
            <a
              href="https://open.spotify.com/intl-fr/artist/2vTtjIqZ7hW0W15t1ApKTB?si=JcqBCHBiQ3OGbGDyW7tBWhttps://tr.ee/q_jYu_BTApA"
              className="btn-purple"
            >
              Écouter maintenant
            </a>
            <a href="#" className="btn-magenta">
              Voir la tournée
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
