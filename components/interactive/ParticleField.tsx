"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: 1 + Math.random() * 3,
      left: Math.random() * 100,
      opacity: 0.2 + Math.random() * 0.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 14,
    });
  }
  return particles;
}

export default function ParticleField() {
  const particles = useMemo(() => generateParticles(40), []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-up motion-reduce:animate-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: 0,
            backgroundColor: "#C9A84C",
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
