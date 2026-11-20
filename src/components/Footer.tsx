
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            LBDG<span>.</span>
          </Link>

          <p>
            Websites, brand design and digital marketing
            for businesses that want a stronger online presence.
          </p>
        </div>

        <div className="footer-column">
          <h4>EXPLORE</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Our Work</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>CONTACT</h4>

          <a href="mailto:lbdgagency@gmail.com">
            <Mail size={15} /> lbdgagency@gmail.com
          </a>

          <a href="tel:+919838686391">
            <Phone size={15} /> +91 98386 86391
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=A-23%2C%20A%20Block%2C%20Sector%2010%2C%20Noida"
            target="_blank"
            rel="noopener noreferrer"
          >
            A-23, A Block, Sector 10, Noida, Uttar Pradesh
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {currentYear} LBDG Agency.
          All rights reserved.
        </span>

        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          BACK TO TOP ↑
        </button>

        <span>NO EMPTY PROMISES. JUST GOOD WORK.</span>
      </div>
    </footer>
  );
}
