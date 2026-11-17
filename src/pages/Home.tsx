
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import {
  TrendingUp,
  Camera,
  Megaphone,
  Palette,
  Code2,
  Search,
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  MoveUpRight,
} from "lucide-react";


const services = [
  {
    number: "01",
    title: "Digital Marketing",
    description:
      "Smart digital strategies that connect your brand with the right audience and turn attention into growth.",
    icon: TrendingUp,
    tag: "STRATEGY & GROWTH",
    slug: "digital-marketing",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "Build a powerful online presence through engaging content, consistent storytelling and community management.",
    icon: Camera,
    tag: "CONTENT & COMMUNITY",
    slug: "social-media",
  },
  {
    number: "03",
    title: "Advertising Services",
    description:
      "Reach the right people with creative, data-driven advertising campaigns designed to generate results.",
    icon: Megaphone,
    tag: "CAMPAIGNS & REACH",
    slug: "advertising",
  },
  {
    number: "04",
    title: "Graphic Designing",
    description:
      "Make your brand memorable with distinctive visuals, creative concepts and cohesive brand identity.",
    icon: Palette,
    tag: "VISUAL IDENTITY",
    slug: "graphic-design",
  },
  {
    number: "05",
    title: "Website Development",
    description:
      "Create beautiful, responsive and functional digital experiences that turn visitors into customers.",
    icon: Code2,
    tag: "DESIGN & DEVELOPMENT",
    slug: "web-development",
  },
  {
    number: "06",
    title: "SEO Services",
    description:
      "Improve your search visibility, attract organic traffic and help customers discover your business.",
    icon: Search,
    tag: "SEARCH & VISIBILITY",
    slug: "seo",
  },
];

const projects = [
  {
    number: "01",
    title: "The Modern Edit",
    category: "E-COMMERCE & BRANDING",
    description:
      "A premium digital storefront concept for a contemporary fashion brand.",
    className: "project-visual-one",
    type: "CONCEPT PROJECT",
  },
  {
    number: "02",
    title: "Daily Ritual",
    category: "BRANDING & SOCIAL MEDIA",
    description:
      "A distinctive visual identity concept for a modern specialty coffee brand.",
    className: "project-visual-two",
    type: "CONCEPT PROJECT",
  },
  {
    number: "03",
    title: "Nexora",
    category: "WEB DEVELOPMENT & SEO",
    description:
      "A modern digital experience concept for a technology startup.",
    className: "project-visual-three",
    type: "CONCEPT PROJECT",
  },
];


export default function Home() {
  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <motion.div
            className="hero-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot" />
            CREATIVE THINKING. DIGITAL GROWTH.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            WE MAKE
            <br />
            BRANDS <span>STAND OUT.</span>
          </motion.h1>

          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              We combine creativity, strategy and technology
              to help businesses build meaningful digital
              experiences and grow beyond boundaries.
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="primary-btn">
                Let's Work Together
                <ArrowUpRight size={19} />
              </Link>

             <Link to="/services" className="text-btn">
                Explore Services
                <MoveUpRight size={17} />
             </Link>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-core">
            <Sparkles size={76} strokeWidth={1} />
          </div>

          <div className="floating-tag tag-one">
            <span>✳</span> CREATIVE
          </div>

          <div className="floating-tag tag-two">
            DIGITAL FIRST ↗
          </div>
        </motion.div>

        <div className="hero-footer">
          <span>INDEPENDENT CREATIVE AGENCY</span>

          <a href="#services">
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </a>

          <span>EST. / LBDG</span>
        </div>

      </section>

      <section className="intro-section" id="services">
        <div className="section-label">
          <span>01 / WHAT WE DO</span>
          <span>CREATIVITY MEETS STRATEGY</span>
        </div>

        <h2>
          GOOD IDEAS DESERVE
          <br />
          <span>GREAT EXECUTION.</span>
        </h2>

        <p>
          From building brands to growing businesses online,
          we bring creative and digital solutions together.
        </p>
      </section>


<section className="services-section" id="our-services">

  <div className="section-label">
    <span>02 / OUR EXPERTISE</span>
    <span>CREATIVITY MEETS STRATEGY</span>
  </div>

  <div className="services-heading">
    <div>
      <span className="eyebrow">WHAT WE BRING TO THE TABLE</span>
      <h2>
        EVERYTHING YOUR
        <br />
        BRAND NEEDS TO <span>GROW.</span>
      </h2>
    </div>

    <p>
      We combine creative thinking, digital expertise
      and strategic execution to help brands grow.
    </p>
  </div>

  <div className="services-grid">

    {services.map((service, index) => {
      const Icon = service.icon;

      return (
        <motion.article
          className="service-card"
          key={service.slug}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          whileHover={{ y: -8 }}
        >
          <div className="service-card-top">
            <div className="service-icon">
              <Icon size={27} />
            </div>
            <span className="service-number">{service.number}</span>
          </div>

          <div className="service-card-content">
            <span className="service-tag">{service.tag}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>

          <Link
            to={`/services#${service.slug}`}
            className="service-link"
          >
            EXPLORE SERVICE
            <ArrowUpRight size={18} />
          </Link>
        </motion.article>
      );
    })}

  </div>

  <div className="services-bottom">
    <p>GOOD WORK STARTS WITH A GOOD CONVERSATION.</p>

    <Link to="/contact" className="primary-btn">
      Discuss Your Project
      <ArrowUpRight size={18} />
    </Link>
  </div>

</section>


<section className="portfolio-section" id="portfolio">

  <div className="section-label">
    <span>03 / SELECTED WORK</span>
    <span>IDEAS INTO EXPERIENCES</span>
  </div>

  <div className="portfolio-heading">
    <div>
      <span className="eyebrow">OUR CREATIVE UNIVERSE</span>

      <h2>
        WORK THAT
        <br />
        SPEAKS <span>FOR ITSELF.</span>
      </h2>
    </div>

    <p>
      A glimpse into the creative possibilities of
      thoughtful branding, digital experiences
      and strategic design.
    </p>
  </div>

  <div className="portfolio-grid">

    {projects.map((project, index) => (
      <motion.article
        className="project-card"
        key={project.number}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.12 }}
      >

        <div className={`project-visual ${project.className}`}>

          <span className="project-type">
            {project.type}
          </span>

          <span className="project-art-title">
            {project.title}
          </span>

          <span className="project-art-symbol">
            {index === 0 ? "M." : index === 1 ? "DR." : "N."}
          </span>

        </div>

        <div className="project-info">

          <div>
            <span className="project-category">
              {project.category}
            </span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>
          </div>

          <span className="project-number">
            {project.number}
          </span>

        </div>

      </motion.article>
    ))}

  </div>

  <div className="portfolio-bottom">
    <p>EVERY GREAT PROJECT STARTS WITH AN IDEA.</p>

    <Link to="/contact" className="primary-btn">
      Start a Project
      <ArrowUpRight size={18} />
    </Link>
  </div>

</section>


{/* ABOUT SECTION */}

<section className="about-section" id="about">

  <div className="section-label">
    <span>04 / WHO WE ARE</span>
    <span>BUILT ON CREATIVE THINKING</span>
  </div>

  <div className="about-layout">

    <div className="about-left">
      <span className="eyebrow">A DIFFERENT WAY OF THINKING</span>

      <h2>
        WE THINK
        <br />
        BIGGER. WE
        <br />
        BUILD <span>SMARTER.</span>
      </h2>

      <Link to="/about" className="primary-btn">
        Discover Our Story
        <ArrowUpRight size={18} />
      </Link>
    </div>

    <div className="about-right">

      <p className="about-lead">
        Great brands aren't built by blending in.
        They're built by thinking differently,
        creating intentionally and moving with purpose.
      </p>

      <p className="about-description">
        LBDG brings together digital marketing,
        creative design and technology to help
        businesses strengthen their digital presence
        and connect with their audiences.
      </p>

      <div className="about-values">

        <div className="about-value">
          <span>01</span>
          <div>
            <h3>Think creatively</h3>
            <p>Fresh perspectives and ideas that stand apart.</p>
          </div>
        </div>

        <div className="about-value">
          <span>02</span>
          <div>
            <h3>Act strategically</h3>
            <p>Every creative decision has a purpose.</p>
          </div>
        </div>

        <div className="about-value">
          <span>03</span>
          <div>
            <h3>Create impact</h3>
            <p>Experiences designed around real business needs.</p>
          </div>
        </div>

        <div className="about-value">
          <span>04</span>
          <div>
            <h3>Keep evolving</h3>
            <p>Adapt, experiment and keep moving forward.</p>
          </div>
        </div>

      </div>

    </div>

  </div>

</section>


{/* CONTACT CTA SECTION */}

<section className="contact-cta">

  <div className="cta-decoration">✳</div>

  <span className="eyebrow">05 / HAVE A PROJECT IN MIND?</span>

  <h2>
    LET'S MAKE
    <br />
    SOMETHING <span>MATTER.</span>
  </h2>

  <p>
    Have an idea, a business or a brand ready
    for its next chapter? Let's make it happen.
  </p>

  <Link to="/contact" className="cta-button">
    LET'S TALK ABOUT YOUR PROJECT
    <ArrowUpRight size={20} />
  </Link>

</section>

    </main>
  );
}
