"use client";

import { useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { books } from "@/lib/data/books";
import { seasons } from "@/lib/data/seasons";
import { plans } from "@/lib/data/plans";

// ---------------------------------------------------------------------------
// Resolve a bookmark ID to its display info
// ---------------------------------------------------------------------------

interface BookmarkItem {
  id: string;
  title: string;
  type: string;
}

function resolveBookmark(id: string): BookmarkItem | null {
  // Book IDs: "book-1", "book-2", etc.
  if (id.startsWith("book-")) {
    const bookId = Number(id.replace("book-", ""));
    const book = books.find((b) => b.id === bookId);
    if (book) return { id, title: book.name, type: "Book" };
  }

  // Season IDs: "season-anxiety-and-worry", etc.
  if (id.startsWith("season-")) {
    const seasonId = id.replace("season-", "");
    const season = seasons.find((s) => s.id === seasonId);
    if (season) return { id, title: season.title, type: "Life Season" };
  }

  // Plan IDs: "plan-essentials", etc.
  if (id.startsWith("plan-")) {
    const planId = id.replace("plan-", "");
    const plan = plans.find((p) => p.id === planId);
    if (plan) return { id, title: plan.title, type: "Reading Plan" };
  }

  // Verse or unknown
  if (id.startsWith("verse-")) {
    return {
      id,
      title: id.replace("verse-", "").replace(/-/g, " "),
      type: "Verse",
    };
  }

  return { id, title: id, type: "Item" };
}

// ---------------------------------------------------------------------------
// Badge colours by type
// ---------------------------------------------------------------------------

const typeBadgeClasses: Record<string, string> = {
  Book: "bg-navy/10 text-navy dark:bg-navy/30 dark:text-gold-light",
  "Life Season":
    "bg-sage/10 text-sage dark:bg-sage/30 dark:text-sage",
  "Reading Plan":
    "bg-gold/10 text-gold-dark dark:bg-gold/20 dark:text-gold-light",
  Verse:
    "bg-burgundy/10 text-burgundy dark:bg-burgundy/30 dark:text-burgundy",
  Item: "bg-ink/5 text-ink/60 dark:bg-parchment/10 dark:text-parchment/60",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface BookmarkPanelProps {
  isOpen: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

export default function BookmarkPanel({
  isOpen,
  onToggle,
  onClose,
}: BookmarkPanelProps) {
  const handleClose = onToggle ?? onClose ?? (() => {});
  const [bookmarkIds, setBookmarkIds, isLoaded] = useLocalStorage<string[]>(
    "bookmarks",
    []
  );

  const resolved = useMemo(() => {
    return bookmarkIds
      .map(resolveBookmark)
      .filter(Boolean) as BookmarkItem[];
  }, [bookmarkIds]);

  const handleRemove = useCallback(
    (id: string) => {
      setBookmarkIds((prev) => prev.filter((bId) => bId !== id));
    },
    [setBookmarkIds]
  );

  return (
    <>
      {/* Toggle button (rendered in nav) */}
      <button
        onClick={handleClose}
        className={cn(
          "p-2 rounded-lg hover:bg-gold/10 text-gold-light",
          "transition-colors duration-200 relative"
        )}
        aria-label={isOpen ? "Close bookmarks" : "Open bookmarks"}
      >
        <Bookmark className="w-5 h-5" />
        {isLoaded && bookmarkIds.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-ink text-[10px] font-sans font-bold flex items-center justify-center">
            {bookmarkIds.length > 9 ? "9+" : bookmarkIds.length}
          </span>
        )}
      </button>

      {/* Slide-out panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed right-0 top-0 z-50 h-full w-80 max-w-full",
                "bg-warm-white dark:bg-ink",
                "border-l border-gold/20 shadow-2xl",
                "flex flex-col"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-lg text-ink dark:text-parchment">
                    Saved items
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-ink/40 dark:text-parchment/40 hover:text-ink dark:hover:text-parchment hover:bg-gold/10 transition-colors"
                  aria-label="Close bookmarks panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                {!isLoaded ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  </div>
                ) : resolved.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                    <Bookmark className="w-10 h-10 text-ink/10 dark:text-parchment/10 mb-4" />
                    <p className="font-sans text-sm text-ink/40 dark:text-parchment/40 leading-relaxed">
                      No saved items yet. Bookmark books and Scripture passages
                      as you explore.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {resolved.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={cn(
                          "group flex items-center gap-3 p-3 rounded-xl",
                          "bg-ink/[0.02] dark:bg-parchment/[0.03]",
                          "border border-transparent hover:border-gold/10",
                          "transition-colors duration-150"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm text-ink dark:text-parchment truncate">
                            {item.title}
                          </p>
                          <span
                            className={cn(
                              "inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wide",
                              typeBadgeClasses[item.type] ||
                                typeBadgeClasses.Item
                            )}
                          >
                            {item.type}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className={cn(
                            "p-1.5 rounded-lg flex-shrink-0",
                            "text-ink/20 dark:text-parchment/20",
                            "opacity-0 group-hover:opacity-100",
                            "hover:text-burgundy dark:hover:text-burgundy hover:bg-burgundy/10",
                            "transition-all duration-150"
                          )}
                          aria-label={`Remove ${item.title} from bookmarks`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
