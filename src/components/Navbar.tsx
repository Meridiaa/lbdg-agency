
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/portfolio" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navx-header">
      <nav className="navx-bar">
        <NavLink to="/" className="navx-logo" onClick={closeMenu}>
          LBDG<span>.</span>
        </NavLink>

        <div className={`navx-links ${menuOpen ? "navx-links-open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navx-link ${isActive ? "navx-active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            className="navx-mobile-contact"
            onClick={closeMenu}
          >
            Let's talk <ArrowUpRight size={17} />
          </NavLink>
        </div>

        <NavLink to="/contact" className="navx-cta">
          Let's talk <ArrowUpRight size={17} />
        </NavLink>

        <button
          className="navx-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}
