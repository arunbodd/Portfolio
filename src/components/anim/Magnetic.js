import React, { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Wraps a child and gives it a magnetic pull toward the cursor on hover.
 * Use for buttons / icon links. Renders a span by default.
 */
const Magnetic = ({ children, strength = 0.4, as: Tag = 'span', className, style, ...rest }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Magnetic;
