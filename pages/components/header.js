
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  // NAVIGATION LINKS
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/project" },
    { name: "About", href: "/about" },

    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // CLOSE MENUS WHEN PAGE CHANGES
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [router.asPath]);

  // PREVENT SCROLLING WHEN MOBILE MENU IS OPEN
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      router.push(
        "/search?q=" + encodeURIComponent(search.trim())
      );
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* =====================================
          AJMAH HEADER
      ===================================== */}

      <header className="ajmah-header">
        <div className="header-inner">

          {/* LOGO */}
          <Link href="/" className="header-logo">
            AJMAH
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  router.pathname === item.href ? "active" : ""
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SECTION */}
          <div className="header-actions">

            {/* SEARCH BUTTON */}
            <button
              type="button"
              className="search-icon"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <circle cx="10.5" cy="10.5" r="7" />
                <path d="M16 16L22 22" />
              </svg>
            </button>

            {/* VERTICAL DIVIDER */}
            <span className="header-divider" />

            {/* CONTACT */}
            <Link href="/contact" className="header-contact">
              <span>AJMAH STUDIO</span>
              <small>WORK WITH US</small>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        {searchOpen && (
          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search Ajmah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <button type="submit">SEARCH</button>
          </form>
        )}
      </header>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mobile-nav-footer">
          <span>AJMAH INTERIORS</span>
          <p>Spaces designed to be lived in.</p>
        </div>
      </div>

      {/* =====================================
          HEADER STYLING
      ===================================== */}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

        /* =====================================
           HEADER
        ===================================== */

        .ajmah-header {
          position: relative;
          z-index: 1001;
          width: 100%;
          background: #414742;
          color: #ffffff;
          font-family: 'Cormorant Garamond', Georgia, serif;

          /* WHITE BORDER AT THE BOTTOM ONLY */
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.65);
        }

        .ajmah-header *,
        .ajmah-header *::before,
        .ajmah-header *::after {
          box-sizing: border-box;
        }

        .ajmah-header a {
          color: inherit;
          text-decoration: none;
        }

        /* =====================================
           HEADER INNER
        ===================================== */

        .ajmah-header .header-inner {
          width: 100%;
          min-height: 105px;
          padding: 0 3%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 35px;

          /* NO EXTRA BORDER */
          border: none;
        }

        /* =====================================
           LOGO
        ===================================== */

        .ajmah-header .header-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 34px;
          font-weight: 400;
          letter-spacing: 5px;
          white-space: nowrap;
        }

        /* =====================================
           DESKTOP NAVIGATION
        ===================================== */

        .ajmah-header .desktop-nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
          gap: clamp(20px, 2.7vw, 50px);
        }

        .ajmah-header .desktop-nav a {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 21px;
          font-weight: 600;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }

        .ajmah-header .desktop-nav a:hover {
          opacity: 0.65;
        }

        .ajmah-header .desktop-nav a.active {
          text-decoration: underline;
          text-underline-offset: 7px;
        }

        /* =====================================
           HEADER ACTIONS
        ===================================== */

        .ajmah-header .header-actions {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 30px;
        }

        .ajmah-header .search-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #fff;
          padding: 7px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .ajmah-header .search-icon:hover {
          opacity: 0.65;
        }

        /* VERTICAL DIVIDER */

        .ajmah-header .header-divider {
          width: 1px;
          height: 38px;
          background: rgba(255, 255, 255, 0.45);
        }

        /* CONTACT */

        .ajmah-header .header-contact {
          min-width: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          color: #fff;
        }

        .ajmah-header .header-contact span {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 19px;
          font-weight: 500;
          letter-spacing: 2px;
          white-space: nowrap;
        }

        .ajmah-header .header-contact small {
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
        }

        /* =====================================
           MOBILE MENU BUTTON
        ===================================== */

        .ajmah-header .menu-toggle {
          display: none;
          width: 34px;
          height: 34px;
          padding: 3px;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .ajmah-header .menu-toggle span {
          display: block;
          width: 100%;
          height: 1px;
          background: #fff;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .ajmah-header .menu-toggle.active span:first-child {
          transform: translateY(7px) rotate(45deg);
        }

        .ajmah-header .menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .ajmah-header .menu-toggle.active span:last-child {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* =====================================
           SEARCH BAR
        ===================================== */

        .ajmah-header .header-search {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          padding: 25px 5%;
          display: flex;
          gap: 20px;
          background: #414742;
          border: none;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
        }

        .ajmah-header .header-search input {
          flex: 1;
          min-width: 0;
          padding: 12px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid white;
          outline: none;
          color: #fff;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
        }

        .ajmah-header .header-search input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .ajmah-header .header-search button {
          background: transparent;
          border: 1px solid white;
          padding: 10px 25px;
          color: white;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ajmah-header .header-search button:hover {
          background: white;
          color: #414742;
        }

        /* =====================================
           MOBILE NAVIGATION
        ===================================== */

        .mobile-nav {
          display: none;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .mobile-nav a {
          color: white;
          text-decoration: none;
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 1100px) {
          .ajmah-header .header-inner {
            min-height: 85px;
            padding: 0 5%;
          }

          .ajmah-header .desktop-nav,
          .ajmah-header .header-divider,
          .ajmah-header .header-contact {
            display: none;
          }

          .ajmah-header .menu-toggle {
            display: flex;
          }

          .mobile-nav {
            position: fixed;
            top: 85px;
            left: 0;
            width: 100%;
            height: calc(100dvh - 85px);
            background: #414742;
            color: white;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 60px 7% 40px;
            overflow-y: auto;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-15px);

            transition:
              opacity 0.35s ease,
              transform 0.35s ease,
              visibility 0.35s ease;
          }

          .mobile-nav.open {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
          }

          .mobile-nav nav {
            display: flex;
            flex-direction: column;
            gap: 22px;
          }

          .mobile-nav nav a {
            font-size: 48px;
            font-weight: 400;
            transition: opacity 0.3s ease;
          }

          .mobile-nav nav a:hover {
            opacity: 0.65;
          }

          .mobile-nav-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            padding-top: 25px;
          }

          .mobile-nav-footer span {
            font-size: 17px;
            letter-spacing: 2px;
          }

          .mobile-nav-footer p {
            font-size: 20px;
            margin: 10px 0 0;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 700px) {
          .ajmah-header .header-inner {
            min-height: 75px;
            padding: 0 20px;
          }

          .ajmah-header .header-logo {
            font-size: 29px;
            letter-spacing: 4px;
          }

          .ajmah-header .header-actions {
            gap: 18px;
          }

          .ajmah-header .header-search {
            padding: 18px;
          }

          .ajmah-header .header-search input {
            font-size: 18px;
          }

          .ajmah-header .header-search button {
            padding: 10px 15px;
          }

          .mobile-nav {
            top: 75px;
            height: calc(100dvh - 75px);
            padding: 50px 25px 35px;
          }

          .mobile-nav nav a {
            font-size: 42px;
          }
        }
      `}</style>
    </>
  );
}
