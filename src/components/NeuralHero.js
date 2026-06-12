import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

// Shown when WebGL is unavailable (hardware acceleration off / GPU blocklisted /
// context lost) so the hero never looks empty in Chrome or anywhere else.
const Fallback = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(38% 48% at 78% 44%, rgba(52, 227, 200, 0.26), transparent 70%),
    radial-gradient(32% 42% at 86% 62%, rgba(124, 131, 255, 0.22), transparent 72%),
    radial-gradient(rgba(231, 236, 246, 0.14) 1px, transparent 1.4px);
  background-size: auto, auto, 26px 26px;
  -webkit-mask-image: radial-gradient(60% 60% at 80% 50%, #000 30%, transparent 75%);
  mask-image: radial-gradient(60% 60% at 80% 50%, #000 30%, transparent 75%);
`;

// Soft circular glow sprite generated on the fly.
function makeGlowTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

/**
 * "AI brain" — an abstract neural network shaped like two cortical
 * hemispheres: glowing neurons, dim synaptic links between neighbors,
 * and bright signal pulses travelling along random synapses.
 */
const NeuralHero = () => {
  const canvasRef = useRef(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      // No WebGL (hardware accel off / GPU blocklisted) — show the CSS fallback.
      setWebglOk(false);
      return undefined;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 13);

    const group = new THREE.Group();
    // Keep the brain well right of the headline (dimmer + centered on mobile).
    group.position.x = isMobile ? 0 : 5.4;
    group.position.y = isMobile ? 0.6 : -0.3;
    group.scale.setScalar(isMobile ? 0.8 : 0.92);
    scene.add(group);

    const aqua = new THREE.Color('#34e3c8');
    const indigo = new THREE.Color('#7c83ff');
    const glow = makeGlowTexture();

    // ── Neurons: a rounded cerebrum (two hemispheres) + a brain stem ──
    const CORTEX = isMobile ? 380 : 560;
    const STEM = isMobile ? 38 : 56;
    const N = CORTEX + STEM;

    const RX = 2.6;   // half-width  (left ↔ right)
    const RY = 2.2;   // half-height (top ↔ bottom)
    const RZ = 3.0;   // half-depth  (front ↔ back) — a brain is longer than wide
    const FISSURE = 0.55; // median longitudinal fissure between hemispheres

    const neurons = [];
    const isStem = [];

    // Cerebrum: shell-biased points on a full (un-flattened) ellipsoid.
    for (let i = 0; i < CORTEX; i++) {
      const u = Math.random() * 2 - 1;
      const phi = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = 0.8 + 0.2 * Math.sqrt(Math.random());
      let x = s * Math.cos(phi) * RX * r;
      let y = u * RY * r;
      let z = s * Math.sin(phi) * RZ * r;

      // Median longitudinal fissure: nudge points away from x=0 on the upper
      // half so the two hemispheres are separated by a visible groove.
      if (y > 0) x += Math.sign(x || 1) * FISSURE * (y / RY);

      // Tuck the underside gently inward (so it rests on the stem) — without
      // flattening it into a dome.
      if (y < -RY * 0.55) {
        const d = (-RY * 0.55 - y) / RY;
        x *= 1 - 0.3 * d;
        z *= 1 - 0.22 * d;
      }

      neurons.push(new THREE.Vector3(x, y, z));
      isStem.push(false);
    }

    // Brain stem: a tapering strand of neurons descending from bottom-center
    // and curving slightly forward, like the medulla into the spinal cord.
    for (let i = 0; i < STEM; i++) {
      const t = i / (STEM - 1);              // 0 at the brain, 1 at the tip
      const y = -RY * 0.7 - t * 2.5;
      const taper = (1 - t) * 0.5 + 0.1;     // narrows toward the tip
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.sqrt(Math.random()) * taper;
      const x = Math.cos(ang) * rad;
      const z = Math.sin(ang) * rad + t * 1.0; // curve forward
      neurons.push(new THREE.Vector3(x, y, z));
      isStem.push(true);
    }

    const basePos = new Float32Array(N * 3);
    const baseCol = new Float32Array(N * 3);
    const phases = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const p = neurons[i];
      basePos.set([p.x, p.y, p.z], i * 3);
      const t = isStem[i] ? 0.72 : (p.x / RX + 1) / 2; // sweep across hemispheres
      const c = aqua.clone().lerp(indigo, t);
      baseCol.set([c.r, c.g, c.b], i * 3);
      phases[i] = Math.random() * Math.PI * 2;
    }

    const neuronGeo = new THREE.BufferGeometry();
    neuronGeo.setAttribute('position', new THREE.BufferAttribute(basePos, 3));
    neuronGeo.setAttribute('color', new THREE.BufferAttribute(baseCol.slice(), 3));
    const neuronMat = new THREE.PointsMaterial({
      size: 0.22,
      map: glow,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(neuronGeo, neuronMat));

    // ── Synapses: connect each neuron to several near neighbors so the
    //    network of connectors reads clearly. ──
    const edges = [];
    const MAXD = 1.25;
    for (let i = 0; i < N; i++) {
      let linked = 0;
      for (let j = i + 1; j < N && linked < 4; j++) {
        if (neurons[i].distanceTo(neurons[j]) < MAXD) {
          edges.push([i, j]);
          linked++;
        }
      }
    }
    const linePos = new Float32Array(edges.length * 6);
    const lineCol = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePos.set([...neurons[a].toArray(), ...neurons[b].toArray()], k * 6);
      lineCol.set([...baseCol.slice(a * 3, a * 3 + 3), ...baseCol.slice(b * 3, b * 3 + 3)], k * 6);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Signal pulses travelling along random synapses ──
    const SIGNALS = isMobile ? 14 : 26;
    const sigState = [];
    const sigPos = new Float32Array(SIGNALS * 3);
    for (let i = 0; i < SIGNALS; i++) {
      sigState.push({
        edge: edges[(Math.random() * edges.length) | 0],
        t: Math.random(),
        speed: 0.4 + Math.random() * 0.9,
      });
    }
    const sigGeo = new THREE.BufferGeometry();
    sigGeo.setAttribute('position', new THREE.BufferAttribute(sigPos, 3));
    const sigMat = new THREE.PointsMaterial({
      size: 0.3,
      map: glow,
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Points(sigGeo, sigMat));

    // ── Ambient dust for depth ──
    const dustCount = isMobile ? 320 : 700;
    const dustPos = new Float32Array(dustCount * 3);
    const dustCol = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos.set([
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 20,
      ], i * 3);
      const c = aqua.clone().lerp(indigo, Math.random());
      dustCol.set([c.r, c.g, c.b], i * 3);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.1,
        map: glow,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(dust);

    // ── Sizing ──
    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Interaction ──
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Render loop ──
    const clock = new THREE.Clock();
    const colAttr = neuronGeo.getAttribute('color');
    const sigAttr = sigGeo.getAttribute('position');
    const tmpA = new THREE.Vector3();
    const tmpB = new THREE.Vector3();
    let raf;

    const render = () => {
      const t = clock.getElapsedTime();
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      // Neuron "firing" shimmer — brightness wave across the network
      for (let i = 0; i < N; i++) {
        const k = 0.68 + 0.45 * Math.max(0, Math.sin(t * 1.6 + phases[i]));
        colAttr.array[i * 3] = baseCol[i * 3] * k;
        colAttr.array[i * 3 + 1] = baseCol[i * 3 + 1] * k;
        colAttr.array[i * 3 + 2] = baseCol[i * 3 + 2] * k;
      }
      colAttr.needsUpdate = true;

      // Signal pulses along synapses
      for (let i = 0; i < SIGNALS; i++) {
        const s = sigState[i];
        s.t += s.speed * 0.012;
        if (s.t >= 1) {
          s.t = 0;
          s.edge = edges[(Math.random() * edges.length) | 0];
          s.speed = 0.4 + Math.random() * 0.9;
        }
        tmpA.copy(neurons[s.edge[0]]);
        tmpB.copy(neurons[s.edge[1]]);
        tmpA.lerp(tmpB, s.t);
        sigAttr.array.set([tmpA.x, tmpA.y, tmpA.z], i * 3);
      }
      sigAttr.needsUpdate = true;

      group.rotation.y = t * 0.16 + scrollY * 0.0008 + mouse.x * 0.12;
      group.rotation.x = -0.12 + mouse.y * 0.16;
      group.position.y = (isMobile ? 0.6 : -0.3) - scrollY * 0.003;

      dust.rotation.y = t * 0.015;

      camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.04;
      camera.lookAt(group.position.x * 0.55, 0, 0);

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(render);
    };

    let running = false;
    const startLoop = () => {
      if (!running && !reduce) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only run the WebGL loop while the hero is on-screen — this frees the main
    // thread (and GPU) for smooth scrolling through the rest of the page.
    const vis = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startLoop(); else stopLoop(); },
      { threshold: 0 },
    );
    vis.observe(canvas);

    // If the GPU context is lost (common in Chrome on sleep/GPU reset), stop and
    // reveal the fallback instead of rendering a frozen / blank canvas.
    const onContextLost = (e) => {
      e.preventDefault();
      stopLoop();
      setWebglOk(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost, false);

    if (reduce) renderer.render(scene, camera);
    else startLoop();

    // ── Cleanup ──
    return () => {
      stopLoop();
      vis.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      neuronGeo.dispose();
      lineGeo.dispose();
      sigGeo.dispose();
      dustGeo.dispose();
      neuronMat.dispose();
      lineMat.dispose();
      sigMat.dispose();
      dust.material.dispose();
      glow.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <Canvas ref={canvasRef} aria-hidden="true" style={{ opacity: webglOk ? 1 : 0 }} />
      {!webglOk && <Fallback aria-hidden="true" />}
    </>
  );
};

export default NeuralHero;
