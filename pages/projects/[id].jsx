
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import Head from "next/head";
import Image from "next/image";
import client from "@/lib/contentful";

import Header from "../components/header";
import Footer from "../components/footer";

/* ==========================================
   CONTENTFUL HELPERS
========================================== */

function getImageUrl(asset) {
  const url = asset?.fields?.file?.url;

  if (!url) return null;

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("http://")) {
    return url;
  }

  return null;
}

function getImageArray(assets) {
  if (!Array.isArray(assets)) return [];

  return assets
    .map((asset) => getImageUrl(asset))
    .filter(Boolean);
}

/* ==========================================
   STATIC PATHS
========================================== */

export async function getStaticPaths() {
  const entries = await client.getEntries({
    content_type: "projects",
    limit: 1000,
  });

  const paths = entries.items.map((item) => ({
    params: {
      id: item.sys.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

/* ==========================================
   FETCH PROJECT DATA
========================================== */

export async function getStaticProps({ params }) {
  try {
    const entry = await client.getEntry(params.id, {
      include: 2,
    });

    if (entry.sys.contentType.sys.id !== "projects") {
      return { notFound: true };
    }

    const f = entry.fields;

    return {
      props: {
        project: {
          id: entry.sys.id,

          projectName: f.projectName || "",
          projectDescription:
            f.projectDescription || "",
          projectYear: f.projectYear || null,
          projectType: f.projectType || "",
          projectLocation:
            f.projectLocation || "",
          projectSquareFeet:
            f.projectSquareFeet || null,
          projectServices:
            f.projectServices || "",

          backgroundUrl: getImageUrl(
            f.backgroundImage
          ),

          thumbnailUrl: getImageUrl(
            f.thumbnail
          ),

          beforeImages: getImageArray(
            f.projectBeforeImages
          ),

          afterImages: getImageArray(
            f.projectAfterImage
          ),
        },
      },

      revalidate: 60,
    };
  } catch (error) {
    console.error(
      "Error fetching individual project:",
      error
    );

    return {
      notFound: true,
      revalidate: 60,
    };
  }
}

/* ==========================================
   PROJECT DETAILS
========================================== */

function Detail({ label, value }) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  return (
    <div className="ajmah-detail-item">
      <span className="ajmah-detail-label">
        {label}
      </span>

      <p className="ajmah-detail-value">
        {value}
      </p>
    </div>
  );
}

/* ==========================================
   IMAGE LIGHTBOX
========================================== */

function Lightbox({
  images,
  index,
  onClose,
}) {
  const [current, setCurrent] = useState(index);
  const [zoom, setZoom] = useState(1);

  const previous = useCallback(() => {
    setCurrent((i) =>
      (i - 1 + images.length) % images.length
    );

    setZoom(1);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) =>
      (i + 1) % images.length
    );

    setZoom(1);
  }, [images.length]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        next();
      }

      if (e.key === "ArrowLeft") {
        previous();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        oldOverflow;
    };
  }, [onClose, next, previous]);

  if (!images.length) return null;

  return (
    <div
      className="ajmah-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Project image gallery"
      onClick={onClose}
    >

      {/* CONTROLS */}
      <div
        className="ajmah-lightbox-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() =>
            setZoom((z) =>
              Math.min(z + 0.2, 3)
            )
          }
          aria-label="Zoom in"
        >
          +
        </button>

        <button
          type="button"
          onClick={() =>
            setZoom((z) =>
              Math.max(z - 0.2, 1)
            )
          }
          aria-label="Zoom out"
        >
          −
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>
      </div>

      {/* PREVIOUS */}
      {images.length > 1 && (
        <button
          type="button"
          className="ajmah-lightbox-arrow ajmah-left"
          onClick={(e) => {
            e.stopPropagation();
            previous();
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* MAIN IMAGE */}
      <div
        className="ajmah-lightbox-image"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="ajmah-lightbox-zoom"
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          <Image
            src={images[current]}
            alt={`Project image ${current + 1}`}
            fill
            sizes="90vw"
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* NEXT */}
      {images.length > 1 && (
        <button
          type="button"
          className="ajmah-lightbox-arrow ajmah-right"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* COUNT */}
      <div className="ajmah-lightbox-count">
        {String(current + 1).padStart(2, "0")}
        {" / "}
        {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ==========================================
   IMAGE GRID
========================================== */

function ImageGrid({ images, label }) {
  const [openIndex, setOpenIndex] =
    useState(null);

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="ajmah-gallery-section">

      <div className="ajmah-gallery-heading">
        <h2>{label}</h2>
      </div>

      <div className="ajmah-image-grid">
        {images.map((url, index) => (
          <button
            type="button"
            key={`${url}-${index}`}
            className="ajmah-grid-item"
            onClick={() =>
              setOpenIndex(index)
            }
            aria-label={`View ${label} image ${index + 1}`}
          >
            <Image
              src={url}
              alt={`${label} project image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
              }}
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={closeLightbox}
        />
      )}

    </section>
  );
}

/* ==========================================
   COMPLETE PROJECT PAGE
========================================== */

export default function ProjectDetail({
  project,
}) {
  return (
    <>
      <Head>
        <title>
          {project.projectName} | Ajmah Interior Design
        </title>

        <meta
          name="description"
          content={
            project.projectDescription ||
            `Explore ${project.projectName}, an interior design project by Ajmah.`
          }
        />
      </Head>

      <main className="ajmah-detail-page">

        {/* HEADER */}
        <Header />

        {/* =====================================
            BACKGROUND IMAGE HERO
        ===================================== */}
        <section
          className="ajmah-detail-hero"
          style={{
            backgroundImage: project.backgroundUrl
              ? `linear-gradient(
                  rgba(0, 0, 0, 0.25),
                  rgba(0, 0, 0, 0.35)
                ), url("${project.backgroundUrl}")`
              : "none",
          }}
        >
          <div className="ajmah-detail-hero-content">
            <span className="ajmah-detail-eyebrow">
              AJMAH PORTFOLIO
            </span>

            <h1>
              {project.projectName}
            </h1>
          </div>
        </section>

        {/* =====================================
            PROJECT SUMMARY
        ===================================== */}
        <section className="ajmah-summary-section">
          <div className="ajmah-summary-container">

            <div className="ajmah-summary-heading">
              <span>THE PROJECT</span>

              <h2>
                Project Summary
              </h2>
            </div>

            <div className="ajmah-project-info">

              {/* DESCRIPTION */}
              <div className="ajmah-project-description">
                <p>
                  {project.projectDescription}
                </p>
              </div>

              {/* SIDEBAR */}
              <div className="ajmah-project-sidebar">

                <Detail
                  label="Location"
                  value={project.projectLocation}
                />

                <Detail
                  label="Year"
                  value={project.projectYear}
                />

                <Detail
                  label="Project Type"
                  value={project.projectType}
                />

                <Detail
                  label="Square Feet"
                  value={project.projectSquareFeet}
                />

                <Detail
                  label="Services"
                  value={project.projectServices}
                />

              </div>

            </div>
          </div>
        </section>

        {/* =====================================
            PROJECT GALLERY
        ===================================== */}
        <section className="ajmah-project-gallery">
          <div className="ajmah-gallery-container">

            {/* AFTER IMAGES */}
            <ImageGrid
              images={project.afterImages}
              label="After"
            />

            {/* BEFORE IMAGES */}
            <ImageGrid
              images={project.beforeImages}
              label="Before"
            />

          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </main>

      {/* =====================================
          COMPLETE CSS
      ===================================== */}
      <style jsx global>{`

        /* PAGE */

        .ajmah-detail-page {
          width: 100%;
          min-height: 100vh;
          background: #faf8f6;
        }

        /* ======================================
           HERO
        ====================================== */

        .ajmah-detail-hero {
          position: relative;
          width: 100%;
          height: 75vh;
          min-height: 500px;
          background-color: #bcb4aa;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .ajmah-detail-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          padding: 30px;
        }

        .ajmah-detail-eyebrow {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 25px;
        }

        .ajmah-detail-hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 5vw, 76px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -1px;
          color: #fff;
          margin: 0;
        }

        /* ======================================
           SUMMARY
        ====================================== */

        .ajmah-summary-section {
          width: 100%;
          background: #faf8f6;
          padding: 110px 6% 90px;
          box-sizing: border-box;
        }

        .ajmah-summary-container {
          max-width: 1250px;
          margin: 0 auto;
        }

        .ajmah-summary-heading {
          margin-bottom: 65px;
        }

        .ajmah-summary-heading span {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: #8a8078;
          margin-bottom: 18px;
        }

        .ajmah-summary-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 400;
          color: #292622;
          margin: 0;
        }

        .ajmah-project-info {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 100px;
          align-items: start;
        }

        .ajmah-project-description p {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          line-height: 1.85;
          color: #5e5954;
          margin: 0;
          white-space: pre-line;
        }

        /* SIDEBAR */

        .ajmah-project-sidebar {
          border-left: 1px solid #d9d3cc;
          padding-left: 45px;
        }

        .ajmah-detail-item {
          margin-bottom: 30px;
        }

        .ajmah-detail-label {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #938980;
          margin-bottom: 10px;
        }

        .ajmah-detail-value {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          color: #292622;
          margin: 0;
        }

        /* ======================================
           PROJECT GALLERY
        ====================================== */

        .ajmah-project-gallery {
          width: 100%;
          background: #fff;
          padding: 90px 6% 130px;
          box-sizing: border-box;
        }

        .ajmah-gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .ajmah-gallery-section {
          margin-bottom: 100px;
        }

        .ajmah-gallery-section:last-child {
          margin-bottom: 0;
        }

        .ajmah-gallery-heading {
          margin-bottom: 40px;
        }

        .ajmah-gallery-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 400;
          color: #292622;
          margin: 0;
        }

        /* IMAGE GRID */

        .ajmah-image-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .ajmah-grid-item {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          border: none;
          padding: 0;
          background: #eae5df;
          overflow: hidden;
          cursor: pointer;
        }

        .ajmah-grid-item img {
          transition: transform 0.7s ease;
        }

        .ajmah-grid-item:hover img {
          transform: scale(1.04);
        }

        /* ======================================
           LIGHTBOX
        ====================================== */

        .ajmah-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(0, 0, 0, 0.96);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ajmah-lightbox-image {
          position: relative;
          width: 80vw;
          height: 75vh;
        }

        .ajmah-lightbox-zoom {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.2s ease;
          transform-origin: center;
        }

        .ajmah-lightbox-controls {
          position: absolute;
          top: 25px;
          right: 30px;
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .ajmah-lightbox-controls button {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .ajmah-lightbox-controls button:hover {
          background: rgba(255,255,255,0.3);
        }

        .ajmah-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          color: #fff;
          font-size: 34px;
          cursor: pointer;
          z-index: 10;
        }

        .ajmah-left {
          left: 30px;
        }

        .ajmah-right {
          right: 30px;
        }

        .ajmah-lightbox-count {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-family: Arial, sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
        }

        /* ======================================
           TABLET
        ====================================== */

        @media (max-width: 900px) {

          .ajmah-detail-hero {
            height: 65vh;
            min-height: 430px;
          }

          .ajmah-summary-section {
            padding: 80px 5%;
          }

          .ajmah-project-info {
            gap: 50px;
          }

          .ajmah-project-description p {
            font-size: 19px;
          }

          .ajmah-project-sidebar {
            padding-left: 30px;
          }

          .ajmah-project-gallery {
            padding: 70px 5% 100px;
          }

          .ajmah-image-grid {
            gap: 18px;
          }
        }

        /* ======================================
           MOBILE
        ====================================== */

        @media (max-width: 650px) {

          .ajmah-detail-hero {
            height: 55vh;
            min-height: 350px;
          }

          .ajmah-detail-hero h1 {
            font-size: 40px;
          }

          .ajmah-summary-section {
            padding: 65px 6%;
          }

          .ajmah-summary-heading {
            margin-bottom: 40px;
          }

          .ajmah-summary-heading h2 {
            font-size: 38px;
          }

          .ajmah-project-info {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .ajmah-project-description p {
            font-size: 18px;
            line-height: 1.8;
          }

          .ajmah-project-sidebar {
            border-left: none;
            border-top: 1px solid #d9d3cc;
            padding-left: 0;
            padding-top: 35px;
          }

          .ajmah-project-gallery {
            padding: 65px 6% 90px;
          }

          .ajmah-gallery-section {
            margin-bottom: 70px;
          }

          .ajmah-gallery-heading h2 {
            font-size: 38px;
          }

          .ajmah-image-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .ajmah-grid-item {
            aspect-ratio: 4 / 3;
          }

          .ajmah-lightbox-image {
            width: 90vw;
            height: 65vh;
          }

          .ajmah-lightbox-controls {
            top: 20px;
            right: 15px;
            gap: 8px;
          }

          .ajmah-lightbox-controls button {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .ajmah-lightbox-arrow {
            width: 36px;
            height: 36px;
            font-size: 26px;
          }

          .ajmah-left {
            left: 8px;
          }

          .ajmah-right {
            right: 8px;
          }
        }

      `}</style>
    </>
  );
}
