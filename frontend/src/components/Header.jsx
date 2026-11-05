import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 12);
    addEventListener('scroll', f);
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link className="brand" to="/">
        <img src="/img/logo.avif" alt="Shanti Niketan Public School logo" />
        <span>
          <b>SHANTI NIKETAN</b>
          <small>PUBLIC SCHOOL · KORON</small>
        </span>
      </Link>
      <button
        className="menu"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'open' : ''}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/#about" onClick={() => setOpen(false)}>
          Our school
        </Link>
        <Link to="/gallery" onClick={() => setOpen(false)}>
          Gallery
        </Link>
        <Link to="/#programs" onClick={() => setOpen(false)}>
          Learning
        </Link>
        <Link to="/#faculty" onClick={() => setOpen(false)}>
          Faculty
        </Link>
        <Link to="/results" onClick={() => setOpen(false)}>
          Results
        </Link>
        <Link to="/#admissions" onClick={() => setOpen(false)}>
          Admissions
        </Link>
        <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
          Get in touch <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
