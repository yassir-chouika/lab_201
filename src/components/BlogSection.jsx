import React from "react";

const BlogSection = () => {
  return (
    <section className="blog-section">
      <h2 className="blog-title">Blog</h2>

      <div className="blog-grid">
        <div className="blog-card">
          <img
            src="/images/pexels-ygtphoto-18647356.jpg"
            alt="Studio de Lindstrøm"
          />
          <h3>Retour en studio</h3>
          <a
            href="https://exemple.com/studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus →
          </a>
        </div>

        <div className="blog-card">
          <img
            src="/images/pexels-yankrukov-9001968.jpg"
            alt="Concert en Norvège"
          />
          <h3>Live à Bergen</h3>
          <a
            href="https://exemple.com/live-bergen"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus →
          </a>
        </div>

        <div className="blog-card">
          <img
            src="/images/pexels-erxmart-2247678.jpg"
            alt="Machines et synthés"
          />
          <h3>Les machines de Sirius</h3>
          <a
            href="https://exemple.com/synths"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus →
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
