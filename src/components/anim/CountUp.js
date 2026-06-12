import React, { useEffect, useRef, useState } from 'react';

// Counts up to a numeric value when scrolled into view. Handles suffixes and
// decimals (e.g. "800+", "80.5%", "9+").
const CountUp = ({ value, duration = 1600 }) => {
  const ref = useRef(null);
  const fired = useRef(false);
  const [display, setDisplay] = useState(() => {
    const m = String(value).match(/^([\d.]+)(.*)$/);
    return m ? `0${m[2] || ''}` : String(value);
  });

  useEffect(() => {
    const m = String(value).match(/^([\d.]+)(.*)$/);
    if (!m) {
      setDisplay(String(value));
      return undefined;
    }
    const target = parseFloat(m[1]);
    const suffix = m[2] || '';
    const decimals = (m[1].split('.')[1] || '').length;
    const format = (n) => (decimals ? n.toFixed(decimals) : Math.round(n).toString()) + suffix;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(format(target));
      return undefined;
    }

    let raf;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 },
    );
    if (el) io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
};

export default CountUp;
