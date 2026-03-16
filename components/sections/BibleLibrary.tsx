"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  books,
  genreColors,
  genreLabels,
  type BibleBook,
  type Genre,
  type Testament,
} from "@/lib/data/books";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

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

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const expandContent = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto" as const,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

type TestamentFilter = "all" | "old" | "new";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Group books by genre, preserving insertion order. */
function groupByGenre(bookList: BibleBook[]) {
  const groups: { genre: Genre; testament: Testament; books: BibleBook[] }[] =
    [];
  const seen = new Map<Genre, number>();

  for (const book of bookList) {
    const genre = book.genre;
    if (seen.has(genre)) {
      groups[seen.get(genre)!].books.push(book);
    } else {
      seen.set(genre, groups.length);
      groups.push({ genre, testament: book.testament, books: [book] });
    }
  }

  return groups;
}

/** Get the 1-based position of a book in the canonical Bible ordering. */
function getBookNumber(book: BibleBook): number {
  return book.id;
}

// ---------------------------------------------------------------------------
// BookCard sub-component
// ---------------------------------------------------------------------------

interface BookCardProps {
  book: BibleBook;
  bookNumber: number;
  isExpanded: boolean;
  isRead: boolean;
  onToggleExpand: () => void;
  onToggleRead: (e: React.MouseEvent) => void;
}

function BookCard({
  book,
  bookNumber,
  isExpanded,
  isRead,
  onToggleExpand,
  onToggleRead,
}: BookCardProps) {
  const genreColor = genreColors[book.genre];

  return (
    <motion.article
      layout
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      className={cn(
        "relative rounded-xl bg-warm-white dark:bg-ink-light/10",
        "border border-gold/10 card-hover cursor-pointer",
        "p-5 sm:p-6",
        isExpanded && "border-gold/40"
      )}
      onClick={onToggleExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleExpand();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${book.name}. ${book.chapters} chapters. Click to ${isExpanded ? "collapse" : "expand"} details.`}
    >
      {/* Top row: badge + read checkbox */}
      <div className="flex items-start justify-between mb-3">
        {/* Book number badge */}
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-semibold text-white"
          style={{ backgroundColor: genreColor }}
          aria-label={`Book ${bookNumber}`}
        >
          {bookNumber}
        </span>

        {/* Read checkbox */}
        <button
          type="button"
          onClick={onToggleRead}
          className={cn(
            "w-6 h-6 rounded flex items-center justify-center transition-colors duration-200",
            "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
            isRead
              ? "bg-gold text-white"
              : "border border-gold/30 text-transparent hover:border-gold"
          )}
          aria-label={`Mark ${book.name} as ${isRead ? "unread" : "read"}`}
          aria-pressed={isRead}
        >
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
        </button>
      </div>

      {/* Book name */}
      <h3 className="font-serif text-xl font-medium text-ink mb-1">
        {book.name}
      </h3>

      {/* Metadata */}
      <p className="text-sm text-ink-light mb-3">
        {book.chapters} chapter{book.chapters !== 1 ? "s" : ""}
      </p>

      {/* Description */}
      <p
        className={cn(
          "text-sm text-ink-light leading-relaxed",
          !isExpanded && "line-clamp-3"
        )}
      >
        {book.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {book.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-parchment text-xs text-ink-light px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded content */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key="expanded"
            {...expandContent}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5 border-t border-gold/10">
              {/* Close button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                className={cn(
                  "absolute top-4 right-4 w-7 h-7 rounded-full",
                  "flex items-center justify-center",
                  "bg-parchment text-ink-light hover:bg-gold/20 hover:text-ink",
                  "transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-gold"
                )}
                aria-label={`Close ${book.name} details`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Study guide placeholder message for books without studyGuide */}
              <p className="text-sm text-ink-light italic">
                Explore {book.name} to discover its themes and connections to the
                rest of Scripture.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// BibleLibrary section
// ---------------------------------------------------------------------------

export default function BibleLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [testamentFilter, setTestamentFilter] =
    useState<TestamentFilter>("all");
  const [expandedBookId, setExpandedBookId] = useState<number | null>(null);
  const [readBooks, setReadBooks] = useLocalStorage<number[]>(
    "tlw-read-books",
    []
  );
  const [, setBookmarks] = useLocalStorage<string[]>(
    "bookmarks",
    []
  );

  // ---- Filtering ----
  const filteredBooks = useMemo(() => {
    let result = books;

    // Testament filter
    if (testamentFilter !== "all") {
      result = result.filter((b) => b.testament === testamentFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((b) => {
        const label = genreLabels[b.genre]?.toLowerCase() ?? "";
        return (
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          label.includes(q) ||
          b.genre.toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [searchQuery, testamentFilter]);

  // ---- Grouping ----
  const groups = useMemo(() => groupByGenre(filteredBooks), [filteredBooks]);

  // ---- Handlers ----
  const handleToggleExpand = useCallback(
    (bookId: number) => {
      setExpandedBookId((prev) => (prev === bookId ? null : bookId));
    },
    []
  );

  const handleToggleRead = useCallback(
    (bookId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setReadBooks((prev) =>
        prev.includes(bookId)
          ? prev.filter((id) => id !== bookId)
          : [...prev, bookId]
      );
      // Sync with shared bookmarks panel
      const prefixed = `book-${bookId}`;
      setBookmarks((prev) =>
        prev.includes(prefixed)
          ? prev.filter((id) => id !== prefixed)
          : [...prev, prefixed]
      );
    },
    [setReadBooks, setBookmarks]
  );

  // ---- Track which testament headings have been rendered ----
  const renderedTestaments = new Set<Testament>();

  // ---- Filter buttons ----
  const filters: { label: string; value: TestamentFilter }[] = [
    { label: "All", value: "all" },
    { label: "Old Testament", value: "old" },
    { label: "New Testament", value: "new" },
  ];

  return (
    <section
      id="bible-library"
      className="relative bg-cream py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          {/* Section label */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-gold" aria-hidden="true" />
            <span className="font-sans text-sm uppercase tracking-widest text-gold-dark">
              Every book at a glance
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="font-serif text-display-lg text-ink"
          >
            The books of the Bible
          </motion.h2>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          className="mb-10 md:mb-14 space-y-4"
        >
          {/* Search bar */}
          <motion.div variants={fadeUp} className="relative max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-ink-light/60 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by book name, theme, or keyword..."
              className={cn(
                "w-full rounded-full border border-gold/30 bg-warm-white",
                "pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-light/50",
                "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20",
                "transition-colors duration-200"
              )}
              aria-label="Search Bible books"
            />
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by testament"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setTestamentFilter(f.value)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-sans transition-all duration-200",
                  testamentFilter === f.value
                    ? "bg-gold text-ink font-medium"
                    : "border border-gold/30 text-ink-light hover:border-gold"
                )}
                aria-pressed={testamentFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Results */}
        {filteredBooks.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-ink-light py-16 text-lg"
          >
            No books match your search. Try a different term.
          </motion.p>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => {
              // Show testament heading when it appears for the first time
              const showTestamentHeading =
                !renderedTestaments.has(group.testament);
              if (showTestamentHeading) {
                renderedTestaments.add(group.testament);
              }

              return (
                <div key={group.genre}>
                  {/* Testament heading */}
                  {showTestamentHeading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <h3 className="font-serif text-display-sm text-ink">
                        {group.testament === "old"
                          ? "Old Testament"
                          : "New Testament"}
                      </h3>
                      <div className="w-16 h-0.5 bg-gold/40 mt-2" />
                    </motion.div>
                  )}

                  {/* Genre heading */}
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="font-sans text-xs uppercase tracking-widest text-gold-dark mb-5"
                  >
                    {genreLabels[group.genre] ?? group.genre}
                  </motion.h4>

                  {/* Book cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {group.books.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        bookNumber={getBookNumber(book)}
                        isExpanded={expandedBookId === book.id}
                        isRead={readBooks.includes(book.id)}
                        onToggleExpand={() => handleToggleExpand(book.id)}
                        onToggleRead={(e) => handleToggleRead(book.id, e)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
