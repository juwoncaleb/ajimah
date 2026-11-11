import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";


export const metadata = {
  title: "Terms & Conditions | J-LUXURY",
  description:
    "Terms and Privacy Policy for J-LUXURY interior design services in Lagos, Nigeria.",
};

export default function TermsPage() {
  return (
    <div>
<Header/>
      <main className="terms-container">
        <div className="terms-content">
          <h1>Terms & Conditions</h1>
          <p className="updated">Last Updated: August 2026</p>

          <Section title="1. GENERAL">
            Welcome to J-LUXURY. By accessing our website jluxuryinterior.com,
            you agree to these Terms & Conditions.
          </Section>

          <Section title="2. SERVICES">
            J-LUXURY provides interior design, styling, and project management
            services in Lagos, Nigeria and beyond. All project proposals,
            quotes, and timelines will be provided separately.
          </Section>

          <Section title="3. INTELLECTUAL PROPERTY">
            All content on this website including images, designs, text, logo,
            and graphics are the property of J-LUXURY. You may not copy,
            reproduce, or use any material without written permission.
          </Section>

          <Section title="4. CLIENT RESPONSIBILITIES">
            Clients are expected to provide accurate information for projects.
            Any changes to scope may affect timeline and cost.
          </Section>

          <Section title="5. PAYMENT & CANCELLATION">
            Project fees and payment terms will be outlined in individual
            contracts. Deposits are non-refundable.
          </Section>

          <Section title="6. LIMITATION OF LIABILITY">
            J-LUXURY is not liable for any damages resulting from use of this
            website.
          </Section>

          <Section title="7. GOVERNING LAW">
            These terms are governed by the laws of the Federal Republic of
            Nigeria.
          </Section>

          <Section title="8. CONTACT">
            For questions about these Terms:
            <br />
            Email: <a href="mailto:Joy@thejluxury.com">Joy@thejluxury.com</a>
            <br />
            Phone:{" "}
            <a
              href="https://wa.me/2348131526435"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 813 152 6435
            </a>
          </Section>

          {/* -------- PRIVACY POLICY -------- */}

          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="updated">Last Updated: August 2026</p>

          <Section title="1. INFORMATION WE COLLECT">
            We collect information you provide to us such as: Name, Email, Phone
            Number, and project details when you contact us via WhatsApp, email,
            or our website form.
          </Section>

          <Section title="2. HOW WE USE YOUR INFORMATION">
            <ul>
              <li>Respond to inquiries and provide design services</li>
              <li>Send project updates and proposals</li>
              <li>Improve our website and customer experience</li>
            </ul>
          </Section>

          <Section title="3. DATA PROTECTION">
            We do not sell, trade, or rent your personal information. Your data
            is kept confidential and secure.
          </Section>

          <Section title="4. COOKIES">
            Our website may use cookies to improve user experience. You can
            disable cookies in your browser settings.
          </Section>

          <Section title="5. THIRD-PARTY LINKS">
            Our website may contain links to Instagram, Pinterest, and WhatsApp.
            We are not responsible for their privacy practices.
          </Section>

          <Section title="6. YOUR RIGHTS">
            You may request to access, update, or delete your personal
            information by contacting us.
          </Section>

          <Section title="7. CONTACT US">
            J-LUXURY
            <br />
            Lagos, Nigeria
            <br />
            Email: <a href="mailto:Joy@thejluxury.com">Joy@thejluxury.com</a>
            <br />
            Phone:{" "}
            <a
              href="https://wa.me/2348131526435"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 813 152 6435
            </a>
          </Section>
        </div>

        <style jsx>{`
          .terms-container {
            display: flex;
            justify-content: center;
            padding: 80px 20px;
            background: #fff;
          }

          .terms-content {
            max-width: 800px;
            width: 100%;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #2a2a2a;
          }

          h1 {
            font-size: 34px;
            margin-bottom: 10px;
            font-weight: 500;
            letter-spacing: -0.02em;
          }

          .privacy-title {
            margin-top: 100px;
          }

          section {
            margin-bottom: 36px;
          }

          h2 {
            font-size: 14px;
            letter-spacing: 0.12em;
            margin-top: 48px;
            margin-bottom: 16px;
            font-weight: 500;
            color: #111;
          }

          p {
            font-size: 15px;
            line-height: 1.7;
            color: #444;
            margin: 0;
          }

          ul {
            padding-left: 20px;
            margin-top: 10px;
          }

          li {
            margin-bottom: 10px;
            line-height: 1.7;
          }

          .updated {
            font-size: 13px;
            color: #888;
            margin-bottom: 30px;
          }

          a {
            color: #2c0a03;
            text-decoration: none;
          }

          a:hover {
            opacity: 0.7;
          }
        `}</style>
      </main>
<Footer/>    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}