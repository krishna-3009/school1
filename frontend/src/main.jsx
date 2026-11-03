import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import './style.css';

const photos = [
  ['SCHOOL1.jpeg', 'Campus'],
  ['GROUND.jpeg', 'Events'],
  ['STAGE.jpeg', 'Events'],
  ['school.jpg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.45 PM.jpeg', 'Students'],
  ['WhatsApp Image 2026-03-20 at 8.45.46 PM.jpeg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.47 PM.jpeg', 'Events'],
  ['WhatsApp Image 2026-03-20 at 8.45.48 PM.jpeg', 'Students'],
  ['WhatsApp Image 2026-03-20 at 8.45.49 PM.jpeg', 'Campus'],
  ['WhatsApp Image 2026-03-20 at 8.45.50 PM.jpeg', 'Events'],
  ['WhatsApp Image 2026-03-20 at 8.45.51 PM.jpeg', 'Students'],
  ['student2.jpg', 'Students'],
  ...['53', '54', '55', '56', '57', '58', '59'].map((n) => [
    `WhatsApp Image 2026-03-20 at 8.45.${n} PM.jpeg`,
    'Students',
  ]),
  ...['00', '01', '02', '03'].map((n) => [
    `WhatsApp Image 2026-03-20 at 8.46.${n} PM.jpeg`,
    'Students',
  ]),
].map(([file, category]) => ({
  src: `/img/${file}`,
  category,
  alt:
    category === 'Campus'
      ? 'Our school campus'
      : category === 'Events'
        ? 'School event'
        : 'Student life at Shanti Niketan',
}));
const slides = [
  { img: '/img/SCHOOL1.jpeg', label: 'A place to learn and belong' },
  { img: '/img/GROUND.jpeg', label: 'Room to play, explore and grow' },
  { img: '/img/STAGE.jpeg', label: 'Every talent deserves a stage' },
];
function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 12);
    addEventListener('scroll', f);
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <a className="brand" href="/">
        <img src="/img/logo.avif" alt="Shanti Niketan Public School logo" />
        <span>
          <b>SHANTI NIKETAN</b>
          <small>PUBLIC SCHOOL · KORON</small>
        </span>
      </a>
      <button
        className="menu"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'open' : ''}>
        <a href="/" onClick={() => setOpen(false)}>
          Home
        </a>
        <a href="/#about" onClick={() => setOpen(false)}>
          Our school
        </a>
        <a href="/?page=gallery" onClick={() => setOpen(false)}>
          Gallery
        </a>
        <a href="/#programs" onClick={() => setOpen(false)}>
          Learning
        </a>
        <a href="/#faculty" onClick={() => setOpen(false)}>
          Faculty
        </a>
        <a href="/?page=results" onClick={() => setOpen(false)}>
          Results
        </a>
        <a href="/#admissions" onClick={() => setOpen(false)}>
          Admissions
        </a>
        <a href="/?page=contact" className="nav-cta" onClick={() => setOpen(false)}>
          Get in touch <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <a className="brand footer-brand" href="/">
            <img src="/img/logo.avif" alt="Shanti Niketan Public School logo" />
            <span>
              <b>SHANTI NIKETAN</b>
              <small>PUBLIC SCHOOL · KORON</small>
            </span>
          </a>
          <p>A joyful place to learn, grow and find your own bright future.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="/#about">Our school</a>
          <a href="/?page=gallery">Campus gallery</a>
          <a href="/#programs">Learning</a>
          <a href="/#faculty">Faculty</a>
          <a href="/?page=results">Student results</a>
          <a href="/#admissions">Admissions</a>
          <a href="/#faq">Family FAQs</a>
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
function Reveal({ children, className = '' }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${show ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5200);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> A BETTER PLACE TO LEARN
          </div>
          <h1>
            Little steps.
            <br />
            <em>Big bright</em> futures.
          </h1>
          <p>
            At Shanti Niketan, every child is known, encouraged and inspired to discover what they
            can become.
          </p>
          <div className="hero-actions">
            <a href="/?page=contact" className="button dark">
              Come say hello <ArrowRight size={17} />
            </a>
            <a href="#about" className="text-link">
              Get to know us <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-proof">
            <div className="faces">
              <img src="/img/child1.jpg" />
              <img src="/img/child3.jpg" />
              <img src="/img/child4.jpg" />
            </div>
            <span>
              A close-knit community
              <br />
              <b>where every child matters</b>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-photo">
            <img key={slides[slide].img} src={slides[slide].img} alt={slides[slide].label} />
            <div className="photo-caption">
              <span>
                <i /> LIFE AT SHANTI NIKETAN
              </span>
              <b>{slides[slide].label}</b>
            </div>
          </div>
          <div className="sunburst">✳</div>
          <div className="hero-float">
            <BookOpen size={19} />
            <span>
              Curiosity
              <br />
              <b>starts here</b>
            </span>
          </div>
          <div className="slider-count">
            <b>0{slide + 1}</b>
            <span>/ 0{slides.length}</span>
            <button
              onClick={() => setSlide((slide + 1) % slides.length)}
              aria-label="Next campus photo"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
      <div className="ticker">
        <span>LEARN WITH JOY</span>
        <i>✳</i>
        <span>GROW WITH CONFIDENCE</span>
        <i>✳</i>
        <span>BE YOUR BRIGHTEST</span>
        <i>✳</i>
        <span>LEARN WITH JOY</span>
      </div>
      <section className="intro section" id="about">
        <Reveal>
          <div className="section-kicker">
            A SCHOOL WITH HEART <span>01 / WHO WE ARE</span>
          </div>
          <div className="intro-grid">
            <h2>
              Good things
              <br />
              grow <em>together.</em>
            </h2>
            <div className="intro-copy">
              <p>
                We believe a great education is built on more than lessons. It's built on belonging,
                wonder and the confidence to try something new.
              </p>
              <p>
                Our welcoming campus in Vidhyasagar gives students the space and support to learn
                deeply, make friends and find their own way forward.
              </p>
              <a href="/?page=about" className="under-link">
                A little more about us <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
        <div className="stats-row">
          <div>
            <b>
              500<span>+</span>
            </b>
            <small>STUDENTS AND COUNTING</small>
          </div>
          <div>
            <b>
              20<span>+</span>
            </b>
            <small>YEARS OF LEARNING</small>
          </div>
          <div>
            <b>
              40<span>+</span>
            </b>
            <small>CARING EDUCATORS</small>
          </div>
          <div className="stats-note">
            Big school spirit.
            <br />
            <em>Little school feel.</em>
          </div>
        </div>
      </section>
      <section className="programs section" id="programs">
        <Reveal>
          <div className="section-kicker">
            ROOM TO FIND YOUR THING <span>02 / LEARNING</span>
          </div>
          <div className="section-heading">
            <h2>
              Every age has
              <br />
              <em>a next adventure.</em>
            </h2>
            <p>A steady journey with the right support at every step.</p>
          </div>
          <div className="program-grid">
            {[
              [
                '01',
                'Primary',
                'Grades 1–5',
                'A happy start, strong foundations and plenty of room to wonder.',
                '🎒',
              ],
              [
                '02',
                'Middle school',
                'Grades 6–8',
                'New ideas, growing independence and questions worth exploring.',
                '📚',
              ],
              [
                '03',
                'Secondary',
                'Grades 9–10',
                'Focused learning and thoughtful preparation for what comes next.',
                '🎓',
              ],
            ].map((x) => (
              <article className="program-card" key={x[0]}>
                <div className="program-top">
                  <span>{x[0]} / LEARNING</span>
                  <b>{x[4]}</b>
                </div>
                <h3>{x[1]}</h3>
                <small>{x[2]}</small>
                <p>{x[3]}</p>
                <a href="/?page=contact" aria-label={`Ask about ${x[1]}`}>
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="faculty section" id="faculty">
        <Reveal>
          <div className="section-kicker">
            THE PEOPLE WHO HELP US GROW <span>03 / OUR FACULTY</span>
          </div>
          <div className="faculty-heading">
            <div>
              <h2>
                Good teachers.
                <br />
                <em>Big difference.</em>
              </h2>
              <p>Patient guides, curious minds and plenty of encouragement along the way.</p>
            </div>
            <a href="/?page=contact" className="under-link">
              Ask about our school <ArrowRight size={16} />
            </a>
          </div>
          <div className="faculty-grid">
            {[
              [
                'AS',
                'Ananya Sinha',
                'Primary educator',
                'Helping young learners find their confidence.',
                'sage',
              ],
              [
                'RK',
                'Rajesh Kumar',
                'Mathematics',
                'Making numbers feel clear and approachable.',
                'peach',
              ],
              [
                'MD',
                'Meera Das',
                'English & Languages',
                'Building a love of reading and expression.',
                'blue',
              ],
              [
                'AV',
                'Amit Verma',
                'Science',
                'Turning everyday questions into discoveries.',
                'yellow',
              ],
            ].map(([initials, name, subject, blurb, tone]) => (
              <article className="faculty-card" key={name}>
                <div className={`faculty-avatar ${tone}`} aria-hidden="true">
                  <span>{initials}</span>
                  <i>✳</i>
                </div>
                <div className="faculty-info">
                  <small>{subject}</small>
                  <h3>{name}</h3>
                  <p>{blurb}</p>
                </div>
                <ArrowUpRight className="faculty-arrow" size={17} />
              </article>
            ))}
          </div>
          <p className="faculty-note">
            Sample faculty profiles for layout preview. Replace these names and details with the
            school’s confirmed staff information.
          </p>
        </Reveal>
      </section>
      <section className="admissions section" id="admissions">
        <Reveal>
          <div className="section-kicker">
            A SIMPLE FIRST STEP <span>03 / ADMISSIONS</span>
          </div>
          <div className="admissions-layout">
            <div>
              <h2>
                Ready to find
                <br />
                <em>your place here?</em>
              </h2>
              <p className="admissions-lead">
                We’d be glad to help you explore whether Shanti Niketan is the right fit for your
                family. Get in touch to ask about availability and the next steps.
              </p>
              <div className="admissions-steps">
                <div>
                  <b>01</b>
                  <span>
                    <strong>Start a conversation</strong>
                    <small>Tell us about your child and the grade you’re considering.</small>
                  </span>
                </div>
                <div>
                  <b>02</b>
                  <span>
                    <strong>Ask your questions</strong>
                    <small>Our team can explain current availability, timings and documents.</small>
                  </span>
                </div>
                <div>
                  <b>03</b>
                  <span>
                    <strong>Plan a visit</strong>
                    <small>Arrange a time to see the school and meet the team.</small>
                  </span>
                </div>
              </div>
              <a href="/?page=contact" className="button dark">
                Ask about admissions <ArrowRight size={17} />
              </a>
            </div>
            <aside className="school-facts">
              <span className="facts-icon">✳</span>
              <small>GOOD TO KNOW</small>
              <div>
                <strong>Grades 1–10</strong>
                <span>Primary through secondary</span>
              </div>
              <div>
                <strong>Vidhyasagar, Koron</strong>
                <span>Deoghar, Jharkhand</span>
              </div>
              <div>
                <strong>School timings & fees</strong>
                <span>Contact the school for current details</span>
              </div>
              <a href="tel:+918340482585">
                <Phone size={15} /> +91 83404 82585 <ArrowUpRight size={15} />
              </a>
            </aside>
          </div>
        </Reveal>
      </section>
      <section className="faq section" id="faq">
        <Reveal>
          <div className="section-kicker">
            A FEW HELPFUL ANSWERS <span>04 / FAMILY FAQS</span>
          </div>
          <div className="faq-layout">
            <div>
              <h2>
                Good questions.
                <br />
                <em>Clear answers.</em>
              </h2>
              <p>Need something else? We’re always happy to help.</p>
              <a className="under-link" href="/?page=contact">
                Talk to the school <ArrowRight size={16} />
              </a>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  Which grades does the school offer?<span>+</span>
                </summary>
                <p>
                  The school’s learning program covers Grades 1–10, from primary through secondary.
                </p>
              </details>
              <details>
                <summary>
                  How do I ask about admission?<span>+</span>
                </summary>
                <p>
                  Contact the school by phone or email. The team can share current availability and
                  explain the next steps for your child’s grade.
                </p>
              </details>
              <details>
                <summary>
                  What documents should we bring?<span>+</span>
                </summary>
                <p>
                  Document requirements can vary. Please contact the school before your visit so the
                  team can share the current list.
                </p>
              </details>
              <details>
                <summary>
                  What are the school timings and fees?<span>+</span>
                </summary>
                <p>Please contact the school directly for current timings and fee information.</p>
              </details>
              <details>
                <summary>
                  Can we visit the campus?<span>+</span>
                </summary>
                <p>
                  Yes. Get in touch to arrange a suitable time to visit and meet the school team.
                </p>
              </details>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="quote-band">
        <div className="quote-mark">“</div>
        <blockquote>
          When children feel they belong,
          <br />
          there's no limit to <em>how far they can go.</em>
        </blockquote>
        <span>THE SHANTI NIKETAN SPIRIT</span>
        <div className="quote-doodle">✳</div>
      </section>
      <section className="gallery-teaser section">
        <Reveal>
          <div className="section-kicker">
            A PEEK AT OUR EVERYDAY <span>03 / CAMPUS LIFE</span>
          </div>
          <div className="teaser-head">
            <h2>
              Little moments.
              <br />
              <em>Big memories.</em>
            </h2>
            <a className="under-link" href="/?page=gallery">
              Explore the gallery <ArrowRight size={16} />
            </a>
          </div>
          <div className="teaser-grid">
            <a href="/?page=gallery" className="teaser large">
              <img src="/img/WhatsApp Image 2026-03-20 at 8.45.45 PM.jpeg" />
              <span>
                Friends, fresh ideas and a little bit of magic <ArrowUpRight />
              </span>
            </a>
            <a href="/?page=gallery" className="teaser">
              <img src="/img/STAGE.jpeg" />
              <span>
                Celebrating every bright moment <ArrowUpRight />
              </span>
            </a>
          </div>
        </Reveal>
      </section>
      <section className="contact-strip">
        <div>
          <span>READY WHEN YOU ARE</span>
          <h2>
            Come see what
            <br />
            <em>growing looks like.</em>
          </h2>
        </div>
        <a href="/?page=contact" className="button light">
          Plan a visit <ArrowRight size={17} />
        </a>
      </section>
    </>
  );
}
function Gallery() {
  const [filter, setFilter] = useState('All'),
    [current, setCurrent] = useState(null);
  const shown = photos.filter((p) => filter === 'All' || p.category === filter);
  useEffect(() => {
    const key = (e) => {
      if (current === null) return;
      if (e.key === 'Escape') setCurrent(null);
      if (e.key === 'ArrowRight') setCurrent((i) => (i + 1) % shown.length);
      if (e.key === 'ArrowLeft') setCurrent((i) => (i + shown.length - 1) % shown.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [current, shown.length]);
  return (
    <main className="subpage section">
      <div className="section-kicker">
        CAMPUS LIFE <span>04 / GALLERY</span>
      </div>
      <h1 className="page-title">
        A day in the life
        <br />
        <em>of our school.</em>
      </h1>
      <p className="page-lead">
        The spaces, smiles and special moments that make Shanti Niketan feel like home.
      </p>
      <div className="filters">
        {['All', 'Campus', 'Events', 'Students'].map((f) => (
          <button className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)} key={f}>
            {f}
            <sup>{f === 'All' ? photos.length : photos.filter((p) => p.category === f).length}</sup>
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {shown.map((p, i) => (
          <button className="gallery-card" key={p.src} onClick={() => setCurrent(i)}>
            <img src={p.src} alt={p.alt} loading="lazy" />
            <span>
              {p.category}
              <ArrowUpRight size={16} />
            </span>
          </button>
        ))}
      </div>
      {current !== null && (
        <div className="lightbox" onClick={() => setCurrent(null)}>
          <button className="light-close" onClick={() => setCurrent(null)} aria-label="Close">
            <X />
          </button>
          <button
            className="light-prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((i) => (i + shown.length - 1) % shown.length);
            }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <img
            onClick={(e) => e.stopPropagation()}
            src={shown[current].src}
            alt={shown[current].alt}
          />
          <button
            className="light-next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrent((i) => (i + 1) % shown.length);
            }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </main>
  );
}
function About() {
  return (
    <main className="subpage section">
      <div className="section-kicker">
        OUR SCHOOL <span>05 / ABOUT</span>
      </div>
      <h1 className="page-title">
        A school where
        <br />
        <em>you can be you.</em>
      </h1>
      <p className="page-lead">
        Shanti Niketan Public School is a close-knit learning community in Vidhyasagar, Koron,
        Deoghar.
      </p>
      <div className="about-layout">
        <img src="/img/school.jpg" />
        <div>
          <h2>
            Learning that feels
            <br />
            <em>like possibility.</em>
          </h2>
          <p>
            Our institute is dedicated to providing quality education and creating a nurturing
            environment where students can grow academically, socially and personally. We believe
            that education is the foundation for a successful future, and our goal is to help every
            student reach their full potential.
          </p>
          <p>
            Through a balanced curriculum, experienced teachers and modern learning methods, we
            encourage curiosity, creativity and critical thinking. We focus on academic excellence
            and on developing strong values, leadership skills and confidence in every student.
          </p>
          <a href="/?page=contact" className="button dark">
            Meet our community <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </main>
  );
}
function Contact() {
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
                Vidhyasagar, Koron
                <br />
                Deoghar, Jharkhand, India
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
            <small>Vidhyasagar · Koron</small>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://maps.google.com/?q=Siriyan,Jharkhand,India"
            >
              Open map <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
function ResultsPage() {
  const [form, setForm] = useState({ rollNumber: '', dateOfBirth: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function lookup(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('/api/results/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not retrieve the result.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach the result service. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="results-page section">
      <div className="section-kicker">
        STUDENT SERVICES <span>07 / RESULTS</span>
      </div>
      <div className="results-heading">
        <div>
          <h1 className="page-title">
            Your hard work,
            <br />
            <em>all in one place.</em>
          </h1>
          <p className="page-lead">
            Enter your school roll number and date of birth to view your published result.
          </p>
        </div>
        <div className="results-mark">
          <FileText size={36} />
          <span>LEARN · GROW · SHINE</span>
        </div>
      </div>
      <div className="results-layout">
        <form className="results-form" onSubmit={lookup}>
          <div className="results-form-title">
            <span>
              <Search size={18} />
            </span>
            <div>
              <h2>Find your result</h2>
              <p>Your details are used only to look up a published result.</p>
            </div>
          </div>
          <label htmlFor="rollNumber">Roll / admission number</label>
          <input
            id="rollNumber"
            name="rollNumber"
            value={form.rollNumber}
            onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
            placeholder="e.g. SNPS-2026-014"
            autoComplete="off"
            required
            maxLength={32}
          />
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
            required
          />
          <button className="button dark" type="submit" disabled={loading}>
            {loading ? 'Looking up…' : 'View my result'} {!loading && <ArrowRight size={17} />}
          </button>
          <p className="results-privacy">
            For your privacy, only published results can be viewed with both details.
          </p>
          {error && (
            <p className="results-error" role="alert">
              <AlertCircle size={16} />
              {error}
            </p>
          )}
        </form>
        <div className="result-display">
          {result ? (
            <article className="result-card">
              <div className="result-success">
                <CheckCircle2 size={19} /> RESULT FOUND
              </div>
              <div className="result-student">
                <div>
                  <small>STUDENT</small>
                  <h2>{result.studentName}</h2>
                </div>
                <span>{result.className}</span>
              </div>
              <p className="result-exam">
                {result.examName} <b>·</b> {result.academicYear}
              </p>
              <div className="result-summary">
                <div>
                  <small>TOTAL</small>
                  <strong>
                    {result.total}
                    <span> / {result.maximum}</span>
                  </strong>
                </div>
                <div>
                  <small>PERCENTAGE</small>
                  <strong>
                    {result.percentage}
                    <span>%</span>
                  </strong>
                </div>
              </div>
              <div className="result-subjects">
                <div className="subject-row subject-head">
                  <span>SUBJECT</span>
                  <span>MARKS</span>
                </div>
                {result.subjects.map((subject) => (
                  <div className="subject-row" key={subject.name}>
                    <span>{subject.name}</span>
                    <b>
                      {subject.marks} <small>/ {subject.maxMarks}</small>
                    </b>
                  </div>
                ))}
              </div>
              {result.remarks && <p className="result-remarks">{result.remarks}</p>}
            </article>
          ) : (
            <div className="result-empty">
              <div>
                <FileText size={29} />
              </div>
              <h3>Your result will appear here</h3>
              <p>Use the details provided by your school to look up a published result.</p>
              <span>SHANTI NIKETAN PUBLIC SCHOOL</span>
            </div>
          )}
        </div>
      </div>
      <div className="results-help">
        <span>NEED A HAND?</span>
        <p>If your result isn’t available or your details don’t work, contact the school office.</p>
        <a href="tel:+918340482585">
          <Phone size={15} /> +91 83404 82585
        </a>
      </div>
    </main>
  );
}

function App() {
  const path = location.pathname.replace(/\/$/, '');
  const routePage = {
    '/gallery': 'gallery',
    '/gallery.html': 'gallery',
    '/about': 'about',
    '/about.html': 'about',
    '/contact': 'contact',
    '/contact.html': 'contact',
    '/results.html': 'results',
  }[path];
  const page = new URLSearchParams(location.search).get('page') || routePage;
  return (
    <>
      <Header />
      {page === 'gallery' ? (
        <Gallery />
      ) : page === 'about' ? (
        <About />
      ) : page === 'contact' ? (
        <Contact />
      ) : page === 'results' ? (
        <ResultsPage />
      ) : (
        <Home />
      )}
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
