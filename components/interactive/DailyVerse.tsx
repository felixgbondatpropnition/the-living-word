"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Copy, Check, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { verses } from "@/lib/data/verses";

function getRandomIndex(currentIndex: number): number {
  if (verses.length <= 1) return 0;
  let next: number;
  do {
    next = Math.floor(Math.random() * verses.length);
  } while (next === currentIndex);
  return next;
}

export default function DailyVerse() {
  const [isOpen, setIsOpen] = useState(false);
  const [verseIndex, setVerseIndex] = useState(() =>
    Math.floor(Math.random() * verses.length)
  );
  const [copied, setCopied] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const verse = verses[verseIndex];

  const handleNewVerse = useCallback(() => {
    setShuffling(true);
    // Wait for the rotate animation, then swap the verse
    setTimeout(() => {
      setVerseIndex((prev) => getRandomIndex(prev));
      setShuffling(false);
    }, 400);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!verse) return;
    try {
      await navigator.clipboard.writeText(`${verse.text}. ${verse.reference}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }, [verse]);

  return (
    <>
      {/* Floating trigger button. bottom-left corner */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40",
          "p-3 rounded-full",
          "bg-gold/90 hover:bg-gold text-ink",
          "shadow-lg shadow-gold/20 hover:shadow-gold/30",
          "transition-all duration-200 hover:scale-105"
        )}
        aria-label="Open daily verse"
      >
        <BookOpen className="w-5 h-5" />
      </button>

      {/* Modal overlay + card */}
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
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "fixed z-50 inset-0 flex items-center justify-center p-4",
                "pointer-events-none"
              )}
            >
              <div
                className={cn(
                  "bg-warm-white dark:bg-ink border border-gold/20",
                  "rounded-2xl p-6 sm:p-8 shadow-xl max-w-[calc(100vw-2rem)] sm:max-w-md w-full",
                  "pointer-events-auto relative"
                )}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-lg text-ink/40 dark:text-parchment/40 hover:text-ink dark:hover:text-parchment transition-colors"
                  aria-label="Close daily verse"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <h3 className="font-serif text-lg text-ink dark:text-parchment">
                    Daily Verse
                  </h3>
                </div>

                {/* Verse text with shuffle animation */}
                <motion.div
                  animate={{
                    rotateY: shuffling ? 360 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ perspective: 600 }}
                >
                  <p className="font-serif italic text-lg leading-relaxed text-ink/80 dark:text-parchment/80 mb-4">
                    &ldquo;{verse.text}&rdquo;
                  </p>
                  <p className="font-sans text-sm font-medium text-gold">
                    {verse.reference}
                  </p>
                </motion.div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gold/10">
                  <button
                    onClick={handleNewVerse}
                    disabled={shuffling}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg",
                      "text-sm font-sans text-ink/70 dark:text-parchment/70",
                      "hover:bg-gold/10 transition-colors duration-200",
                      "disabled:opacity-50"
                    )}
                  >
                    <RefreshCw
                      className={cn(
                        "w-4 h-4",
                        shuffling && "animate-spin"
                      )}
                    />
                    New verse
                  </button>

                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg",
                      "text-sm font-sans text-ink/70 dark:text-parchment/70",
                      "hover:bg-gold/10 transition-colors duration-200"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-sage" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
