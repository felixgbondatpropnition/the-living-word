export interface ReadingPlan {
  id: string;
  title: string;
  duration: string;
  description: string;
  books: string[];
  details: string;
}

export const plans: ReadingPlan[] = [
  {
    id: "essentials",
    title: "The Essentials",
    duration: "2 weeks",
    description: "A curated introduction to the Bible's most important passages. Perfect if you want to understand the heart of Scripture without feeling overwhelmed.",
    books: ["Genesis 1-3", "Exodus 14-15", "Psalm 23", "Isaiah 53", "Matthew 5-7", "John 1", "Romans 8"],
    details: "Start with creation, witness the exodus, find comfort in the Psalms, discover the prophecy of Christ, hear the Sermon on the Mount, encounter the Word made flesh, and rest in the assurance of God's love."
  },
  {
    id: "gospel-journey",
    title: "The Gospel Journey",
    duration: "30 days",
    description: "Walk through the life of Jesus and the birth of the early church. Read Luke's beautiful narrative, John's theological depth, and the explosive beginning of Acts.",
    books: ["Luke", "John", "Acts 1-4"],
    details: "Luke tells the story of Jesus with a historian's eye and a poet's heart. John reveals the deeper meaning. Acts shows what happened next, and it's extraordinary."
  },
  {
    id: "redemption",
    title: "The Story of Redemption",
    duration: "90 days",
    description: "Trace the golden thread of God's rescue plan from Genesis to Romans. This plan takes you through the Bible's grand story: creation, fall, rescue, restoration.",
    books: ["Genesis", "Exodus", "Ruth", "1 Samuel", "Psalms (selected)", "Isaiah", "Luke", "Acts", "Romans"],
    details: "See how every book points forward to Jesus. From Abraham's call to David's throne to Isaiah's suffering servant, and finally, Paul's magnificent explanation of what it all means."
  },
  {
    id: "cover-to-cover",
    title: "Cover to Cover",
    duration: "1 year",
    description: "Read the entire Bible in one year. About 15 minutes per day. This is the marathon, and it will change you.",
    books: [],
    details: "Three to four chapters per day takes you through the entire Bible. Mix Old and New Testament readings to keep variety. Don't worry about understanding everything. The goal is immersion."
  }
];
