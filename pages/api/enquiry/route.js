import nodemailer from 'nodemailer';

// ─── CONFIG — edit these two lines ───────────────────────────────────────────
const YOUR_EMAIL = 'finishbydanillya@gmail.com';   // where enquiries are delivered
const APP_PASSWORD = process.env.EMAIL_APP_PASSWORD; // set in .env.local
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req) {
  const { title, firstName, surname, telephone, email, message } = await req.json();

  if (!firstName || !email) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',          // swap for 'outlook' / custom SMTP host if needed
    auth: {
      user: YOUR_EMAIL,
      pass: APP_PASSWORD,
    },
  });

  const fullName = [title, firstName, surname].filter(Boolean).join(' ');

  await transporter.sendMail({
    from: `"Website Enquiry" <${YOUR_EMAIL}>`,
    to: YOUR_EMAIL,
    replyTo: email,            // hitting Reply goes straight to the enquirer
    subject: `New Enquiry from ${fullName}`,
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#1a1a1a;width:100%;max-width:560px;">
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Name</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${fullName}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee"><strong>Telephone</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee">${telephone || '—'}</td></tr>
        <tr><td style="padding:8px 0" valign="top"><strong>Message</strong></td><td style="padding:8px 0;white-space:pre-wrap">${message || '—'}</td></tr>
      </table>
    `,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}