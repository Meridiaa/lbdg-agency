import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://lbdg-agency.vercel.app";

const pages: Record<string, { title: string; description: string }> = {
  "/": {
    title: "LBDG Agency | Digital Marketing & Creative Agency in Noida",
    description: "LBDG Agency offers digital marketing, social media management, advertising, graphic design, website development and SEO services in Noida.",
  },
  "/about": {
    title: "About LBDG Agency | Creative Agency in Noida",
    description: "Learn about LBDG Agency's approach to digital marketing, branding, creative design and website development.",
  },
  "/services": {
    title: "Digital Marketing, Web Design & SEO Services | LBDG Agency",
    description: "Explore digital marketing, social media management, advertising, graphic design, website development and SEO services from LBDG Agency.",
  },
  "/portfolio": {
    title: "Creative Portfolio & Design Concepts | LBDG Agency",
    description: "Explore self-initiated branding, visual design and digital experience concepts from LBDG Agency.",
  },
  "/contact": {
    title: "Contact LBDG Agency | Noida, Uttar Pradesh",
    description: "Contact LBDG Agency for digital marketing, social media, advertising, graphic design, website development and SEO enquiries.",
  },
};

function upsertMeta(selector: string, attribute: string, value: string, create: () => HTMLMetaElement) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname];
    const isKnownRoute = Boolean(page);
    const title = page?.title ?? "Page Not Found | LBDG Agency";
    const description = page?.description ?? "The requested page could not be found.";
    const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = title;
    upsertMeta('meta[name="description"]', "content", description, () => {
      const el = document.createElement("meta"); el.name = "description"; return el;
    });
    upsertMeta('meta[name="robots"]', "content", isKnownRoute ? "index,follow" : "noindex,follow", () => {
      const el = document.createElement("meta"); el.name = "robots"; return el;
    });

    for (const [property, value] of [
      ["og:title", title],
      ["og:description", description],
      ["og:url", canonical],
      ["og:type", "website"],
      ["og:site_name", "LBDG Agency"],
    ]) {
      upsertMeta(`meta[property="${property}"]`, "content", value, () => {
        const el = document.createElement("meta"); el.setAttribute("property", property); return el;
      });
    }

    upsertMeta('meta[name="twitter:card"]', "content", "summary", () => {
      const el = document.createElement("meta"); el.name = "twitter:card"; return el;
    });

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const token = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (token) {
      upsertMeta('meta[name="google-site-verification"]', "content", token, () => {
        const el = document.createElement("meta"); el.name = "google-site-verification"; return el;
      });
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "LBDG Agency",
      url: SITE_URL,
      telephone: "+919838686391",
      email: "lbdgagency@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "A-23, A Block, Sector 10",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      areaServed: { "@type": "City", name: "Noida" },
      description: "Digital marketing, social media management, advertising, graphic design, website development and SEO services.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "LBDG Agency Services",
        itemListElement: [
          "Digital Marketing", "Social Media Management", "Advertising Services",
          "Graphic Designing", "Website Development", "SEO Services",
        ].map((name, index) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", name, provider: { "@type": "Organization", name: "LBDG Agency", url: SITE_URL } },
          position: index + 1,
        })),
      },
    };

    let schemaScript = document.getElementById(
  "lbdg-business-schema"
) as HTMLScriptElement | null;

if (!schemaScript) {
  schemaScript = document.createElement("script");
  schemaScript.id = "lbdg-business-schema";
  schemaScript.type = "application/ld+json";
  document.head.appendChild(schemaScript);
}

schemaScript.textContent = JSON.stringify(schema);
    schemaScript.textContent = JSON.stringify(schema);

    return () => {
      // Keep shared metadata in place; next route updates its values.
    };
  }, [pathname]);

  return null;
}
