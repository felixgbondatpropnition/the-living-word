"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

// ---------------------------------------------------------------------------
// Footer section
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="bg-ink py-20 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        {/* Gold ornamental line */}
        <motion.div
          variants={fadeUp}
          className="gold-line w-full max-w-xs mb-10"
          aria-hidden="true"
        />

        {/* Decorative cross/star SVG */}
        <motion.div variants={fadeUp} className="mb-8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 0L13.8 10.2L24 12L13.8 13.8L12 24L10.2 13.8L0 12L10.2 10.2L12 0Z"
              fill="#C9A84C"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Site title */}
        <motion.h2
          variants={fadeUp}
          className="font-serif text-2xl text-cream mb-2"
        >
          The Living Word
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-gold-light/60 text-sm uppercase tracking-widest mb-12"
        >
          A guide to Scripture
        </motion.p>

        {/* Closing verse */}
        <motion.blockquote
          variants={fadeUp}
          className="font-serif italic text-cream/40 text-lg max-w-lg mb-12 leading-relaxed"
        >
          &ldquo;Heaven and earth will pass away, but my words will never pass
          away.&rdquo;
          <footer className="mt-2 text-sm not-italic text-cream/30">
            Matthew 24:35
          </footer>
        </motion.blockquote>

        {/* Copyright */}
        <motion.p
          variants={fadeUp}
          className="text-cream/30 text-xs"
        >
          Made with love for the glory of God
        </motion.p>
      </motion.div>
    </footer>
  );
}
