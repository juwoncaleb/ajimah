
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";
import client from "@/lib/contentful";

/* ==========================================
   CONTENTFUL HELPERS
========================================== */

function getImageUrl(asset) {
  const url = asset?.fields?.file?.url;

  if (!url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("https://")) return url;
  if (url.startsWith("http://")) return url;

  return null;
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ==========================================
   FETCH BLOGS
========================================== */

export async function getStaticProps() {
  try {
    const entries = await client.getEntries({
      content_type: "blog",
      limit: 100,
      include: 2,
    });

    const blogs = entries.items
      .map((item) => {
        const f = item.fields;

        return {
          id: item.sys.id,
          title: f.title || "Untitled Article",
          thumbnail: getImageUrl(f.thumbnail),
          backgroundImage: getImageUrl(
            f.backgroundImage
          ),
          creation:
            f.creation || item.sys.createdAt,
          excerpt: "",
        };
      })
      .sort(
        (a, b) =>
          new Date(b.creation) -
          new Date(a.creation)
      );

    return {
      props: { blogs },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      props: { blogs: [] },
      revalidate: 60,
    };
  }
}

/* ==========================================
   BLOG CARD
========================================== */

function BlogCard({ blog }) {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="ajmah-blog-card"
    >
      <div className="ajmah-blog-card-image">
        {blog.thumbnail ? (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            loading="lazy"
          />
        ) : (
          <div className="ajmah-blog-placeholder" />
        )}
      </div>

      <div className="ajmah-blog-card-content">
        <h3>{blog.title}</h3>

        {blog.excerpt && (
          <p className="ajmah-blog-excerpt">
            {blog.excerpt}
          </p>
        )}

        <div className="ajmah-blog-meta">
          <span>DESIGN</span>
          <span className="ajmah-meta-dot">·</span>
          <span>{formatDate(blog.creation)}</span>
        </div>
      </div>
    </Link>
  );
}

/* ==========================================
   BLOG PAGE
========================================== */

export default function Blog({ blogs = [] }) {
  const featured = blogs[0];
  const featuredImage =
    featured?.backgroundImage ||
    featured?.thumbnail;

  return (
    <>
      <Head>
        <title>Journal | Ajmah Interior Design</title>
        <meta
          name="description"
          content="Explore design inspiration, interiors, projects and lifestyle stories from Ajmah."
        />
      </Head>

      <main className="ajmah-blog-page">
        <Header />

        {/* FEATURED ARTICLE */}
        {featured ? (
          <section
            className="ajmah-blog-hero"
            style={{
              backgroundImage: featuredImage
                ? `linear-gradient(
                    to bottom,
                    rgba(0,0,0,0.05),
                    rgba(0,0,0,0.5)
                  ), url("${featuredImage}")`
                : "none",
            }}
          >
            <div className="ajmah-blog-hero-inner">
              <span className="ajmah-blog-hero-label">
                READ THE LATEST
              </span>

              <h1>{featured.title}</h1>

              <Link
                href={`/blog/${featured.id}`}
                className="ajmah-blog-hero-button"
              >
                LEARN MORE
              </Link>
            </div>
          </section>
        ) : (
          <section className="ajmah-blog-empty-hero">
            <h1>The Ajmah Journal</h1>
          </section>
        )}

        {/* BLOG LISTING */}
        <section className="ajmah-blog-list-section">
          <div className="ajmah-blog-heading">
            <h2>
              Read All
              <br />
              Design &amp; Lifestyle
            </h2>
          </div>

          <div className="ajmah-blog-container">
            {blogs.length > 0 ? (
              <div className="ajmah-blog-grid">
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                  />
                ))}
              </div>
            ) : (
              <p className="ajmah-blog-empty">
                No articles have been published yet.
              </p>
            )}
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        .ajmah-blog-page {
          width: 100%;
          min-height: 100vh;
          background: #fff;
        }

        /* HERO */

        .ajmah-blog-hero {
          width: 100%;
          min-height: 530px;
          height: 65vh;
          max-height: 800px;
          background-color: #82786c;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        .ajmah-blog-hero-inner {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 7%;
          box-sizing: border-box;
          color: #fff;
        }

        .ajmah-blog-hero-label {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1.5px;
          margin-bottom: 22px;
        }

        .ajmah-blog-hero h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(45px, 5vw, 76px);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -1.2px;
          max-width: 750px;
          margin: 0 0 35px;
        }

        .ajmah-blog-hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 185px;
          height: 55px;
          padding: 0 25px;
          border: 1px solid #fff;
          color: #fff;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 1.3px;
          transition: all 0.3s ease;
        }

        .ajmah-blog-hero-button:hover {
          background: #fff;
          color: #222;
        }

        .ajmah-blog-empty-hero {
          background: #f2ede7;
          min-height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ajmah-blog-empty-hero h1 {
          font-family: Georgia, serif;
          font-size: 48px;
          font-weight: 400;
        }

        /* BLOG LISTING */

        .ajmah-blog-list-section {
          width: 100%;
          padding: 80px 0 130px;
          background: #fff;
          box-sizing: border-box;
        }

        .ajmah-blog-heading {
          text-align: center;
          margin-bottom: 80px;
        }

        .ajmah-blog-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 4vw, 58px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.7px;
          color: #292929;
          margin: 0;
        }

        .ajmah-blog-container {
          width: 100%;
          max-width: 1510px;
          margin: 0 auto;
          padding: 0 35px;
          box-sizing: border-box;
        }

        .ajmah-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 28px;
          row-gap: 65px;
        }

        /* BLOG CARD */

        .ajmah-blog-card {
          display: block;
          min-width: 0;
          text-decoration: none;
          color: inherit;
        }

        .ajmah-blog-card-image {
          position: relative;
          width: 100%;
          aspect-ratio: 0.75;
          overflow: hidden;
          background: #eee9e4;
        }

        .ajmah-blog-card-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .ajmah-blog-card:hover
        .ajmah-blog-card-image img {
          transform: scale(1.045);
        }

        .ajmah-blog-placeholder {
          width: 100%;
          height: 100%;
          background: #e7e0d9;
        }

        .ajmah-blog-card-content {
          padding-top: 15px;
        }

        .ajmah-blog-card-content h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(23px, 2vw, 29px);
          font-weight: 400;
          line-height: 1.25;
          color: #222;
          margin: 0 0 8px;
        }

        .ajmah-blog-excerpt {
          font-family: Georgia, serif;
          font-size: 16px;
          line-height: 1.5;
          color: #666;
          margin: 0 0 12px;
        }

        .ajmah-blog-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 0.6px;
          color: #777;
          text-transform: uppercase;
        }

        .ajmah-meta-dot {
          font-size: 16px;
        }

        .ajmah-blog-empty {
          text-align: center;
          font-family: Georgia, serif;
          font-size: 19px;
          color: #777;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .ajmah-blog-hero {
            height: 55vh;
            min-height: 450px;
          }

          .ajmah-blog-list-section {
            padding: 65px 0 100px;
          }

          .ajmah-blog-container {
            padding: 0 24px;
          }

          .ajmah-blog-grid {
            gap: 22px;
            row-gap: 45px;
          }

          .ajmah-blog-card-content h3 {
            font-size: 22px;
          }
        }

        /* MOBILE */

        @media (max-width: 650px) {
          .ajmah-blog-hero {
            height: 60vh;
            min-height: 420px;
            background-position: center;
          }

          .ajmah-blog-hero-inner {
            padding: 0 7%;
          }

          .ajmah-blog-hero h1 {
            font-size: 42px;
            line-height: 1.1;
          }

          .ajmah-blog-hero-label {
            font-size: 11px;
          }

          .ajmah-blog-hero-button {
            min-width: 155px;
            height: 48px;
          }

          .ajmah-blog-list-section {
            padding: 65px 0 85px;
          }

          .ajmah-blog-heading {
            margin-bottom: 45px;
            padding: 0 15px;
          }

          .ajmah-blog-heading h2 {
            font-size: 36px;
          }

          .ajmah-blog-container {
            padding: 0 20px;
          }

          .ajmah-blog-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .ajmah-blog-card-image {
            aspect-ratio: 0.85;
          }

          .ajmah-blog-card-content h3 {
            font-size: 26px;
          }
        }
      `}</style>
    </>
  );
}
