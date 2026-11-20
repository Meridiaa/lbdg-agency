import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Code2,
  Palette,
  Megaphone,
  Search,
  Camera,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Website Development",
    description:
      "Responsive business websites designed to explain your offer and make it easy for customers to contact you.",
    icon: Code2,
    slug: "web-development",
  },
  {
    title: "Brand & Graphic Design",
    description:
      "Brand identities, promotional graphics and visual assets that keep your business recognisable.",
    icon: Palette,
    slug: "graphic-design",
  },
  {
    title: "Digital Marketing",
    description:
      "Campaign planning and digital strategy built around your business goals and audience.",
    icon: TrendingUp,
    slug: "digital-marketing",
  },
  {
    title: "Social Media",
    description:
      "Content planning, creative posts and consistent communication across social platforms.",
    icon: Camera,
    slug: "social-media",
  },
  {
    title: "Advertising",
    description:
      "Campaign creative and audience targeting for businesses looking to reach more customers.",
    icon: Megaphone,
    slug: "advertising",
  },
  {
    title: "SEO",
    description:
      "Search-friendly website structure and content to help customers find your business.",
    icon: Search,
    slug: "seo",
  },
];

const projects = [
  {
    title: "The Modern Edit",
    category: "E-commerce / Branding",
    description: "A self-initiated fashion storefront and visual identity exploration.",
    className: "home-project-one",
    mark: "ME",
  },
  {
    title: "Daily Ritual",
    category: "Coffee / Brand Identity",
    description: "A self-initiated identity and social content direction for a coffee brand.",
    className: "home-project-two",
    mark: "DR",
  },
  {
    title: "Nexora",
    category: "Technology / Web Design",
    description: "A self-initiated website concept for a technology business.",
    className: "home-project-three",
    mark: "NX",
  },
];

export default function Home() {
  return (
    <main className="rev-home">
      <section className="rev-home-hero">
        <div className="rev-hero-copy">
          <span className="rev-kicker">
            LBDG AGENCY · NOIDA, INDIA
          </span>

          <h1>
            YOUR BUSINESS
            <br />
            NEEDS A BETTER
            <br />
            <span>DIGITAL PRESENCE.</span>
          </h1>

          <p>
            We design and build business websites, create brand visuals
            and support digital marketing. One place to get your
            business looking sharper online.
          </p>

          <div className="rev-actions">
            <Link to="/portfolio" className="rev-button">
              View our work <ArrowUpRight size={18} />
            </Link>

            <Link to="/services" className="rev-text-link">
              Explore services
            </Link>
          </div>
        </div>

        <div className="rev-hero-art">
          <div className="rev-browser">
            <div className="rev-browser-top">
              <i /><i /><i />
              <span>yourbusiness.com</span>
            </div>
            <div className="rev-browser-body">
              <span className="rev-art-label">DIGITAL DESIGN / 2026</span>
              <strong>MAKE YOUR<br />FIRST IMPRESSION<br /><em>COUNT.</em></strong>
              <div className="rev-art-line" />
              <div className="rev-art-bottom">
                <span>DESIGN</span>
                <span>DEVELOPMENT</span>
                <span>GROWTH</span>
              </div>
            </div>
          </div>
          <span className="rev-art-caption">A CLEARER WAY TO SHOW UP ONLINE.</span>
        </div>
      </section>

      <section className="rev-home-services">
        <div className="rev-section-heading">
          <div>
            <span className="rev-kicker">WHAT WE CAN HELP WITH</span>
            <h2>THE WORK, <span>IN PRACTICE.</span></h2>
          </div>
          <p>
            Choose a service based on what your business needs right now.
            You can enquire about one service or combine several.
          </p>
        </div>

        <div className="rev-service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="rev-service-card"
                key={service.slug}
              >
                <div className="rev-service-top">
                  <Icon size={25} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="rev-card-link">
                  Enquire about this <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rev-home-work">
        <div className="rev-section-heading">
          <div>
            <span className="rev-kicker">SELECTED DESIGN EXPLORATIONS</span>
            <h2>WORK IN <span>PROGRESS.</span></h2>
          </div>
          <p>
            These are self-initiated concepts created to demonstrate
            visual direction and design thinking, not paid client projects.
          </p>
        </div>

        <div className="rev-home-project-grid">
          {projects.map((project, index) => (
            <article className="rev-home-project" key={project.title}>
              <div className={`rev-home-project-art ${project.className}`}>
                <span>DESIGN EXPLORATION / 0{index + 1}</span>
                <strong>{project.mark}</strong>
                <b>{project.title}</b>
              </div>
              <span className="rev-project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>

        <Link to="/portfolio" className="rev-text-link">
          Explore the project breakdowns <ArrowUpRight size={17} />
        </Link>
      </section>

      <section className="rev-home-about">
        <div>
          <span className="rev-kicker">A PRACTICAL CREATIVE PARTNER</span>
          <h2>GOOD DESIGN SHOULD MAKE THINGS <span>WORK BETTER.</span></h2>
        </div>
        <div>
          <p>
            We work across website development, visual design and
            digital marketing. The goal is simple: make it easier
            for people to understand your business, trust what you
            offer and take the next step.
          </p>
          <Link to="/about" className="rev-text-link">
            More about LBDG <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="rev-home-contact">
        <div>
          <span className="rev-kicker">HAVE A PROJECT IN MIND?</span>
          <h2>LET'S TALK ABOUT THE ACTUAL <span>REQUIREMENTS.</span></h2>
        </div>
        <Link to="/contact" className="rev-button">
          Contact LBDG <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}