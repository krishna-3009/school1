import { ArrowRight, ArrowUpRight, BedDouble, BookOpen, HeartPulse, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const photos = [
  { src: '/img/SCHOOL1.jpeg', alt: 'Shanti Niketan school campus' },
  { src: '/img/GROUND.jpeg', alt: 'Open grounds at Shanti Niketan' },
  { src: '/img/STAGE.jpeg', alt: 'Student activities at Shanti Niketan' },
];

const feeItems = [
  ['Hostel / boarding fee', '₹15,000. The mess fee is included.'],
  ['Mess / meal fee', 'Included in the ₹15,000 hostel fee.'],
  ['One-time charges', 'Ask whether admission, security deposit, bedding or other charges apply.'],
];

export default function Hostel() {
  return (
    <main className="subpage section hostel-page">
      <div className="section-kicker">
        A HOME AWAY FROM HOME <span>07 / HOSTEL</span>
      </div>
      <h1 className="page-title">
        Room to learn,
        <br />
        <em>rest and grow.</em>
      </h1>
      <p className="page-lead">
        Looking for hostel accommodation at Shanti Niketan? Speak with the school to check
        availability and get confirmed details about rooms, meals, supervision and fees.
      </p>

      <section className="hostel-photo-grid" aria-label="School campus photos">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </figure>
        ))}
      </section>
      <p className="hostel-photo-note">
        Campus and student-life photos. Contact the school to arrange a visit and see the hostel.
      </p>

      <section className="hostel-intro">
        <div>
          <div className="section-kicker">HOSTEL INFORMATION <span>PLAN YOUR STAY</span></div>
          <h2>
            The details families
            <br />
            <em>need to know.</em>
          </h2>
          <p>
            Hostel availability, room arrangements and included services can change. The school
            office can explain what is currently offered, who can apply and what to bring before
            you make a decision.
          </p>
          <a className="button dark" href="tel:+918340482585">
            Call the school <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hostel-info-grid">
          <article>
            <BedDouble />
            <h3>Rooms & stay</h3>
            <p>Ask about room sharing, bedding, storage, laundry and what students should bring.</p>
          </article>
          <article>
            <Utensils />
            <h3>Meals & mess</h3>
            <p>Confirm meal timings, the mess fee, menu, drinking water and dietary support.</p>
          </article>
          <article>
            <HeartPulse />
            <h3>Care & safety</h3>
            <p>Ask about resident staff, visitor rules, medical support and emergency contacts.</p>
          </article>
          <article>
            <BookOpen />
            <h3>Daily routine</h3>
            <p>Check study hours, school transport, leave rules and the weekly schedule.</p>
          </article>
        </div>
      </section>

      <section className="hostel-fees">
        <div className="section-kicker">FEES & WHAT'S INCLUDED <span>PLEASE CONFIRM CURRENT RATES</span></div>
        <div className="hostel-fees-heading">
          <div>
            <h2>
              Clear costs,
              <br />
              <em>before you decide.</em>
            </h2>
            <p>The hostel fee is ₹15,000 and includes the mess fee. Contact the office to confirm the billing period.</p>
          </div>
          <a className="button dark" href="tel:+918340482585">
            Ask about fees <ArrowRight size={17} />
          </a>
        </div>
        <div className="hostel-fee-grid">
          {feeItems.map(([title, detail]) => (
            <article key={title}>
              <small>HOSTEL FEES</small>
              <h3>{title}</h3>
              <p>{detail}</p>
              <a href="tel:+918340482585">Call for current amount <ArrowUpRight size={15} /></a>
            </article>
          ))}
        </div>
        <p className="hostel-fee-note">
          Confirm whether the ₹15,000 fee is monthly, term-wise or annual, along with payment due
          dates, refund rules and any extra charges.
        </p>
      </section>

      <section className="hostel-next-step">
        <div>
          <span>INTERESTED IN A HOSTEL PLACE?</span>
          <h2>Talk it through with our school team.</h2>
          <p>Ask about availability, eligibility, application documents and a family visit.</p>
        </div>
        <Link to="/contact" className="button light">
          Contact the school <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
