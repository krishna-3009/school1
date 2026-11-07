import { useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <main className="subpage section">
      <div className="section-kicker">
        WE'D LOVE TO MEET YOU <span>06 / CONTACT</span>
      </div>
      <h1 className="page-title">
        Let's start a<br />
        <em>conversation.</em>
      </h1>
      <p className="page-lead">
        Ask a question, arrange a visit or just say hello. We’re happy to help.
      </p>
      <div className="contact-layout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const subject = encodeURIComponent(data.get('subject') || 'School enquiry');
            const body = encodeURIComponent(
              `From: ${data.get('name')} (${data.get('email')})\n\n${data.get('message')}`
            );
            window.location.href = `mailto:krishnadeochoudhary@gmail.com?subject=${subject}&body=${body}`;
            setSent(true);
          }}
        >
          <label>
            Your name
            <input name="name" required placeholder="How should we call you?" />
          </label>
          <label>
            Email address
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <label>
            What would you like to know?
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Tell us a little about what you need…"
            />
          </label>
          <button className="button dark">
            Send your message <ArrowRight size={17} />
          </button>
          {sent && (
            <p className="success">
              Your email app should open with your message ready. You can also reach us directly by
              phone or email.
            </p>
          )}
        </form>
        <aside>
          <div className="contact-item">
            <MapPin />
            <div>
              <small>COME FIND US</small>
              <p>
                See our exact location on Google Maps.
              </p>
            </div>
          </div>
          <div className="contact-item">
            <Phone />
            <div>
              <small>GIVE US A CALL</small>
              <a href="tel:+918340482585">+91 83404 82585</a>
            </div>
          </div>
          <div className="contact-item">
            <Mail />
            <div>
              <small>WRITE TO US</small>
              <a href="mailto:krishnadeochoudhary@gmail.com">krishnadeochoudhary@gmail.com</a>
            </div>
          </div>
          <div className="map-placeholder">
            <span>✳</span>
            <b>Shanti Niketan Public School</b>
            <small>Exact location on Google Maps</small>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://maps.app.goo.gl/3tdJx2JiYfAdnDWf7"
            >
              Open map <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
