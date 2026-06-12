import React from 'react';
import styled, { keyframes } from 'styled-components';

// Slow, organic drift for the aurora blobs.
const drift = (x, y, s) => keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(${x}px, ${y}px) scale(${s}); }
  66%  { transform: translate(${-x * 0.6}px, ${y * 0.5}px) scale(${2 - s}); }
  100% { transform: translate(0, 0) scale(1); }
`;

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

// Faint engineering dot-grid — gives the void a sense of structure/scale.
const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(${(p) => p.theme.borderStrong} 1px, transparent 1px);
  background-size: 46px 46px;
  opacity: ${(p) => (p.theme.mode === 'light' ? 0.5 : 0.35)};
  -webkit-mask-image: radial-gradient(120% 90% at 50% 18%, #000 35%, transparent 78%);
  mask-image: radial-gradient(120% 90% at 50% 18%, #000 35%, transparent 78%);
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  /* Lighter blur + own compositor layer so drifting is a cheap GPU transform,
     not a per-frame repaint (keeps scrolling smooth). */
  filter: blur(60px);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  opacity: ${(p) => (p.theme.mode === 'light' ? 0.42 : 0.3)};
`;

const Aqua = styled(Blob)`
  width: 38vw;
  height: 38vw;
  top: 8%;
  left: -6%;
  background: radial-gradient(circle, ${(p) => p.theme.highlight}, transparent 66%);
  animation: ${drift(120, 80, 1.15)} 30s ease-in-out infinite;
`;

const Indigo = styled(Blob)`
  width: 42vw;
  height: 42vw;
  top: 34%;
  right: -10%;
  background: radial-gradient(circle, ${(p) => p.theme.accent2}, transparent 66%);
  animation: ${drift(-140, 60, 0.85)} 38s ease-in-out infinite;
`;

const Pink = styled(Blob)`
  width: 34vw;
  height: 34vw;
  bottom: -4%;
  left: 24%;
  background: radial-gradient(circle, ${(p) => p.theme.accent3}, transparent 68%);
  opacity: ${(p) => (p.theme.mode === 'light' ? 0.28 : 0.18)};
  animation: ${drift(90, -90, 1.1)} 44s ease-in-out infinite;
`;

// Fixed ambient backdrop sitting behind all page content: drifting aurora
// blobs + a faint technical dot-grid. Turns the flat background into a living,
// layered space.
const Ambient = () => (
  <Wrap aria-hidden="true">
    <Aqua />
    <Indigo />
    <Pink />
    <Grid />
  </Wrap>
);

export default Ambient;
