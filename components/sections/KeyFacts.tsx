"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CountUpNumber. reusable animated counter
// ---------------------------------------------------------------------------

interface CountUpNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  formatWithComma?: boolean;
  duration?: number;
  className?: string;
}

function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  formatWithComma = false,
  duration = 2,
  className,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const motionVal = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        const rounded = Math.round(latest);
        if (formatWithComma) {
          setDisplayValue(rounded.toLocaleString("en-US"));
        } else {
          setDisplayValue(String(rounded));
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, formatWithComma, motionVal]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------

interface Stat {
  target: number;
  suffix?: string;
  formatWithComma?: boolean;
  label: string;
}

const STATS: Stat[] = [
  { target: 73, label: "Books" },
  { target: 40, suffix: "+", label: "Authors" },
  { target: 1500, formatWithComma: true, label: "Years Written" },
  { target: 3, label: "Languages" },
  { target: 31102, formatWithComma: true, label: "Verses" },
];

// ---------------------------------------------------------------------------
// KeyFacts component
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function KeyFacts() {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      {/* Subtle radial gradient accents */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none hidden sm:block"
        style={{
          background:
            "radial-gradient(circle, var(--gold-light) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none hidden sm:block"
        style={{
          background:
            "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gold ornamental line. top */}
        <div className="gold-line mx-auto mb-12 max-w-xs" aria-hidden="true" />

        <div
          className={cn(
            "grid gap-4 sm:gap-8 lg:gap-10",
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
            "justify-items-center text-center"
          )}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2"
            >
              <CountUpNumber
                target={stat.target}
                suffix={stat.suffix}
                formatWithComma={stat.formatWithComma}
                className="font-serif text-display-md font-light text-ink"
              />
              <span className="font-sans text-xs uppercase tracking-widest text-ink-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Gold ornamental line. bottom */}
        <div className="gold-line mx-auto mt-12 max-w-xs" aria-hidden="true" />
      </div>
    </section>
  );
}
