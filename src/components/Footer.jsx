import React from "react";
import {
  FaSpotify,
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>Suivre LINDSTRØM</h3>
        <div className="footer-icons">
          <a
            href="https://open.spotify.com/artist/2vTtjIqZ7hW0W15t1ApKTB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSoundcloud />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="footer-promo">
        <img
          src="/pexels-brettjordan-2746823.jpg"
          alt="Pochette Sirius Syntoms"
        />
        <div className="promo-text">
          <p>
            <strong>Sirius Syntoms</strong> — Le nouvel album spatial
          </p>
          <a
            href="https://www.amazon.fr/Everyone-Else-Stranger-Lindstr%C3%B8m/dp/B0C66HVVXN"
            target="_blank"
            rel="noreferrer"
          >
            Acheter le vinyle →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
