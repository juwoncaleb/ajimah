
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Header from "./components/header";
import Footer from "./components/footer";
import client from "@/lib/contentful";

/* ==========================================
   CONTENTFUL DATA
========================================== */

export async function getStaticProps() {
  try {
    const entries = await client.getEntries({
      content_type: "projects",
      limit: 100,
      include: 2,
    });

    const projects = entries.items.map((item) => ({
      id: item.sys.id,
      projectName: item.fields.projectName || "",
      projectType: item.fields.projectType || "",
      projectYear: item.fields.projectYear || null,
      thumbnailUrl:
        item.fields.thumbnail?.fields?.file?.url || null,
    }));

    return {
      props: { projects },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    return {
      props: { projects: [] },
      revalidate: 60,
    };
  }
}

/* ==========================================
   PROJECT PAGE
========================================== */

export default function Project({ projects = [] }) {
  return (
    <>
      <Head>
        <title>Our Projects | Ajmah Interior Design</title>
        <meta
          name="description"
          content="Explore beautifully designed residential and commercial interiors by Ajmah."
        />
      </Head>

      <main className="ajmah-project-page">

        {/* HEADER */}
        <Header />

        {/* =====================================
            BACKGROUND VIDEO HERO
        ===================================== */}
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

        {/* =====================================
            PORTFOLIO / RECENT WORK
        ===================================== */}
        <section className="ajmah-projects-section">
          <div className="ajmah-projects-container">

            {/* SECTION HEADING */}
            <div className="ajmah-projects-heading">
              <h2>
                Portfolio
                <br />
                Recent Work
              </h2>
            </div>

            {/* CONTENTFUL PROJECT GRID */}
            <div className="ajmah-projects-grid">
              {projects.map((project) => {
                const imageUrl = project.thumbnailUrl
                  ? project.thumbnailUrl.startsWith("//")
                    ? `https:${project.thumbnailUrl}`
                    : project.thumbnailUrl
                  : null;

                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="ajmah-project-card"
                  >
                    <div className="ajmah-project-image">

                      {/* PROJECT IMAGE */}
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={
                            project.projectName ||
                            "Ajmah interior design project"
                          }
                          fill
                          sizes="(max-width: 650px) 100vw, (max-width: 900px) 33vw, 520px"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}

                      {/* DARK GRADIENT */}
                      <div className="ajmah-project-overlay" />

                      {/* PROJECT NAME */}
                      <div className="ajmah-project-caption">
                        <h3>{project.projectName}</h3>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

            {projects.length === 0 && (
              <p className="ajmah-empty-projects">
                No projects are available at the moment.
              </p>
            )}

          </div>
        </section>

        {/* =====================================
            FOUNDER SECTION
        ===================================== */}
        <section className="ajmah-founder-section">
          <div className="ajmah-founder-container">

            {/* LEFT IMAGE */}
            <div className="ajmah-founder-image">
              <img
                src="/pro.jpg"
                alt="Ajmah Interior Design"
                loading="lazy"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="ajmah-founder-content">
              <h2>
                Meet the Creative Vision
                <br />
                Behind Ajmah
              </h2>

              <p>
                “I've always believed that the most
                meaningful spaces aren't simply the
                ones that follow trends. They're the
                ones that tell a story, reflect who
                we are, and feel timeless for years
                to come.”
              </p>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </main>

      {/* =====================================
          ALL PAGE CSS
      ===================================== */}
      <style jsx global>{`

        /* ======================================
           PAGE
        ====================================== */

        .ajmah-project-page {
          width: 100%;
          min-height: 100vh;
          background: #faf8f6;
        }

        /* ======================================
           VIDEO HERO
        ====================================== */

        .ajmah-project-page .video-hero {
          width: 100%;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        .ajmah-project-page .video-frame {
          position: relative;
          width: 100%;
          height: 85vh;
          min-height: 450px;
          overflow: hidden;
        }

        .ajmah-project-page .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* ======================================
           PORTFOLIO SECTION
        ====================================== */

        .ajmah-projects-section {
          width: 100%;
          background: #ffffff;
          padding: 55px 0 100px;
          box-sizing: border-box;
        }

        .ajmah-projects-container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        /* HEADING */

        .ajmah-projects-heading {
          text-align: left;
          margin-bottom: 50px;
        }

        .ajmah-projects-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 3vw, 46px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.5px;
          color: #242424;
          margin: 0;
        }

        /* ======================================
           THREE COLUMN PROJECT GRID
        ====================================== */

        .ajmah-projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          width: 100%;
        }

        /* PROJECT CARD */

        .ajmah-project-card {
          display: block;
          width: 100%;
          min-width: 0;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        /* IMAGE */

        .ajmah-project-image {
          position: relative;
          width: 100%;
          aspect-ratio: 0.84;
          overflow: hidden;
          background: #e8e3dd;
        }

        .ajmah-project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .ajmah-project-card:hover
        .ajmah-project-image img {
          transform: scale(1.055);
        }

        /* DARK GRADIENT OVERLAY */

        .ajmah-project-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(0, 0, 0, 0.58) 100%
          );
          pointer-events: none;
        }

        /* PROJECT TITLE ON IMAGE */

        .ajmah-project-caption {
          position: absolute;
          bottom: 22px;
          left: 20px;
          right: 20px;
          z-index: 2;
        }

        .ajmah-project-caption h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(22px, 2vw, 31px);
          font-weight: 400;
          line-height: 1.2;
          color: #ffffff;
          margin: 0;
        }

        /* EMPTY STATE */

        .ajmah-empty-projects {
          text-align: center;
          font-family: Georgia, serif;
          font-size: 18px;
          color: #777;
          padding: 50px 0;
        }

        /* ======================================
           FOUNDER SECTION
        ====================================== */

        .ajmah-founder-section {
          width: 100%;
          background: #faf8f6;
          padding: 120px 6%;
          box-sizing: border-box;
        }

        .ajmah-founder-container {
          max-width: 1370px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 110px;
        }

        /* FOUNDER IMAGE */

        .ajmah-founder-image {
          width: 100%;
          height: 555px;
          overflow: hidden;
        }

        .ajmah-founder-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* FOUNDER CONTENT */

        .ajmah-founder-content {
          max-width: 590px;
        }

        .ajmah-founder-content h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 3vw, 46px);
          font-weight: 400;
          line-height: 1.18;
          letter-spacing: -0.8px;
          color: #252525;
          margin: 0 0 36px;
        }

        .ajmah-founder-content p {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 400;
          line-height: 1.55;
          color: #66615e;
          margin: 0;
        }

        /* ======================================
           TABLET
        ====================================== */

        @media (max-width: 900px) {
          .ajmah-project-page .video-frame {
            height: 70vh;
            min-height: 400px;
          }

          .ajmah-projects-container {
            padding: 0 25px;
          }

          .ajmah-projects-grid {
            gap: 20px;
          }

          .ajmah-project-caption {
            bottom: 18px;
            left: 15px;
            right: 15px;
          }

          .ajmah-project-caption h3 {
            font-size: 22px;
          }

          .ajmah-founder-section {
            padding: 80px 5%;
          }

          .ajmah-founder-container {
            gap: 50px;
          }

          .ajmah-founder-image {
            height: 470px;
          }

          .ajmah-founder-content h2 {
            font-size: 34px;
          }

          .ajmah-founder-content p {
            font-size: 19px;
          }
        }

        /* ======================================
           MOBILE
        ====================================== */

        @media (max-width: 650px) {
          .ajmah-project-page .video-frame {
            height: 55vh;
            min-height: 300px;
          }

          .ajmah-projects-section {
            padding: 50px 0 65px;
          }

          .ajmah-projects-container {
            padding: 0 20px;
          }

          .ajmah-projects-heading {
            margin-bottom: 35px;
          }

          .ajmah-projects-heading h2 {
            font-size: 36px;
          }

          .ajmah-projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .ajmah-project-image {
            aspect-ratio: 0.84;
          }

          .ajmah-project-caption {
            bottom: 22px;
            left: 20px;
          }

          .ajmah-project-caption h3 {
            font-size: 27px;
          }

          /* FOUNDER MOBILE */

          .ajmah-founder-section {
            padding: 65px 6%;
          }

          .ajmah-founder-container {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .ajmah-founder-image {
            height: 450px;
          }

          .ajmah-founder-content {
            max-width: 100%;
          }

          .ajmah-founder-content h2 {
            font-size: 34px;
            line-height: 1.2;
            margin-bottom: 22px;
          }

          .ajmah-founder-content p {
            font-size: 19px;
            line-height: 1.65;
          }
        }

        @media (max-width: 400px) {
          .ajmah-founder-image {
            height: 380px;
          }

          .ajmah-founder-content h2 {
            font-size: 30px;
          }

          .ajmah-founder-content p {
            font-size: 17px;
          }
        }

      `}</style>
    </>
  );
}
