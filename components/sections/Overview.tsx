"use client";

import { cn } from "@/lib/utils";
import {
  ScrollText,
  BookOpen,
  Music,
  Flame,
  Cross,
  Globe,
  Mail,
  Crown,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Genre data
// ---------------------------------------------------------------------------

interface Genre {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const OLD_TESTAMENT_GENRES: Genre[] = [
  {
    icon: <ScrollText className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "The Law (Torah)",
    description:
      "The foundation: creation, exodus, covenant and God's instructions for life.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "History",
    description:
      "Israel's story from conquest to exile: kings, battles, faithfulness and failure.",
  },
  {
    icon: <Music className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "Poetry & Wisdom",
    description:
      "Songs, proverbs, and deep questions about life, suffering and love.",
  },
  {
    icon: <Flame className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "Prophets",
    description:
      "God's messengers calling people back, warning of judgement, promising hope.",
  },
];

const NEW_TESTAMENT_GENRES: Genre[] = [
  {
    icon: <Cross className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "The Gospels",
    description:
      "Four accounts of Jesus' life, death and resurrection. The heart of it all.",
  },
  {
    icon: <Globe className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "Acts",
    description:
      "The Holy Spirit launches the church from Jerusalem to the ends of the earth.",
  },
  {
    icon: <Mail className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "Letters (Epistles)",
    description:
      "Practical theology for real churches and real problems.",
  },
  {
    icon: <Crown className="w-5 h-5 text-gold-dark flex-shrink-0" />,
    name: "Revelation",
    description:
      "A vision of the end, and the glorious new beginning.",
  },
];

// ---------------------------------------------------------------------------
// GenreList sub-component
// ---------------------------------------------------------------------------

function GenreList({ genres }: { genres: Genre[] }) {
  return (
    <ul className="space-y-3 sm:space-y-4">
      {genres.map((genre) => (
        <li key={genre.name} className="flex items-start gap-3">
          {genre.icon}
          <div>
            <span className="font-sans text-sm font-semibold text-ink">
              {genre.name}
            </span>
            <p className="font-sans text-sm text-ink-light leading-relaxed mt-0.5">
              {genre.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// TestamentCard sub-component
// ---------------------------------------------------------------------------

interface TestamentCardProps {
  title: string;
  bookCount: string;
  genres: Genre[];
}

function TestamentCard({ title, bookCount, genres }: TestamentCardProps) {
  return (
    <div
      className={cn(
        "card-hover rounded-xl bg-warm-white border border-gold/10",
        "p-6 sm:p-8"
      )}
      style={{ borderTopWidth: "4px", borderTopColor: "var(--gold)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-display-sm text-ink">{title}</h3>
        <span className="font-sans text-xs uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full">
          {bookCount}
        </span>
      </div>

      <GenreList genres={genres} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Overview section
// ---------------------------------------------------------------------------

export default function Overview() {
  return (
    <section
      id="overview"
      className="relative bg-warm-white py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 md:mb-20">
          {/* Section label with gold line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" aria-hidden="true" />
            <span className="font-sans text-sm uppercase tracking-widest text-gold-dark">
              Understanding the Bible
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-display-lg text-ink mb-6">
            A library, not just a book
          </h2>

          {/* Intro paragraph */}
          <p className="font-sans text-base sm:text-lg text-ink-light leading-relaxed">
            The Bible isn&apos;t a single book. It&apos;s a library of 73
            books (66 in Protestant traditions, plus 7 deuterocanonical books
            in Catholic and Orthodox Bibles), written over 1,500 years by more
            than 40 authors across three continents. History, poetry, prophecy,
            letters, law, and apocalyptic literature, all woven together into
            one extraordinary story of God&apos;s relationship with humanity.
          </p>
        </div>

        {/* Testament cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <TestamentCard
            title="Old Testament"
            bookCount="39 books"
            genres={OLD_TESTAMENT_GENRES}
          />
          <TestamentCard
            title="New Testament"
            bookCount="27 books"
            genres={NEW_TESTAMENT_GENRES}
          />
        </div>
      </div>
    </section>
  );
}
