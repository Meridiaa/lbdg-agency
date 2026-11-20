import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ExternalLink } from "lucide-react";

const services = [
  "Website Development",
  "Graphic Designing",
  "Digital Marketing",
  "Social Media Management",
  "Advertising Services",
  "SEO Services",
  "Other / Not Sure Yet",
];

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const PHONE = "+919838686391";
const EMAIL = "lbdgagency@gmail.com";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=A-23%2C%20A%20Block%2C%20Sector%2010%2C%20Noida";

export default function Contact() {
  const [params] = useSearchParams();
  const selectedService = params.get("service") || "";
  const selectedProject = params.get("project") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: services.includes(selectedService) ? selectedService : "",
    budget: "",
    message: selectedProject
      ? `I would like to discuss a project similar to ${selectedProject}.`
      : "",
    consent: false,
    website: "",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (!form.consent) {
      setStatus("Please confirm that LBDG Agency may use these details to respond to your enquiry.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      service: form.service,
      budget: form.budget || null,
      message: form.message.trim(),
      consent: form.consent,
      honeypot: form.website,
    };

    if (API_BASE) {
      setSubmitting(true);
      try {
        const response = await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.error || "Your enquiry could not be submitted. Please try WhatsApp.");
        }
        setStatus(`Your enquiry has been received. Reference: ${result.lead_number || "received"}.`);
        setForm({
          name: "", email: "", phone: "", service: "", budget: "",
          message: "", consent: false, website: "",
        });
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Submission failed. Please contact us on WhatsApp.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // No backend URL configured: prepare an email instead of pretending the form was submitted.
    const subject = encodeURIComponent(`Website enquiry from ${payload.name}`);
    const body = encodeURIComponent(
      `New enquiry for LBDG Agency\n\nName: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "Not provided"}\nService: ${payload.service}\nBudget: ${payload.budget || "Not specified"}\n\nProject details:\n${payload.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("Your email application should open with the enquiry prepared. Press Send there to send it.");
  }

  const whatsappMessage = encodeURIComponent(
    `Hello LBDG Agency! I would like to discuss ${form.service || "a project"}. ${form.message}`.trim()
  );

  return (
    <main className="rev-page">
      <section className="rev-page-intro rev-contact-intro">
        <span className="rev-kicker">CONTACT / PROJECT ENQUIRIES</span>
        <h1>TELL US WHAT<br /><span>YOU'RE WORKING ON.</span></h1>
        <p>Share your requirements, ask a question or tell us what you want to improve.</p>
      </section>

      <section className="rev-contact-layout">
        <div className="rev-contact-details">
          <span className="rev-kicker">OFFICIAL CONTACT DETAILS</span>
          <h2>REACH THE <span>TEAM.</span></h2>
          <a href={`mailto:${EMAIL}`} className="rev-contact-item">
            <Mail /><div><small>EMAIL</small><strong>{EMAIL}</strong></div>
          </a>
          <a href={`tel:${PHONE}`} className="rev-contact-item">
            <Phone /><div><small>PHONE</small><strong>+91 98386 86391</strong></div>
          </a>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="rev-contact-item">
            <MapPin /><div><small>ADDRESS</small><strong>A-23, A Block, Sector 10, Noida, Uttar Pradesh</strong></div><ExternalLink size={15}/>
          </a>
          <div className="rev-contact-item">
            <Clock /><div><small>WORKING HOURS</small><strong>10:00 AM – 6:00 PM</strong></div>
          </div>
          <a className="rev-contact-whatsapp" href={`https://wa.me/919838686391?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} /> Chat on WhatsApp
          </a>
        </div>

        <div className="rev-contact-form-wrap">
          <h2>PROJECT ENQUIRY</h2>
          <p>Complete the form to contact the team.</p>
          <form className="rev-contact-form" onSubmit={handleSubmit}>
            <label>YOUR NAME *
              <input name="name" value={form.name} onChange={updateField} minLength={2} maxLength={100} autoComplete="name" required />
            </label>
            <label>EMAIL ADDRESS *
              <input name="email" type="email" value={form.email} onChange={updateField} maxLength={150} autoComplete="email" required />
            </label>
            <label>PHONE NUMBER
              <input name="phone" type="tel" value={form.phone} onChange={updateField} maxLength={30} autoComplete="tel" />
            </label>
            <label>SERVICE REQUIRED *
              <select name="service" value={form.service} onChange={updateField} required>
                <option value="">Choose a service</option>
                {services.map((service) => <option value={service} key={service}>{service}</option>)}
              </select>
            </label>
            <label>ESTIMATED BUDGET
              <select name="budget" value={form.budget} onChange={updateField}>
                <option value="">Not decided</option>
                <option>Under ₹10,000</option>
                <option>₹10,000 – ₹25,000</option>
                <option>₹25,000 – ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>Above ₹1,00,000</option>
              </select>
            </label>
            <label>PROJECT DETAILS *
              <textarea name="message" value={form.message} onChange={updateField} minLength={10} maxLength={3000} rows={5} required />
            </label>
            <label className="rev-consent">
              <input type="checkbox" name="consent" checked={form.consent} onChange={updateField} required />
              I agree that LBDG Agency may use these details to respond to my enquiry.
            </label>
            {/* Honeypot field. Keep visually hidden; do not remove. */}
            <div aria-hidden="true" className="rev-honeypot">
              <label>Leave this field empty<input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" /></label>
            </div>
            {status && <p role="status" aria-live="polite" className="rev-form-status">{status}</p>}
            <button type="submit" className="rev-button" disabled={submitting}>
              {submitting ? "Sending..." : API_BASE ? "Send enquiry" : "Prepare email enquiry"} <Send size={17} />
            </button>
            <small className="rev-form-disclaimer">
              {API_BASE
                ? "Your enquiry is sent to the LBDG website service. A confirmation is shown only after the server accepts it."
                : "Email fallback is active: your email application opens with the enquiry prepared. You must press Send there."}
            </small>
          </form>
        </div>
      </section>
    </main>
  );
}
