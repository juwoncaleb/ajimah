
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import client from "@/lib/contentful";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

function imageUrl(asset) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* FETCH BLOG IDS */

export async function getStaticPaths() {
  const entries = await client.getEntries({
    content_type: "blog",
    limit: 1000,
  });

  return {
    paths: entries.items.map((item) => ({
      params: { id: item.sys.id },
    })),
    fallback: "blocking",
  };
}

/* FETCH INDIVIDUAL BLOG */

export async function getStaticProps({ params }) {
  try {
    const entry = await client.getEntry(params.id, {
      include: 3,
    });

    if (entry.sys.contentType.sys.id !== "blog") {
      return { notFound: true };
    }

    const f = entry.fields;

    return {
      props: {
        blog: {
          id: entry.sys.id,
          title: f.title || "",
          thumbnail: imageUrl(f.thumbnail),
          backgroundImage: imageUrl(f.backgroundImage),
          creation: f.creation || entry.sys.createdAt,
          blogcontent: f.blogcontent || null,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Blog detail error:", error);
    return { notFound: true, revalidate: 60 };
  }
}

/* CONTENTFUL RICH TEXT */

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  },

  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,

    [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,

    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,

    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote>{children}</blockquote>
    ),

    [BLOCKS.HR]: () => <hr />,

    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri || "";
      const safe = /^(https?:\/\/|mailto:|\/)/i.test(url)
        ? url
        : "#";

      return (
        <a
          href={safe}
          target={safe.startsWith("http") ? "_blank" : undefined}
          rel={safe.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data.target;
      const url = imageUrl(asset);
      const type = asset?.fields?.file?.contentType || "";

      if (!url || !type.startsWith("image/")) return null;

      return (
        <figure className="article-figure">
          <img
            src={url}
            alt={asset?.fields?.title || "Article image"}
            loading="lazy"
          />
          {asset?.fields?.description && (
            <figcaption>{asset.fields.description}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogDetail({ blog }) {
  const heroImage = blog.backgroundImage || blog.thumbnail;

  return (
    <>
      <Head>
        <title>{blog.title} | Ajmah Journal</title>
        <meta
          name="description"
          content={`Read ${blog.title} on the Ajmah Interior Design Journal.`}
        />
      </Head>

      <Header />

      <main className="article-page">
        {/* HERO */}
        <section
          className="article-hero"
          style={{
            backgroundImage: heroImage
              ? `linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.08)), url("${heroImage}")`
              : "none",
          }}
        >
          <div className="article-hero-content">
            <span>THE AJMAH JOURNAL</span>
            <h1>{blog.title}</h1>
            <p>{formatDate(blog.creation)}</p>
          </div>
        </section>

        {/* CONTENT */}
        <article className="article-section">
          <div className="article-container">
            <div className="article-heading">
              <span>DESIGN &amp; LIFESTYLE</span>
              <h2>{blog.title}</h2>
              <p>{formatDate(blog.creation)}</p>
            </div>

            <div className="article-divider" />

            <div className="article-body">
              {blog.blogcontent
                ? documentToReactComponents(blog.blogcontent, richTextOptions)
                : <p>Article content is coming soon.</p>}
            </div>

            <div className="article-bottom">
              <Link href="/blog">← BACK TO JOURNAL</Link>
            </div>
          </div>
        </article>

        {/* BOTTOM SECTION */}
        <section className="article-cta">
          <span>EXPLORE MORE</span>
          <h2>
            Stories Worth
            <br />
            Sharing.
          </h2>
          <Link href="/blog">VIEW ALL ARTICLES</Link>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .article-page {
          width: 100%;
          background: white;
        }

        .article-hero {
          height: 70vh;
          min-height: 480px;
          max-height: 850px;
          background-color: #8b8175;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
        }

        .article-hero-content {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 6% 75px;
          color: white;
          box-sizing: border-box;
        }

        .article-hero-content span {
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .article-hero-content h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(44px, 5.5vw, 78px);
          font-weight: 400;
          line-height: 1.08;
          max-width: 1000px;
          margin: 22px 0;
        }

        .article-hero-content p {
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .article-section {
          padding: 100px 24px 120px;
        }

        .article-container {
          max-width: 850px;
          margin: auto;
        }

        .article-heading {
          text-align: center;
          margin-bottom: 50px;
        }

        .article-heading span {
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #91877d;
        }

        .article-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 400;
          line-height: 1.2;
          color: #292622;
          margin: 22px 0;
        }

        .article-heading p {
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #777;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .article-divider {
          height: 1px;
          background: #e8e4df;
          margin-bottom: 60px;
        }

        .article-body {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.9;
          color: #494540;
          overflow-wrap: anywhere;
        }

        .article-body p {
          margin: 0 0 30px;
        }

        .article-body h2 {
          font-size: 36px;
          font-weight: 400;
          line-height: 1.3;
          color: #292622;
          margin: 60px 0 25px;
        }

        .article-body h3 {
          font-size: 28px;
          font-weight: 400;
          line-height: 1.3;
          color: #292622;
          margin: 45px 0 20px;
        }

        .article-body h4 {
          font-size: 23px;
          font-weight: 400;
          margin: 35px 0 15px;
        }

        .article-body a {
          color: #695a4b;
          text-decoration: underline;
        }

        .article-body ul,
        .article-body ol {
          padding-left: 30px;
          margin-bottom: 35px;
        }

        .article-body li {
          margin-bottom: 12px;
        }

        .article-body blockquote {
          font-size: 28px;
          line-height: 1.5;
          font-style: italic;
          color: #76695e;
          border-left: 2px solid #b9aa9a;
          padding-left: 30px;
          margin: 55px 0;
        }

        .article-body hr {
          border: none;
          border-top: 1px solid #e5dfd8;
          margin: 55px 0;
        }

        .article-figure {
          margin: 50px 0;
        }

        .article-figure img {
          width: 100%;
          height: auto;
          display: block;
        }

        .article-figure figcaption {
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #888;
          text-align: center;
          margin-top: 12px;
        }

        .article-bottom {
          margin-top: 80px;
          padding-top: 35px;
          border-top: 1px solid #e8e4df;
        }

        .article-bottom a {
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #292622;
          text-decoration: none;
        }

        .article-cta {
          background: #f2ede7;
          text-align: center;
          padding: 100px 20px;
        }

        .article-cta span {
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          color: #8c8074;
        }

        .article-cta h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 5vw, 65px);
          font-weight: 400;
          line-height: 1.1;
          color: #292622;
          margin: 25px 0 35px;
        }

        .article-cta a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 55px;
          min-width: 200px;
          padding: 0 25px;
          border: 1px solid #292622;
          color: #292622;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 1.2px;
          transition: .3s;
        }

        .article-cta a:hover {
          background: #292622;
          color: white;
        }

        @media (max-width: 650px) {
          .article-hero {
            height: 55vh;
            min-height: 370px;
          }

          .article-hero-content {
            padding: 0 6% 45px;
          }

          .article-hero-content h1 {
            font-size: 39px;
          }

          .article-section {
            padding: 65px 20px 80px;
          }

          .article-heading h2 {
            font-size: 35px;
          }

          .article-divider {
            margin-bottom: 40px;
          }

          .article-body {
            font-size: 17px;
          }

          .article-body h2 {
            font-size: 29px;
          }

          .article-body h3 {
            font-size: 24px;
          }

          .article-body blockquote {
            font-size: 23px;
            padding-left: 20px;
          }

          .article-cta {
            padding: 75px 20px;
          }
        }
      `}</style>
    </>
  );
}
