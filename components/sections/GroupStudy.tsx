"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Principle {
  number: number;
  name: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: 1,
    name: "Create safety, not performance",
    description:
      "The best groups aren\u2019t impressive. They\u2019re honest. Create space where questions are welcome and vulnerability is safe.",
  },
  {
    number: 2,
    name: "Read the text together, out loud",
    description:
      "There\u2019s power in hearing Scripture spoken aloud. Read it slowly, together, and let the words fill the room.",
  },
  {
    number: 3,
    name: "Ask open questions, not quiz questions",
    description:
      "Instead of \u2018What does verse 3 mean?\u2019, try \u2018What stands out to you?\u2019 Open questions invite conversation, not performance.",
  },
  {
    number: 4,
    name: "Let silence do its work",
    description:
      "Don\u2019t rush to fill quiet moments. Silence after a question means people are thinking. That\u2019s exactly what you want.",
  },
  {
    number: 5,
    name: "Context before application",
    description:
      "Before asking \u2018What does this mean for us?\u2019, ask \u2018What did this mean for them?\u2019 Understanding context prevents misapplication.",
  },
  {
    number: 6,
    name: "End with action, not just discussion",
    description:
      "Good Bible study changes something. End each session by asking: \u2018What will you do differently this week?\u2019",
  },
];

interface TimelineStep {
  time: string;
  title: string;
  description: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: "0\u20135 min",
    title: "Welcome & opening prayer",
    description:
      "Settle in. Pray briefly. Ask God to speak through his word. Keep it natural, not formal.",
  },
  {
    time: "5\u201310 min",
    title: "Review & reconnect",
    description:
      "Check in on last week\u2019s action step. How did it go? Celebrate small wins. Build accountability gently.",
  },
  {
    time: "10\u201315 min",
    title: "Read the passage aloud",
    description:
      "Read it twice, perhaps from two different translations. Let someone volunteer; never force anyone.",
  },
  {
    time: "15\u201320 min",
    title: "Observation: \u2018What does it say?\u2019",
    description:
      "Just the facts. What do you notice? Repeated words? Surprising details? Who\u2019s speaking? What\u2019s happening?",
  },
  {
    time: "20\u201335 min",
    title: "Interpretation: \u2018What does it mean?\u2019",
    description:
      "This is the heart of the study. What was the author saying to the original audience? What\u2019s the main point?",
  },
  {
    time: "35\u201350 min",
    title: "Application: \u2018What do we do?\u2019",
    description:
      "Make it personal. Not \u2018What should people do?\u2019 but \u2018What will I do?\u2019 Specific and practical.",
  },
  {
    time: "50\u201355 min",
    title: "Action step",
    description:
      "Each person states one concrete thing they\u2019ll do before next week. Write it down. This is where change happens.",
  },
  {
    time: "55\u201360 min",
    title: "Prayer & close",
    description:
      "Pray for each other\u2019s action steps. Keep it simple. Close with gratitude.",
  },
];

interface Framework {
  name: string;
  subtitle: string;
  description: string;
  steps: { label: string; detail: string }[];
  tip: string;
  bestFor: string;
}

const FRAMEWORKS: Framework[] = [
  {
    name: "SOAP Method",
    subtitle: "Scripture, Observation, Application, Prayer",
    description:
      "A simple, proven framework that works for individuals and groups alike. Read it, observe it, apply it, pray it. Each step builds on the last, taking you from the page to real life.",
    steps: [
      { label: "S - Scripture", detail: "Choose a passage and read it slowly, more than once. Write out the verse or passage that stands out to you most. Don't rush this. Let the words settle." },
      { label: "O - Observation", detail: "What do you notice? Who is speaking? What's the context? Are there repeated words, contrasts, or commands? Write down everything you see before you interpret." },
      { label: "A - Application", detail: "How does this apply to your life right now? Be specific. Not 'I should be more loving' but 'I'll apologise to my sister this week.' Real application changes real behaviour." },
      { label: "P - Prayer", detail: "Respond to God about what you've read. Thank Him, ask for help to apply it, confess where you've fallen short. Let the passage shape your prayer." },
    ],
    tip: "Give each step 5 minutes in a group setting. The observation step is where most groups rush, so slow down there.",
    bestFor: "New groups, personal devotions, anyone wanting a structured but simple approach",
  },
  {
    name: "Swedish Method",
    subtitle: "Light bulb, Question mark, Arrow",
    description:
      "Three symbols, three responses. Originally developed in Swedish Bible study circles, this method is brilliantly simple and works with any group, any passage, any experience level.",
    steps: [
      { label: "Light Bulb - New Insight", detail: "What's something new you noticed? Something that surprised you, caught your attention, or clicked for the first time? Share it with the group. There are no wrong answers here." },
      { label: "Question Mark - Confusion", detail: "What don't you understand? What's confusing, troubling, or hard to accept? Be honest. The best discussions come from genuine questions, not pretending to have it all figured out." },
      { label: "Arrow - Action", detail: "What will you do about it? The arrow points forward into your life. Based on what you've read, what's one thing you'll do differently this week? Make it concrete and accountable." },
    ],
    tip: "Hand out three cards (or sticky notes) with the symbols. Have everyone write their responses before sharing. This gives quieter people time to think and stops the group being dominated by fast talkers.",
    bestFor: "Mixed groups, first-time Bible readers, groups where people are shy about speaking up",
  },
  {
    name: "Three Worlds",
    subtitle: "Behind the text, In the text, In front of the text",
    description:
      "This method moves naturally from 'then' to 'now'. First you explore what was happening when this was written, then you look at the text itself, then you bring it into your own world. It prevents the common mistake of jumping straight to 'what this means for me' without understanding what it meant for them.",
    steps: [
      { label: "Behind the Text - Historical Context", detail: "Who wrote this, to whom, and why? What was happening historically, culturally, and politically? What problems or questions were the original readers facing? A good study Bible or commentary helps here." },
      { label: "In the Text - Literary Analysis", detail: "What type of writing is this (narrative, poetry, letter, prophecy)? What's the structure? Key words? Repeated themes? How does the argument flow? Read it like you'd study a great piece of literature, because it is one." },
      { label: "In Front of the Text - Personal Response", detail: "Now bring it into your world. How does this text confront, comfort, challenge, or change you? What does it reveal about God that you need to hear today? How will you respond?" },
    ],
    tip: "Spend about 40% of your time behind the text, 30% in the text, and 30% in front of it. Most groups skip the first two and jump straight to personal application, which leads to misreading.",
    bestFor: "Mature groups, theology students, anyone who wants to go deeper, avoiding proof-texting",
  },
  {
    name: "Five Great Questions",
    subtitle: "God, People, Commands, Sins & Promises, Jesus",
    description:
      "Five questions that cover everything. You can ask them of any passage in the Bible and you'll always find something. This is the Swiss Army knife of Bible study methods. Simple enough for beginners, rich enough for scholars.",
    steps: [
      { label: "What does this tell us about God?", detail: "His character, His actions, His heart. Is He shown as patient, just, loving, angry, sovereign? Every passage reveals something about who God is. Start here and you'll never go wrong." },
      { label: "What does this tell us about people?", detail: "Human nature, our needs, our failures, our potential. How are people portrayed? What does this say about the human condition? You'll often see yourself in the characters." },
      { label: "What commands or instructions are here?", detail: "Is there something to obey, avoid, or practice? Not every passage has explicit commands, but most have implied ones. Look for verbs and imperatives." },
      { label: "What sins to avoid or promises to claim?", detail: "Are there warnings? Examples of what not to do? And are there promises from God that you can hold onto? Write the promises down. You'll need them on hard days." },
      { label: "How does this point to Jesus?", detail: "Every part of the Bible points to Jesus in some way. In the Old Testament, look for types, shadows, and prophecies. In the New Testament, look for His teaching, His character, and His work. This question ties the whole Bible together." },
    ],
    tip: "Print these five questions on a card for each group member. After a few weeks, they'll have them memorised and can use them in personal study too.",
    bestFor: "Any passage, any group, any level. The most versatile method on this list",
  },
];

interface Book {
  name: string;
  duration: string;
  why: string;
}

const BOOKS: Book[] = [
  { name: "Mark", duration: "8 weeks", why: "The shortest Gospel. Fast-paced and gripping. Great for groups who want to meet Jesus without a huge time commitment." },
  { name: "John", duration: "12 weeks", why: "Goes deeper than the other Gospels into who Jesus really is. Full of conversations and 'I am' statements that spark brilliant discussion." },
  { name: "Genesis 1-25", duration: "10 weeks", why: "The origin story of everything. Creation, fall, flood, Abraham. Sets up every major theme in the Bible." },
  { name: "Ephesians", duration: "6 weeks", why: "Identity and unity. The first half tells you who you are in Christ, the second half shows you how to live it out. Perfect length for a short series." },
  { name: "James", duration: "5 weeks", why: "Punchy, practical, impossible to ignore. Every chapter will make your group uncomfortable in the best way." },
  { name: "Romans 1-8", duration: "8 weeks", why: "The clearest explanation of the Gospel ever written. Chapters 5-8 alone are worth the whole study." },
  { name: "Philippians", duration: "4 weeks", why: "Short and joyful. Written from prison, it's a masterclass in finding contentment no matter what you're facing." },
  { name: "Ruth", duration: "4 weeks", why: "A beautiful, short story you can read in one sitting. Loyalty, love, redemption. Works brilliantly for newer groups." },
  { name: "1 Peter", duration: "5 weeks", why: "Written for people going through hard times. If your group is walking through a difficult season, start here." },
  { name: "Psalms (selected)", duration: "6-8 weeks", why: "Pick 6-8 Psalms across different types (praise, lament, thanksgiving). Teaches your group how to pray honestly." },
  { name: "Acts 1-12", duration: "8 weeks", why: "The early church in action. The Holy Spirit shows up, things get wild, and you'll find yourself asking 'why doesn't our church look like this?'" },
  { name: "Sermon on the Mount", duration: "6 weeks", why: "Matthew 5-7. Jesus' most famous teaching. Challenging, counter-cultural, and endlessly rich for group discussion." },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GroupStudy() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [expandedFramework, setExpandedFramework] = useState<number | null>(null);

  return (
    <section id="group-study" className="bg-navy py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* ----------------------------------------------------------------- */}
        {/* Section header                                                     */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={sectionFade}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-widest text-gold-light font-sans text-sm mb-4">
            Better together
          </p>
          <h2 className="font-serif text-display-lg text-cream">
            Group study guide
          </h2>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Part 1. Core Principles                                          */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-24"
        >
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.number}
              variants={cardFade}
              className={cn(
                "bg-white/5 border border-gold/15 rounded-xl p-6",
                "flex gap-4"
              )}
            >
              <span className="font-serif text-2xl text-gold leading-none shrink-0 mt-0.5">
                {p.number}
              </span>
              <div>
                <h3 className="text-cream font-medium text-lg mb-1.5">
                  {p.name}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Part 2. 60-Minute Session Timeline                               */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={sectionFade}
          className="mb-24"
        >
          <h3 className="font-serif text-display-sm text-cream text-center mb-12">
            60-minute session template
          </h3>

          <div className="max-w-2xl mx-auto">
            {TIMELINE_STEPS.map((step, i) => {
              const isExpanded = expandedStep === i;
              const isLast = i === TIMELINE_STEPS.length - 1;

              return (
                <div key={i} className="relative flex gap-3 sm:gap-5">
                  {/* Vertical line & dot */}
                  <div className="flex flex-col items-center shrink-0">
                    {/* Dot */}
                    <button
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : i)
                      }
                      className={cn(
                        "w-3 h-3 rounded-full border-2 transition-all duration-300 mt-1.5",
                        isExpanded
                          ? "bg-gold border-gold shadow-[0_0_8px_rgba(201,168,76,0.5)]"
                          : "bg-gold/40 border-gold/60 hover:bg-gold/70"
                      )}
                      aria-label={`Toggle ${step.title}`}
                    />
                    {/* Connecting line */}
                    {!isLast && (
                      <div className="w-px flex-1 bg-gold/25 min-h-[24px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn("pb-6", isLast && "pb-0")}>
                    <button
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : i)
                      }
                      className="flex flex-wrap items-center gap-3 text-left w-full"
                    >
                      <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded-full font-sans">
                        {step.time}
                      </span>
                      <span className="text-cream font-medium">
                        {step.title}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-cream/60 text-sm leading-relaxed mt-2 pl-0.5">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Part 3. Discussion Question Frameworks                           */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="mb-24"
        >
          <h3 className="font-serif text-display-sm text-cream text-center mb-12">
            Discussion frameworks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FRAMEWORKS.map((fw, i) => {
              const isOpen = expandedFramework === i;
              return (
                <motion.div
                  key={fw.name}
                  variants={cardFade}
                  layout
                  className={cn(
                    "rounded-xl border transition-colors duration-300 cursor-pointer overflow-hidden",
                    isOpen
                      ? "bg-white/[0.08] border-gold/30 md:col-span-2"
                      : "bg-white/5 border-gold/15 hover:border-gold/25"
                  )}
                  onClick={() => setExpandedFramework(isOpen ? null : i)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-cream font-medium text-lg">
                        {fw.name}
                        {!isOpen && (
                          <span className="text-cream/25 text-xs font-sans font-normal ml-2">
                            (tap to expand)
                          </span>
                        )}
                      </h4>
                      <span
                        className={cn(
                          "text-gold/60 text-xl shrink-0 transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-6">
                          {/* Subtitle & description */}
                          <div>
                            <p className="text-gold-light/70 text-xs font-sans tracking-wider mb-2">
                              {fw.subtitle}
                            </p>
                            <p className="text-cream/50 text-sm leading-relaxed">
                              {fw.description}
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="gold-line" />

                          {/* Steps */}
                          <div className="space-y-4">
                            {fw.steps.map((step, j) => (
                              <div
                                key={j}
                                className="bg-white/[0.04] rounded-lg p-4 border border-gold/10"
                              >
                                <h5 className="text-gold font-medium text-sm mb-2 font-sans">
                                  {step.label}
                                </h5>
                                <p className="text-cream/60 text-sm leading-relaxed">
                                  {step.detail}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Tip */}
                          <div className="bg-gold/[0.06] border-l-[3px] border-gold/40 rounded-r-lg p-4">
                            <p className="text-xs uppercase tracking-widest text-gold/60 font-sans mb-1">
                              Tip
                            </p>
                            <p className="text-cream/60 text-sm leading-relaxed">
                              {fw.tip}
                            </p>
                          </div>

                          {/* Best for */}
                          <p className="text-cream/40 text-xs font-sans">
                            <span className="text-gold/50 font-medium uppercase tracking-wider">Best for: </span>
                            {fw.bestFor}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Part 4. Recommended Books                                        */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
        >
          <h3 className="font-serif text-display-sm text-cream text-center mb-12">
            Recommended books for group study
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {BOOKS.map((book) => (
              <motion.div
                key={book.name}
                variants={cardFade}
                className="bg-white/5 border border-gold/15 rounded-xl px-5 py-5"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="font-serif text-cream text-base">
                    {book.name}
                  </p>
                  <span className="text-gold text-xs font-sans shrink-0">
                    {book.duration}
                  </span>
                </div>
                <p className="text-cream/45 text-sm leading-relaxed">
                  {book.why}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
