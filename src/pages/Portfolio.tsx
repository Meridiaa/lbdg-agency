
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "The Modern Edit",
    category: "Branding",
    type: "E-COMMERCE & BRANDING",
    description:
      "A contemporary visual identity concept for a modern lifestyle and fashion brand.",
    className: "project-modern",
    initials: "ME.",
    year: "2026",
  },
  {
    number: "02",
    title: "Daily Ritual",
    category: "Social Media",
    type: "BRANDING & SOCIAL MEDIA",
    description:
      "A warm, minimal branding and social media concept for a lifestyle and wellness brand.",
    className: "project-ritual",
    initials: "DR.",
    year: "2026",
  },
  {
    number: "03",
    title: "Northstar Studio",
    category: "Digital",
    type: "DIGITAL EXPERIENCE",
    description:
      "A modern website design concept focused on clarity, strong typography and user experience.",
    className: "project-northstar",
    initials: "NS.",
    year: "2026",
  },
];

const categories = [
  "All",
  "Branding",
  "Digital",
  "Social Media",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <main className="portfolio-page">

      {/* PORTFOLIO HERO */}

      <section className="portfolio-hero">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="eyebrow">
            LBDG / SELECTED CREATIVE WORK
          </span>

          <h1>
            OUR WORK
            <br />
            <span>SPEAKS FOR ITSELF.</span>
          </h1>

          <div className="portfolio-hero-bottom">

            <p>
              A glimpse into the creative possibilities
              of thoughtful branding, digital experiences
              and strategic design.
            </p>

            <a href="#project-gallery" className="portfolio-scroll">
              EXPLORE PROJECTS
              <ArrowDownRight size={18} />
            </a>

          </div>

        </motion.div>

        <div className="portfolio-hero-symbol">
          WORK.
        </div>

      </section>


      {/* PROJECT GALLERY */}

      <section
        className="portfolio-gallery"
        id="project-gallery"
      >

        <div className="about-section-label">
          <span>01 / SELECTED PROJECTS</span>
          <span>CREATIVITY IN ACTION</span>
        </div>

        <div className="portfolio-gallery-heading">

          <h2>
            A FEW IDEAS.
            <br />
            <span>ENDLESS POSSIBILITIES.</span>
          </h2>

          <p>
            Explore our creative concepts across
            branding, digital experiences and
            social media.
          </p>

        </div>


        {/* CATEGORY FILTER */}

        <div className="portfolio-filters">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "portfolio-filter active"
                  : "portfolio-filter"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>

          ))}

        </div>


        {/* PROJECT CARDS */}

        <motion.div
          className="portfolio-grid"
          layout
        >

          {filteredProjects.map((project, index) => (

            <motion.article
              key={project.number}
              className="portfolio-card"
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >

              <div
                className={`portfolio-artwork ${project.className}`}
              >

                <span className="portfolio-concept-tag">
                  CONCEPT PROJECT
                </span>

                <div className="portfolio-artwork-content">
                  <span className="portfolio-artwork-title">
                    {project.title}
                  </span>

                  <span className="portfolio-artwork-initials">
                    {project.initials}
                  </span>
                </div>

                <span className="portfolio-artwork-year">
                  {project.year}
                </span>

              </div>


              <div className="portfolio-card-info">

                <div className="portfolio-card-meta">

                  <span>{project.type}</span>
                  <span>{project.number}</span>

                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="portfolio-card-bottom">

                  <span>{project.category}</span>

                  <Link
                    to="/contact"
                    aria-label={`Enquire about ${project.title}`}
                  >
                    Discuss a Similar Project
                    <ArrowUpRight size={17} />
                  </Link>

                </div>

              </div>

            </motion.article>

          ))}

        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="portfolio-empty">
            No projects found in this category.
          </p>
        )}

      </section>


      {/* CREATIVE APPROACH */}

      <section className="portfolio-approach">

        <div className="about-section-label">
          <span>02 / OUR CREATIVE APPROACH</span>
          <span>IDEAS WITH PURPOSE</span>
        </div>

        <h2>
          NOT JUST GOOD
          <br />
          <span>LOOKING. GOOD THINKING.</span>
        </h2>

        <p>
          Every creative concept begins with an idea.
          We believe strong design should communicate
          clearly, connect with people and support
          the bigger picture.
        </p>

        <Link to="/services" className="text-btn">
          Explore Our Services
          <ArrowUpRight size={18} />
        </Link>

      </section>


      {/* FINAL CTA */}

      <section className="portfolio-final-cta">

        <span className="eyebrow">
          HAVE SOMETHING IN MIND?
        </span>

        <h2>
          YOUR IDEA.
          <br />
          <span>OUR NEXT PROJECT.</span>
        </h2>

        <p>
          Let's turn your vision into something
          worth remembering.
        </p>

        <Link to="/contact" className="primary-btn">
          Start Your Project
          <ArrowUpRight size={18} />
        </Link>

      </section>

    </main>
  );
}
