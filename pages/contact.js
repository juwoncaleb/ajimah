
import React, { useState } from "react";
import Head from "next/head";
import Header from "./components/header";
import Footer from "./components/footer";

/* ==========================================
   CONTACT DETAILS
   Replace with AJMAH's actual information
========================================== */

const contact = {
  phone: "",
  email: "",
  location: "Nigeria",
  whatsapp: "",
  instagram: "",
  instagramHandle: "@ajmahinteriors",
};

/* ==========================================
   INITIAL FORM
========================================== */

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

/* ==========================================
   ICONS
========================================== */

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10a16 16 0 0 0 6.8 6.8l1.6-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  if (name === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "message") {
    return (
      <svg {...common}>
        <path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-3.5-.7L4 20l1.2-4.4A8 8 0 1 1 20 11.5Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return null;
}

/* ==========================================
   INQUIRE PAGE
========================================== */

export default function Inquire() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to submit inquiry");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Inquire | AJMAH Interiors</title>

        <meta
          name="description"
          content="Begin your interior design project with AJMAH Interiors. Tell us about your space, timeline, and vision."
        />
      </Head>

      <div className="aj-inquire-page">
        <Header />

        <main className="aj-inquire-main">
          <div className="aj-inquire-container">

            {/* ==================================
                INTRODUCTION
            ================================== */}

            <div className="aj-inquire-intro">
              <span className="aj-inquire-kicker">
                INQUIRE
              </span>

              <h1>Begin Your Project</h1>

              <p>
                Tell us about your space, timeline, and vision.
                We look forward to learning more about your project.
              </p>
            </div>

            {/* ==================================
                MAIN TWO-COLUMN LAYOUT
            ================================== */}

            <div className="aj-inquire-layout">

              {/* LEFT: INQUIRY FORM */}

              <div className="aj-inquire-form-section">
                <form onSubmit={handleSubmit}>

                  {/* NAME + PHONE */}

                  <div className="aj-inquire-form-row">
                    <div className="aj-inquire-field">
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name*"
                        aria-label="Full Name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="aj-inquire-field">
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div className="aj-inquire-field">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address*"
                      aria-label="Email Address"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* PROJECT TYPE + BUDGET */}

                  <div className="aj-inquire-form-row">
                    <div className="aj-inquire-field">
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        aria-label="Project Type"
                        required
                      >
                        <option value="">
                          Project Type
                        </option>

                        <option value="Residential Design">
                          Residential Design
                        </option>

                        <option value="Commercial Design">
                          Commercial Design
                        </option>

                        <option value="Full-Service Interior Design">
                          Full-Service Interior Design
                        </option>

                        <option value="Renovation">
                          Renovation
                        </option>

                        <option value="Design Consultation">
                          Design Consultation
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div className="aj-inquire-field">
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        aria-label="Estimated Budget"
                        required
                      >
                        <option value="">
                          Estimated Budget
                        </option>

                        <option value="Below ₦5 Million">
                          Below ₦5 Million
                        </option>

                        <option value="₦5M – ₦10M">
                          ₦5M – ₦10M
                        </option>

                        <option value="₦10M – ₦25M">
                          ₦10M – ₦25M
                        </option>

                        <option value="₦25M – ₦50M">
                          ₦25M – ₦50M
                        </option>

                        <option value="₦50M – ₦100M">
                          ₦50M – ₦100M
                        </option>

                        <option value="Above ₦100M">
                          Above ₦100M
                        </option>

                        <option value="To Be Discussed">
                          To Be Discussed
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div className="aj-inquire-field">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and vision..."
                      aria-label="Project Details"
                      rows={4}
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="aj-inquire-submit"
                    disabled={loading}
                  >
                    {loading
                      ? "SUBMITTING..."
                      : "SUBMIT INQUIRY"}
                  </button>

                  {/* STATUS MESSAGES */}

                  {status === "success" && (
                    <p
                      className="aj-inquire-status success"
                      role="status"
                    >
                      Thank you. Your inquiry has been submitted.
                    </p>
                  )}

                  {status === "error" && (
                    <p
                      className="aj-inquire-status error"
                      role="alert"
                    >
                      Unable to send your inquiry.
                      Please try again.
                    </p>
                  )}
                </form>
              </div>

              {/* ==================================
                  RIGHT: STUDIO INFORMATION
              ================================== */}

              <aside className="aj-inquire-sidebar">

                <div className="aj-inquire-studio">
                  <span className="aj-inquire-sidebar-heading">
                    STUDIO
                  </span>

                  {/* PHONE */}

                  {contact.phone && (
                    <div className="aj-inquire-contact-row">
                      <Icon name="phone" />

                      <a href={`tel:${contact.phone}`}>
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  {/* EMAIL */}

                  {contact.email && (
                    <div className="aj-inquire-contact-row">
                      <Icon name="mail" />

                      <a href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </div>
                  )}

                  {/* LOCATION */}

                  <div className="aj-inquire-contact-row">
                    <Icon name="location" />

                    <span>{contact.location}</span>
                  </div>

                  {/* HOURS */}

                  <div className="aj-inquire-contact-row">
                    <Icon name="clock" />

                    <span>
                      Monday – Friday: By Appointment
                      <br />
                      Saturday – Sunday: Closed
                    </span>
                  </div>

                  {/* WHATSAPP */}

                  {contact.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aj-inquire-contact-row aj-inquire-whatsapp"
                    >
                      <Icon name="message" />

                      <span>
                        Message us on WhatsApp
                      </span>
                    </a>
                  )}
                </div>

                {/* SOCIAL */}

                <div className="aj-inquire-social">
                  <span className="aj-inquire-sidebar-heading">
                    CONNECT WITH US
                  </span>

                  {contact.instagram && (
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aj-inquire-contact-row"
                    >
                      <Icon name="instagram" />

                      <span>
                        {contact.instagramHandle}
                      </span>
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* ==========================================
          ALL PAGE CSS
      ========================================== */}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap");

        /* ======================================
           GENERAL
        ====================================== */

        .aj-inquire-page {
          width: 100%;
          background: #f8f6f2;
          color: #201e1b;
          font-family: "Cormorant Garamond", Georgia, serif;
        }

        .aj-inquire-page *,
        .aj-inquire-page *::before,
        .aj-inquire-page *::after {
          box-sizing: border-box;
        }

        .aj-inquire-page a {
          color: inherit;
          text-decoration: none;
        }

        /* ======================================
           MAIN SECTION
        ====================================== */

        .aj-inquire-main {
          background: #f8f6f2;
          min-height: 730px;
          padding: 80px 24px 115px;
        }

        .aj-inquire-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        /* ======================================
           INTRODUCTION
        ====================================== */

        .aj-inquire-intro {
          max-width: 750px;
          margin-bottom: 82px;
        }

        .aj-inquire-kicker {
          display: block;
          margin-bottom: 21px;
          color: #896f5b;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .aj-inquire-intro h1 {
          margin: 0 0 17px;
          font-size: clamp(54px, 5vw, 76px);
          font-weight: 400;
          letter-spacing: -1.3px;
          line-height: 1.05;
          color: #201e1b;
        }

        .aj-inquire-intro p {
          margin: 0;
          max-width: 650px;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 17px;
          line-height: 1.65;
          color: #96765d;
        }

        /* ======================================
           TWO COLUMN LAYOUT
        ====================================== */

        .aj-inquire-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);
          gap: 108px;
          align-items: start;
        }

        /* ======================================
           FORM
        ====================================== */

        .aj-inquire-form-section {
          min-width: 0;
        }

        .aj-inquire-form-section form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .aj-inquire-form-row {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 27px;
        }

        .aj-inquire-field {
          min-width: 0;
          width: 100%;
        }

        .aj-inquire-field input,
        .aj-inquire-field select,
        .aj-inquire-field textarea {
          display: block;
          width: 100%;
          padding: 16px 0 17px;
          border: none;
          border-bottom: 1px solid #ded8cf;
          border-radius: 0;
          outline: none;
          background: transparent;
          color: #201e1b;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          line-height: 1.5;
          box-shadow: none;
          transition: border-color 0.25s ease;
        }

        .aj-inquire-field input {
          height: 56px;
        }

        .aj-inquire-field select {
          height: 56px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }

        .aj-inquire-field textarea {
          min-height: 123px;
          resize: vertical;
        }

        .aj-inquire-field input::placeholder,
        .aj-inquire-field textarea::placeholder {
          color: #94745d;
          opacity: 1;
        }

        .aj-inquire-field select:invalid {
          color: #94745d;
        }

        .aj-inquire-field select option {
          color: #201e1b;
          background: #f8f6f2;
        }

        .aj-inquire-field input:focus,
        .aj-inquire-field select:focus,
        .aj-inquire-field textarea:focus {
          border-bottom-color: #201e1b;
        }

        /* ======================================
           SUBMIT BUTTON
        ====================================== */

        .aj-inquire-submit {
          width: 237px;
          height: 51px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 12px;
          padding: 15px 20px;
          border: 1px solid #201e1b;
          border-radius: 0;
          background: #201e1b;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.3px;
          cursor: pointer;
          transition:
            background 0.25s ease,
            color 0.25s ease;
        }

        .aj-inquire-submit:hover:not(:disabled) {
          background: transparent;
          color: #201e1b;
        }

        .aj-inquire-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* ======================================
           FORM STATUS
        ====================================== */

        .aj-inquire-status {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 1.5;
        }

        .aj-inquire-status.success {
          color: #426c4c;
        }

        .aj-inquire-status.error {
          color: #a14b43;
        }

        /* ======================================
           STUDIO SIDEBAR
        ====================================== */

        .aj-inquire-sidebar {
          min-width: 0;
          padding: 0;
          border: none;
          font-family: Arial, Helvetica, sans-serif;
        }

        .aj-inquire-studio {
          padding: 0 0 48px;
        }

        .aj-inquire-sidebar-heading {
          display: block;
          margin-bottom: 23px;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          line-height: 1.5;
          color: #896f5b;
        }

        .aj-inquire-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
          color: #96765d;
          font-size: 15px;
          line-height: 1.5;
        }

        .aj-inquire-contact-row svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #7b736a;
        }

        .aj-inquire-contact-row a,
        a.aj-inquire-contact-row {
          color: #201e1b;
        }

        .aj-inquire-contact-row a:hover,
        a.aj-inquire-contact-row:hover {
          opacity: 0.65;
        }

        .aj-inquire-whatsapp {
          margin-top: 43px;
          margin-bottom: 0;
        }

        /* ======================================
           SOCIAL
        ====================================== */

        .aj-inquire-social {
          padding-top: 36px;
          border-top: 1px solid #eee9e2;
        }

        .aj-inquire-social .aj-inquire-sidebar-heading {
          margin-bottom: 19px;
        }

        .aj-inquire-social .aj-inquire-contact-row {
          margin-bottom: 0;
          color: #96765d;
        }

        /* ======================================
           TABLET
        ====================================== */

        @media (max-width: 1050px) {
          .aj-inquire-main {
            padding: 70px 5% 100px;
          }

          .aj-inquire-layout {
            gap: 55px;
          }

          .aj-inquire-intro {
            margin-bottom: 65px;
          }
        }

        /* ======================================
           MOBILE
        ====================================== */

        @media (max-width: 700px) {
          .aj-inquire-main {
            padding: 55px 22px 90px;
          }

          .aj-inquire-intro {
            margin-bottom: 55px;
          }

          .aj-inquire-kicker {
            font-size: 10px;
            margin-bottom: 18px;
          }

          .aj-inquire-intro h1 {
            font-size: clamp(46px, 11vw, 62px);
            letter-spacing: -0.7px;
            margin-bottom: 19px;
          }

          .aj-inquire-intro p {
            font-size: 15px;
            line-height: 1.7;
          }

          .aj-inquire-layout {
            grid-template-columns: 1fr;
            gap: 75px;
          }

          .aj-inquire-form-row {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .aj-inquire-form-section form {
            gap: 22px;
          }

          .aj-inquire-field input,
          .aj-inquire-field select {
            height: 55px;
          }

          .aj-inquire-field textarea {
            min-height: 120px;
          }

          .aj-inquire-submit {
            width: 237px;
            max-width: 100%;
            margin-top: 10px;
          }

          .aj-inquire-studio {
            padding-bottom: 42px;
          }

          .aj-inquire-social {
            padding-top: 33px;
          }
        }

        /* ======================================
           ACCESSIBILITY
        ====================================== */

        @media (prefers-reduced-motion: reduce) {
          .aj-inquire-page *,
          .aj-inquire-page *::before,
          .aj-inquire-page *::after {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
