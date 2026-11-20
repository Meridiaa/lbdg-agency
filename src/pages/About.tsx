import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <main className="rev-page">
      <section className="rev-page-intro rev-about-intro">
        <span className="rev-kicker">ABOUT LBDG AGENCY</span>
        <h1>
          WE HELP BUSINESSES
          <br />
          <span>SHOW UP BETTER ONLINE.</span>
        </h1>
        <p>
          Website development, visual design and digital marketing
          brought together around the needs of your business.
        </p>
      </section>

      <section className="rev-about-story">
        <div className="rev-about-statement">
          <span className="rev-kicker">WHAT WE DO</span>
          <h2>
            WE TURN BUSINESS REQUIREMENTS INTO
            <span> USEFUL DIGITAL WORK.</span>
          </h2>
        </div>

        <div className="rev-about-copy">
          <p>
            A website should explain what you offer, help visitors
            find the information they need and make contacting you easy.
            Brand design should make your business recognisable.
            Marketing should have a clear audience and purpose.
          </p>

          <p>
            That's the work we focus on at LBDG: building and improving
            the parts of your digital presence that customers actually use.
          </p>

          <p>
            We work across website development, graphic design,
            social media, advertising, digital marketing and SEO.
            Projects are scoped around the requirements rather than
            forcing every business into the same package.
          </p>

          <Link to="/services" className="rev-button">
            See our services <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="rev-about-delivery">
        <span className="rev-kicker">HOW A PROJECT MOVES FORWARD</span>
        <h2>FROM BRIEF TO <span>DELIVERY.</span></h2>

        <div className="rev-timeline">
          <article>
            <span>01</span>
            <h3>Brief</h3>
            <p>We discuss your business, audience, requirements and priorities.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Scope</h3>
            <p>We agree on the work, deliverables, schedule and project estimate.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Build</h3>
            <p>Design and development move forward with review points along the way.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Handover</h3>
            <p>We review the final work and prepare the agreed deliverables.</p>
          </article>
        </div>
      </section>

      <section className="rev-about-note">
        <div>
          <span className="rev-kicker">NO MADE-UP BACKSTORY</span>
          <h2>REAL PEOPLE. <span>REAL DETAILS.</span></h2>
        </div>
        <p>
          This page will be expanded with the agency's actual founder
          information, team photographs and story when those details
          are available. We would rather leave room for the truth than
          publish fictional credentials.
        </p>
      </section>
    </main>
  );
}