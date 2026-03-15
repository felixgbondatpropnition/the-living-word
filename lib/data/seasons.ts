export type SeasonCategory =
  | "emotions"
  | "sin"
  | "life-trials"
  | "relationships"
  | "identity"
  | "spiritual";

export interface ScriptureRef {
  reference: string;
  note?: string;
}

export interface SeasonCard {
  id: string;
  title: string;
  category: SeasonCategory;
  categoryLabel: string;
  description: string;
  scriptures: ScriptureRef[];
  tip: string;
}

export const categoryColors: Record<SeasonCategory, string> = {
  emotions: "#1B2A4A",
  sin: "#6B1D2A",
  "life-trials": "#8B6914",
  relationships: "#C9A84C",
  identity: "#5A7247",
  spiritual: "#3D3529",
};

export const categoryLabels: Record<SeasonCategory, string> = {
  emotions: "Emotions",
  sin: "Sin & Temptation",
  "life-trials": "Life Trials",
  relationships: "Relationships",
  identity: "Identity",
  spiritual: "Spiritual Life",
};

export const seasons: SeasonCard[] = [
  // ─────────────────────────────────────────────
  // EMOTIONS (7)
  // ─────────────────────────────────────────────
  {
    id: "anxiety-and-worry",
    title: "Anxiety & Worry",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Your mind won't stop racing and everything feels heavy. You're not alone in this, and God has a lot to say about worry.",
    scriptures: [
      {
        reference: "Philippians 4:6-7",
        note: "Swap worry for prayer, and God's peace shows up.",
      },
      {
        reference: "Matthew 6:25-34",
        note: "Jesus tells you to look at the birds. If God feeds them, he's got you too.",
      },
      {
        reference: "Psalm 55:22",
        note: "Cast your burden on the Lord. He can carry what you can't.",
      },
      {
        reference: "1 Peter 5:6-7",
        note: "He genuinely cares about what's eating at you.",
      },
    ],
    tip: "Read Psalm 23 before bed.",
  },
  {
    id: "depression-and-sadness",
    title: "Depression & Sadness",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Some days the weight is almost unbearable, and that's okay to admit. God doesn't flinch at your sadness. He draws closer.",
    scriptures: [
      {
        reference: "Psalm 42",
        note: "A brutally honest prayer for when you feel forgotten by God.",
      },
      {
        reference: "Psalm 34:17-18",
        note: "God is near to the brokenhearted. That's a promise, not a suggestion.",
      },
      {
        reference: "Isaiah 41:10",
        note: "God tells you three times: don't be afraid.",
      },
      {
        reference: "Romans 8:38-39",
        note: "Nothing can cut you off from God's love. Nothing.",
      },
    ],
    tip: "Read Psalms of lament (6, 13, 22, 42, 88).",
  },
  {
    id: "fear",
    title: "Fear",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Fear can freeze you in place or keep you up at night. But Scripture is packed with reminders that God hasn't left you to face it alone.",
    scriptures: [
      {
        reference: "Isaiah 41:10",
        note: "Three promises stacked together: I'm with you, I'm your God, I'll help you.",
      },
      {
        reference: "Psalm 91",
        note: "A vivid picture of what it looks like to trust God as your shelter.",
      },
      {
        reference: "2 Timothy 1:7",
        note: "God gave you a spirit of power, love, and self-control, not fear.",
      },
      {
        reference: "Joshua 1:9",
        note: "The same words God gave Joshua before a terrifying mission.",
      },
    ],
    tip: "Write out Isaiah 41:10.",
  },
  {
    id: "anger-and-bitterness",
    title: "Anger & Bitterness",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Anger itself isn't always wrong, but it can take root and turn bitter fast. These verses help you deal with it before it deals with you.",
    scriptures: [
      {
        reference: "Ephesians 4:26-27",
        note: "Be angry, but don't let it set up camp in your heart.",
      },
      {
        reference: "James 1:19-20",
        note: "Quick to listen, slow to speak. Simple advice that's hard to follow.",
      },
      {
        reference: "Proverbs 15:1",
        note: "A gentle answer really does cool things down.",
      },
      {
        reference: "Hebrews 12:15",
        note: "Bitterness is a root. Pull it before it grows.",
      },
    ],
    tip: "Read Jonah in one sitting.",
  },
  {
    id: "loneliness",
    title: "Loneliness",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "You can feel lonely in a crowd or completely on your own. Either way, God sees you and he's closer than you think.",
    scriptures: [
      {
        reference: "Psalm 68:6",
        note: "God sets the lonely in families. He's in the business of connection.",
      },
      {
        reference: "Deuteronomy 31:6",
        note: "He won't leave you. He won't forsake you. Full stop.",
      },
      {
        reference: "Psalm 139",
        note: "You're known completely, and there's nowhere you can go where God isn't already there.",
      },
      {
        reference: "1 Kings 19",
        note: "Even Elijah felt totally alone. Watch how God showed up for him.",
      },
    ],
    tip: "Read how God met Elijah in 1 Kings 19.",
  },
  {
    id: "shame-and-guilt",
    title: "Shame & Guilt",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Guilt tells you that you did something wrong. Shame tells you that you are something wrong. God disagrees with both.",
    scriptures: [
      {
        reference: "Romans 8:1",
        note: "No condemnation for those in Christ. Let that sink in.",
      },
      {
        reference: "Psalm 103:12",
        note: "As far as east is from west. That's how far your sins have been removed.",
      },
      {
        reference: "1 John 1:9",
        note: "Confess it, and he's faithful to forgive. Every single time.",
      },
      {
        reference: "Isaiah 61:7",
        note: "God trades your shame for a double portion. That's his kind of math.",
      },
    ],
    tip: "Read Psalm 51.",
  },
  {
    id: "jealousy-and-envy",
    title: "Jealousy & Envy",
    category: "emotions",
    categoryLabel: "Emotions",
    description:
      "Comparison is a thief, and envy will eat you from the inside out. These verses help you refocus on what God's actually doing in your life.",
    scriptures: [
      {
        reference: "Proverbs 14:30",
        note: "A peaceful heart gives life. Envy rots your bones.",
      },
      {
        reference: "Galatians 6:4",
        note: "Test your own work, not someone else's highlight reel.",
      },
      {
        reference: "Psalm 37:1-7",
        note: "Don't fret over those who seem to have it all. Trust God's timing.",
      },
      {
        reference: "James 3:14-16",
        note: "Bitter envy leads to disorder. It's not from God.",
      },
    ],
    tip: "Read Cain & Abel + parable of vineyard workers.",
  },

  // ─────────────────────────────────────────────
  // SIN & TEMPTATION (8)
  // ─────────────────────────────────────────────
  {
    id: "lust-and-sexual-temptation",
    title: "Lust & Sexual Temptation",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "This is one of the hardest battles and one of the least talked about in church. You're not disqualified for struggling with it.",
    scriptures: [
      {
        reference: "1 Corinthians 6:18-20",
        note: "Your body is a temple. That's not guilt; it's identity.",
      },
      {
        reference: "Matthew 5:28-29",
        note: "Jesus takes the battle seriously enough to talk about it directly.",
      },
      {
        reference: "1 Corinthians 10:13",
        note: "Every temptation comes with a way out. God always provides the exit.",
      },
      {
        reference: "Psalm 119:9-11",
        note: "Hiding God's word in your heart is a real strategy, not just a cliche.",
      },
    ],
    tip: "Read Proverbs 5-7.",
  },
  {
    id: "pride",
    title: "Pride",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "Pride is sneaky because it often disguises itself as confidence or competence. It's the sin that convinced Lucifer he didn't need God.",
    scriptures: [
      {
        reference: "Proverbs 16:18",
        note: "Pride comes before a fall. It's not a cliche; it's a warning.",
      },
      {
        reference: "James 4:6",
        note: "God opposes the proud but gives grace to the humble.",
      },
      {
        reference: "Philippians 2:3-8",
        note: "Jesus, who had every right to boast, chose to serve instead.",
      },
      {
        reference: "Daniel 4",
        note: "Nebuchadnezzar learned the hard way. You don't have to.",
      },
    ],
    tip: "Read Philippians 2:1-11 daily for a week.",
  },
  {
    id: "greed-and-materialism",
    title: "Greed & Materialism",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "It's easy to let money and stuff become the thing you trust most. Jesus talked about money more than almost any other topic for a reason.",
    scriptures: [
      {
        reference: "1 Timothy 6:6-10",
        note: "The love of money is a root of all kinds of evil. Not money itself, the love of it.",
      },
      {
        reference: "Matthew 6:19-21",
        note: "Where your treasure is, your heart follows. Check where yours is pointing.",
      },
      {
        reference: "Luke 12:13-21",
        note: "The rich fool stored up everything and lost it all in one night.",
      },
      {
        reference: "Ecclesiastes 5:10",
        note: "Whoever loves money never has enough. Solomon learned that firsthand.",
      },
    ],
    tip: "Read Ecclesiastes.",
  },
  {
    id: "lying-and-dishonesty",
    title: "Lying & Dishonesty",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "Small lies build up. They erode trust and pull you further from the person God's shaping you to be. Truth-telling is a muscle you can strengthen.",
    scriptures: [
      {
        reference: "Proverbs 12:22",
        note: "The Lord detests lying lips but delights in people who tell the truth.",
      },
      {
        reference: "Ephesians 4:25",
        note: "Put off falsehood. Speak truthfully, because we belong to each other.",
      },
      {
        reference: "John 8:32",
        note: "The truth will set you free. Jesus wasn't speaking in metaphor.",
      },
      {
        reference: "Acts 5:1-11",
        note: "Ananias and Sapphira's story is sobering. God takes honesty seriously.",
      },
    ],
    tip: "Read Psalm 15.",
  },
  {
    id: "gossip-and-harmful-speech",
    title: "Gossip & Harmful Speech",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "Words carry more power than we usually give them credit for. What you say can build someone up or tear them apart.",
    scriptures: [
      {
        reference: "James 3:1-12",
        note: "The tongue is a small fire that can burn down a whole forest.",
      },
      {
        reference: "Proverbs 18:21",
        note: "Death and life are in the power of the tongue. Choose wisely.",
      },
      {
        reference: "Ephesians 4:29",
        note: "Only say what builds others up. That's the filter.",
      },
      {
        reference: "Proverbs 16:28",
        note: "A gossip separates close friends. It's that destructive.",
      },
    ],
    tip: "Read James (all 5 chapters).",
  },
  {
    id: "addiction",
    title: "Addiction",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "You know it's got a hold on you, and willpower alone isn't cutting it. Paul understood that struggle deeply, and so does God.",
    scriptures: [
      {
        reference: "Romans 7:15-25",
        note: "Paul's honest confession: I do what I don't want to do. You're not the only one.",
      },
      {
        reference: "1 Corinthians 6:12",
        note: "Everything is permissible, but not everything is beneficial. Don't be mastered by anything.",
      },
      {
        reference: "Galatians 5:1",
        note: "Christ set you free. Don't let yourself be chained up again.",
      },
      {
        reference: "Psalm 107:13-14",
        note: "He breaks chains and cuts through bars of iron. That's not poetry; it's power.",
      },
    ],
    tip: "Read Romans 6-8 back to back.",
  },
  {
    id: "unforgiveness",
    title: "Unforgiveness",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "Holding on to unforgiveness is like drinking poison and waiting for the other person to get sick. It hurts you most of all.",
    scriptures: [
      {
        reference: "Matthew 18:21-35",
        note: "The unforgiving servant was forgiven millions but couldn't forgive pennies.",
      },
      {
        reference: "Colossians 3:13",
        note: "Forgive as the Lord forgave you. That's the standard.",
      },
      {
        reference: "Mark 11:25",
        note: "When you stand praying, forgive. It's connected to your own relationship with God.",
      },
      {
        reference: "Genesis 50:15-21",
        note: "Joseph forgave the brothers who sold him into slavery. If he could, there's hope for you.",
      },
    ],
    tip: "Read Joseph's story (Gen 37-50).",
  },
  {
    id: "laziness-and-procrastination",
    title: "Laziness & Procrastination",
    category: "sin",
    categoryLabel: "Sin & Temptation",
    description:
      "Putting things off feels harmless in the moment, but it adds up. God has work for you to do, and he's given you what you need to do it.",
    scriptures: [
      {
        reference: "Proverbs 6:6-11",
        note: "Go watch the ants. They don't need a boss to get things done.",
      },
      {
        reference: "Colossians 3:23",
        note: "Work at it with all your heart, as if you're working for the Lord.",
      },
      {
        reference: "Ecclesiastes 9:10",
        note: "Whatever your hand finds to do, do it with all your might.",
      },
      {
        reference: "Proverbs 13:4",
        note: "The sluggard craves but gets nothing. The diligent are fully satisfied.",
      },
    ],
    tip: 'Read the "sluggard" Proverbs together.',
  },

  // ─────────────────────────────────────────────
  // LIFE TRIALS (6)
  // ─────────────────────────────────────────────
  {
    id: "grief-and-loss",
    title: "Grief & Loss",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "There's no shortcut through grief. But God promises to be close to the brokenhearted, and Scripture gives you words when you can't find your own.",
    scriptures: [
      {
        reference: "Psalm 34:18",
        note: "The Lord is close to the brokenhearted. He doesn't stand at a distance.",
      },
      {
        reference: "Revelation 21:4",
        note: "A day is coming when every tear will be wiped away for good.",
      },
      {
        reference: "John 11:35",
        note: "Jesus wept. Two words that prove God understands your grief.",
      },
      {
        reference: "2 Corinthians 1:3-4",
        note: "God comforts you so you can comfort others with the same comfort.",
      },
    ],
    tip: "Read Job slowly over weeks.",
  },
  {
    id: "suffering-and-pain",
    title: "Suffering & Pain",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "When suffering hits, it's natural to ask why. The Bible doesn't always answer that question, but it does tell you who's with you in it.",
    scriptures: [
      {
        reference: "Romans 5:3-5",
        note: "Suffering produces endurance, endurance produces character, character produces hope.",
      },
      {
        reference: "2 Corinthians 4:16-18",
        note: "What you see is temporary. What you can't see is eternal.",
      },
      {
        reference: "Psalm 46",
        note: "God is our refuge and strength. Even when the earth gives way.",
      },
      {
        reference: "1 Peter 4:12-13",
        note: "Don't be surprised by suffering. You're sharing in Christ's experience.",
      },
    ],
    tip: "Read Habakkuk.",
  },
  {
    id: "financial-hardship",
    title: "Financial Hardship",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "Money stress keeps you up at night and colours everything. God doesn't promise to make you rich, but he does promise to provide what you need.",
    scriptures: [
      {
        reference: "Philippians 4:19",
        note: "God will meet all your needs according to his glorious riches.",
      },
      {
        reference: "Matthew 6:31-33",
        note: "Seek his kingdom first. The rest will follow.",
      },
      {
        reference: "Proverbs 30:8-9",
        note: "Give me neither poverty nor riches. Just enough to depend on you.",
      },
      {
        reference: "Psalm 37:25",
        note: "David lived a long life and never saw God's people abandoned.",
      },
    ],
    tip: "Read Proverbs 10-15.",
  },
  {
    id: "illness-and-health",
    title: "Illness & Health",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "When your body fails you, it shakes everything. God cares about your physical suffering just as much as your spiritual life.",
    scriptures: [
      {
        reference: "Psalm 41:3",
        note: "The Lord sustains you on your sickbed and restores you from illness.",
      },
      {
        reference: "James 5:14-16",
        note: "Call for prayer. There's real power in the community praying over you.",
      },
      {
        reference: "2 Corinthians 12:7-10",
        note: "Paul's thorn wasn't removed, but God's grace was enough. Sometimes that's the answer.",
      },
      {
        reference: "Isaiah 53:5",
        note: "By his wounds we are healed. Jesus knows physical pain intimately.",
      },
    ],
    tip: "Read Jesus' healing stories in Mark 1-3.",
  },
  {
    id: "waiting-and-unanswered-prayer",
    title: "Waiting & Unanswered Prayer",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "You've prayed and prayed and nothing seems to change. Waiting on God is one of the hardest things you'll ever do, but it's not wasted time.",
    scriptures: [
      {
        reference: "Psalm 27:14",
        note: "Wait for the Lord. Be strong, take heart, and wait.",
      },
      {
        reference: "Isaiah 40:31",
        note: "Those who wait on the Lord will renew their strength. They'll soar.",
      },
      {
        reference: "Habakkuk 2:3",
        note: "The vision awaits its appointed time. It won't be late.",
      },
      {
        reference: "Genesis 15-21",
        note: "Abraham waited 25 years for the promise. God still came through.",
      },
    ],
    tip: "Read Psalms of Ascent (120-134).",
  },
  {
    id: "persecution-and-opposition",
    title: "Persecution & Opposition",
    category: "life-trials",
    categoryLabel: "Life Trials",
    description:
      "Following Jesus was never supposed to be popular. If you're getting pushback for your faith, you're actually in good company.",
    scriptures: [
      {
        reference: "Matthew 5:10-12",
        note: "Blessed are those who are persecuted. Rejoice, because your reward is great.",
      },
      {
        reference: "2 Timothy 3:12",
        note: "Everyone who wants to live a godly life will face persecution. It's a when, not an if.",
      },
      {
        reference: "1 Peter 4:12-16",
        note: "Don't be surprised by the fiery trial. Rejoice that you share in Christ's sufferings.",
      },
      {
        reference: "Acts 5:40-42",
        note: "The apostles left rejoicing that they were counted worthy to suffer for Jesus.",
      },
    ],
    tip: "Read Acts.",
  },

  // ─────────────────────────────────────────────
  // RELATIONSHIPS (4)
  // ─────────────────────────────────────────────
  {
    id: "marriage-struggles",
    title: "Marriage Struggles",
    category: "relationships",
    categoryLabel: "Relationships",
    description:
      "Marriage is beautiful and brutally hard, sometimes in the same afternoon. God designed it, and he's got wisdom for the rough patches.",
    scriptures: [
      {
        reference: "1 Corinthians 13:4-7",
        note: "Love is patient, love is kind. Read it slowly and let it challenge you.",
      },
      {
        reference: "Ephesians 5:21-33",
        note: "Mutual submission and sacrificial love. That's the blueprint.",
      },
      {
        reference: "Song of Solomon",
        note: "A whole book celebrating romantic love. God's not embarrassed by it.",
      },
      {
        reference: "Colossians 3:12-14",
        note: "Clothe yourself with compassion, kindness, humility, and patience. Above all, love.",
      },
    ],
    tip: "Read Song of Solomon together.",
  },
  {
    id: "broken-friendships",
    title: "Broken Friendships",
    category: "relationships",
    categoryLabel: "Relationships",
    description:
      "Losing a close friend can hurt as much as any breakup. Scripture understands betrayal, distance, and the hope of reconciliation.",
    scriptures: [
      {
        reference: "Proverbs 17:17",
        note: "A friend loves at all times. That's the gold standard for friendship.",
      },
      {
        reference: "Psalm 41:9",
        note: "Even David knew what it felt like to be betrayed by a close friend.",
      },
      {
        reference: "Proverbs 27:5-6",
        note: "Wounds from a friend can be trusted. Honest friends are worth keeping.",
      },
      {
        reference: "Romans 12:17-21",
        note: "Don't repay evil with evil. Overcome evil with good.",
      },
    ],
    tip: "Read about David and Jonathan (1 Sam 18-20).",
  },
  {
    id: "parenting-challenges",
    title: "Parenting Challenges",
    category: "relationships",
    categoryLabel: "Relationships",
    description:
      "Kids don't come with a manual, but God's word has more to say about raising them than you might expect. You don't have to figure this out alone.",
    scriptures: [
      {
        reference: "Proverbs 22:6",
        note: "Train up a child in the way they should go. It's an investment that pays off.",
      },
      {
        reference: "Deuteronomy 6:6-9",
        note: "Talk about God's word everywhere: at home, on the road, morning and night.",
      },
      {
        reference: "Ephesians 6:4",
        note: "Don't exasperate your children. Bring them up with the Lord's instruction.",
      },
      {
        reference: "Psalm 127:3",
        note: "Children are a gift from the Lord. Even on the hard days.",
      },
    ],
    tip: "Read the prodigal son (Luke 15:11-32).",
  },
  {
    id: "conflict-and-difficult-people",
    title: "Conflict & Difficult People",
    category: "relationships",
    categoryLabel: "Relationships",
    description:
      "Some people test every ounce of your patience. God calls you to love them anyway, and he gives you practical wisdom for how.",
    scriptures: [
      {
        reference: "Romans 12:14-18",
        note: "If it's possible, as far as it depends on you, live at peace with everyone.",
      },
      {
        reference: "Matthew 18:15-17",
        note: "Jesus gave a clear process for dealing with conflict. Follow it.",
      },
      {
        reference: "Proverbs 15:1",
        note: "A gentle answer turns away wrath. It works more often than you'd think.",
      },
      {
        reference: "Matthew 5:44",
        note: "Love your enemies and pray for those who persecute you. That's the Jesus way.",
      },
    ],
    tip: "Read Romans 12.",
  },

  // ─────────────────────────────────────────────
  // IDENTITY (3)
  // ─────────────────────────────────────────────
  {
    id: "low-self-worth",
    title: "Low Self-Worth",
    category: "identity",
    categoryLabel: "Identity",
    description:
      "The voice in your head says you're not enough. God's voice says something completely different, and his opinion is the one that matters.",
    scriptures: [
      {
        reference: "Psalm 139:13-16",
        note: "You were knit together with intention. Every detail was on purpose.",
      },
      {
        reference: "Ephesians 2:10",
        note: "You're God's handiwork, created for good works he planned in advance.",
      },
      {
        reference: "Jeremiah 1:5",
        note: "Before you were born, God knew you and set you apart.",
      },
      {
        reference: "1 Peter 2:9",
        note: "You're chosen, royal, holy, and belonging to God. That's your identity.",
      },
    ],
    tip: "Read Psalm 139 daily for a week.",
  },
  {
    id: "purpose-and-direction",
    title: "Purpose & Direction",
    category: "identity",
    categoryLabel: "Identity",
    description:
      "You're not sure what you're supposed to be doing with your life. That uncertainty is more common than you think, and God's not in a rush.",
    scriptures: [
      {
        reference: "Proverbs 3:5-6",
        note: "Trust the Lord with all your heart. He'll make your paths straight.",
      },
      {
        reference: "Jeremiah 29:11",
        note: "Plans to prosper you, not to harm you. Plans for hope and a future.",
      },
      {
        reference: "Romans 8:28",
        note: "God works all things together for good. Even the confusing seasons.",
      },
      {
        reference: "Psalm 32:8",
        note: "God says: I will instruct you and teach you the way to go.",
      },
    ],
    tip: "Read Ruth.",
  },
  {
    id: "failure-and-starting-over",
    title: "Failure & Starting Over",
    category: "identity",
    categoryLabel: "Identity",
    description:
      "You messed up and you're wondering if it's too late for a fresh start. The Bible is full of people who failed spectacularly and were still used by God.",
    scriptures: [
      {
        reference: "Lamentations 3:22-23",
        note: "His mercies are new every morning. Every single morning.",
      },
      {
        reference: "Micah 7:8",
        note: "Though I have fallen, I will rise. The Lord will be my light.",
      },
      {
        reference: "2 Corinthians 5:17",
        note: "If anyone is in Christ, the new creation has come. The old is gone.",
      },
      {
        reference: "John 21:15-19",
        note: "Peter denied Jesus three times, and Jesus restored him three times. That's grace.",
      },
    ],
    tip: "Follow Peter's story from Mark 14 to Acts 2.",
  },

  // ─────────────────────────────────────────────
  // SPIRITUAL LIFE (4)
  // ─────────────────────────────────────────────
  {
    id: "doubt-and-questioning",
    title: "Doubt & Questioning",
    category: "spiritual",
    categoryLabel: "Spiritual Life",
    description:
      "Doubt doesn't mean you've lost your faith. Some of the most honest prayers in the Bible came from people who weren't sure God was listening.",
    scriptures: [
      {
        reference: "Mark 9:24",
        note: "\"I believe; help my unbelief!\" One of the most honest prayers ever prayed.",
      },
      {
        reference: "Psalm 73",
        note: "Asaph almost gave up on faith. Then he went into God's sanctuary.",
      },
      {
        reference: "John 20:24-29",
        note: "Thomas doubted, and Jesus didn't scold him. He showed up.",
      },
      {
        reference: "Habakkuk 1-2",
        note: "Habakkuk asked God the hard questions directly. God answered.",
      },
    ],
    tip: "Read Ecclesiastes.",
  },
  {
    id: "spiritual-dryness",
    title: "Spiritual Dryness",
    category: "spiritual",
    categoryLabel: "Spiritual Life",
    description:
      "God feels distant, prayer feels hollow, and the Bible feels like just words on a page. You haven't done anything wrong. Dry seasons happen to everyone.",
    scriptures: [
      {
        reference: "Psalm 63:1",
        note: "My soul thirsts for you in a dry and weary land. David's been where you are.",
      },
      {
        reference: "Isaiah 43:19",
        note: "God makes streams in the wasteland. He's doing something new, even now.",
      },
      {
        reference: "Psalm 42:1-2",
        note: "As the deer pants for water, my soul pants for you, God.",
      },
      {
        reference: "1 Kings 19:4-8",
        note: "Elijah was burnt out and ready to quit. God sent food and let him rest.",
      },
    ],
    tip: "Read the Psalms of thirst (42, 63, 84).",
  },
  {
    id: "new-believer",
    title: "New Believer",
    category: "spiritual",
    categoryLabel: "Spiritual Life",
    description:
      "Welcome. You've just started the most important journey of your life. These readings will give you solid ground to stand on as you grow.",
    scriptures: [
      {
        reference: "John's Gospel",
        note: "The best place to start. John wrote it so you'd believe and have life.",
      },
      {
        reference: "Psalm 1",
        note: "A short psalm about what it looks like to build your life on God's word.",
      },
      {
        reference: "Romans 8",
        note: "One of the greatest chapters ever written. No condemnation, nothing can separate you.",
      },
      {
        reference: "Ephesians",
        note: "Six chapters on who you are in Christ and how to live it out.",
      },
    ],
    tip: "Read John, one chapter a day, for 21 days.",
  },
  {
    id: "gratitude-and-joy",
    title: "Gratitude & Joy",
    category: "spiritual",
    categoryLabel: "Spiritual Life",
    description:
      "Joy isn't the absence of problems; it's the presence of God. And gratitude is the fastest way to shift your perspective on a hard day.",
    scriptures: [
      {
        reference: "Psalm 100",
        note: "Enter his gates with thanksgiving. This psalm is pure, concentrated praise.",
      },
      {
        reference: "1 Thessalonians 5:16-18",
        note: "Rejoice always, pray continually, give thanks in all circumstances.",
      },
      {
        reference: "Philippians 4:4",
        note: "Rejoice in the Lord always. Paul said it twice because he meant it.",
      },
      {
        reference: "Nehemiah 8:10",
        note: "The joy of the Lord is your strength. Not happiness. Joy.",
      },
    ],
    tip: "End each day with Psalms 145-150.",
  },
];
