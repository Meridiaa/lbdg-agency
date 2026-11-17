
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
  Check,
} from "lucide-react";

const services = [
  {
    id: "digital-marketing",
    number: "01",
    title: "Digital Marketing",
    subtitle: "STRATEGY & GROWTH",
    description:
      "Build a stronger digital presence with marketing strategies designed to connect your business with the right audience.",
    details:
      "From understanding your audience to planning campaigns, digital marketing helps businesses communicate their value across online channels.",
    icon: TrendingUp,
    deliverables: [
      "Digital marketing strategy",
      "Audience research",
      "Campaign planning",
      "Performance analysis",
    ],
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media Management",
    subtitle: "CONTENT & COMMUNITY",
    description:
      "Turn your social media profiles into meaningful spaces for brand communication, engagement and community building.",
    details:
      "Create a consistent social presence through content planning, creative posts, publishing and audience engagement.",
    icon: Camera,
    deliverables: [
      "Social media strategy",
      "Content calendars",
      "Post and reel planning",
      "Community engagement",
    ],
  },
  {
    id: "advertising",
    number: "03",
    title: "Advertising Services",
    subtitle: "CAMPAIGNS & REACH",
    description:
      "Put your brand in front of the right audience through creative advertising and focused campaign planning.",
    details:
      "Advertising helps businesses increase visibility, communicate offers and reach potential customers through relevant digital channels.",
    icon: Megaphone,
    deliverables: [
      "Campaign planning",
      "Ad creative concepts",
      "Audience targeting",
      "Campaign performance review",
    ],
  },
  {
    id: "graphic-design",
    number: "04",
    title: "Graphic Designing",
    subtitle: "VISUAL IDENTITY",
    description:
      "Make your brand memorable with distinctive visuals and thoughtful design that communicates your identity.",
    details:
      "From promotional graphics to brand visuals, effective graphic design makes communication more engaging and recognizable.",
    icon: Palette,
    deliverables: [
      "Social media creatives",
      "Marketing materials",
      "Promotional graphics",
      "Brand visual assets",
    ],
  },
  {
    id: "web-development",
    number: "05",
    title: "Website Development",
    subtitle: "DESIGN & DEVELOPMENT",
    description:
      "Give your business a professional online presence with responsive, attractive and user-friendly websites.",
    details:
      "We bring design and development together to create digital experiences that are easy to navigate and work across devices.",
    icon: Code2,
    deliverables: [
      "Responsive website development",
      "Website UI implementation",
      "Mobile-friendly layouts",
      "Website functionality",
    ],
  },
  {
    id: "seo",
    number: "06",
    title: "SEO Services",
    subtitle: "SEARCH & VISIBILITY",
    description:
      "Help customers discover your business through improved search visibility and search-friendly website content.",
    details:
      "Search engine optimization focuses on improving how your website is understood and discovered through organic search.",
    icon: Search,
    deliverables: [
      "Keyword research",
      "On-page SEO",
      "Website content optimization",
      "SEO performance monitoring",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, goals and target audience.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We develop a clear strategy and define the direction.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "We bring the strategy to life through creative execution.",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "We review, refine and identify opportunities to improve.",
  },
];

export default function Services() {
  return (
    <main className="services-page">

      {/* HERO */}

      <section className="services-page-hero">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">
            WHAT WE DO / OUR EXPERTISE
          </span>

          <h1>
            IDEAS INTO
            <br />
            <span>IMPACT.</span>
            <br />
            STRATEGY INTO GROWTH.
          </h1>

          <div className="services-page-hero-bottom">

            <p>
              Creative solutions and digital expertise
              to help your business build its presence,
              connect with people and grow.
            </p>

            <Link to="/contact" className="primary-btn">
              Discuss Your Project
              <ArrowUpRight size={18} />
            </Link>

          </div>
        </motion.div>

      </section>


      {/* SERVICES INTRO */}

      <section className="services-page-intro">

        <div className="about-section-label">
          <span>01 / WHAT WE OFFER</span>
          <span>SIX AREAS OF EXPERTISE</span>
        </div>

        <h2>
          EVERYTHING YOUR
          <br />
          BRAND NEEDS TO <span>MOVE FORWARD.</span>
        </h2>

        <p>
          Explore our services and discover how creative
          thinking, strategic planning and technology
          can support your business.
        </p>

      </section>


      {/* INDIVIDUAL SERVICE SECTIONS */}

      <section className="detailed-services">

        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.article
              id={service.id}
              className="detailed-service"
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
            >

              <div className="detailed-service-number">
                {service.number}
              </div>

              <div className="detailed-service-main">

                <div className="detailed-service-heading">

                  <div className="detailed-service-icon">
                    <Icon size={30} strokeWidth={1.5} />
                  </div>

                  <span>{service.subtitle}</span>

                </div>

                <h2>{service.title}</h2>

                <p className="detailed-service-description">
                  {service.description}
                </p>

                <p className="detailed-service-details">
                  {service.details}
                </p>

              </div>

              <div className="detailed-service-deliverables">

                <h4>WHAT THIS INCLUDES</h4>

                {service.deliverables.map((item) => (
                  <div className="deliverable" key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </div>
                ))}

                <Link
                  to="/contact"
                  className="service-contact-link"
                >
                  Enquire About This Service
                  <ArrowUpRight size={18} />
                </Link>

              </div>

            </motion.article>
          );
        })}

      </section>


      {/* PROCESS */}

      <section className="services-process">

        <div className="about-section-label">
          <span>03 / OUR APPROACH</span>
          <span>HOW WE WORK</span>
        </div>

        <h2>
          SIMPLE PROCESS.
          <br />
          <span>THOUGHTFUL EXECUTION.</span>
        </h2>

        <div className="services-process-grid">

          {process.map((step) => (
            <div className="services-process-card" key={step.number}>

              <span>{step.number}</span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="services-final-cta">

        <span className="eyebrow">
          READY TO GET STARTED?
        </span>

        <h2>
          LET'S GROW
          <br />
          <span>YOUR BRAND.</span>
        </h2>

        <p>
          Tell us about your business and what
          you want to achieve. Let's explore
          the possibilities together.
        </p>

        <Link to="/contact" className="primary-btn">
          Get in Touch
          <ArrowUpRight size={18} />
        </Link>

      </section>

    </main>
  );
}
