export interface Wrestler {
  id: string;
  name: string;
  company: string;
  ovr: number; // Overall rating
  charisma: number;
  wrestling: number;
  entertainment: number;
  mic: number;
  look: number;
  strength: number;
  speed: number;
  stamina: number;
  moveset: string[];
  finishers: string[];
  signatures: string[];
  contract: {
    salary: number;
    duration: number;
  };
  injured: boolean;
  injuryDays?: number;
  heat: { [wrestlerId: string]: number };
  pushLevel: 'jobber' | 'midcard' | 'upper-midcard' | 'main-event' | 'legend';
  age: number;
  experience: number;
  popularity: number;
  alignment: 'face' | 'heel' | 'neutral';
  gimmick: string;
  hometown: string;
  height: string;
  weight: string;
  debut: string;
  momentum: number;
  fatigue: number;
}

export interface Company {
  id: string;
  name: string;
  type: 'major' | 'indie' | 'developmental' | 'startup';
  money: number;
  popularity: number;
  tvDeal: {
    network: string;
    value: number;
    duration: number;
  } | null;
  roster: string[]; // wrestler IDs
  championships: Championship[];
  venues: string[];
  rivals: string[]; // company IDs
  era: string;
  founded: string;
  logo: string;
  trainingFacility: boolean;
  weeklyShows: WeeklyShow[];
  monthlyShows: MonthlyShow[];
}

export interface WeeklyShow {
  id: string;
  name: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  venue: string;
  duration: number; // in hours
  tvDeal?: boolean;
}

export interface MonthlyShow {
  id: string;
  name: string;
  dayOfMonth: number;
  venue: string;
  duration: number;
  ppv: boolean;
}

export interface Championship {
  id: string;
  name: string;
  prestige: number;
  holder: string | null; // wrestler ID
  history: {
    wrestler: string;
    date: string;
    days: number;
  }[];
}

export interface Match {
  id: string;
  type: string;
  participants: string[]; // wrestler IDs
  championship?: string;
  venue: string;
  date: string;
  booked: boolean;
  result?: {
    winner: string;
    rating: number;
    attendance: number;
    revenue: number;
    matchEvents: MatchEvent[];
  };
  stipulation?: string;
  story?: string;
}

export interface MatchEvent {
  type: 'move' | 'reversal' | 'finisher' | 'interference' | 'injury';
  wrestler: string;
  move?: string;
  damage?: number;
  momentum?: number;
  description: string;
}

export interface Show {
  id: string;
  name: string;
  date: string;
  venue: string;
  matches: Match[];
  segments: Segment[];
  attendance: number;
  revenue: number;
  rating: number;
  booked: boolean;
}

export interface Segment {
  id: string;
  type: 'promo' | 'backstage' | 'interview' | 'attack';
  participants: string[];
  description: string;
}

export interface CalendarEvent {
  id: string;
  type: 'show' | 'match' | 'contract' | 'injury' | 'story';
  title: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiresAttention: boolean;
  companyId?: string;
}

export interface GameState {
  currentDate: string;
  playerName: string;
  playerCompany: string | null;
  playerWrestler: string | null; // for Be A Pro mode
  money: number;
  reputation: number;
  companies: { [id: string]: Company };
  wrestlers: { [id: string]: Wrestler };
  matches: { [id: string]: Match };
  shows: { [id: string]: Show };
  achievements: string[];
  unlockedCheats: string[];
  mode: 'booker' | 'wrestler';
  currentWrestler?: string; // for Be A Pro mode
  inbox: Email[];
  objectives: Objective[];
  calendar: CalendarEvent[];
  timeProgression: {
    paused: boolean;
    speed: 1 | 3 | 7; // days
    autoStop: boolean;
  };
  beAProStats?: {
    wins: number;
    losses: number;
    draws: number;
    championships: string[];
    currentHealth: number;
    currentMomentum: number;
    nextMatch?: string;
    storylines: string[];
  };
}

export interface Email {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  choices?: {
    text: string;
    effect: () => void;
  }[];
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'financial' | 'booking' | 'wrestler' | 'story';
}

export interface SaveGame {
  name: string;
  date: string;
  gameState: GameState;
  screenshot?: string;
}

export interface MatchAction {
  id: string;
  name: string;
  type: 'strike' | 'grapple' | 'aerial' | 'submission' | 'finisher' | 'signature';
  damage: number;
  momentum: number;
  stamina: number;
  difficulty: number;
  description: string;
  requirements?: {
    momentum?: number;
    position?: string;
    health?: number;
  };
}