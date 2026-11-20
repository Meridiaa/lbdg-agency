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
    id: "web-development",
    title: "Website Development",
    icon: Code2,
    summary: "Business websites built for clarity, usability and mobile screens.",
    deliverables: [
      "Page structure and navigation",
      "Responsive desktop and mobile layouts",
      "Contact and inquiry forms",
      "On-page SEO foundations",
      "Deployment and launch checks",
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Designing",
    icon: Palette,
    summary: "Visual material that keeps your brand consistent across channels.",
    deliverables: [
      "Social media post designs",
      "Promotional campaign creatives",
      "Marketing banners",
      "Brand colour and typography direction",
      "Export-ready design files",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    summary: "Campaign planning based on your audience, offer and business goals.",
    deliverables: [
      "Business and audience review",
      "Channel recommendations",
      "Campaign planning",
      "Content direction",
      "Performance review",
    ],
  },
  {
    id: "social-media",
    title: "Social Media Management",
    icon: Camera,
    summary: "A more consistent social presence with planned content and publishing.",
    deliverables: [
      "Content calendar",
      "Post and reel concepts",
      "Creative asset preparation",
      "Caption and hashtag direction",
      "Publishing and engagement scope",
    ],
  },
  {
    id: "advertising",
    title: "Advertising Services",
    icon: Megaphone,
    summary: "Paid campaign creative and planning for relevant audiences.",
    deliverables: [
      "Campaign objective planning",
      "Audience research",
      "Ad copy and creative direction",
      "Campaign setup scope",
      "Performance reporting",
    ],
  },
  {
    id: "seo",
    title: "SEO Services",
    icon: Search,
    summary: "Website improvements that make pages easier for search engines to understand.",
    deliverables: [
      "Keyword research",
      "Page title and meta description review",
      "Heading and content structure",
      "Image alt text recommendations",
      "Technical SEO checks",
    ],
  },
];

export default function Services() {
  return (
    <main className="rev-page">
      <section className="rev-page-intro rev-services-intro">
        <span className="rev-kicker">SERVICES / WHAT WE DELIVER</span>
        <h1>
          PICK THE WORK
          <br />
          <span>YOUR BUSINESS NEEDS.</span>
        </h1>
        <p>
          Each project starts with a clear scope. Explore the deliverables
          and enquire about the service that fits your requirements.
        </p>
      </section>

      <section className="rev-services-list">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <article className="rev-service-detail" id={service.id} key={service.id}>
              <div className="rev-service-detail-title">
                <span>0{index + 1}</span>
                <Icon size={28} />
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
              </div>

              <div className="rev-service-detail-list">
                <h3>DELIVERABLES</h3>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="rev-text-link"
                >
                  Enquire about {service.title} <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rev-services-note">
        <h2>EVERY PROJECT HAS A DIFFERENT <span>SCOPE.</span></h2>
        <p>
          Pricing and delivery time depend on the number of pages,
          features, creative assets and other requirements. We confirm
          the estimate and schedule before work begins.
        </p>
        <Link to="/contact" className="rev-button">
          Discuss your requirements <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}