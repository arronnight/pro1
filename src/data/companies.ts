import { Company } from '../types/game';

export const companiesDatabase: Company[] = [
  {
    id: 'wwe',
    name: 'World Wrestling Entertainment',
    type: 'major',
    money: 500000000,
    popularity: 95,
    tvDeal: { network: 'USA Network/Fox', value: 200000000, duration: 3 },
    roster: ['roman-reigns', 'cody-rhodes', 'seth-rollins'],
    championships: [
      { id: 'wwe-championship', name: 'WWE Championship', prestige: 100, holder: 'cody-rhodes', history: [] },
      { id: 'universal-championship', name: 'Universal Championship', prestige: 95, holder: 'roman-reigns', history: [] },
      { id: 'intercontinental-championship', name: 'Intercontinental Championship', prestige: 80, holder: null, history: [] }
    ],
    venues: ['Madison Square Garden', 'Staples Center', 'Allstate Arena'],
    rivals: ['aew'],
    era: '2020s',
    founded: '1953',
    logo: '🏆',
    trainingFacility: true,
    weeklyShows: [
      { id: 'raw', name: 'Monday Night Raw', dayOfWeek: 1, venue: 'Various Arenas', duration: 3, tvDeal: true },
      { id: 'smackdown', name: 'Friday Night SmackDown', dayOfWeek: 5, venue: 'Various Arenas', duration: 2, tvDeal: true }
    ],
    monthlyShows: [
      { id: 'wrestlemania', name: 'WrestleMania', dayOfMonth: 15, venue: 'Stadium', duration: 6, ppv: true },
      { id: 'summerslam', name: 'SummerSlam', dayOfMonth: 20, venue: 'Arena', duration: 4, ppv: true }
    ]
  },
  {
    id: 'aew',
    name: 'All Elite Wrestling',
    type: 'major',
    money: 100000000,
    popularity: 85,
    tvDeal: { network: 'TNT/TBS', value: 45000000, duration: 2 },
    roster: ['jon-moxley', 'cm-punk'],
    championships: [
      { id: 'aew-world-championship', name: 'AEW World Championship', prestige: 90, holder: 'jon-moxley', history: [] },
      { id: 'aew-tnt-championship', name: 'TNT Championship', prestige: 75, holder: null, history: [] }
    ],
    venues: ['Daily\'s Place', 'United Center', 'Prudential Center'],
    rivals: ['wwe'],
    era: '2020s',
    founded: '2019',
    logo: '⚡',
    trainingFacility: true,
    weeklyShows: [
      { id: 'dynamite', name: 'AEW Dynamite', dayOfWeek: 3, venue: 'Various Arenas', duration: 2, tvDeal: true },
      { id: 'rampage', name: 'AEW Rampage', dayOfWeek: 5, venue: 'Various Arenas', duration: 1, tvDeal: true }
    ],
    monthlyShows: [
      { id: 'all-out', name: 'All Out', dayOfMonth: 5, venue: 'NOW Arena', duration: 4, ppv: true },
      { id: 'revolution', name: 'Revolution', dayOfMonth: 25, venue: 'Various Arenas', duration: 4, ppv: true }
    ]
  },
  {
    id: 'njpw',
    name: 'New Japan Pro Wrestling',
    type: 'major',
    money: 50000000,
    popularity: 78,
    tvDeal: { network: 'TV Asahi', value: 15000000, duration: 4 },
    roster: ['hiroshi-tanahashi'],
    championships: [
      { id: 'iwgp-heavyweight-championship', name: 'IWGP Heavyweight Championship', prestige: 95, holder: 'hiroshi-tanahashi', history: [] },
      { id: 'iwgp-us-championship', name: 'IWGP US Championship', prestige: 80, holder: null, history: [] }
    ],
    venues: ['Tokyo Dome', 'Ryogoku Kokugikan', 'Osaka Castle Hall'],
    rivals: ['aew'],
    era: '2020s',
    founded: '1972',
    logo: '🌸',
    trainingFacility: true,
    weeklyShows: [
      { id: 'njpw-strong', name: 'NJPW Strong', dayOfWeek: 6, venue: 'Various Venues', duration: 1, tvDeal: false }
    ],
    monthlyShows: [
      { id: 'wrestle-kingdom', name: 'Wrestle Kingdom', dayOfMonth: 4, venue: 'Tokyo Dome', duration: 5, ppv: true },
      { id: 'dominion', name: 'Dominion', dayOfMonth: 12, venue: 'Osaka Castle Hall', duration: 4, ppv: true }
    ]
  },
  {
    id: 'impact',
    name: 'Impact Wrestling',
    type: 'indie',
    money: 10000000,
    popularity: 65,
    tvDeal: { network: 'AXS TV', value: 3000000, duration: 2 },
    roster: ['moose'],
    championships: [
      { id: 'impact-world-championship', name: 'Impact World Championship', prestige: 75, holder: 'moose', history: [] }
    ],
    venues: ['Impact Zone', 'Sands Bethlehem Event Center'],
    rivals: [],
    era: '2020s',
    founded: '2002',
    logo: '💥',
    trainingFacility: false,
    weeklyShows: [
      { id: 'impact', name: 'Impact Wrestling', dayOfWeek: 4, venue: 'Impact Zone', duration: 2, tvDeal: true }
    ],
    monthlyShows: [
      { id: 'bound-for-glory', name: 'Bound for Glory', dayOfMonth: 15, venue: 'Various Venues', duration: 3, ppv: true }
    ]
  },
  {
    id: 'roh',
    name: 'Ring of Honor',
    type: 'indie',
    money: 8000000,
    popularity: 60,
    tvDeal: null,
    roster: [],
    championships: [
      { id: 'roh-world-championship', name: 'ROH World Championship', prestige: 70, holder: null, history: [] }
    ],
    venues: ['Hammerstein Ballroom', '2300 Arena'],
    rivals: [],
    era: '2020s',
    founded: '2002',
    logo: '👑',
    trainingFacility: false,
    weeklyShows: [],
    monthlyShows: [
      { id: 'death-before-dishonor', name: 'Death Before Dishonor', dayOfMonth: 28, venue: 'Various Venues', duration: 3, ppv: true }
    ]
  },
  {
    id: 'gcw',
    name: 'Game Changer Wrestling',
    type: 'indie',
    money: 2000000,
    popularity: 55,
    tvDeal: null,
    roster: [],
    championships: [
      { id: 'gcw-world-championship', name: 'GCW World Championship', prestige: 65, holder: null, history: [] }
    ],
    venues: ['Collective at WrestleMania Weekend'],
    rivals: [],
    era: '2020s',
    founded: '2015',
    logo: '🎮',
    trainingFacility: false,
    weeklyShows: [],
    monthlyShows: []
  }
];

// Generate additional indie companies
const generateIndieCompanies = (count: number): Company[] => {
  const names = [
    'Extreme Championship Wrestling', 'Pro Wrestling Guerrilla', 'Combat Zone Wrestling',
    'Chikara Pro', 'Dragon Gate USA', 'Evolve Wrestling', 'Beyond Wrestling',
    'Game Changer Wrestling', 'Major League Wrestling', 'Warrior Wrestling',
    'Black Label Pro', 'Josh Bishop Presents', 'ACTION Wrestling', 'Southern Honor Wrestling',
    'Paradigm Pro Wrestling', 'Glory Pro Wrestling', 'Limitless Wrestling', 'Northeast Wrestling'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `indie-${i}`,
    name: names[Math.floor(Math.random() * names.length)] + ` ${i + 1}`,
    type: 'indie' as const,
    money: Math.floor(Math.random() * 5000000) + 500000,
    popularity: Math.floor(Math.random() * 40) + 30,
    tvDeal: Math.random() < 0.3 ? { 
      network: 'Local TV', 
      value: Math.floor(Math.random() * 1000000) + 100000, 
      duration: Math.floor(Math.random() * 3) + 1 
    } : null,
    roster: [],
    championships: [
      { 
        id: `indie-${i}-championship`, 
        name: `Championship`, 
        prestige: Math.floor(Math.random() * 30) + 40, 
        holder: null, 
        history: [] 
      }
    ],
    venues: [`Local Arena ${i + 1}`, `Community Center ${i + 1}`],
    rivals: [],
    era: '2020s',
    founded: '2015',
    logo: '🏟️',
    trainingFacility: Math.random() < 0.2,
    weeklyShows: Math.random() < 0.4 ? [
      { 
        id: `indie-${i}-weekly`, 
        name: `Weekly Show ${i + 1}`, 
        dayOfWeek: Math.floor(Math.random() * 7), 
        venue: `Local Venue ${i + 1}`, 
        duration: 2, 
        tvDeal: false 
      }
    ] : [],
    monthlyShows: Math.random() < 0.6 ? [
      { 
        id: `indie-${i}-monthly`, 
        name: `Monthly Special ${i + 1}`, 
        dayOfMonth: Math.floor(Math.random() * 28) + 1, 
        venue: `Special Venue ${i + 1}`, 
        duration: 3, 
        ppv: true 
      }
    ] : []
  }));
};

export const allCompanies = [...companiesDatabase, ...generateIndieCompanies(44)];