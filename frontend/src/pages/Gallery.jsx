import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import photos from '../data/gallery.js';

export default function Gallery() {
  const [filter, setFilter] = useState('All'),
    [current, setCurrent] = useState(null);
  const shown = photos.filter((p) => filter === 'All' || p.category === filter);
  function changeFilter(nextFilter) {
    setFilter(nextFilter);
    setCurrent(null);
  }
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
          <button className={filter === f ? 'selected' : ''} aria-pressed={filter === f} onClick={() => changeFilter(f)} key={f}>
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
