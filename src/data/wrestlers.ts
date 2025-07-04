import { Wrestler } from '../types/game';

export const wrestlerDatabase: Wrestler[] = [
  // WWE Superstars
  {
    id: 'roman-reigns',
    name: 'Roman Reigns',
    company: 'wwe',
    ovr: 92,
    charisma: 88,
    wrestling: 85,
    entertainment: 90,
    mic: 82,
    look: 95,
    strength: 95,
    speed: 75,
    stamina: 90,
    moveset: ['Samoan Drop', 'Superman Punch', 'Powerbomb', 'Spear'],
    finishers: ['Spear', 'Guillotine Choke'],
    signatures: ['Superman Punch', 'Samoan Drop'],
    contract: { salary: 2500000, duration: 3 },
    injured: false,
    heat: {},
    pushLevel: 'main-event',
    age: 38,
    experience: 13,
    popularity: 95,
    alignment: 'heel',
    gimmick: 'Tribal Chief',
    hometown: 'Pensacola, Florida',
    height: '6\'3"',
    weight: '265 lbs',
    debut: '2012',
    momentum: 85,
    fatigue: 10
  },
  {
    id: 'cody-rhodes',
    name: 'Cody Rhodes',
    company: 'wwe',
    ovr: 90,
    charisma: 92,
    wrestling: 88,
    entertainment: 85,
    mic: 90,
    look: 87,
    strength: 80,
    speed: 85,
    stamina: 88,
    moveset: ['Bionic Elbow', 'Disaster Kick', 'Cross Rhodes', 'Figure Four'],
    finishers: ['Cross Rhodes', 'Cody Cutter'],
    signatures: ['Disaster Kick', 'Bionic Elbow'],
    contract: { salary: 2000000, duration: 4 },
    injured: false,
    heat: { 'roman-reigns': 75 },
    pushLevel: 'main-event',
    age: 38,
    experience: 18,
    popularity: 88,
    alignment: 'face',
    gimmick: 'American Nightmare',
    hometown: 'Marietta, Georgia',
    height: '6\'1"',
    weight: '220 lbs',
    debut: '2006',
    momentum: 80,
    fatigue: 15
  },
  {
    id: 'seth-rollins',
    name: 'Seth Rollins',
    company: 'wwe',
    ovr: 91,
    charisma: 85,
    wrestling: 93,
    entertainment: 88,
    mic: 87,
    look: 89,
    strength: 82,
    speed: 90,
    stamina: 92,
    moveset: ['Superkick', 'Knee Trembler', 'Slingblade', 'Frog Splash'],
    finishers: ['Stomp', 'Pedigree'],
    signatures: ['Superkick', 'Knee Trembler'],
    contract: { salary: 2200000, duration: 2 },
    injured: false,
    heat: {},
    pushLevel: 'main-event',
    age: 37,
    experience: 16,
    popularity: 85,
    alignment: 'face',
    gimmick: 'Monday Night Messiah',
    hometown: 'Davenport, Iowa',
    height: '6\'1"',
    weight: '217 lbs',
    debut: '2012',
    momentum: 75,
    fatigue: 20
  },
  // AEW Stars
  {
    id: 'jon-moxley',
    name: 'Jon Moxley',
    company: 'aew',
    ovr: 89,
    charisma: 91,
    wrestling: 87,
    entertainment: 85,
    mic: 92,
    look: 83,
    strength: 88,
    speed: 78,
    stamina: 90,
    moveset: ['Knee Trembler', 'Elbow Drop', 'DDT', 'Lariat'],
    finishers: ['Paradigm Shift', 'Bulldog Choke'],
    signatures: ['Knee Trembler', 'Lariat'],
    contract: { salary: 1800000, duration: 3 },
    injured: false,
    heat: {},
    pushLevel: 'main-event',
    age: 38,
    experience: 15,
    popularity: 82,
    alignment: 'face',
    gimmick: 'Purveyor of Violence',
    hometown: 'Cincinnati, Ohio',
    height: '6\'4"',
    weight: '234 lbs',
    debut: '2004',
    momentum: 70,
    fatigue: 25
  },
  {
    id: 'cm-punk',
    name: 'CM Punk',
    company: 'aew',
    ovr: 88,
    charisma: 95,
    wrestling: 85,
    entertainment: 90,
    mic: 98,
    look: 80,
    strength: 75,
    speed: 82,
    stamina: 85,
    moveset: ['Scoop Slam', 'Roundhouse Kick', 'Springboard Clothesline'],
    finishers: ['GTS', 'Anaconda Vise'],
    signatures: ['Roundhouse Kick', 'Springboard Clothesline'],
    contract: { salary: 2500000, duration: 2 },
    injured: true,
    injuryDays: 30,
    heat: { 'the-elite': 80 },
    pushLevel: 'main-event',
    age: 45,
    experience: 23,
    popularity: 90,
    alignment: 'face',
    gimmick: 'Best in the World',
    hometown: 'Chicago, Illinois',
    height: '6\'2"',
    weight: '218 lbs',
    debut: '1999',
    momentum: 60,
    fatigue: 40
  },
  // New Japan
  {
    id: 'hiroshi-tanahashi',
    name: 'Hiroshi Tanahashi',
    company: 'njpw',
    ovr: 87,
    charisma: 89,
    wrestling: 92,
    entertainment: 85,
    mic: 78,
    look: 88,
    strength: 78,
    speed: 85,
    stamina: 88,
    moveset: ['Dragon Screw', 'Slingblade', 'High Fly Flow'],
    finishers: ['High Fly Flow', 'Cloverleaf'],
    signatures: ['Dragon Screw', 'Slingblade'],
    contract: { salary: 800000, duration: 1 },
    injured: false,
    heat: {},
    pushLevel: 'main-event',
    age: 47,
    experience: 25,
    popularity: 85,
    alignment: 'face',
    gimmick: 'Once in a Century Talent',
    hometown: 'Ogaki, Japan',
    height: '5\'11"',
    weight: '227 lbs',
    debut: '1999',
    momentum: 65,
    fatigue: 30
  },
  // Impact Wrestling
  {
    id: 'moose',
    name: 'Moose',
    company: 'impact',
    ovr: 84,
    charisma: 80,
    wrestling: 85,
    entertainment: 82,
    mic: 75,
    look: 90,
    strength: 92,
    speed: 70,
    stamina: 85,
    moveset: ['Big Boot', 'Samoan Drop', 'Spear'],
    finishers: ['Spear', 'Lights Out'],
    signatures: ['Big Boot', 'Samoan Drop'],
    contract: { salary: 300000, duration: 2 },
    injured: false,
    heat: {},
    pushLevel: 'main-event',
    age: 40,
    experience: 8,
    popularity: 70,
    alignment: 'heel',
    gimmick: 'TNA Wrestling',
    hometown: 'Detroit, Michigan',
    height: '6\'5"',
    weight: '300 lbs',
    debut: '2016',
    momentum: 55,
    fatigue: 20
  },
  // Free Agents
  {
    id: 'brock-lesnar',
    name: 'Brock Lesnar',
    company: 'free-agent',
    ovr: 94,
    charisma: 85,
    wrestling: 95,
    entertainment: 88,
    mic: 70,
    look: 98,
    strength: 100,
    speed: 75,
    stamina: 95,
    moveset: ['German Suplex', 'Belly to Belly', 'Kimura Lock'],
    finishers: ['F5', 'Kimura Lock'],
    signatures: ['German Suplex', 'Belly to Belly'],
    contract: { salary: 0, duration: 0 },
    injured: false,
    heat: {},
    pushLevel: 'legend',
    age: 46,
    experience: 22,
    popularity: 92,
    alignment: 'heel',
    gimmick: 'Beast Incarnate',
    hometown: 'Webster, South Dakota',
    height: '6\'3"',
    weight: '286 lbs',
    debut: '2002',
    momentum: 90,
    fatigue: 5
  }
];

// Generate additional wrestlers for a fuller roster
const generateRandomWrestlers = (count: number): Wrestler[] => {
  const names = [
    'Thunder Strike', 'Lightning Bolt', 'Steel Crusher', 'Iron Wolf', 'Savage Beast',
    'Diamond Edge', 'Viper King', 'Phoenix Rising', 'Storm Bringer', 'Shadow Walker',
    'Blade Runner', 'Fire Storm', 'Ice Cold', 'Wild Card', 'Power House',
    'Speed Demon', 'Night Crawler', 'Stone Cold', 'Hot Shot', 'Quick Silver'
  ];
  
  const companies = ['wwe', 'aew', 'njpw', 'impact', 'roh', 'gcw', 'free-agent'];
  const alignments: ('face' | 'heel' | 'neutral')[] = ['face', 'heel', 'neutral'];
  const pushLevels: ('jobber' | 'midcard' | 'upper-midcard' | 'main-event' | 'legend')[] = 
    ['jobber', 'midcard', 'upper-midcard', 'main-event'];

  return Array.from({ length: count }, (_, i) => ({
    id: `generated-${i}`,
    name: names[Math.floor(Math.random() * names.length)] + ` ${i + 1}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    ovr: Math.floor(Math.random() * 40) + 60,
    charisma: Math.floor(Math.random() * 50) + 50,
    wrestling: Math.floor(Math.random() * 50) + 50,
    entertainment: Math.floor(Math.random() * 50) + 50,
    mic: Math.floor(Math.random() * 50) + 50,
    look: Math.floor(Math.random() * 50) + 50,
    strength: Math.floor(Math.random() * 50) + 50,
    speed: Math.floor(Math.random() * 50) + 50,
    stamina: Math.floor(Math.random() * 50) + 50,
    moveset: ['Punch', 'Kick', 'Slam', 'Drop'],
    finishers: ['Finisher Move', 'Signature Move'],
    signatures: ['Signature Move 1', 'Signature Move 2'],
    contract: { salary: Math.floor(Math.random() * 500000) + 100000, duration: Math.floor(Math.random() * 3) + 1 },
    injured: Math.random() < 0.1,
    injuryDays: Math.random() < 0.1 ? Math.floor(Math.random() * 60) + 7 : undefined,
    heat: {},
    pushLevel: pushLevels[Math.floor(Math.random() * pushLevels.length)],
    age: Math.floor(Math.random() * 20) + 25,
    experience: Math.floor(Math.random() * 15) + 1,
    popularity: Math.floor(Math.random() * 80) + 20,
    alignment: alignments[Math.floor(Math.random() * alignments.length)],
    gimmick: 'Generic Wrestler',
    hometown: 'Parts Unknown',
    height: '6\'0"',
    weight: '220 lbs',
    debut: '2020',
    momentum: Math.floor(Math.random() * 100),
    fatigue: Math.floor(Math.random() * 50)
  }));
};

export const allWrestlers = [...wrestlerDatabase, ...generateRandomWrestlers(200)];