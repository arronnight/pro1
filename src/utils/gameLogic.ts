import { GameState, Wrestler, Match, Email, Objective } from '../types/game';

export class GameEngine {
  private gameState: GameState;

  constructor(initialState: GameState) {
    this.gameState = initialState;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  updateGameState(newState: Partial<GameState>): void {
    this.gameState = { ...this.gameState, ...newState };
  }

  generateAIStoryline(wrestlers: string[]): string {
    const storylines = [
      `${wrestlers[0]} challenges ${wrestlers[1]} to a match after a backstage altercation.`,
      `A heated rivalry develops between ${wrestlers[0]} and ${wrestlers[1]} over championship gold.`,
      `${wrestlers[0]} turns heel and attacks ${wrestlers[1]} during a victory celebration.`,
      `${wrestlers[0]} and ${wrestlers[1]} form an unlikely alliance against a common enemy.`,
      `${wrestlers[0]} accuses ${wrestlers[1]} of stealing their spotlight and demands a match.`,
      `Family drama unfolds as ${wrestlers[0]} and ${wrestlers[1]} face off in a personal feud.`,
      `${wrestlers[0]} returns from injury seeking revenge against ${wrestlers[1]}.`,
      `A tournament is announced with ${wrestlers[0]} and ${wrestlers[1]} as top contenders.`
    ];
    
    return storylines[Math.floor(Math.random() * storylines.length)];
  }

  generateRandomEmail(): Email {
    const emailTypes = [
      {
        from: 'Network Executive',
        subject: 'TV Contract Renewal',
        content: 'We need to discuss your upcoming TV contract renewal. Your current ratings are concerning...',
        choices: [
          { text: 'Schedule a meeting', effect: () => this.gameState.money += 100000 },
          { text: 'Ignore for now', effect: () => this.gameState.reputation -= 5 }
        ]
      },
      {
        from: 'Wrestler Agent',
        subject: 'Contract Negotiation',
        content: 'My client is demanding a significant pay raise or they will consider other options.',
        choices: [
          { text: 'Agree to raise', effect: () => this.gameState.money -= 200000 },
          { text: 'Refuse and risk losing talent', effect: () => this.gameState.reputation -= 10 }
        ]
      },
      {
        from: 'Medical Team',
        subject: 'Injury Report',
        content: 'We have several wrestlers who need time off for injuries. This will affect your upcoming shows.',
        choices: [
          { text: 'Give them time off', effect: () => this.gameState.reputation += 5 },
          { text: 'Push them to perform', effect: () => this.gameState.reputation -= 15 }
        ]
      }
    ];

    const selectedEmail = emailTypes[Math.floor(Math.random() * emailTypes.length)];
    return {
      id: `email-${Date.now()}`,
      from: selectedEmail.from,
      subject: selectedEmail.subject,
      content: selectedEmail.content,
      date: new Date().toISOString(),
      read: false,
      choices: selectedEmail.choices
    };
  }

  calculateMatchRating(match: Match, wrestlers: { [id: string]: Wrestler }): number {
    let rating = 50; // Base rating
    
    match.participants.forEach(wrestlerId => {
      const wrestler = wrestlers[wrestlerId];
      if (wrestler) {
        rating += (wrestler.wrestling + wrestler.charisma + wrestler.entertainment) / 15;
      }
    });

    // Add bonuses for match type
    if (match.type.includes('Championship')) rating += 10;
    if (match.type.includes('Cage') || match.type.includes('Cell')) rating += 8;
    if (match.type.includes('Ladder') || match.type.includes('TLC')) rating += 12;

    return Math.min(100, Math.max(0, rating));
  }

  generateObjectives(): Objective[] {
    return [
      {
        id: 'obj-1',
        title: 'Increase Company Revenue',
        description: 'Earn $1,000,000 in revenue this quarter',
        reward: 50000,
        completed: false,
        type: 'financial'
      },
      {
        id: 'obj-2',
        title: 'Sign a Top Star',
        description: 'Sign a wrestler with 90+ overall rating',
        reward: 25000,
        completed: false,
        type: 'wrestler'
      },
      {
        id: 'obj-3',
        title: 'Host a 5-Star Match',
        description: 'Book a match that receives a 95+ rating',
        reward: 75000,
        completed: false,
        type: 'booking'
      }
    ];
  }

  processWrestlerInjury(wrestlerId: string): boolean {
    const injuryChance = 0.05; // 5% chance per match
    return Math.random() < injuryChance;
  }

  calculatePopularityChange(wrestlerId: string, matchResult: 'win' | 'loss'): number {
    const baseChange = matchResult === 'win' ? 2 : -1;
    return baseChange + Math.floor(Math.random() * 3);
  }
}

export const saveGameToStorage = (saveGame: any, slot: number): void => {
  localStorage.setItem(`wrestlingBooker_save_${slot}`, JSON.stringify(saveGame));
};

export const loadGameFromStorage = (slot: number): any | null => {
  const saved = localStorage.getItem(`wrestlingBooker_save_${slot}`);
  return saved ? JSON.parse(saved) : null;
};

export const getAllSaveGames = (): any[] => {
  const saves = [];
  for (let i = 1; i <= 5; i++) {
    const save = loadGameFromStorage(i);
    if (save) {
      saves.push({ slot: i, ...save });
    }
  }
  return saves;
};