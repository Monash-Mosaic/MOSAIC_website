'use client';

import Link from 'next/link';
import { partners } from '../data';
import { HiArrowDown } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ParallaxLayer, ParallaxSection } from '@/components';

export default function PartnershipsSection() {
  const canvasRef = useRef(null);
  const mouse = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    active: false,
  });

  const handleMove = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Measure directly against the canvas so ParallaxSection doesn't need a ref
    // and parallax y-offsets are automatically accounted for!
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (!mouse.current.active) {
      mouse.current.prevX = x;
      mouse.current.prevY = y;
    }

    mouse.current.x = x;
    mouse.current.y = y;
    mouse.current.active = true;
  };

  const handleMouseLeave = () => {
    mouse.current.active = false;
    mouse.current.x = -9999;
    mouse.current.y = -9999;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let cleanupSimulation = null;

    const startSimulation = () => {
      const canvas = canvasRef.current;
      // Grab the parent <section id="partners"> via DOM traversal instead of a ref
      const section = canvas?.closest('#partners') || canvas?.parentElement;
      if (!canvas || !section) return null;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return null;

      const hexToRgba = (hex, alpha = 1) => {
        const cleanHex = hex.replace('#', '');
        return [
          parseInt(cleanHex.slice(0, 2), 16),
          parseInt(cleanHex.slice(2, 4), 16),
          parseInt(cleanHex.slice(4, 6), 16),
          alpha,
        ];
      };

      const CONFIG = {
        arrangement: 'Noise',          // 'Grid' | 'Noise'
        dotDensity: 35,                // 0 - 100 (%) -> Higher = tighter spacing
        mouseRadius: 200,              // 20 - 400 (px) -> Hover area size
        mouseShape: 'Ring',            // 'Plateau' | 'Dome' | 'Pinch' | 'Ring' | 'Wave'
        mouseStrength: 60,             // 0 - 100 (%) -> Repulsion push strength
        mouseSpring: 55,               // 0 - 100 (%) -> Spring bounce stiffness
        mouseDamping: 75,              // 0 - 100 (%) -> Higher prevents multi-bounce ringing
        mouseZOffset: 150,             // 0 - 300 (px) -> 3D pop-out towards viewer
        particleBlend: 'Add',          // 'Normal' | 'Add'

        inactiveGradientMode: 'Noise', // 'Noise' | 'Diagonal' | 'Radial'
        inactiveOpacityScale: 0.55,    // Opacity multiplier for resting dots (0.0 - 1.0)

        // SHARED COLOR GRADIENT
        particleGradient: [
          { position: 0.0, color: hexToRgba('#213359', 0.85) },
          { position: 0.4, color: hexToRgba('#6D92E2', 0.90) },
          { position: 1.0, color: hexToRgba('#99CDFC', 1.00) },
        ],

        // SHARED SIZE GRADIENT (in px radius)
        particleSizeGradient: [
          { position: 0.0, radius: 1.15 },
          { position: 0.4, radius: 2.60 },
          { position: 1.0, radius: 3.20 },
        ],
      };

      const dotDensityVal = 10 + CONFIG.dotDensity * 1.9;
      const gridSize = Math.max(4.5, Math.min(32, 400 / dotDensityVal));

      const mouseRadius = CONFIG.mouseRadius;
      const mouseRadiusSq = mouseRadius * mouseRadius;
      const mouseStrength = CONFIG.mouseStrength * 6;
      const mouseStrengthScale = mouseStrength / 300.0;
      const mouseZOffset = CONFIG.mouseZOffset;
      const simulatedMouseZOffset = mouseZOffset * 0.85;
      const perspective = Math.max(350, 1200 - mouseZOffset * 4);

      const mouseSpringPercent = CONFIG.mouseSpring * 3;
      const mouseSpringMultiplier =
        mouseSpringPercent <= 100
          ? mouseSpringPercent * 0.01
          : 1 + (mouseSpringPercent - 100) * 0.02;

      const mouseDamping = CONFIG.mouseDamping * 0.00375;
      const velocityRetention = 1.0 - mouseDamping;

      const physicsGridSize = 8.0;
      const baseStiffness = 300.0 / (14.0 * physicsGridSize);
      const stiffness = baseStiffness * mouseSpringMultiplier;
      const springMix = Math.max(0.0, Math.min(mouseSpringMultiplier, 1.0));
      const radiusScale = Math.max(0.0, Math.min(mouseRadius / 400.0, 1.0));

      const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

      const smoothstep = (edge0, edge1, x) => {
        const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        return t * t * (3.0 - 2.0 * t);
      };

      const hash3 = (col, row) => {
        const qx = col * 127.1 + row * 311.7;
        const qy = col * 269.5 + row * 183.3;
        const qz = col * 419.2 + row * 371.9;
        const sx = Math.sin(qx) * 43758.5453;
        const sy = Math.sin(qy) * 43758.5453;
        const sz = Math.sin(qz) * 43758.5453;
        return [sx - Math.floor(sx), sy - Math.floor(sy), sz - Math.floor(sz)];
      };

      const sampleParticleGradient = (value) => {
        const t = clamp(value, 0.0, 1.0);
        const stops = CONFIG.particleGradient;
        let previous = stops[0];

        for (let i = 1; i < stops.length; i++) {
          const next = stops[i];
          if (t <= next.position) {
            const span = Math.max(next.position - previous.position, 0.0001);
            const amount = clamp((t - previous.position) / span, 0.0, 1.0);
            return [
              Math.round(previous.color[0] + (next.color[0] - previous.color[0]) * amount),
              Math.round(previous.color[1] + (next.color[1] - previous.color[1]) * amount),
              Math.round(previous.color[2] + (next.color[2] - previous.color[2]) * amount),
              previous.color[3] + (next.color[3] - previous.color[3]) * amount,
            ];
          }
          previous = next;
        }
        return previous.color;
      };

      const sampleParticleSize = (value) => {
        const t = clamp(value, 0.0, 1.0);
        const stops = CONFIG.particleSizeGradient;
        let previous = stops[0];

        for (let i = 1; i < stops.length; i++) {
          const next = stops[i];
          if (t <= next.position) {
            const span = Math.max(next.position - previous.position, 0.0001);
            const amount = clamp((t - previous.position) / span, 0.0, 1.0);
            return previous.radius + (next.radius - previous.radius) * amount;
          }
          previous = next;
        }
        return previous.radius;
      };

      const BUCKET_COUNT = 16;
      const inactiveBuckets = Array.from({ length: BUCKET_COUNT }, (_, i) => {
        const t = i / (BUCKET_COUNT - 1);
        const [r, g, b, a] = sampleParticleGradient(t);
        const finalAlpha = (a * CONFIG.inactiveOpacityScale).toFixed(3);
        return `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
      });

      const shapeMouseFalloff = (distance, radius, shape) => {
        const t = clamp(distance / Math.max(radius, 1.0), 0.0, 1.0);
        if (shape === 'Plateau') {
          return 1.0 - smoothstep(0.65, 1.0, t);
        }
        if (shape === 'Dome') {
          return Math.pow(Math.max(1.0 - t * t, 0.0), 1.5);
        }
        if (shape === 'Pinch') {
          const pinchBase = 1.0 - smoothstep(0.0, 1.0, t);
          const p2 = pinchBase * pinchBase;
          return p2 * p2;
        }
        if (shape === 'Ring') {
          const ring = Math.sin(Math.PI * t);
          return ring * ring;
        }
        const envelope = 1.0 - smoothstep(0.0, 1.0, t);
        const rings = 0.15 + 0.85 * (0.5 + 0.5 * Math.cos(18.8495559 * t));
        return envelope * rings;
      };

      const dragFollowAmount = (retention, dt) => {
        if (dt <= 0.0) return 0.0;
        const drag = clamp((1.0 - retention) * 4.0, 0.0, 1.5);
        if (drag <= 0.0001) return 1.0;
        const perFrameFollow = Math.pow(2, -4.0 * drag);
        return 1.0 - Math.pow(Math.max(1.0 - perFrameFollow, 0.0), dt * 60.0);
      };

      const closestPointOnSegment = (px, py, sx, sy, ex, ey) => {
        const segX = ex - sx;
        const segY = ey - sy;
        const segLenSq = segX * segX + segY * segY;
        const amount = clamp(
          ((px - sx) * segX + (py - sy) * segY) / Math.max(segLenSq, 0.0001),
          0.0,
          1.0
        );
        return [sx + segX * amount, sy + segY * amount];
      };

      let animationFrameId;
      let cachedWidth = 0;
      let cachedHeight = 0;
      let particles = [];
      let previousTime = performance.now();

      const buildGrid = (width, height) => {
        const cellsX = Math.max(1, Math.ceil(width / gridSize));
        const cellsY = Math.max(1, Math.ceil(height / gridSize));
        particles = new Array(cellsX * cellsY);

        const maxRadDist = Math.hypot(width * 0.5, height * 0.5) || 1;

        let idx = 0;
        for (let cy = 0; cy < cellsY; cy++) {
          for (let cx = 0; cx < cellsX; cx++) {
            const [hx, hy, hz] = hash3(cx, cy);
            let restX, restY;

            if (CONFIG.arrangement === 'Noise') {
              restX = (cx + 0.5 + (hx - 0.5)) * gridSize;
              restY = (cy + 0.5 + (hy - 0.5)) * gridSize;
            } else {
              restX = (cx + 0.5) * gridSize;
              restY = (cy + 0.5) * gridSize;
            }

            let baseGrad = hz;
            if (CONFIG.inactiveGradientMode === 'Diagonal') {
              baseGrad = clamp((restX / Math.max(width, 1) + restY / Math.max(height, 1)) * 0.5, 0, 1);
            } else if (CONFIG.inactiveGradientMode === 'Radial') {
              const dx = restX - width * 0.5;
              const dy = restY - height * 0.5;
              baseGrad = clamp(1.0 - Math.hypot(dx, dy) / maxRadDist, 0, 1);
            }

            const bucket = Math.min(
              BUCKET_COUNT - 1,
              Math.floor(baseGrad * BUCKET_COUNT)
            );

            particles[idx++] = {
              cellCenterX: (cx + 0.5) * gridSize,
              cellCenterY: (cy + 0.5) * gridSize,
              restX,
              restY,
              baseGrad,
              bucket,
              vx: 0,
              vy: 0,
              dispX: 0,
              dispY: 0,
              zVel: 0,
              zDisp: 0,
              responseVel: 0,
              response: 0,
            };
          }
        }
      };

      const render = (now) => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = rect.width;
        const height = rect.height;

        if (width <= 0 || height <= 0) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }

        if (width !== cachedWidth || height !== cachedHeight) {
          cachedWidth = width;
          cachedHeight = height;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          buildGrid(width, height);
        }

        const dtMs = clamp(now - previousTime, 0, 100);
        previousTime = now;
        const dt = dtMs * 0.001;

        ctx.clearRect(0, 0, width, height);

        ctx.globalCompositeOperation =
          CONFIG.particleBlend === 'Add' ? 'lighter' : 'source-over';

        const mX = mouse.current.x;
        const mY = mouse.current.y;
        const prevMX = mouse.current.active ? mouse.current.prevX : mX;
        const prevMY = mouse.current.active ? mouse.current.prevY : mY;

        const mouseDeltaX = mX - prevMX;
        const mouseDeltaY = mY - prevMY;
        const mouseTravelSq = mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY;

        const singleFollow = dragFollowAmount(velocityRetention, dt);
        const subDt8 = dt / 8.0;
        const subRetention8 = Math.pow(clamp(velocityRetention, 0.0, 1.0), 1.0 / 8.0);
        const subFollow8 = dragFollowAmount(velocityRetention, subDt8);

        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const restingRadius = sampleParticleSize(0);

        const bucketPaths = Array.from({ length: BUCKET_COUNT }, () => new Path2D());
        const activeDrawList = [];

        for (let i = 0, len = particles.length; i < len; i++) {
          const p = particles[i];

          let substepCount = 1;
          if (mouse.current.active && mouseTravelSq > 0.25) {
            const [cpx, cpy] = closestPointOnSegment(
              p.cellCenterX,
              p.cellCenterY,
              prevMX,
              prevMY,
              mX,
              mY
            );
            const pdx = p.cellCenterX - cpx;
            const pdy = p.cellCenterY - cpy;
            if (pdx * pdx + pdy * pdy < mouseRadiusSq) {
              substepCount = 8;
            }
          }

          const subDt = substepCount === 8 ? subDt8 : dt;
          const subRet = substepCount === 8 ? subRetention8 : velocityRetention;
          const directFollow = substepCount === 8 ? subFollow8 : singleFollow;

          for (let s = 0; s < substepCount; s++) {
            const sampleAmt = (s + 1) / substepCount;
            const sMX = prevMX + (mX - prevMX) * sampleAmt;
            const sMY = prevMY + (mY - prevMY) * sampleAmt;

            const toMouseX = p.cellCenterX - sMX;
            const toMouseY = p.cellCenterY - sMY;
            const distSq = toMouseX * toMouseX + toMouseY * toMouseY;

            let targetResponse = 0.0;
            let targetDispX = 0.0;
            let targetDispY = 0.0;

            if (mouse.current.active && distSq < mouseRadiusSq) {
              const dist = Math.sqrt(distSq);
              const falloff = shapeMouseFalloff(dist, mouseRadius, CONFIG.mouseShape);
              targetResponse = falloff;

              if (dist > 0.001) {
                const forceMag = (falloff * mouseStrength * radiusScale) / baseStiffness;
                targetDispX = (toMouseX / dist) * forceMag;
                targetDispY = (toMouseY / dist) * forceMag;
              }
            }

            const releaseDamp = targetResponse === 0.0 ? subRet * 0.88 : subRet;

            p.vx = (p.vx + (targetDispX - p.dispX) * stiffness * subDt * 60.0) * releaseDamp;
            p.vy = (p.vy + (targetDispY - p.dispY) * stiffness * subDt * 60.0) * releaseDamp;

            const springDispX = p.dispX + p.vx * subDt;
            const springDispY = p.dispY + p.vy * subDt;
            const draggedDispX = p.dispX + (targetDispX - p.dispX) * directFollow;
            const draggedDispY = p.dispY + (targetDispY - p.dispY) * directFollow;

            p.dispX = draggedDispX + (springDispX - draggedDispX) * springMix;
            p.dispY = draggedDispY + (springDispY - draggedDispY) * springMix;
            p.vx *= springMix;
            p.vy *= springMix;

            p.zVel += -stiffness * p.zDisp * subDt * 60.0;
            const zTarget = -simulatedMouseZOffset * targetResponse;
            const diff = zTarget - p.zDisp;
            p.zVel +=
              diff *
              8.0 *
              mouseStrengthScale *
              mouseSpringMultiplier *
              subDt *
              60.0 *
              targetResponse;
            p.zVel *= releaseDamp;
            const springZDisp = p.zDisp + p.zVel * subDt;

            p.responseVel =
              (p.responseVel + (targetResponse - p.response) * stiffness * subDt * 60.0) *
              releaseDamp;
            const springResponse = p.response + p.responseVel * subDt;

            const directZTarget = -simulatedMouseZOffset * targetResponse * mouseStrengthScale;
            const draggedZDisp = p.zDisp + (directZTarget - p.zDisp) * directFollow;
            const draggedResponse = p.response + (targetResponse - p.response) * directFollow;

            p.zDisp = draggedZDisp + (springZDisp - draggedZDisp) * springMix;
            p.response = draggedResponse + (springResponse - draggedResponse) * springMix;
            p.zVel *= springMix;
            p.responseVel *= springMix;

            if (targetResponse === 0.0) {
              if (p.response <= 0.001) {
                p.response = 0.0;
                if (p.responseVel < 0.0) p.responseVel = 0.0;
              }
              if (p.zDisp >= -0.05) {
                p.zDisp = 0.0;
                if (p.zVel > 0.0) p.zVel = 0.0;
              }
            }
          }

          const influence = clamp(p.response, 0.0, 1.0);
          const dispMag = Math.abs(p.dispX) + Math.abs(p.dispY);

          if (influence < 0.003 && dispMag < 0.25) {
            const path = bucketPaths[p.bucket];
            path.moveTo(p.restX + restingRadius, p.restY);
            path.arc(p.restX, p.restY, restingRadius, 0, Math.PI * 2);
          } else {
            const wx = p.restX - centerX + p.dispX;
            const wy = p.restY - centerY + p.dispY;

            const effectiveZ =
              p.zDisp - mouseZOffset * influence * mouseStrengthScale * 0.15;
            const denomXY = Math.max(perspective + effectiveZ, 1.0);

            const projX = (perspective * wx) / denomXY + centerX;
            const projY = (perspective * wy) / denomXY + centerY;

            const gradientRadius = sampleParticleSize(influence);
            const finalRadius = (gradientRadius * perspective) / denomXY;

            const colorT = p.baseGrad + (1.0 - p.baseGrad) * influence;

            activeDrawList.push({
              x: projX,
              y: projY,
              r: finalRadius,
              colorT,
              influence,
              depth: denomXY,
            });
          }
        }

        for (let b = 0; b < BUCKET_COUNT; b++) {
          ctx.fillStyle = inactiveBuckets[b];
          ctx.fill(bucketPaths[b]);
        }

        activeDrawList.sort((a, b) => b.depth - a.depth);

        for (let i = 0, len = activeDrawList.length; i < len; i++) {
          const ap = activeDrawList[i];
          const [r, g, b, a] = sampleParticleGradient(ap.colorT);
          const opacityScale =
            CONFIG.inactiveOpacityScale +
            (1.0 - CONFIG.inactiveOpacityScale) * ap.influence;
          const finalAlpha = a * opacityScale;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(ap.x, ap.y, ap.r, 0, Math.PI * 2);
          ctx.fill();
        }

        mouse.current.prevX = mX;
        mouse.current.prevY = mY;

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      const resizeObserver = new ResizeObserver(() => {});
      resizeObserver.observe(section);

      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    };

    const handleBreakpointChange = (e) => {
      if (e.matches) {
        if (!cleanupSimulation) cleanupSimulation = startSimulation();
      } else if (cleanupSimulation) {
        cleanupSimulation();
        cleanupSimulation = null;
      }
    };

    if (mediaQuery.matches) {
      cleanupSimulation = startSimulation();
    }

    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
      if (cleanupSimulation) cleanupSimulation();
    };
  }, []);

  return (
    <ParallaxSection
      id="partners"
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex min-h-dvh w-full flex-col justify-between bg-navy snap-start py-10 md:py-14 lg:overflow-hidden"
    >
      {/* Background Particles (Laptops & Monitors Only) */}
      <ParallaxLayer y={[-300, 300]} className="hidden lg:block pointer-events-none absolute inset-0 z-0">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </ParallaxLayer>

      <div className="relative z-10 flex w-full shrink-0 flex-col px-6 sm:px-12 lg:px-24 pointer-events-none">
        <h2 className="font-mono text-[clamp(2.5rem,3.5vw,7.5rem)] font-semibold leading-tight text-[#FCFCFC] pointer-events-auto">
          Partnerships
        </h2>

        <p className="font-inter text-[clamp(0.95rem,1.4vw,2.5rem)] font-semibold leading-6 text-[#FCFCFC] mt-2 md:mt-4 pointer-events-auto">
          Building high-stakes software alongside global leaders and research labs.
        </p>
      </div>

      {/* Partners */}
      <ParallaxLayer
        y={[80, -20]}
        className="relative z-10 flex flex-1 w-full items-center justify-center px-4 sm:px-12 lg:px-28 py-8 md:pb-10 md:pt-12 pointer-events-none"
      >
        <div className="flex w-full max-w-[140rem] mx-auto flex-row flex-wrap items-stretch justify-center gap-[clamp(1.25rem,2vw,3rem)] pointer-events-auto">
          {partners.map((partner, index) => {
            const flexWidthClass =
              index === 0
                ? 'w-full md:w-[46%] lg:w-[35%]'
                : index === 1
                  ? 'w-full md:w-[46%] lg:w-[61%]'
                  : index === 2
                    ? 'w-full md:w-[80%] lg:w-[42%]'
                    : 'w-full';

            return (
              <div
                key={partner.id}
                className={`partner-float group flex flex-col overflow-hidden rounded-[1.25rem] bg-lime transition-transform duration-500 hover:-translate-y-2 ${flexWidthClass}`}
                style={{
                  animationDelay: `${index * -0.7}s`,
                  animationDuration: `${3.5 + index * 0.4}s`,
                }}
              >
                <div className="flex w-full flex-1 items-center justify-center rounded-[1.25rem] bg-[#FCFCFC] px-[clamp(1.5rem,3vw,3rem)] py-6 gap-5 min-h-[clamp(7rem,14vw,20rem)]">
                  {partner.logos.map((logo) => (
                    <a
                      key={logo.name}
                      href={logo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 h-full items-center justify-center min-w-0"
                      aria-label={`Visit ${logo.name}`}
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="block h-auto w-full max-w-[90%] max-h-[clamp(4.5rem,10vw,16rem)] object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </a>
                  ))}
                </div>

                <div className="flex h-[clamp(3.25rem,4vw,5rem)] shrink-0 items-center justify-center px-4">
                  <span className="text-center font-['Fira_Code'] text-[clamp(0.875rem,1.2vw,1.75rem)] font-semibold leading-snug text-ink">
                    {partner.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ParallaxLayer>

      <div className="relative z-20 flex w-full shrink-0 justify-end px-6 sm:px-12 lg:px-24 pt-2 pb-4 md:pb-6 pointer-events-none">
        <Link
          href="#projects"
          className="flex items-center gap-2 whitespace-nowrap font-['Fira_Code'] text-[clamp(0.85rem,1.2vw,1.75rem)] font-semibold leading-5 text-[#FCFCFC] hover:underline pointer-events-auto"
        >
          <span>SCROLL TO PROJECTS</span>
          <HiArrowDown aria-hidden="true" className="w-[1em] h-[1em]" />
        </Link>
      </div>
    </ParallaxSection>
  );
}