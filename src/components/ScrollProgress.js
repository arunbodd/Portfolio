import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: ${(p) => p.theme.gradient};
  box-shadow: 0 0 12px ${(p) => p.theme.highlight};
  z-index: 1001;
  will-change: transform;
`;

// Thin gradient bar that tracks reading progress through the page.
const ScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <Bar ref={ref} aria-hidden="true" />;
};

export default ScrollProgress;
