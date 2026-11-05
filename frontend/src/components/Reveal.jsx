import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '' }) {
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
