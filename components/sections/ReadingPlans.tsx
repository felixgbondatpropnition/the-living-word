"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { plans } from "@/lib/data/plans";

export default function ReadingPlans() {
  return (
    <section
      id="reading-plans"
      className="relative bg-ink py-24 sm:py-32 px-6 noise-overlay overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-gold-light font-sans text-sm mb-4">
            Your path through Scripture
          </p>
          <h2 className="font-serif text-display-lg text-cream mb-6">
            Reading plans
          </h2>
          <p className="max-w-xl mx-auto text-cream/60">
            Whether you have two weeks or a full year, there&rsquo;s a plan for
            you.
          </p>
        </div>

        {/* Plan cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.1,
              }}
              className={cn(
                "bg-ink-light/30 backdrop-blur-sm border border-gold/20 rounded-xl p-5 sm:p-8",
                "transition-all duration-350",
                "hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)]"
              )}
            >
              {/* Duration badge */}
              <span className="inline-block bg-gold/20 text-gold text-xs px-3 py-1 rounded-full mb-4">
                {plan.duration}
              </span>

              {/* Title */}
              <h3 className="font-serif text-2xl text-cream mb-3">
                {plan.title}
              </h3>

              {/* Description */}
              <p className="text-cream/70 text-sm mb-5 leading-relaxed">
                {plan.description}
              </p>

              {/* Book tags */}
              <div className="flex flex-wrap gap-2">
                {plan.books.map((book) => (
                  <span
                    key={book}
                    className="border border-gold/20 text-gold-light text-xs px-2.5 py-1 rounded-full"
                  >
                    {book}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
