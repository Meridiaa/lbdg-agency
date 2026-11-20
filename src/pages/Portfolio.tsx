import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "The Modern Edit",
    category: "E-COMMERCE / BRANDING",
    description:
      "A self-initiated fashion storefront concept. The direction uses restrained typography, warm neutrals and a clear product-first layout.",
    problem:
      "Create a visual direction for a contemporary fashion store without overwhelming product presentation.",
    decisions:
      "Use a neutral palette, editorial typography and generous spacing to keep attention on the products.",
    outcome:
      "A proposed storefront direction with a consistent visual language and clear shopping hierarchy.",
    className: "rev-case-modern",
    mark: "ME",
  },
  {
    number: "02",
    title: "Daily Ritual",
    category: "COFFEE / BRAND IDENTITY",
    description:
      "A self-initiated identity concept for a specialty coffee brand, with a warm visual system and social content direction.",
    problem:
      "Create a recognisable identity that feels approachable and works across digital content.",
    decisions:
      "Explore earthy colours, a softer type treatment and repeatable graphic elements.",
    outcome:
      "A proposed identity direction for packaging, social posts and digital brand touchpoints.",
    className: "rev-case-ritual",
    mark: "DR",
  },
  {
    number: "03",
    title: "Nexora",
    category: "TECHNOLOGY / WEB DESIGN",
    description:
      "A self-initiated website concept for a technology business, focused on explaining services and guiding visitors through the site.",
    problem:
      "Make a technology offering easier to understand for first-time visitors.",
    decisions:
      "Use a strong headline hierarchy, clear service groupings and direct navigation.",
    outcome:
      "A proposed website structure and visual direction for a technology brand.",
    className: "rev-case-nexora",
    mark: "NX",
  },
];

export default function Portfolio() {
  return (
    <main className="rev-page">
      <section className="rev-page-intro rev-work-intro">
        <span className="rev-kicker">SELECTED DESIGN EXPLORATIONS</span>
        <h1>
          THE THINKING
          <br />
          <span>BEHIND THE DESIGN.</span>
        </h1>
        <p>
          These self-initiated projects demonstrate design direction,
          layout decisions and visual problem-solving. They are not
          presented as paid client work.
        </p>
      </section>

      <section className="rev-case-list">
        {projects.map((project) => (
          <article className="rev-case" key={project.number}>
            <div className={`rev-case-art ${project.className}`}>
              <span>DESIGN EXPLORATION / {project.number}</span>
              <strong>{project.mark}</strong>
              <b>{project.title}</b>
            </div>

            <div className="rev-case-content">
              <span className="rev-kicker">{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="rev-case-breakdown">
                <div>
                  <h3>THE CHALLENGE</h3>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <h3>DESIGN DECISIONS</h3>
                  <p>{project.decisions}</p>
                </div>
                <div>
                  <h3>PROPOSED OUTCOME</h3>
                  <p>{project.outcome}</p>
                </div>
              </div>

              <Link
                to={`/contact?project=${encodeURIComponent(project.title)}`}
                className="rev-text-link"
              >
                Discuss a similar project <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}