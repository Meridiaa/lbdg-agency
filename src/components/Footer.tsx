
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Camera,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            LBDG<span>.</span>
          </Link>

          <p>
            Creative thinking. Digital growth.
            Building stronger brands through
            strategy, design and technology.
          </p>

          <div className="footer-socials">

            <a
              href="#"
              aria-label="Instagram"
              title="Instagram"
            >
              <Camera size={18} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <BriefcaseBusiness size={18} />
            </a>

            <a
              href="#"
              aria-label="Website"
              title="Website"
            >
              <Globe size={18} />
            </a>

          </div>

        </div>

        {/* EXPLORE LINKS */}

        <div className="footer-column">

          <h4>EXPLORE</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/portfolio">Our Work</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* SERVICES */}

        <div className="footer-column">

          <h4>OUR SERVICES</h4>

          <Link to="/services#digital-marketing">
            Digital Marketing
          </Link>

          <Link to="/services#social-media">
            Social Media Management
          </Link>

          <Link to="/services#advertising">
            Advertising Services
          </Link>

          <Link to="/services#graphic-design">
            Graphic Designing
          </Link>

          <Link to="/services#web-development">
            Website Development
          </Link>

          <Link to="/services#seo">
            SEO Services
          </Link>

        </div>

        {/* CONTACT */}

        <div className="footer-column footer-contact">

          <h4>LET'S CONNECT</h4>

          <p>
            Have an idea? Let's talk about it.
          </p>

          <Link
            to="/contact"
            className="footer-contact-link"
          >
            Start a conversation
            <ArrowUpRight size={17} />
          </Link>

        </div>

      </div>

      {/* FOOTER BOTTOM */}

      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} LBDG Agency.
          All rights reserved.
        </span>

        <Link to="/">
          BACK TO TOP ↑
        </Link>

        <span>
          MADE FOR WHAT'S NEXT.
        </span>

      </div>

    </footer>
  );
}
