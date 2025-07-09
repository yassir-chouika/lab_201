import React from "react";

const AProposSection = () => {
  return (
    <section className="a-propos fade-up">
      <h1 className="a-propos-text">À propos de l'artiste</h1>

      <div className="a-propos-content">
        <img src="PochetteAlbum.png" alt="Portrait de Lindstrøm" />
        <div className="a-propos-plus">
          <p className="a-propos-long">
            Lindstrøm, pionnier <br />
            norvégien du space disco, <br /> crée des paysages sonores <br />
            analogiques depuis plus de <br /> deux décennies.Connu pour <br />
            ses collaborations avec <br />
            Prins Thomas et <br /> Christabelle, il réinvente <br />
            sans cesse les contours de <br /> la musique électronique, <br />
            entre énergie de club et <br /> méditation céleste.
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
      <h4>Les Albums</h4>
      <div className="album-gallery">
  <div className="album-card">
    <img src="Lindstrøm_-_It's_a_Feedelity_Affair.jpg" alt="It's a Feedelity Affair" />
    <div className="album-overlay">
      <p>It's a Feedelity Affair (2006)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="a0282070592_10.jpg" alt="Where You Go I Go Too" />
    <div className="album-overlay">
      <p>Where You Go I Go Too (2008)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="/Real-life-is-no-cool.jpg" alt="Smalhans" />
    <div className="album-overlay">
      <p>Smalhans (2012)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="41iO6+1cJ-L._UF894,1000_QL80_.jpg" alt="Real Life Is No Cool" />
    <div className="album-overlay">
      <p>Real Life Is No Cool (2010)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="s-l400.jpg" alt="It's Alright Between Us As It Is" />
    <div className="album-overlay">
      <p>It's Alright Between Us As It Is (2017)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="ALbum-6.jpg" alt="On a Clear Day I Can See You Forever" />
    <div className="album-overlay">
      <p>On a Clear Day I Can See You Forever (2019)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="album7.jpg" alt="Sirius Syntoms" />
    <div className="album-overlay">
      <p>Sirius Syntoms (2025)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="lindstrom-live-at-henie.webp" alt="Late Night Tales" />
    <div className="album-overlay">
      <p>Late Night Tales (2019)</p>
    </div>
  </div>

  <div className="album-card">
    <img src="album9.jpg" alt="Tensions" />
    <div className="album-overlay">
      <p>Tensions (2024)</p>
    </div>
  </div>
</div>

    </section>
  );
};

export default AProposSection;
