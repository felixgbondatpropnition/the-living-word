"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] bg-gold z-50 origin-left"
      style={{ scaleX: progress }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}
