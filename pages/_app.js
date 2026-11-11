import "@/styles/global.css";
import Head from "next/head";

const SITE_URL = "https://yourdomain.com"; // replace with your real domain
const TITLE = "Woodwrap | Interior Design in Lagos";
const DESCRIPTION =
  "Full-service interior design studio in Lagos, led by Susan. Timeless, elevated homes.";
const OG_IMAGE = `${SITE_URL}/zip.jpeg`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Woodwrap" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:alt" content="Woodwrap interior design in Lagos" />
        <meta property="og:locale" content="en_NG" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}