import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link className="brand footer-brand" to="/">
            <img src="/img/logo.avif" alt="Shanti Niketan Public School logo" />
            <span>
              <b>SHANTI NIKETAN</b>
              <small>PUBLIC SCHOOL · KORON</small>
            </span>
          </Link>
          <p>A joyful place to learn, grow and find your own bright future.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/#about">Our school</Link>
          <Link to="/gallery">Campus gallery</Link>
          <Link to="/#programs">Learning</Link>
          <Link to="/#faculty">Faculty</Link>
          <Link to="/results">Student results</Link>
          <Link to="/hostel">Hostel & boarding</Link>
          <Link to="/#admissions">Admissions</Link>
          <Link to="/#faq">Family FAQs</Link>
        </div>
        <div>
          <h4>Say hello</h4>
          <a href="tel:+918340482585">+91 83404 82585</a>
          <a href="mailto:krishnadeochoudhary@gmail.com">Email the school</a>
          <span>Vidhyasagar, Koron, Jharkhand</span>
        </div>
        <div className="footer-note">
          Growing curious minds
          <br />
          <em>since day one.</em> <Sparkles size={18} />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Shanti Niketan Public School</span>
        <span>
          Made for brighter beginnings <span className="sun">✳</span>
        </span>
      </div>
    </footer>
  );
}
