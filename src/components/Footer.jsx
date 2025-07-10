import React from "react";
import {
  FaSpotify,
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <h3 className="footer-title">Suivre LINDSTRØM</h3>
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
          href="https://soundcloud.com/feedelity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSoundcloud />
        </a>
        <a
          href="https://www.youtube.com/channel/UC2NgoroeKHdMllm84-gS9hQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
      </div>
      <p onClick={() => navigate("/login")} className="text-center text-sm font-extralight mt-8 opacity-10 ">admin</p>
    </footer>
  );
};

export default Footer;
