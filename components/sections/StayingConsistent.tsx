"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
// Myths vs Truths data
// ---------------------------------------------------------------------------

interface MythTruth {
  myth: string;
  truth: string;
}

const MYTHS_TRUTHS: MythTruth[] = [
  {
    myth: "I have to read every day or I\u2019ve failed",
    truth:
      "Consistency is rhythm, not perfection. Missing a day doesn\u2019t reset anything. Just come back.",
  },
  {
    myth: "I need to understand everything I read",
    truth:
      "Confusion means you\u2019re being honest. Even theologians wrestle with difficult passages. That\u2019s the point.",
  },
  {
    myth: "I should start at Genesis chapter 1",
    truth:
      "Start anywhere. Mark, Psalms, John, wherever pulls you in. There\u2019s no wrong door.",
  },
  {
    myth: "Real Christians read for an hour a day",
    truth:
      "Five verses read with attention are worth more than five chapters on autopilot.",
  },
  {
    myth: "The Bible is too big and complicated for me",
    truth:
      "God meets you where you are. You don\u2019t need a theology degree. You just need to show up.",
  },
];

// ---------------------------------------------------------------------------
// MythTruthCard. interactive reveal card
// ---------------------------------------------------------------------------

function MythTruthCard({
  item,
  index,
}: {
  item: MythTruth;
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 rounded-xl overflow-hidden border border-gold/10 card-hover mb-2 md:mb-0"
    >
      {/* Myth side */}
      <button
        onClick={() => setRevealed(!revealed)}
        className={cn(
          "text-left p-6 transition-colors duration-300 cursor-pointer",
          "bg-burgundy/5 border-l-4 border-l-burgundy/40",
          "md:border-l-4 md:border-b-0",
          !revealed && "border-b border-b-gold/10 md:border-b-0 md:border-r md:border-r-gold/10"
        )}
      >
        <span className="inline-block text-xs uppercase tracking-widest text-burgundy/70 font-sans mb-2">
          What you might believe
        </span>
        <p className="font-serif text-ink text-lg leading-snug">
          &ldquo;{item.myth}&rdquo;
        </p>
        <span className="inline-block mt-3 text-xs text-burgundy/50 md:hidden">
          {revealed ? "Tap to hide" : "Tap to reveal truth"}
        </span>
      </button>

      {/* Truth side. always visible on desktop, animated on mobile */}
      <div className="hidden md:block p-6 bg-sage/5 border-l-4 border-l-sage/40">
        <span className="inline-block text-xs uppercase tracking-widest text-sage/70 font-sans mb-2">
          What&rsquo;s actually true
        </span>
        <p className="font-serif text-ink text-lg leading-snug">
          &ldquo;{item.truth}&rdquo;
        </p>
      </div>

      {/* Mobile reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="p-6 bg-sage/5 border-l-4 border-l-sage/40 border-t border-t-gold/10">
              <span className="inline-block text-xs uppercase tracking-widest text-sage/70 font-sans mb-2">
                What&rsquo;s actually true
              </span>
              <p className="font-serif text-ink text-lg leading-snug">
                &ldquo;{item.truth}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Building a rhythm data
// ---------------------------------------------------------------------------

interface RhythmCard {
  time: string;
  title: string;
  description: string;
  verse: string;
  reference: string;
}

const RHYTHM_CARDS: RhythmCard[] = [
  {
    time: "2 min",
    title: "One-verse morning",
    description:
      "Start your day with a single verse. Read it. Sit with it. Let it set the tone.",
    verse:
      "Your word is a lamp for my feet, a light on my path.",
    reference: "Psalm 119:105",
  },
  {
    time: "5 min",
    title: "Psalm a day",
    description:
      "150 psalms. Five months of raw, honest prayers that mirror every human emotion.",
    verse:
      "As the deer pants for streams of water, so my soul pants for you, my God.",
    reference: "Psalm 42:1",
  },
  {
    time: "10 min",
    title: "Chapter-a-day walk",
    description:
      "One chapter per day. No pressure to analyse, just let the story unfold.",
    verse:
      "I have hidden your word in my heart that I might not sin against you.",
    reference: "Psalm 119:11",
  },
  {
    time: "15 min",
    title: "Journal method",
    description:
      "Read a passage, then write one thought, one question, and one prayer.",
    verse:
      "But the seed falling on good soil refers to someone who hears the word and understands it.",
    reference: "Matthew 13:23",
  },
  {
    time: "20 min",
    title: "Listen-along",
    description:
      "Play an audio Bible while following along. Hearing it read aloud changes everything.",
    verse:
      "Consequently, faith comes from hearing the message.",
    reference: "Romans 10:17",
  },
  {
    time: "Any time",
    title: "Anchor habit",
    description:
      "Attach Bible reading to something you already do: after coffee, during lunch, before sleep.",
    verse: "Be still, and know that I am God.",
    reference: "Psalm 46:10",
  },
];

// ---------------------------------------------------------------------------
// Falling off the wagon data
// ---------------------------------------------------------------------------

interface WagonCard {
  title: string;
  description: string;
}

const WAGON_CARDS: WagonCard[] = [
  {
    title: "Don\u2019t restart, just resume",
    description:
      "You didn\u2019t fail. Pick up wherever you left off. There\u2019s no penalty for a pause.",
  },
  {
    title: "Drop the guilt immediately",
    description:
      "Guilt is not from God. He\u2019s glad you\u2019re back. That\u2019s all that matters.",
  },
  {
    title: "Make it easier, not harder",
    description:
      "If 20 minutes felt too much, try 5. Lower the bar until it\u2019s impossible to fail.",
  },
  {
    title: "Tell someone you\u2019re coming back",
    description:
      "Text a friend: \u2018I\u2019m picking up my Bible again.\u2019 Accountability is powerful.",
  },
  {
    title: "Remember why you started",
    description:
      "Not because you had to, but because something in you wanted to. That desire hasn\u2019t gone.",
  },
  {
    title: "Change the format",
    description:
      "Try audio. Try a different translation. Try reading outside. Variety reignites curiosity.",
  },
];

// ---------------------------------------------------------------------------
// StayingConsistent section
// ---------------------------------------------------------------------------

export default function StayingConsistent() {
  return (
    <section id="staying-consistent" className="bg-parchment py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* ----------------------------------------------------------------- */}
        {/* Opening quote */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.blockquote
            variants={fadeUp}
            className="font-serif italic text-display-sm text-ink mb-10 leading-relaxed"
          >
            &ldquo;This isn&rsquo;t a duty to perform. It isn&rsquo;t a box to
            tick. Reading the Bible is simply spending time with someone who
            loves you.&rdquo;
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            className="text-ink-light leading-relaxed mb-6"
          >
            If that last sentence surprises you, stay with it. The Bible
            isn&rsquo;t a textbook to master or a checklist to complete.
            It&rsquo;s a conversation, one that&rsquo;s been going
            for thousands of years, and you&rsquo;re invited to join it
            wherever you are, whenever you&rsquo;re ready.
          </motion.p>

          <motion.p variants={fadeUp} className="text-ink-light leading-relaxed">
            There is no &lsquo;behind&rsquo;. There is no catching up. God
            isn&rsquo;t keeping score of your reading streak. He simply loves to
            speak to you through his word. So take a breath, let go of any
            guilt, and begin.
          </motion.p>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Myths vs Truths */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-widest text-gold-dark font-sans text-sm mb-4">
              Letting go of pressure
            </p>
            <h2 className="font-serif text-display-lg text-ink">
              Myths &amp; truths
            </h2>
          </motion.div>

          <div className="space-y-4">
            {MYTHS_TRUTHS.map((item, i) => (
              <MythTruthCard key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Building a rhythm */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-widest text-gold-dark font-sans text-sm mb-4">
              Find your pace
            </p>
            <h2 className="font-serif text-display-lg text-ink">
              Building a rhythm
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RHYTHM_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
                className={cn(
                  "bg-warm-white rounded-xl p-6 border border-gold/10",
                  "card-hover flex flex-col"
                )}
              >
                {/* Time badge */}
                <span className="inline-block self-start bg-gold/15 text-gold-dark text-xs font-sans px-3 py-1 rounded-full mb-4">
                  {card.time}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-ink mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-ink-light leading-relaxed mb-4 flex-1">
                  {card.description}
                </p>

                {/* Key verse */}
                <p className="text-sm italic text-sage leading-relaxed border-t border-gold/10 pt-4">
                  &ldquo;{card.verse}&rdquo;
                  <span className="block not-italic text-xs text-sage/70 mt-1">
                    {card.reference}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* When you fall off the wagon */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="uppercase tracking-widest text-gold-dark font-sans text-sm mb-4">
              Grace, not guilt
            </p>
            <h2 className="font-serif text-display-lg text-ink">
              When you fall off the wagon
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WAGON_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.08,
                }}
                className="bg-warm-white border border-gold/10 rounded-xl p-5 card-hover"
              >
                <h3 className="font-serif text-lg font-medium text-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Closing word */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Gold ornamental line */}
          <motion.div
            variants={fadeUp}
            className="gold-line mx-auto mb-10 max-w-xs"
            aria-hidden="true"
          />

          <motion.blockquote
            variants={fadeUp}
            className="font-serif italic text-display-sm text-ink mb-4 leading-relaxed"
          >
            &ldquo;Come to me, all you who are weary and burdened, and I will
            give you rest.&rdquo;
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            className="text-sm text-gold-dark mb-10"
          >
            Matthew 11:28
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-ink-light leading-relaxed text-lg"
          >
            The invitation never expires. Whether this is your first time
            opening a Bible or your ten thousandth, God&rsquo;s word is alive,
            and it&rsquo;s for you, today, exactly as you are.
          </motion.p>

          {/* Gold ornamental line */}
          <motion.div
            variants={fadeUp}
            className="gold-line mx-auto mt-10 max-w-xs"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
