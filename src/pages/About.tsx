
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Lightbulb,
  Target,
  Layers,
  Rocket,
} from "lucide-react";

const values = [
  {
    number: "01",
    title: "Creative Thinking",
    description:
      "We explore fresh perspectives and develop ideas that help brands stand apart.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Strategic Approach",
    description:
      "Every decision is guided by purpose, audience understanding and business objectives.",
    icon: Target,
  },
  {
    number: "03",
    title: "Meaningful Design",
    description:
      "We bring ideas to life through thoughtful visuals and engaging digital experiences.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Continuous Growth",
    description:
      "We believe in adapting, experimenting and finding better ways to move forward.",
    icon: Rocket,
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, audience, goals and challenges.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We create a focused direction and plan for your project.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "We bring the strategy to life through design and development.",
  },
  {
    number: "04",
    title: "Evolve",
    description:
      "We evaluate, refine and identify opportunities for improvement.",
  },
];

export default function About() {
  return (
    <main className="about-page">

      {/* PAGE HERO */}

      <section className="about-page-hero">

        <motion.div
          className="about-page-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">
            ABOUT LBDG / OUR STORY
          </span>

          <h1>
            MORE THAN
            <br />
            JUST <span>AN AGENCY.</span>
          </h1>

          <div className="about-hero-bottom">
            <p>
              We bring creativity, strategy and technology
              together to help businesses build stronger
              digital identities and meaningful connections.
            </p>

            <span className="about-scroll">
              SCROLL TO DISCOVER ↓
            </span>
          </div>
        </motion.div>

        <div className="about-hero-decoration">
          L.
        </div>

      </section>


      {/* OUR STORY */}

      <section className="about-story">

        <div className="about-section-label">
          <span>01 / OUR STORY</span>
          <span>THE THINKING BEHIND THE WORK</span>
        </div>

        <div className="story-layout">

          <div>
            <span className="eyebrow">
              WHO WE ARE
            </span>

            <h2>
              IDEAS WITH
              <br />
              <span>INTENTION.</span>
            </h2>
          </div>

          <div className="story-content">

            <p className="story-lead">
              Every brand has a story.
              We believe it deserves to be seen,
              experienced and remembered.
            </p>

            <p>
              LBDG is presented as a creative and digital
              agency bringing together marketing,
              social media, advertising, graphic design,
              website development and SEO.
            </p>

            <p>
              Our approach combines creative exploration
              with strategic thinking to create digital
              experiences that communicate clearly
              and support business goals.
            </p>

            <Link to="/services" className="text-btn">
              Explore What We Do
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </section>


      {/* OUR VALUES */}

      <section className="about-values-section">

        <div className="about-section-label">
          <span>02 / WHAT DRIVES US</span>
          <span>OUR CORE VALUES</span>
        </div>

        <div className="values-heading">
          <h2>
            THE WAY WE
            <br />
            <span>THINK & CREATE.</span>
          </h2>

          <p>
            Good work comes from having the right
            mindset, a clear direction and a willingness
            to keep improving.
          </p>
        </div>

        <div className="values-grid">

          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                className="value-card"
                key={value.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >

                <div className="value-card-top">
                  <Icon size={29} strokeWidth={1.5} />
                  <span>{value.number}</span>
                </div>

                <h3>{value.title}</h3>

                <p>{value.description}</p>

              </motion.article>
            );
          })}

        </div>

      </section>


      {/* OUR PROCESS */}

      <section className="about-process">

        <div className="about-section-label">
          <span>03 / HOW WE WORK</span>
          <span>FROM IDEAS TO EXECUTION</span>
        </div>

        <div className="process-heading">
          <h2>
            A CLEAR PATH.
            <br />
            <span>BETTER POSSIBILITIES.</span>
          </h2>
        </div>

        <div className="process-list">

          {process.map((step) => (
            <div className="process-item" key={step.number}>

              <span className="process-number">
                {step.number}
              </span>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              <ArrowUpRight size={21} />

            </div>
          ))}

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="about-final-cta">

        <span className="eyebrow">
          YOUR NEXT CHAPTER STARTS HERE
        </span>

        <h2>
          LET'S BUILD
          <br />
          <span>WHAT'S NEXT.</span>
        </h2>

        <p>
          Have an idea or a business ready to grow?
          Let's create something meaningful together.
        </p>

        <Link to="/contact" className="primary-btn">
          Start a Conversation
          <ArrowUpRight size={18} />
        </Link>

      </section>

    </main>
  );
}
