"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Method {
  number: string;
  name: string;
  description: string;
  tip: string;
}

const methods: Method[] = [
  {
    number: "01",
    name: "Devotional reading",
    description:
      "Read slowly and prayerfully, letting the words wash over you. Don\u2019t rush to analyse. Simply ask, \u2018What is God saying to me today?\u2019 This is reading as conversation, not study.",
    tip: "Start with just 5 minutes. Psalms and Proverbs are perfect for devotional reading.",
  },
  {
    number: "02",
    name: "Study method",
    description:
      "Dig deeper with cross-references, commentaries, and word studies. Ask the journalist\u2019s questions: who wrote this, to whom, why, and what did it mean to the original audience?",
    tip: "Keep a notebook beside your Bible. Writing solidifies understanding.",
  },
  {
    number: "03",
    name: "Narrative reading",
    description:
      "Read the Bible like the story it is. Follow the grand arc from creation to restoration, letting each book contribute to the larger narrative.",
    tip: "Try reading an entire book in one sitting. Mark takes about 90 minutes, and it\u2019s electrifying.",
  },
  {
    number: "04",
    name: "Lectio Divina",
    description:
      "An ancient four-step practice: read (lectio), reflect (meditatio), respond (oratio), rest (contemplatio). Let a small passage work its way deep into your heart.",
    tip: "This 1,500-year-old monastic practice pairs beautifully with quiet mornings and a cup of tea.",
  },
  {
    number: "05",
    name: "Topical study",
    description:
      "Choose a theme (grace, justice, prayer, suffering) and trace it through both Testaments. Watch how ideas develop and deepen across the biblical story.",
    tip: "A cross-reference Bible or concordance is invaluable for this method.",
  },
  {
    number: "06",
    name: "Memorisation",
    description:
      "Commit key verses to memory. When Scripture lives in your mind, it shapes how you think, respond, and see the world.",
    tip: "Start with one verse a week. Write it on a card, stick it to your mirror, repeat it until it\u2019s yours.",
  },
];

export default function HowToRead() {
  return (
    <section id="how-to-read" className="bg-cream py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-gold-dark font-sans text-sm mb-4">
            Approaches to Scripture
          </p>
          <h2 className="font-serif text-display-lg text-ink mb-6">
            How to read the Bible
          </h2>
          <p className="max-w-2xl mx-auto text-ink-light text-balance">
            There&rsquo;s no single correct way to read the Bible. Different
            approaches serve different purposes. Here are six methods to help you
            engage with Scripture in ways that suit your season, your time, and
            your curiosity.
          </p>
        </div>

        {/* Method cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <motion.div
              key={method.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.1,
              }}
              className={cn(
                "relative bg-warm-white border border-gold/10 rounded-xl p-5 sm:p-8",
                "card-hover overflow-hidden"
              )}
            >
              {/* Large faded number */}
              <span
                className="absolute top-4 left-6 font-serif text-6xl text-gold/10 select-none pointer-events-none"
                aria-hidden="true"
              >
                {method.number}
              </span>

              {/* Method name */}
              <h3 className="font-serif text-xl font-medium text-ink mt-12 mb-3">
                {method.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-ink-light mb-6 leading-relaxed">
                {method.description}
              </p>

              {/* Tip callout */}
              <div className="bg-parchment rounded-lg p-4 border-l-[3px] border-gold">
                <p className="text-sm text-sage leading-relaxed">
                  <span className="font-medium">Tip:</span> {method.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
