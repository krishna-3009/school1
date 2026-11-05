import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Phone } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import slides from '../data/slides.js';
import { Link } from 'react-router-dom';

export default function Home() {
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
            <Link to="/contact" className="button dark">
              Come say hello <ArrowRight size={17} />
            </Link>
            <Link to="/#about" className="text-link">
              Get to know us <ArrowDown size={15} />
            </Link>
          </div>
          <div className="hero-proof">
            <div className="faces">
              <img src="/img/child1.jpg" alt="" />
              <img src="/img/child3.jpg" alt="" />
              <img src="/img/child4.jpg" alt="" />
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
            <Link to="/about" className="under-link">
                A little more about us <ArrowRight size={16} />
            </Link>
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
                <Link to="/contact" aria-label={`Ask about ${x[1]}`}>
                  <ArrowUpRight />
                </Link>
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
            <Link to="/contact" className="under-link">
              Ask about our school <ArrowRight size={16} />
            </Link>
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
              <Link to="/contact" className="button dark">
                Ask about admissions <ArrowRight size={17} />
              </Link>
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
              <Link className="under-link" to="/contact">
                Talk to the school <ArrowRight size={16} />
              </Link>
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
            <Link className="under-link" to="/gallery">
              Explore the gallery <ArrowRight size={16} />
            </Link>
          </div>
          <div className="teaser-grid">
            <Link to="/gallery" className="teaser large">
              <img src="/img/WhatsApp Image 2026-03-20 at 8.45.45 PM.jpeg" />
              <span>
                Friends, fresh ideas and a little bit of magic <ArrowUpRight />
              </span>
            </Link>
            <Link to="/gallery" className="teaser">
              <img src="/img/STAGE.jpeg" />
              <span>
                Celebrating every bright moment <ArrowUpRight />
              </span>
            </Link>
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
        <Link to="/contact" className="button light">
          Plan a visit <ArrowRight size={17} />
        </Link>
      </section>
    </>
  );
}
