import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

// A single soft glow that trails the pointer — ambient, not a replacement
// cursor. The native cursor stays visible so precision is never lost.
const Glow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9995;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(52, 227, 200, 0.55) 0%,
    rgba(124, 131, 255, 0.22) 55%,
    transparent 72%
  );
  mix-blend-mode: screen;
  opacity: 0;
  transition: width 0.4s var(--ease), height 0.4s var(--ease), opacity 0.5s var(--ease);

  &.hover {
    width: 58px;
    height: 58px;
  }
`;

const Cursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const el = ref.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 0.5, duration: 0.5 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.4 });
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor], input, textarea')) el.classList.add('hover');
    };
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor], input, textarea')) el.classList.remove('hover');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return <Glow ref={ref} aria-hidden="true" />;
};

export default Cursor;
