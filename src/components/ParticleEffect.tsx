import React, { useEffect, useRef } from 'react';

type ParticleColor = {
  rgb: [number, number, number];
  hex: string;
};

type Particle = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  color: ParticleColor;
};

type TrailPoint = {
  x: number;
  y: number;
  age: number;
};

type Burst = {
  x: number;
  y: number;
  age: number;
};

// Tune these values to adjust density, movement, sizing, glow, and interactions.
export const PARTICLE_CONFIG = {
  desktopDensity: 1 / 14500,
  mobileDensity: 1 / 34000,
  maxParticles: 120,
  maxMobileParticles: 36,
  interactionRadius: 155,
  connectionDistance: 122,
  speed: 1,
  minSize: 0.8,
  maxSize: 2,
  minOpacity: 0.2,
  maxOpacity: 0.52,
  trailLifetime: 560,
  burstLifetime: 680,
  colors: {
    dark: [
      { rgb: [232, 224, 212], hex: '#e8e0d4' },
      { rgb: [179, 38, 43], hex: '#b3262b' },
    ] as ParticleColor[],
    light: [
      { rgb: [86, 75, 68], hex: '#564b44' },
      { rgb: [143, 48, 50], hex: '#8f3032' },
    ] as ParticleColor[],
  },
};

interface ParticleEffectProps {
  isLight: boolean;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({ isLight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const colors = isLight ? PARTICLE_CONFIG.colors.light : PARTICLE_CONFIG.colors.dark;
    const particles: Particle[] = [];
    const trail: TrailPoint[] = [];
    const bursts: Burst[] = [];
    const pointer = { x: 0, y: 0, speed: 0, active: false };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let previousTime = 0;
    let elapsed = 0;
    let running = false;

    const createParticle = (): Particle => {
      const color = colors[Math.random() < 0.28 ? 1 : 0];
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        previousX: x,
        previousY: y,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize),
        opacity: PARTICLE_CONFIG.minOpacity + Math.random() * (PARTICLE_CONFIG.maxOpacity - PARTICLE_CONFIG.minOpacity),
        phase: Math.random() * Math.PI * 2,
        color,
      };
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const isFinePointer = finePointer.matches;
      const density = isFinePointer ? PARTICLE_CONFIG.desktopDensity : PARTICLE_CONFIG.mobileDensity;
      const maximum = isFinePointer ? PARTICLE_CONFIG.maxParticles : PARTICLE_CONFIG.maxMobileParticles;
      const count = Math.min(maximum, Math.max(isFinePointer ? 24 : 10, Math.round(width * height * density)));

      while (particles.length > count) particles.pop();
      while (particles.length < count) particles.push(createParticle());
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.speed = Math.min(12, Math.hypot(event.movementX, event.movementY));
      pointer.active = true;
      trail.push({ x: pointer.x, y: pointer.y, age: 0 });
      if (trail.length > 18) trail.shift();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.speed = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === 'touch' || event.button !== 0) return;
      const burst = { x: event.clientX, y: event.clientY, age: 0 };
      bursts.push(burst);
      if (bursts.length > 4) bursts.shift();

      for (const particle of particles) {
        const dx = particle.x - burst.x;
        const dy = particle.y - burst.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 120 || distance === 0) continue;
        const force = (1 - distance / 120) * 0.72;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }
    };

    const animate = (time: number) => {
      if (!running) return;
      if (!finePointer.matches && previousTime && time - previousTime < 32) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }
      const delta = previousTime ? Math.min((time - previousTime) / 16.67, 2) : 1;
      previousTime = time;
      elapsed += delta;
      context.clearRect(0, 0, width, height);

      const radius = PARTICLE_CONFIG.interactionRadius;
      const radiusSquared = radius * radius;
      const linkDistanceSquared = PARTICLE_CONFIG.connectionDistance ** 2;
      pointer.speed *= Math.pow(0.88, delta);

      for (const particle of particles) {
        particle.previousX = particle.x;
        particle.previousY = particle.y;

        particle.vx += Math.sin(elapsed * 0.012 + particle.phase) * 0.002 * delta;
        particle.vy += Math.cos(elapsed * 0.01 + particle.phase) * 0.002 * delta;

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radiusSquared && distanceSquared > 0) {
            const distance = Math.sqrt(distanceSquared);
            const influence = (1 - distance / radius) ** 2;
            const direction = pointer.speed > 1.1 ? 1 : -1;
            const force = influence * (pointer.speed > 1.1 ? 0.16 : 0.035) * delta;
            particle.vx += (dx / distance) * force * direction;
            particle.vy += (dy / distance) * force * direction;
          }
        }

        particle.vx *= Math.pow(0.986, delta);
        particle.vy *= Math.pow(0.986, delta);
        particle.x += particle.vx * PARTICLE_CONFIG.speed * delta;
        particle.y += particle.vy * PARTICLE_CONFIG.speed * delta;

        if (particle.x < -8) particle.x = width + 8;
        else if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        else if (particle.y > height + 8) particle.y = -8;
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const neighbor = particles[j];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= linkDistanceSquared) continue;

          const distance = Math.sqrt(distanceSquared);
          let cursorBoost = 1;
          if (pointer.active) {
            const midpointX = (particle.x + neighbor.x) / 2;
            const midpointY = (particle.y + neighbor.y) / 2;
            const cursorDistance = Math.hypot(midpointX - pointer.x, midpointY - pointer.y);
            cursorBoost += Math.max(0, 1 - cursorDistance / radius) * 0.7;
          }
          const opacity = ((1 - distance / PARTICLE_CONFIG.connectionDistance) * 0.2 * cursorBoost);
          context.strokeStyle = `rgba(${particle.color.rgb.join(',')},${opacity})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      }

      for (const particle of particles) {
        const dx = particle.x - particle.previousX;
        const dy = particle.y - particle.previousY;
        context.strokeStyle = `rgba(${particle.color.rgb.join(',')},${particle.opacity * 0.32})`;
        context.lineWidth = particle.size * 0.8;
        context.beginPath();
        context.moveTo(particle.previousX, particle.previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();

        context.fillStyle = `rgba(${particle.color.rgb.join(',')},${particle.opacity})`;
        context.shadowColor = particle.color.hex;
        context.shadowBlur = particle.size > 1.3 ? 10 : 5;
        context.beginPath();
        context.arc(particle.x + dx * 0.15, particle.y + dy * 0.15, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;

      for (let i = trail.length - 1; i >= 0; i -= 1) {
        const point = trail[i];
        point.age += delta * 16.67;
        const opacity = Math.max(0, 1 - point.age / PARTICLE_CONFIG.trailLifetime);
        if (opacity === 0) {
          trail.splice(i, 1);
          continue;
        }

        if (i > 0) {
          const previousPoint = trail[i - 1];
          const lineOpacity = opacity * Math.max(0, 1 - previousPoint.age / PARTICLE_CONFIG.trailLifetime);
          context.strokeStyle = `rgba(${isLight ? '143,48,50' : '179,38,43'},${lineOpacity * 0.2})`;
          context.lineWidth = 1.2;
          context.beginPath();
          context.moveTo(previousPoint.x, previousPoint.y);
          context.lineTo(point.x, point.y);
          context.stroke();
        }
        context.fillStyle = `rgba(${isLight ? '143,48,50' : '179,38,43'},${opacity * 0.42})`;
        context.beginPath();
        context.arc(point.x, point.y, 1.1, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const burst = bursts[i];
        burst.age += delta * 16.67;
        const progress = Math.min(burst.age / PARTICLE_CONFIG.burstLifetime, 1);
        if (progress >= 1) {
          bursts.splice(i, 1);
          continue;
        }

        const easedProgress = 1 - (1 - progress) ** 3;
        context.strokeStyle = `rgba(${isLight ? '143,48,50' : '179,38,43'},${(1 - progress) * 0.32})`;
        context.lineWidth = 1.3;
        context.beginPath();
        context.arc(burst.x, burst.y, easedProgress * 116, 0, Math.PI * 2);
        context.stroke();
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (running || reducedMotion.matches || document.hidden) return;
      running = true;
      canvas.style.visibility = 'visible';
      previousTime = 0;
      frameId = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      context.clearRect(0, 0, width, height);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop();
        canvas.style.visibility = 'hidden';
      } else {
        resize();
        start();
      }
    };

    resize();
    canvas.style.visibility = reducedMotion.matches ? 'hidden' : 'visible';
    if (!reducedMotion.matches) start();

    window.addEventListener('resize', resize, { passive: true });
    finePointer.addEventListener('change', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      finePointer.removeEventListener('change', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
};
