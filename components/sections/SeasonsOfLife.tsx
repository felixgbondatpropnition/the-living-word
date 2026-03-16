"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import {
  seasons,
  categoryColors,
  type SeasonCategory,
} from "@/lib/data/seasons";

const FILTER_OPTIONS: { label: string; value: SeasonCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Emotions", value: "emotions" },
  { label: "Sin & Temptation", value: "sin" },
  { label: "Life Trials", value: "life-trials" },
  { label: "Relationships", value: "relationships" },
  { label: "Identity", value: "identity" },
  { label: "Spiritual Life", value: "spiritual" },
];

export default function SeasonsOfLife() {
  const [activeFilter, setActiveFilter] = useState<SeasonCategory | "all">(
    "all"
  );
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(
    "bookmarks",
    []
  );

  // Listen for filter events from Hero quick-access pills
  useEffect(() => {
    function handleSetFilter(e: Event) {
      const filter = (e as CustomEvent).detail as SeasonCategory;
      setActiveFilter(filter);
    }
    window.addEventListener("set-season-filter", handleSetFilter);
    return () =>
      window.removeEventListener("set-season-filter", handleSetFilter);
  }, []);

  const filteredSeasons = useMemo(
    () =>
      activeFilter === "all"
        ? seasons
        : seasons.filter((s) => s.category === activeFilter),
    [activeFilter]
  );

  function toggleBookmark(id: string) {
    const prefixed = `season-${id}`;
    setBookmarks((prev) =>
      prev.includes(prefixed) ? prev.filter((b) => b !== prefixed) : [...prev, prefixed]
    );
  }

  return (
    <section id="seasons" className="bg-parchment py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="uppercase tracking-widest text-gold-dark text-xs sm:text-sm font-sans mb-4">
            Scripture for every struggle
          </p>
          <h2 className="font-serif text-display-lg text-ink mb-6">
            What are you going through?
          </h2>
          <p className="text-ink-light text-base sm:text-lg leading-relaxed">
            Whatever season you&rsquo;re in, God&rsquo;s word has something to
            say. Find the passages that speak directly to where you are right
            now.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          className={cn(
            "flex items-center gap-2 sm:gap-3 mb-10 sm:mb-14 overflow-x-auto pb-2",
            "sm:flex-wrap sm:justify-center",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          )}
          role="tablist"
          aria-label="Filter scripture categories"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                role="tab"
                aria-selected={isActive}
                aria-controls="seasons-grid"
                onClick={() => setActiveFilter(option.value)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 text-sm font-sans rounded-full transition-colors duration-200 flex-shrink-0",
                  "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment",
                  isActive
                    ? "bg-gold text-ink"
                    : "bg-warm-white border border-gold/20 text-ink-light hover:border-gold/40 hover:text-ink"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div
          id="seasons-grid"
          role="tabpanel"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSeasons.map((season) => {
              const color = categoryColors[season.category];
              const isBookmarked = bookmarks.includes(`season-${season.id}`);

              return (
                <motion.article
                  key={season.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn(
                    "bg-warm-white rounded-xl p-6 border border-gold/10 card-hover",
                    "relative flex flex-col"
                  )}
                >
                  {/* Bookmark button */}
                  <button
                    onClick={() => toggleBookmark(season.id)}
                    aria-label={
                      isBookmarked
                        ? `Remove bookmark from ${season.title}`
                        : `Bookmark ${season.title}`
                    }
                    className={cn(
                      "absolute top-4 right-4 p-1.5 rounded-md transition-colors duration-200",
                      "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white",
                      isBookmarked
                        ? "text-gold"
                        : "text-ink-light/40 hover:text-gold/70"
                    )}
                  >
                    <Bookmark
                      className="w-4 h-4"
                      fill={isBookmarked ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Category pill */}
                  <span
                    className="inline-flex items-center self-start text-xs font-sans px-2.5 py-1 rounded-md mb-4"
                    style={{
                      borderLeft: `3px solid ${color}`,
                      backgroundColor: `${color}10`,
                      color: color,
                    }}
                  >
                    {season.categoryLabel}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-medium text-ink mb-2 pr-6">
                    {season.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-ink-light leading-relaxed mb-5">
                    {season.description}
                  </p>

                  {/* Scripture references */}
                  <div className="mb-5 flex-1">
                    <ul className="space-y-2" role="list">
                      {season.scriptures.map((scripture) => (
                        <li
                          key={scripture.reference}
                          className="flex items-start gap-2 text-sm"
                        >
                          <BookOpen
                            className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          <span>
                            <span className="font-medium text-gold-dark">
                              {scripture.reference}
                            </span>
                            {scripture.note && (
                              <span className="text-ink-light/70">
                                {" "}
                                &ndash; {scripture.note}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Try this tip */}
                  <div className="bg-sage/10 border-l-[3px] border-sage rounded-r-lg p-3">
                    <p className="text-sm text-sage">
                      <span className="font-medium">Try this:</span>{" "}
                      {season.tip}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
