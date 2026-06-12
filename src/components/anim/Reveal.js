import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal. Fades + slides its child in once it enters view.
 * Props:
 *  - as: element tag (default 'div')
 *  - delay, y, duration: animation tuning
 *  - stagger: if true, staggers direct children instead of the wrapper
 */
const Reveal = ({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 40,
  duration = 0.9,
  stagger = false,
  className,
  style,
  ...rest
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = stagger ? Array.from(el.children) : el;

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration, stagger]);

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
