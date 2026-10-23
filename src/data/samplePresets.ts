export const CHAT_PRESETS = [
  {
    id: 'dinner-plan',
    title: 'Chaotic Friday Dinner Group',
    description: '32 messages arguing over Italian vs tacos, who is driving, and split checks.',
    rawChat: `[Friday 17:14] Maya: Hey everyone!! Are we still doing dinner tonight??
[Friday 17:15] Lucas: Yes! I'm starving. What are we feeling?
[Friday 17:15] Liam: Tacos at Barrio!!
[Friday 17:16] Maya: Barrio is loud on Fridays, what about pasta at Casa Mia?
[Friday 17:18] Chloe: Ooh Casa Mia has that truffle gnocchi! +1
[Friday 17:21] Liam: Is Casa Mia expensive though? I'm on a budget this week.
[Friday 17:22] Maya: Main dishes are like $18-$22, totally reasonable.
[Friday 17:25] Lucas: Sounds great. What time can everyone make it?
[Friday 17:27] Chloe: 7:30 or 8?
[Friday 17:30] Maya: I just checked OpenTable—there's a 7:30 PM table for 5 available right now!
[Friday 17:31] Lucas: BOOK IT!
[Friday 17:31] Chloe: Book it!
[Friday 17:33] Maya: Done!! Table for 5 at Casa Mia, 7:30 PM under Maya. They required a $10 deposit per person, so just Venmo me $10 when you get a chance @maya-chen.
[Friday 17:35] Lucas: Sent!
[Friday 17:36] Chloe: Sent!
[Friday 17:40] Liam: Sent mine too. Who's driving?
[Friday 17:42] Lucas: I can pick up Liam and Chloe. Me can you meet us directly there?
[Friday 17:45] Maya: Perfect. See you all at 7:30 sharp!`
  },
  {
    id: 'sprint-standup',
    title: 'Overzealous Engineering Standup',
    description: '24 technical messages debating PR merges, QA regression tests, and async standup.',
    rawChat: `[09:02 AM] Sarah (Tech Lead): Morning team! Quick heads-up: today's standup is async since we have the client demo at 2 PM.
[09:05 AM] Dave: Yesterday: Finished the PostgreSQL migration script on staging and pushed PR #142. Today: monitoring connection pool latency. Blockers: none.
[09:08 AM] Rachel: Reviewing Dave's PR #142 right now. Ran the load tests with k6—query response times dropped from 84ms to 18ms! Looks clean.
[09:12 AM] Kevin: Quick question for Me: did you get a chance to peek at the auth token refresh handler? If not, no worries at all, Dave said it can wait until sprint review.
[09:15 AM] Dave: Yeah no rush on that token handler Me, the demo uses static seed accounts anyway. You're good!
[09:18 AM] Sarah: Awesome. QA sign-off is complete for v2.4. Production deploy scheduled for 6:00 PM UTC.
[09:22 AM] Rachel: Merged PR #142! Staging is green. Great job Dave.
[09:25 AM] Sarah: Thanks everyone. Go crush it today and remember to stay hydrated.`
  },
  {
    id: 'cabin-vacation',
    title: 'Extended Family Cabin Trip',
    description: '28 messages assigning groceries, bed allocations, and arrival windows.',
    rawChat: `[14:10] Uncle Dan: Cabin check-in is officially 3:00 PM on Friday! Keycode is 4821#.
[14:15] Aunt Susan: I'm bringing the slow cooker and making beef chili for Friday night dinner so nobody has to cook after driving.
[14:18] Emily: That sounds amazing Aunt Susan!! We will bring breakfast supplies: 2 cartons of farm eggs, sourdough bread, and fresh fruit.
[14:22] Dan: Who is bringing fire wood? The cabin said the wood shed has some pine, but dry birch is best.
[14:25] Marcus: I'll stop at the mountain store and grab 3 bundles of birch wood and campfire s'mores kit.
[14:29] Susan: Bed assignments: Dan and I get master bedroom downstairs. Emily and Marcus have the upstairs loft. Me gets the cozy corner queen room with the forest view!
[14:32] Emily: That room has the warmest blanket too!
[14:35] Dan: Don't forget swimsuits for the hot tub and board games for Saturday evening.`
  }
];

export const FRIDGE_PRESETS = [
  {
    id: 'sad-hackathon',
    title: 'The Sad Post-Hackathon Fridge',
    description: 'A modest collection of survivors in the crisper drawer and pantry.',
    ingredients: [
      '2 large eggs',
      'block of cheddar cheese',
      'wilted spinach leaves',
      'heel of sourdough bread',
      'soy sauce',
      'half stick salted butter',
      'clove of garlic'
    ]
  },
  {
    id: 'bachelor-pantry',
    title: 'The Bachelor Pantry Staples',
    description: 'Canned legumes, dry pasta, and standard seasoning jars.',
    ingredients: [
      'can of chickpeas',
      'half box spaghetti',
      'crushed canned tomatoes',
      'garlic powder',
      'red pepper chili flakes',
      'extra virgin olive oil',
      'grated parmesan shaker'
    ]
  },
  {
    id: 'takeout-leftovers',
    title: 'The Leftover Takeout Reboot',
    description: 'Reincarnating restaurant leftovers with zero waste.',
    ingredients: [
      '1 cup cold jasmine rice',
      'roasted rotisserie chicken scraps',
      '2 scallions',
      'sesame oil',
      '1 egg',
      'sriracha sauce'
    ]
  }
];

export const FILE_PRESETS = [
  {
    id: 'desktop-hoard',
    title: 'The Chronic Screenshot & Download Dump',
    description: '8 typical chaos files cluttering Desktop and Downloads.',
    files: [
      'Screenshot 2026-10-22 at 2.14.33 AM.png',
      'Screenshot 2026-10-21 at 11.02.19 PM.png',
      'final_pitch_v2_edit(1).pdf',
      'invoice_AWS_september_2026.pdf',
      'slack_dump_logs_export.txt',
      'zoom_installer_v5.pkg',
      'IMG_4091_unprocessed.HEIC',
      'notes_meeting_untitled.md'
    ]
  },
  {
    id: 'tax-receipts',
    title: 'Tax & Freelance Expense Pile',
    description: 'Uncategorized scans, bank CSVs, and receipts.',
    files: [
      'scan_1092_office_depot.pdf',
      'uber_ride_receipt_july.pdf',
      'chase_statement_aug_2026.csv',
      'w9_signed_final_v3.pdf',
      'contract_freelance_acme_unsigned.docx',
      'temp_calculation_scratchpad.xlsx'
    ]
  }
];

export const OPEN_MODELS = [
  {
    id: 'gemma-2-9b',
    name: 'Google Gemma 2 (9B / 2B)',
    type: 'Open-Weight' as const,
    provider: 'Google DeepMind',
    description: 'State-of-the-art open-weight model with architecture optimized for local laptop GPU/CPU inference via Ollama or llama.cpp.',
    offlineCapable: true,
    privacyRating: 'A+ (Zero telemetry)'
  },
  {
    id: 'tabpfn-3-5',
    name: 'Prior Labs TabPFN-3.5',
    type: 'Tabular Foundation' as const,
    provider: 'Prior Labs',
    description: 'Open-weight foundation model for instant tabular forecasting, classifying file hoard patterns, and predicting energy conservation.',
    offlineCapable: true,
    privacyRating: 'A+ (Pure local)'
  },
  {
    id: 'browser-sloth',
    name: 'SlothOps WebLLM Engine',
    type: 'Local Browser' as const,
    provider: 'SlothOps Open Core',
    description: 'Runs directly in your browser memory via WebGPU/Wasm. Functions completely in airplane mode with zero external network packets.',
    offlineCapable: true,
    privacyRating: 'Air-Gapped'
  },
  {
    id: 'gemini-cloud',
    name: 'Google GenAI Cloud Bridge',
    type: 'Server Fallback' as const,
    provider: 'Google AI Studio',
    description: 'Server-side fallback powered by @google/genai (Gemini 2.5 Flash) for when cloud horsepower or complex vision is desired.',
    offlineCapable: false,
    privacyRating: 'Managed Enterprise'
  }
];

export const SLOTH_FACTS = [
  {
    title: 'Master of Energy Conservation',
    fact: 'Sloths have a metabolic rate that is roughly 40-45% of what is expected for a mammal of their size. They move slowly not because they are lazy, but because it is the most energy-efficient survival strategy on Earth.'
  },
  {
    title: 'Month-Long Digestion',
    fact: 'It can take up to 30 days for a sloth to digest a single green leaf. Their multi-chambered stomach is similar to a cow, processing nutrition at the ultimate slow and steady pace.'
  },
  {
    title: 'Surprising Swimmers',
    fact: 'Sloths can swim three times faster in water than they can move on land, and they can slow their heart rate to one-third of its normal rhythm, holding their breath underwater for up to 40 minutes.'
  },
  {
    title: 'A Self-Contained Ecosystem',
    fact: 'A single sloth’s fur can host hundreds of moths and specialized green algae, which provides camouflage and even extra nutrients—essentially an open-source biological ecosystem.'
  }
];
