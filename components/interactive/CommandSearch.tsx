"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { books } from "@/lib/data/books";
import { seasons } from "@/lib/data/seasons";
import { plans } from "@/lib/data/plans";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SearchResult {
  id: string;
  title: string;
  context: string;
  type: "book" | "season" | "plan";
  typeLabel: string;
  targetSection: string;
}

// ---------------------------------------------------------------------------
// Build a flat searchable index
// ---------------------------------------------------------------------------

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const book of books) {
    results.push({
      id: `book-${book.id}`,
      title: book.name,
      context: book.description.slice(0, 80) + (book.description.length > 80 ? "..." : ""),
      type: "book",
      typeLabel: "Book",
      targetSection: "#bible-library",
    });
  }

  for (const season of seasons) {
    results.push({
      id: `season-${season.id}`,
      title: season.title,
      context: season.description.slice(0, 80) + (season.description.length > 80 ? "..." : ""),
      type: "season",
      typeLabel: "Life Season",
      targetSection: "#seasons",
    });
  }

  for (const plan of plans) {
    results.push({
      id: `plan-${plan.id}`,
      title: plan.title,
      context: plan.description.slice(0, 80) + (plan.description.length > 80 ? "..." : ""),
      type: "plan",
      typeLabel: "Reading Plan",
      targetSection: "#reading-plans",
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Search logic
// ---------------------------------------------------------------------------

function searchItems(query: string, index: SearchResult[]): SearchResult[] {
  if (!query.trim()) return [];

  const lower = query.toLowerCase();
  const terms = lower.split(/\s+/).filter(Boolean);

  const scored = index
    .map((item) => {
      // Build a searchable blob from multiple fields
      const searchBlob = [
        item.title,
        item.context,
        item.typeLabel,
      ].join(" ").toLowerCase();

      // Also search tags for books and category for seasons
      let extraBlob = "";
      if (item.type === "book") {
        const book = books.find((b) => `book-${b.id}` === item.id);
        if (book) {
          extraBlob = [book.tags.join(" "), book.genre, book.genreLabel, book.testament].join(" ").toLowerCase();
        }
      } else if (item.type === "season") {
        const season = seasons.find((s) => `season-${s.id}` === item.id);
        if (season) {
          extraBlob = [season.category, season.categoryLabel].join(" ").toLowerCase();
        }
      } else if (item.type === "plan") {
        const plan = plans.find((p) => `plan-${p.id}` === item.id);
        if (plan) {
          extraBlob = plan.books.join(" ").toLowerCase();
        }
      }

      const fullBlob = searchBlob + " " + extraBlob;

      // All terms must match somewhere
      const allMatch = terms.every((term) => fullBlob.includes(term));
      if (!allMatch) return null;

      // Score: title match is stronger
      let score = 0;
      const titleLower = item.title.toLowerCase();
      for (const term of terms) {
        if (titleLower.includes(term)) score += 10;
        if (titleLower.startsWith(term)) score += 5;
        if (fullBlob.includes(term)) score += 1;
      }

      return { item, score };
    })
    .filter(Boolean) as { item: SearchResult; score: number }[];

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 10).map((s) => s.item);
}

// ---------------------------------------------------------------------------
// Group results by type
// ---------------------------------------------------------------------------

interface GroupedResults {
  books: SearchResult[];
  seasons: SearchResult[];
  plans: SearchResult[];
}

function groupResults(results: SearchResult[]): GroupedResults {
  return {
    books: results.filter((r) => r.type === "book"),
    seasons: results.filter((r) => r.type === "season"),
    plans: results.filter((r) => r.type === "plan"),
  };
}

// ---------------------------------------------------------------------------
// Badge colours by type
// ---------------------------------------------------------------------------

const typeBadgeClasses: Record<SearchResult["type"], string> = {
  book: "bg-navy/10 text-navy dark:bg-navy/30 dark:text-gold-light",
  season: "bg-sage/10 text-sage dark:bg-sage/30 dark:text-sage",
  plan: "bg-gold/10 text-gold-dark dark:bg-gold/20 dark:text-gold-light",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildIndex(), []);
  const results = useMemo(() => searchItems(query, index), [query, index]);
  const grouped = useMemo(() => groupResults(results), [results]);

  // Flatten results for keyboard navigation
  const flatResults = useMemo(() => {
    return [...grouped.books, ...grouped.seasons, ...grouped.plans];
  }, [grouped]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [flatResults.length, query]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      // Small delay so AnimatePresence has rendered the input
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setIsOpen(false);
      // Smooth scroll to the target section
      const el = document.querySelector(result.targetSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < flatResults.length - 1 ? prev + 1 : 0
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : flatResults.length - 1
        );
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const selected = flatResults[activeIndex];
        if (selected) {
          handleSelect(selected);
        }
        return;
      }
    },
    [flatResults, activeIndex, handleSelect]
  );

  // Render a group section
  const renderGroup = (
    label: string,
    items: SearchResult[],
    startIndex: number
  ) => {
    if (items.length === 0) return null;
    return (
      <div>
        <div className="px-4 py-2 text-xs font-sans font-medium uppercase tracking-wider text-ink/40 dark:text-parchment/40">
          {label}
        </div>
        {items.map((result, i) => {
          const globalIndex = startIndex + i;
          const isActive = globalIndex === activeIndex;

          return (
            <button
              key={result.id}
              data-index={globalIndex}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setActiveIndex(globalIndex)}
              className={cn(
                "w-full text-left px-4 py-3 flex items-start gap-3 transition-colors duration-100",
                isActive
                  ? "bg-gold/10 dark:bg-gold/5"
                  : "hover:bg-gold/5"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm text-ink dark:text-parchment truncate">
                    {result.title}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wide flex-shrink-0",
                      typeBadgeClasses[result.type]
                    )}
                  >
                    {result.typeLabel}
                  </span>
                </div>
                <p className="text-xs font-sans text-ink/50 dark:text-parchment/50 mt-0.5 truncate">
                  {result.context}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Search modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-[15vh] px-4 pointer-events-none"
          >
            <div
              className={cn(
                "bg-warm-white dark:bg-ink border border-gold/20",
                "rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden",
                "pointer-events-auto"
              )}
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-gold/30">
                <Search className="w-5 h-5 text-ink/30 dark:text-parchment/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search books, seasons, plans..."
                  className={cn(
                    "flex-1 py-4 bg-transparent outline-none",
                    "text-lg font-sans text-ink dark:text-parchment",
                    "placeholder:text-ink/30 dark:placeholder:text-parchment/30"
                  )}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded text-ink/30 dark:text-parchment/30 hover:text-ink dark:hover:text-parchment transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[50vh] overflow-y-auto overscroll-contain"
              >
                {query.trim() && flatResults.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p className="font-sans text-sm text-ink/40 dark:text-parchment/40">
                      No results found
                    </p>
                  </div>
                )}

                {flatResults.length > 0 && (
                  <div className="py-2">
                    {renderGroup("Books", grouped.books, 0)}
                    {renderGroup(
                      "Life Seasons",
                      grouped.seasons,
                      grouped.books.length
                    )}
                    {renderGroup(
                      "Reading Plans",
                      grouped.plans,
                      grouped.books.length + grouped.seasons.length
                    )}
                  </div>
                )}
              </div>

              {/* Footer hints */}
              <div className="px-4 py-2.5 border-t border-gold/10 flex items-center gap-4">
                <span className="text-[11px] font-sans text-ink/30 dark:text-parchment/30">
                  Esc to close
                </span>
                <span className="text-[11px] font-sans text-ink/30 dark:text-parchment/30">
                  &uarr;&darr; to navigate
                </span>
                <span className="text-[11px] font-sans text-ink/30 dark:text-parchment/30">
                  Enter to select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
