"use client";

import { useState } from "react";
import ScrollProgress from "@/components/interactive/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/sections/Navigation";
import KeyFacts from "@/components/sections/KeyFacts";
import Overview from "@/components/sections/Overview";
import BibleLibrary from "@/components/sections/BibleLibrary";
import HowToRead from "@/components/sections/HowToRead";
import ReadingPlans from "@/components/sections/ReadingPlans";
import SeasonsOfLife from "@/components/sections/SeasonsOfLife";
import GroupStudy from "@/components/sections/GroupStudy";
import StayingConsistent from "@/components/sections/StayingConsistent";
import Tips from "@/components/sections/Tips";
import Footer from "@/components/sections/Footer";
import DarkModeToggle from "@/components/interactive/DarkModeToggle";
import DailyVerse from "@/components/interactive/DailyVerse";
import CommandSearch from "@/components/interactive/CommandSearch";
import BookmarkPanel from "@/components/interactive/BookmarkPanel";

export default function Home() {
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  const toggleBookmark = () => setBookmarkOpen((prev) => !prev);

  return (
    <>
      <ScrollProgress />
      <CommandSearch />

      <Hero />

      <Navigation
        darkModeToggle={
          <div className="flex items-center gap-2">
            <BookmarkPanel isOpen={bookmarkOpen} onToggle={toggleBookmark} />
            <DarkModeToggle />
          </div>
        }
      />

      <main id="main-content">
        <KeyFacts />
        <Overview />
        <SeasonsOfLife />
        <GroupStudy />
        <HowToRead />
        <ReadingPlans />
        <StayingConsistent />
        <Tips />
        <BibleLibrary />
      </main>

      <Footer />

      <DailyVerse />
    </>
  );
}
