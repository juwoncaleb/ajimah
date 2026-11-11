
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";

/* ==========================================
   PORTFOLIO PROJECTS
   Replace sample images with Ajmah projects
========================================== */

const projects = [
  {
    title: "The Contemporary Residence",
    category: "RESIDENTIAL DESIGN",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
  {
    title: "A Study in Warmth",
    category: "INTERIOR STYLING",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
  {
    title: "Modern Living",
    category: "RESIDENTIAL DESIGN",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
  {
    title: "The Refined Retreat",
    category: "RESIDENTIAL DESIGN",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
  {
    title: "Quiet Luxury",
    category: "INTERIOR DESIGN",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
  {
    title: "The Modern Sanctuary",
    category: "RESIDENTIAL DESIGN",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85",
    link: "/portfolio",
  },
];

/* ==========================================
   SERVICES
========================================== */

const services = [
  {
    number: "01",
    title: "Residential Interiors",
    description:
      "Beautifully considered homes designed around the way you live, with every detail thoughtfully curated.",
  },
  {
    number: "02",
    title: "Commercial Interiors",
    description:
      "Distinctive environments that bring your brand to life while balancing function, comfort, and character.",
  },
  {
    number: "03",
    title: "Design Consultation",
    description:
      "Personalized design guidance to help you make confident decisions about your space.",
  },
];

/* ==========================================
   SMOOTH INFINITE PORTFOLIO CAROUSEL
========================================== */

const TRANSITION_DURATION = 950;

function PortfolioCarousel() {
  const total = projects.length;

  const [position, setPosition] = useState(total + 1);
  const [animated, setAnimated] = useState(true);
  const [moving, setMoving] = useState(false);

  const touchStartX = useRef(null);
  const animationTimer = useRef(null);
  const resetTimer = useRef(null);
  const movingRef = useRef(false);

  const extendedProjects = [
    ...projects,
    ...projects,
    ...projects,
  ];

  const activeIndex =
    ((position % total) + total) % total;

  const navigate = useCallback((direction) => {
    if (movingRef.current) return;

    movingRef.current = true;
    setMoving(true);
    setAnimated(true);
    setPosition((current) => current + direction);
  }, []);

  const finishTransition = () => {
    if (!movingRef.current) return;

    if (position >= total * 2) {
      setAnimated(false);
      setPosition(position - total);
    } else if (position < total) {
      setAnimated(false);
      setPosition(position + total);
    }

    movingRef.current = false;
    setMoving(false);
  };

  useEffect(() => {
    if (!moving) return;

    animationTimer.current = window.setTimeout(
      finishTransition,
      TRANSITION_DURATION
    );

    return () => {
      window.clearTimeout(animationTimer.current);
    };
  }, [position, moving]);

  useEffect(() => {
    if (animated) return;

    resetTimer.current = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimated(true);
      });
    });

    return () => {
      cancelAnimationFrame(resetTimer.current);
    };
  }, [animated]);

  const previous = () => navigate(-1);
  const next = () => navigate(1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const distance =
      e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(distance) > 45) {
      navigate(distance < 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  return (
    <section
      className="ajmah-project-showcase"
      aria-label="Featured design projects"
    >
      <div className="ajmah-showcase-container">

        {/* SECTION HEADING */}
        <div className="ajmah-showcase-heading">
          <span>Portfolio</span>
          <h2>Design Projects</h2>
        </div>

        {/* ANIMATED CAROUSEL */}
        <div
          className="ajmah-showcase-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {extendedProjects.map((project, index) => {
            const offset = index - position;
            const distance = Math.abs(offset);
            const visible = distance <= 2;

            let slideClass = "ajmah-slide";

            if (offset === 0) {
              slideClass += " is-active";
            } else if (offset === -1) {
              slideClass += " is-left";
            } else if (offset === 1) {
              slideClass += " is-right";
            } else {
              slideClass += " is-hidden";
            }

            return (
              <Link
                key={`${index}-${project.title}`}
                href={project.link}
                className={slideClass}
                aria-hidden={!visible}
                tabIndex={visible ? 0 : -1}
                style={{
                  "--offset": offset,
                  "--distance": distance,
                  transitionDuration: animated
                    ? `${TRANSITION_DURATION}ms`
                    : "0ms",
                }}
              >
                <div className="ajmah-slide-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable="false"
                    loading="lazy"
                  />
                </div>

                <div className="ajmah-slide-caption">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CAROUSEL CONTROLS */}
        <div className="ajmah-showcase-controls">
          <button
            type="button"
            className="ajmah-showcase-arrow"
            onClick={previous}
            disabled={moving}
            aria-label="Previous project"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span className="ajmah-showcase-line" />

          <Link
            href="/portfolio"
            className="ajmah-showcase-more"
          >
            SEE MORE PROJECTS
          </Link>

          <span className="ajmah-showcase-line" />

          <button
            type="button"
            className="ajmah-showcase-arrow"
            onClick={next}
            disabled={moving}
            aria-label="Next project"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="ajmah-showcase-count">
          {String(activeIndex + 1).padStart(2, "0")}
          <span> / </span>
          {String(total).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   AJMAH EDITORIAL SECTION
========================================== */

function HeritageSection() {
  return (
    <section className="ajmah-heritage-section">
      <div className="ajmah-heritage-inner">

        {/* OVERLAPPING PHOTOGRAPHS */}
        <div className="ajmah-heritage-visual">
          <div className="ajmah-heritage-main-image">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
              alt="Beautifully considered residential interior"
              loading="lazy"
            />
          </div>

          <div className="ajmah-heritage-overlay-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85"
              alt="Warm interior materials and details"
              loading="lazy"
            />
          </div>
        </div>

        {/* EDITORIAL COPY */}
        <div className="ajmah-heritage-copy">
          <h2>
            The Ajmah Philosophy
            <em>
              A design studio rooted in
              <br />
              timeless living.
            </em>
          </h2>

          <p>
            At Ajmah, we believe every space should tell a
            story. One that reflects the people who live in it,
            the moments they share, and the memories they create.
          </p>

          <p>
            Our approach brings together timeless design,
            thoughtful craftsmanship, and carefully selected
            materials to create interiors that feel personal,
            inviting, and effortlessly beautiful.
          </p>

          <p>
            From the earliest conversations to the final
            details, we design with intention, creating spaces
            that feel just as good as they look.
          </p>

          <Link
            href="/about"
            className="ajmah-heritage-button"
          >
            ABOUT AJMAH
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   COMPLETE HOME PAGE
========================================== */

export default function Home() {
  return (
    <>
      <Head>
        <title>Ajmah | Interior Design Studio Lagos</title>
        <meta
          name="description"
          content="Ajmah is a Lagos-based interior design studio creating timeless residential and commercial spaces."
        />
      </Head>

      <main className="ajmah-site">

        {/* HEADER */}
        <Header />

        {/* VIDEO HERO */}
        <section className="video-hero">
          <div className="video-frame">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source
                src="/ajimah.mp4"
                type="video/mp4"
              />
              Your browser does not support video.
            </video>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="intro-section">
          <span className="section-eyebrow">
            WELCOME TO AJMAH
          </span>

          <h1>
            A Design Studio Rooted in
            <br />
            <em>Timeless Living.</em>
          </h1>

          <p>
            We believe the most beautiful spaces are the ones
            that feel like you. Thoughtfully designed,
            effortlessly elegant, and made to be lived in.
          </p>

          <Link
            href="/about"
            className="text-link"
          >
            DISCOVER OUR STORY <span>↗</span>
          </Link>
        </section>

        {/* ABOUT */}
        <section className="about-section">
          <div className="about-image">
            <img
              src="./pro.jpg"
              alt="Elegant contemporary interior"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <span className="section-eyebrow">
              THE AJMAH PHILOSOPHY
            </span>

            <h2>
              Design That Feels
              <br />
              <em>Like Home.</em>
            </h2>

            <p>
              At Ajmah, we see interior design as more than
              creating beautiful rooms. It's about understanding
              how people live, what inspires them, and how their
              surroundings can make everyday life better.
            </p>

            <p>
              Based in Lagos, Nigeria, our approach brings
              together considered details, beautiful materials,
              and timeless design to create spaces that feel
              personal, welcoming, and distinctly yours.
            </p>

            <Link
              href="/about"
              className="outline-button dark"
            >
              MORE ABOUT AJMAH <span>↗</span>
            </Link>
          </div>
        </section>

        {/* SMOOTH PORTFOLIO CAROUSEL */}
        <PortfolioCarousel />

        {/* EDITORIAL FEATURE */}
        <HeritageSection />

        {/* STATEMENT */}
        <section className="statement-section">
          <div className="statement-overlay" />

          <div className="statement-content">
            <span className="section-eyebrow">
              OUR APPROACH
            </span>

            <h2>
              The Beauty Is
              <br />
              <em>in the Details.</em>
            </h2>

            <p>
              Every texture, every material, every carefully
              considered element comes together to tell a story
              that is uniquely yours.
            </p>

            <Link
              href="/services"
              className="outline-button light"
            >
              EXPLORE OUR SERVICES <span>↗</span>
            </Link>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section">
          <div className="section-heading">
            <span className="section-eyebrow">
              WHAT WE DO
            </span>

            <h2>
              Our <em>Expertise</em>
            </h2>

            <p>
              From the first idea to the finishing touches,
              we help bring your vision to life.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div
                className="service-card"
                key={service.number}
              >
                <span className="service-number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <Link href="/services">
                  LEARN MORE <span>↗</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* IMAGE FEATURE */}
        <section className="feature-section">
          <div className="feature-image">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
              alt="Beautifully styled interior"
              loading="lazy"
            />
          </div>

          <div className="feature-content">
            <span className="section-eyebrow">
              SPACES WITH PURPOSE
            </span>

            <h2>
              Beautiful Spaces.
              <br />
              <em>Meaningful Living.</em>
            </h2>

            <p>
              Your space should be a reflection of who you are.
              We create interiors that balance beauty,
              functionality, and the feeling of belonging.
            </p>

            <Link
              href="/contact"
              className="text-link"
            >
              LET'S CREATE SOMETHING BEAUTIFUL <span>↗</span>
            </Link>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="contact-section">
          <span className="section-eyebrow">
            BEGIN YOUR JOURNEY
          </span>

          <h2>
            Let's Create Something
            <br />
            <em>Extraordinary.</em>
          </h2>

          <p>
            Whether you're designing a new home, transforming
            an existing space, or bringing a commercial vision
            to life, we'd love to hear from you.
          </p>

          <Link
            href="/contact"
            className="outline-button light"
          >
            START YOUR PROJECT <span>↗</span>
          </Link>
        </section>

        {/* NEW REUSABLE FOOTER */}
        <Footer />

      </main>
    </>
  );
}
