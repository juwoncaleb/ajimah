
import React, { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";

const images = {
  hero: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  heroSide: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  story: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  ],
  residential:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  commercial:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
};

/* ==========================================
   DESIGN PROCESS
========================================== */


const approachSteps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description:
      "We begin by getting to know you, your space, and what you hope to achieve. We discuss your preferences, lifestyle, budget, and expectations to establish a clear understanding of your project.",
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    title: "Site Assessment",
    description:
      "We assess the existing space, take measurements, and consider its layout, lighting, and structural details. This helps us identify opportunities and understand what is possible before developing the design.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    title: "Space Planning",
    description:
      "We carefully plan how each area will function, considering furniture placement, circulation, comfort, and the best use of available space. The goal is to create a layout that feels natural and works for your everyday needs.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "04",
    title: "Design Development",
    description:
      "We bring the vision together through mood boards, colour palettes, furniture concepts, material selections, and 3D visualisations where required. This allows you to see the proposed direction and provide feedback before work begins.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "05",
    title: "Material & Furniture Selection",
    description:
      "From finishes and fabrics to lighting and furniture, we select elements that complement the design. We consider quality, durability, comfort, and how every detail contributes to the overall space.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "06",
    title: "Project Execution",
    description:
      "Once the design is approved, we coordinate the work required to bring it to life. We oversee installations, manage the design details, and monitor progress to ensure the project stays aligned with the agreed vision.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "07",
    title: "Final Styling & Handover",
    description:
      "We complete the space with furniture placement, decorative accessories, and finishing touches. Before handover, we review the details to ensure everything comes together beautifully and the space is ready to be enjoyed.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
];


/* ==========================================
   ACCORDION
========================================== */

function ApproachAccordion() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="aj-about-process">
      <div className="aj-about-process-heading">
        <div>
          <span className="aj-about-kicker">
            OUR DESIGN PROCESS
          </span>
          <h2>How we work</h2>
        </div>

    
      </div>

      <div className="aj-about-process-layout">
        <div className="aj-about-process-accordion">
          {approachSteps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                className={`aj-about-process-item ${
                  isActive ? "is-active" : ""
                }`}
                key={step.number}
              >
                <button
                  type="button"
                  className="aj-about-process-trigger"
                  onClick={() =>
                    setActiveStep(isActive ? -1 : index)
                  }
                  aria-expanded={isActive}
                  aria-controls={`approach-panel-${index}`}
                >
                  <span className="aj-about-process-number">
                    {step.number}
                  </span>

                  <span className="aj-about-process-title">
                    {step.title}
                  </span>

                  <span
                    className="aj-about-process-plus"
                    aria-hidden="true"
                  >
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`approach-panel-${index}`}
                  className="aj-about-process-panel"
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <div className="aj-about-process-panel-inner">
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="aj-about-process-visual">
          {approachSteps.map((step, index) => (
            <img
              key={step.number}
              src={step.image}
              alt={`${step.title} — interior design process`}
              loading="lazy"
              className={
                activeStep === index ? "is-visible" : ""
              }
            />
          ))}

          <div className="aj-about-process-image-label">
            <span>AJMAH / OUR PROCESS</span>
            <span>
              {String(
                activeStep >= 0 ? activeStep + 1 : 1
              ).padStart(2, "0")}{" "}
              — {String(approachSteps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   EDITORIAL GALLERY
========================================== */

function EditorialGallery() {
  const galleryRef = useRef(null);

  const scrollGallery = (direction) => {
    const container = galleryRef.current;
    if (!container) return;

    const card = container.querySelector(
      ".aj-about-gallery-card"
    );

    const distance = card
      ? card.getBoundingClientRect().width + 18
      : 350;

    container.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="aj-about-gallery-section">
      <div className="aj-about-gallery-header">
        <div>
          <span className="aj-about-kicker">
            THE AJMAH PERSPECTIVE
          </span>
          <h2>In the details</h2>
        </div>

        <div className="aj-about-gallery-arrows">
          <button
            type="button"
            aria-label="Previous images"
            onClick={() => scrollGallery(-1)}
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next images"
            onClick={() => scrollGallery(1)}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="aj-about-gallery-track"
        ref={galleryRef}
      >
        {images.gallery.map((image, index) => (
          <div
            className="aj-about-gallery-card"
            key={index}
          >
            <div className="aj-about-gallery-image">
              <img
                src={image}
                alt={`Ajmah interior design inspiration ${index + 1}`}
                loading="lazy"
              />
            </div>

            <span>
              {String(index + 1).padStart(2, "0")} /
              DESIGN DETAILS
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================
   ABOUT PAGE
========================================== */

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Ajmah Interiors</title>
        <meta
          name="description"
          content="Discover Ajmah, an interior design studio creating considered residential and commercial spaces."
        />
      </Head>

      <div className="aj-about">
        <Header />

        <main>
          {/* HERO */}

          <section className="aj-about-hero">
            <div className="aj-about-hero-images">
              <div className="aj-about-hero-main">
                <img
                  src={images.hero}
                  alt="Beautifully designed contemporary interior"
                  fetchPriority="high"
                />
              </div>

              <div className="aj-about-hero-side">
                <img
                  src={images.heroSide}
                  alt="Interior design detail"
                />
              </div>
            </div>

            <div className="aj-about-hero-bottom">
              <div className="aj-about-hero-heading">
                <span className="aj-about-kicker">
                  ABOUT AJMAH
                </span>

                <h1>
                  Thoughtful spaces.
                  <br />
                  Beautiful living.
                </h1>
              </div>

              <p>
                Ajmah is an interior design studio
                creating refined residential and
                commercial spaces, with a focus on
                thoughtful details and everyday living.
              </p>
            </div>
          </section>

          {/* OUR STORY */}

          <section className="aj-about-story">
            <div className="aj-about-story-heading">
              <span className="aj-about-kicker">
                THE STUDIO
              </span>
              <h2>Get to know us</h2>
            </div>

            <div className="aj-about-story-grid">
              <div className="aj-about-story-copy">
                <h3>
                  A personal approach
                  <br />
                  to interior design.
                </h3>

                <p>
                  At Ajmah, we believe your space should
                  reflect more than a particular style.
                  It should reflect you.
                </p>

                <p>
                  We work closely with our clients to
                  understand their needs, preferences,
                  and the way they want to experience
                  their spaces.
                </p>

                <p>
                  From residential interiors to
                  commercial environments, we bring
                  together creative thinking, practical
                  planning, and carefully selected
                  details to create spaces that feel
                  complete.
                </p>

                <Link
                  href="/portfolio"
                  className="aj-about-text-link"
                >
                  EXPLORE OUR PROJECTS
                  <span>↗</span>
                </Link>
              </div>

              <div className="aj-about-story-photo">
                <img
                  src={images.story}
                  alt="Refined interior design project"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* EDITORIAL GALLERY */}

          <EditorialGallery />

          {/* INTERACTIVE DESIGN PROCESS */}

          <ApproachAccordion />

          {/* OUR EXPERTISE */}

          <section className="aj-about-expertise">
            <div className="aj-about-expertise-header">
              <span className="aj-about-kicker">
                WHAT WE DO
              </span>

              <div>
                <h2>Our expertise</h2>
                <p>
                  Designing the spaces where life
                  happens.
                </p>
              </div>
            </div>

            <div className="aj-about-expertise-grid">
              <Link
                href="/services"
                className="aj-about-expertise-item"
              >
                <div className="aj-about-expertise-photo">
                  <img
                    src={images.residential}
                    alt="Residential interior design"
                    loading="lazy"
                  />
                </div>

                <div className="aj-about-expertise-caption">
                  <div>
                    <span>01 / INTERIORS</span>
                    <h3>Residential Design</h3>
                  </div>

                  <span className="aj-about-expertise-icon">
                    ↗
                  </span>
                </div>
              </Link>

              <Link
                href="/services"
                className="aj-about-expertise-item"
              >
                <div className="aj-about-expertise-photo">
                  <img
                    src={images.commercial}
                    alt="Commercial interior design"
                    loading="lazy"
                  />
                </div>

                <div className="aj-about-expertise-caption">
                  <div>
                    <span>02 / INTERIORS</span>
                    <h3>Commercial Design</h3>
                  </div>

                  <span className="aj-about-expertise-icon">
                    ↗
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </main>

        {/* REUSABLE FOOTER */}
        <Footer />
      </div>
    </>
  );
}
