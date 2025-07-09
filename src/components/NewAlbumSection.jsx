import React from "react";

const NewAlbumSection = () => {
  return (
    <section className="new-album fade-up">
      <h2 className="new-album-title">Sirius Syntoms — Le nouvel album</h2>

      <div className="new-album-content">
        <div className="album-description">
          <p className="album-intro">
            Sorti le 23 mai 2025 sur le label <strong>Feedelity</strong>,
            <em>Sirius Syntoms</em> est un voyage lumineux, une ode à la
            simplicité et au groove cosmique.
            <br />7 titres, tous conçus avec des synthétiseurs analogiques, une
            basse vibrante, et une nostalgie spatiale bien assumée.
          </p>

          <ul className="tracklist">
            <li>1. Cirkl</li>
            <li>2. Thousand Island Man</li>
            <li>3. Moon</li>
            <li>4. Sharing An Orange...</li>
            <li>5. These Are A Few...</li>
            <li>6. Solveggen! Nå!</li>
            <li>7. Sirius Syntoms</li>
          </ul>

          <a
            href="https://www.fnac.com/ia502207/Lindstrom"
            target="_blank"
            rel="noreferrer"
            className="buy-link"
          >
            Acheter à la fnac{" "}
          </a>
        </div>

        <div className="album-cover">
          <img
            src="pochetteAlbum.jpg"
            alt="Pochette de l'album Sirius Syntoms"
          />
        </div>
      </div>
    </section>
  );
};

export default NewAlbumSection;
