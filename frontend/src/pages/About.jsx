import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
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
        <img src="/img/school.jpg" alt="Shanti Niketan Public School campus" loading="lazy" />
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
          <Link to="/contact" className="button dark">
            Meet our community <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}
