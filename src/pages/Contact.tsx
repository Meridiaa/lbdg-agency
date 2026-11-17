
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Link } from "react-router-dom";
import { motion } from "motion/react";

import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

const services = [
  "Digital Marketing",
  "Social Media Management",
  "Advertising Services",
  "Graphic Designing",
  "Website Development",
  "SEO Services",
  "Other / Not Sure Yet",
];

const budgets = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "Not decided yet",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Front-end demonstration only.
    // Actual submission will be connected to a backend later.

    setSubmitted(true);
  }

  function resetForm() {
    setFormData(initialFormData);
    setSubmitted(false);
  }

  return (
    <main className="contact-page">

      {/* HERO SECTION */}

      <section className="contact-page-hero">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="eyebrow">
            LBDG / GET IN TOUCH
          </span>

          <h1>
            LET'S START
            <br />
            <span>SOMETHING.</span>
          </h1>

          <div className="contact-hero-bottom">

            <p>
              Have a project in mind, a question or an idea
              you'd like to explore? We'd love to hear about it.
            </p>

            <span>
              YOUR NEXT CHAPTER STARTS HERE ↘
            </span>

          </div>

        </motion.div>

      </section>


      {/* CONTACT INFORMATION AND FORM */}

      <section className="contact-main">

        <div className="contact-section-label">

          <span>01 / TELL US ABOUT YOUR PROJECT</span>

          <span>LET'S MAKE IT HAPPEN</span>

        </div>


        <div className="contact-layout">

          {/* LEFT SIDE */}

          <div className="contact-information">

            <span className="eyebrow">
              HAVE A QUESTION?
            </span>

            <h2>
              WE'RE JUST
              <br />
              A MESSAGE
              <br />
              <span>AWAY.</span>
            </h2>

            <p>
              Share a little about what you're looking
              for. The more we understand your goals,
              the better we can explore the right direction.
            </p>


            {/* CONTACT DETAILS */}

            <div className="contact-info-list">

              <div className="contact-info-item">

                <div className="contact-info-icon">
                  <Mail size={19} />
                </div>

                <div>
                  <span>EMAIL</span>
                  <p>Official email to be added</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  <Phone size={19} />
                </div>

                <div>
                  <span>PHONE / WHATSAPP</span>
                  <p>Official contact number to be added</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <span>LOCATION</span>
                  <p>Agency location to be confirmed</p>
                </div>

              </div>


              <div className="contact-info-item">

                <div className="contact-info-icon">
                  <Clock size={19} />
                </div>

                <div>
                  <span>BUSINESS HOURS</span>
                  <p>Working hours to be confirmed</p>
                </div>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE - CONTACT FORM */}

          <div className="contact-form-wrapper">

            {submitted ? (

              <motion.div
                className="form-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >

                <CheckCircle2
                  size={55}
                  color="var(--accent)"
                />

                <h3>FORM VALIDATED!</h3>

                <p>
                  Your details have passed browser validation.
                  However, this is currently a demonstration.
                  No inquiry has been sent because the backend
                  submission service is not connected yet.
                </p>

                <button
                  type="button"
                  className="form-reset-btn"
                  onClick={resetForm}
                >
                  Submit Another Inquiry
                </button>

              </motion.div>

            ) : (

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="form-heading">

                  <h3>TELL US WHAT YOU NEED.</h3>

                  <p>
                    Fill in the details below and let's
                    explore your project.
                  </p>

                </div>


                {/* NAME AND EMAIL */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="name">
                      YOUR NAME *
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label htmlFor="email">
                      EMAIL ADDRESS *
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />

                  </div>

                </div>


                {/* PHONE AND SERVICE */}

                <div className="form-row">

                  <div className="form-group">

                    <label htmlFor="phone">
                      PHONE NUMBER
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />

                  </div>


                  <div className="form-group">

                    <label htmlFor="service">
                      SERVICE REQUIRED *
                    </label>

                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >

                      <option value="" disabled>
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>


                {/* BUDGET */}

                <div className="form-group">

                  <label htmlFor="budget">
                    PROJECT BUDGET
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select your budget
                    </option>

                    {budgets.map((budget) => (
                      <option
                        key={budget}
                        value={budget}
                      >
                        {budget}
                      </option>
                    ))}

                  </select>

                </div>


                {/* MESSAGE */}

                <div className="form-group">

                  <label htmlFor="message">
                    TELL US ABOUT YOUR PROJECT *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your idea, goals and requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  className="contact-submit-btn"
                >

                  SEND YOUR INQUIRY

                  <Send size={18} />

                </button>

                <p className="form-note">
                  * Required fields
                </p>

              </form>

            )}

          </div>

        </div>

      </section>


      {/* FINAL CALL TO ACTION */}

      <section className="contact-final-cta">

        <span className="eyebrow">
          GOOD IDEAS START WITH A CONVERSATION
        </span>

        <h2>
          LET'S MAKE
          <br />
          <span>IT HAPPEN.</span>
        </h2>

        <p>
          Explore what we can create together.
        </p>

        <Link
          to="/services"
          className="contact-explore-link"
        >

          Explore Our Services

          <ArrowUpRight size={18} />

        </Link>

      </section>

    </main>
  );
}
