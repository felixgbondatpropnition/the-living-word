"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Seasons", href: "#seasons" },
  { label: "Group Study", href: "#group-study" },
  { label: "How to Read", href: "#how-to-read" },
  { label: "Plans", href: "#reading-plans" },
  { label: "Staying Consistent", href: "#staying-consistent" },
  { label: "Tips", href: "#tips" },
  { label: "All Books", href: "#bible-library" },
] as const;

const SECTION_IDS = [
  "overview",
  "seasons",
  "group-study",
  "how-to-read",
  "reading-plans",
  "staying-consistent",
  "tips",
  "bible-library",
] as const;

interface NavigationProps {
  darkModeToggle?: React.ReactNode;
}

export default function Navigation({ darkModeToggle }: NavigationProps) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track scroll position to show/hide nav
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry most visibly in view
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one with the highest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="sticky top-0 z-40 bg-ink/90 backdrop-blur-md border-b border-gold/10"
          role="navigation"
          aria-label="Section navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-12 md:h-14 gap-6">
            {/* Brand */}
            <span className="hidden md:block font-serif text-sm text-parchment/80 whitespace-nowrap flex-shrink-0">
              The Living Word
            </span>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-gold/20 flex-shrink-0" />

            {/* Nav links. horizontally scrollable on mobile */}
            <div
              className={cn(
                "flex-1 flex items-center gap-1 overflow-x-auto whitespace-nowrap",
                // Hide scrollbar across browsers
                "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              )}
            >
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "relative px-3 py-1.5 text-xs font-sans tracking-wide transition-colors duration-200",
                      isActive
                        ? "text-gold"
                        : "text-parchment/60 hover:text-parchment/90"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Dark mode toggle slot */}
            {darkModeToggle && (
              <div className="flex-shrink-0 ml-auto">{darkModeToggle}</div>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
