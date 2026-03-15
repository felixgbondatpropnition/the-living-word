"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Tips data
// ---------------------------------------------------------------------------

interface Tip {
  title: string;
  description: string;
}

const TIPS: Tip[] = [
  {
    title: "Set a regular time",
    description:
      "Anchor your reading to a daily habit. Morning, lunch, or evening. Consistency matters more than duration.",
  },
  {
    title: "Pray first",
    description:
      "Before you read, pause. Ask God to open your eyes to what he wants to show you. Even a one-sentence prayer changes the posture of your heart.",
  },
  {
    title: "Read with others",
    description:
      "Join a group, text a friend about what you\u2019re reading, or follow along with a community reading plan. The Bible was meant to be shared.",
  },
  {
    title: "Use a physical Bible",
    description:
      "Screens are convenient, but paper reduces distraction. Underline, highlight, write in the margins. Make it yours.",
  },
  {
    title: "Don\u2019t skip confusion",
    description:
      "When something doesn\u2019t make sense, sit with it. Look it up. Ask someone. Confusion is the doorway to deeper understanding.",
  },
];

// ---------------------------------------------------------------------------
// Tips section
// ---------------------------------------------------------------------------

export default function Tips() {
  return (
    <section id="tips" className="bg-warm-white py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-widest text-gold-dark font-sans text-sm mb-4"
          >
            Going deeper
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg text-ink"
          >
            Tips for deeper reading
          </motion.h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column. practical tips */}
          <div className="space-y-5">
            {TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
                className={cn(
                  "bg-parchment/50 border border-gold/10 rounded-xl p-6",
                  "card-hover"
                )}
              >
                {/* Number + title */}
                <div className="flex items-start gap-4 mb-2">
                  <span className="font-serif text-2xl text-gold/30 leading-none mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-ink">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-light leading-relaxed ml-11">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right column. feature cards */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Quote card. parchment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-parchment border border-gold/20 rounded-xl p-8"
            >
              <div
                className="w-8 h-px bg-gold mb-6"
                aria-hidden="true"
              />
              <blockquote className="font-serif text-xl text-ink italic leading-relaxed mb-4">
                &ldquo;All Scripture is God-breathed and is useful for teaching,
                rebuking, correcting and training in righteousness.&rdquo;
              </blockquote>
              <p className="font-sans text-sm text-gold-dark tracking-wide">
                2 Timothy 3:16
              </p>
            </motion.div>

            {/* Verse highlight card. dark */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="bg-ink text-cream rounded-xl p-8"
            >
              <div
                className="w-8 h-px bg-gold mb-6"
                aria-hidden="true"
              />
              <blockquote className="font-serif text-xl italic leading-relaxed mb-4">
                &ldquo;For the word of God is alive and active. Sharper than any
                double-edged sword, it penetrates even to dividing soul and
                spirit, joints and marrow; it judges the thoughts and attitudes
                of the heart.&rdquo;
              </blockquote>
              <p className="font-sans text-sm text-gold tracking-wide">
                Hebrews 4:12
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
