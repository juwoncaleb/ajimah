
import React, { useState } from "react";
import Link from "next/link";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.8" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.65 19.31c-.04-.79-.01-1.75.2-2.6l1.28-5.42s-.32-.64-.32-1.59  .86-2.6 1.93-2.6c.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.57 1.92 1.88 0 3.32-1.98 3.32-4.84 0-2.53-1.82-4.3-4.42-4.3-3.03 0-4.81 2.27-4.81 4.62 0 .92.35 1.91.79 2.45.09.11.1.21.07.33l-.29 1.18c-.05.19-.15.23-.35.14-1.3-.61-2.11-2.52-2.11-4.06 0-3.31 2.4-6.35 6.92-6.35 3.63 0 6.45 2.59 6.45 6.05 0 3.61-2.28 6.52-5.44 6.52-1.06 0-2.06-.55-2.4-1.2l-.65 2.49c-.24.93-.88 2.09-1.31 2.88A10 10 0 1 0 12 2Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 2.01 19.8v-7.1h2.33l.44-2.8h-2.77v-1.82c0-.77.38-1.52 1.63-1.52h1.26V6.18s-1.14-.2-2.23-.2c-2.27 0-3.75 1.37-3.75 3.85v2.07H8.4v2.8h2.52v7.1A10 10 0 0 0 12 2Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 2h-3.1v13.1a3.1 3.1 0 1 1-2.7-3.08V8.9a6.2 6.2 0 1 0 5.8 6.2V8.25a9.2 9.2 0 0 0 5.4 1.74V6.9A6.1 6.1 0 0 1 16.6 2Z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setMessage("Newsletter subscription is coming soon.");
  };

  return (
    <footer className="ajmah-footer-new">
      <div className="ajmah-footer-container">

        <div className="ajmah-footer-heading">
          <Link href="/" className="ajmah-footer-logo">
            AJMAH
          </Link>
        </div>

        <div className="ajmah-footer-divider" />

        <div className="ajmah-footer-grid">

          <div className="ajmah-footer-navigation">

            <div className="ajmah-footer-column">
              <h3>Explore</h3>
              <Link href="/">HOME</Link>
              <Link href="/project">PROJECTS</Link>
              <Link href="/blog">BLOG</Link>
            </div>

            <div className="ajmah-footer-column">
              <h3>Company</h3>
              <Link href="/about">ABOUT US</Link>
              <Link href="/contact">WORK WITH US</Link>
              <Link href="/contact">CONTACT US</Link>
            </div>

            <div className="ajmah-footer-column">
              <h3>Links</h3>
              <Link href="/project">OUR PROJECTS</Link>
              <Link href="/blog">LATEST STORIES</Link>
              <Link href="/contact">GENERAL INQUIRIES</Link>
            </div>

          </div>

          <div className="ajmah-footer-right">

            <div className="ajmah-footer-newsletter">
              <h3>Join Our Mailing List</h3>

              <form onSubmit={handleSubscribe}>
                <label
                  htmlFor="ajmah-email"
                  className="ajmah-footer-sr-only"
                >
                  Email address
                </label>

                <input
                  id="ajmah-email"
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  required
                />

                <button type="submit">SUBMIT</button>
              </form>

              {message && (
                <p className="ajmah-footer-message">
                  {message}
                </p>
              )}
            </div>

            <div className="ajmah-footer-social">
              <h3>Follow</h3>

              <div className="ajmah-footer-social-icons">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.pinterest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="ajmah-footer-bottom">
          <span>
            © {new Date().getFullYear()} AJMAH INTERIORS.
            ALL RIGHTS RESERVED.
          </span>

          <Link href="/contact">
            LET&apos;S WORK TOGETHER <span>↗</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
