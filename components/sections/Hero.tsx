"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import ParticleField from "@/components/interactive/ParticleField";

const stagger = 0.3;

function anim(i: number, prefersReducedMotion: boolean | null) {
  if (prefersReducedMotion) {
    return { initial: undefined, animate: undefined, transition: undefined };
  }
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * stagger },
  };
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToOverview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("overview");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center",
        "bg-ink overflow-hidden noise-overlay cross-pattern"
      )}
    >
      {/* Hero background image, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/hero-jesus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.08,
          mixBlendMode: "luminosity",
        }}
      />
      {/* Darkening overlay to keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 0%, rgba(26,20,16,0.7) 100%)",
        }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Radial gold glow, centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-24 sm:pt-12 pb-20 sm:pb-8">
        {/* Decorative ornament line with star */}
        <motion.div
          className="w-48 sm:w-80 mb-4 sm:mb-8 flex items-center"
          {...anim(0, prefersReducedMotion)}
        >
          <div className="flex-1 gold-line" />
          <svg
            className="mx-3 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
              fill="#C9A84C"
              opacity="0.7"
            />
          </svg>
          <div className="flex-1 gold-line" />
        </motion.div>

        {/* Subtitle above heading */}
        <motion.p
          className="uppercase tracking-[0.25em] text-gold-light font-sans text-xs sm:text-sm mb-3 sm:mb-6"
          {...anim(1, prefersReducedMotion)}
        >
          A Guide to Scripture
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-serif text-display-xl font-light text-cream mb-4 sm:mb-8"
          {...anim(2, prefersReducedMotion)}
        >
          The{" "}
          <em className="text-gold italic">Living</em>{" "}
          Word
        </motion.h1>

        {/* Quote */}
        <motion.blockquote
          className="font-serif italic text-gold-light/70 text-base sm:text-xl max-w-lg mb-8 sm:mb-12"
          {...anim(3, prefersReducedMotion)}
        >
          &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
          <footer className="mt-2 text-sm not-italic text-gold-light/50">
            Psalm 119:105
          </footer>
        </motion.blockquote>

        {/* CTA button */}
        <motion.div {...anim(4, prefersReducedMotion)}>
          <a
            href="#overview"
            onClick={handleScrollToOverview}
            className={cn(
              "inline-block rounded-full border border-gold text-gold",
              "px-8 py-3 font-sans text-sm tracking-wide",
              "transition-colors duration-300",
              "hover:bg-gold hover:text-ink",
              "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            )}
          >
            Begin the journey
          </a>
        </motion.div>

        {/* Seasons quick-access. "What are you going through?" */}
        <motion.div
          className="mt-10 sm:mt-16 flex flex-col items-center"
          {...anim(5, prefersReducedMotion)}
        >
          <p className="text-cream/40 font-sans text-xs uppercase tracking-[0.2em] mb-4">
            What are you going through?
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-lg">
            {[
              { label: "Anxious", filter: "emotions" },
              { label: "Grieving", filter: "life-trials" },
              { label: "Doubting", filter: "spiritual" },
              { label: "Tempted", filter: "sin" },
              { label: "Lost", filter: "identity" },
              { label: "Lonely", filter: "emotions" },
              { label: "Struggling", filter: "relationships" },
            ].map(({ label, filter }) => (
              <a
                key={label}
                href={`#seasons?filter=${filter}`}
                onClick={(e) => {
                  e.preventDefault();
                  // Set filter via custom event, then scroll
                  window.dispatchEvent(
                    new CustomEvent("set-season-filter", { detail: filter })
                  );
                  setTimeout(() => {
                    document
                      .getElementById("seasons")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-sans tracking-wide",
                  "border border-cream/10 text-cream/50",
                  "transition-all duration-300",
                  "hover:border-gold/60 hover:text-gold hover:bg-gold/5",
                  (label === "Lonely" || label === "Struggling") && "hidden sm:inline-block"
                )}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Group Study CTA */}
        <motion.div
          className="mt-8 flex flex-col items-center"
          {...anim(6, prefersReducedMotion)}
        >
          <a
            href="#group-study"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("group-study")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "group flex items-center gap-3 px-4 sm:px-6 py-3 rounded-2xl",
              "bg-cream/[0.03] border border-cream/[0.06]",
              "transition-all duration-300",
              "hover:bg-gold/[0.06] hover:border-gold/20"
            )}
          >
            <span className="text-gold-light/40 text-sm font-serif italic">+</span>
            <span className="text-cream/40 font-sans text-xs tracking-wide group-hover:text-cream/60 transition-colors">
              Reading with others? Try our <span className="text-gold/70 font-medium">Group Study Guide</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        {...anim(7, prefersReducedMotion)}
      >
        <svg
          className="w-6 h-6 text-gold-light/50 animate-bob motion-reduce:animate-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.div>
    </section>
  );
}
