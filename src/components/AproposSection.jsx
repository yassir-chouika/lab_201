import React from "react";

const AProposSection = () => {
  return (
    <section className="a-propos fade-up">
      <h1 className="a-propos-text">À propos de l'artiste</h1>

      <blockquote className="artist-quote">
        “Je veux que ma musique soit comme une lumière qui traverse l’espace —
        douce, mais infinie.” — Lindstrøm
      </blockquote>

      <div className="a-propos-content">
        <img src="/images/lindstrom.jpg" alt="Portrait de Lindstrøm" />
        <div className="a-propos-plus">
          <p className="a-propos-long">
            Lindstrøm, pionnier norvégien du space disco, crée des paysages
            sonores analogiques depuis plus de deux décennies. Connu pour ses
            collaborations avec Prins Thomas et Christabelle, il réinvente sans
            cesse les contours de la musique électronique, entre énergie de club
            et méditation céleste.
          </p>
          <a
            href="https://fr.wikipedia.org/wiki/Hans-Peter_Lindstr%C3%B8m"
            target="_blank"
            rel="noreferrer"
          >
            En savoir plus
          </a>
        </div>
      </div>

      <div className="artist-timeline">
        <div className="event">
          <span>2003</span>
          <p>Premier EP sur Feedelity</p>
        </div>
        <div className="event">
          <span>2008</span>
          <p>Album “Where You Go I Go Too”</p>
        </div>
        <div className="event">
          <span>2025</span>
          <p>Sortie de “Sirius Syntoms”</p>
        </div>
      </div>
    </section>
  );
};

export default AProposSection;
