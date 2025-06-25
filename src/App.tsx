import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameSetup from './components/GameSetup';
import GameInterface from './components/GameInterface';
import CreationSuite from './components/CreationSuite';
import LoadGame from './components/LoadGame';
import Settings from './components/Settings';
import { GameState } from './types/game';
import { allWrestlers } from './data/wrestlers';
import { allCompanies } from './data/companies';
import { saveGameToStorage } from './utils/gameLogic';

type AppState = 'menu' | 'setup' | 'game' | 'creation' | 'load' | 'settings' | 'achievements';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleNewGame = () => {
    setAppState('setup');
  };

  const handleLoadGame = () => {
    setAppState('load');
  };

  const handleCreationSuite = () => {
    setAppState('creation');
  };

  const handleSettings = () => {
    setAppState('settings');
  };

  const handleAchievements = () => {
    setAppState('achievements');
  };

  const handleStartGame = (playerName: string, companyId: string | null, mode: 'booker' | 'wrestler') => {
    // Initialize wrestlers database
    const wrestlersDb: { [id: string]: any } = {};
    allWrestlers.forEach(wrestler => {
      wrestlersDb[wrestler.id] = wrestler;
    });

    // Initialize companies database
    const companiesDb: { [id: string]: any } = {};
    allCompanies.forEach(company => {
      companiesDb[company.id] = company;
    });

    // For Be A Pro mode, create a custom wrestler or select existing one
    let playerWrestlerId = null;
    let beAProStats = null;
    
    if (mode === 'wrestler') {
      // Create a custom wrestler for the player
      const customWrestler = {
        id: 'player-wrestler',
        name: playerName,
        company: companyId || 'free-agent',
        ovr: 65,
        charisma: 60,
        wrestling: 65,
        entertainment: 55,
        mic: 50,
        look: 60,
        strength: 70,
        speed: 65,
        stamina: 70,
        moveset: ['Punch', 'Kick', 'Slam', 'Suplex'],
        finishers: ['Custom Finisher'],
        signatures: ['Custom Signature'],
        contract: { salary: 50000, duration: 1 },
        injured: false,
        heat: {},
        pushLevel: 'jobber' as const,
        age: 25,
        experience: 1,
        popularity: 30,
        alignment: 'face' as const,
        gimmick: 'Rookie',
        hometown: 'Hometown, USA',
        height: '6\'0"',
        weight: '220 lbs',
        debut: new Date().getFullYear().toString(),
        momentum: 50,
        fatigue: 0
      };
      
      wrestlersDb['player-wrestler'] = customWrestler;
      playerWrestlerId = 'player-wrestler';
      
      beAProStats = {
        wins: 0,
        losses: 0,
        draws: 0,
        championships: [],
        currentHealth: 100,
        currentMomentum: 50,
        nextMatch: null,
        storylines: []
      };
    }

    const initialGameState: GameState = {
      currentDate: new Date().toISOString(),
      playerName,
      playerCompany: mode === 'booker' ? companyId : null,
      playerWrestler: playerWrestlerId,
      money: mode === 'booker' ? (companyId ? companiesDb[companyId]?.money || 1000000 : 1000000) : 100000,
      reputation: 50,
      companies: companiesDb,
      wrestlers: wrestlersDb,
      matches: {},
      shows: {},
      achievements: [],
      unlockedCheats: [],
      mode,
      inbox: [],
      objectives: [],
      calendar: [],
      timeProgression: {
        paused: false,
        speed: 1,
        autoStop: true
      },
      beAProStats
    };

    setGameState(initialGameState);
    setAppState('game');
  };

  const handleLoadGameData = (saveData: any) => {
    setGameState(saveData.gameState);
    setAppState('game');
  };

  const handleSaveGame = (gameState: GameState) => {
    const saveData = {
      name: `${gameState.playerName}'s ${gameState.mode === 'wrestler' ? 'Career' : 'Empire'}`,
      date: new Date().toISOString(),
      gameState,
      playerName: gameState.playerName,
      playerCompany: gameState.playerCompany,
      money: gameState.money,
      companies: gameState.companies
    };
    
    // Save to slot 1 by default, could be expanded to allow slot selection
    saveGameToStorage(saveData, 1);
  };

  const handleBackToMenu = () => {
    setAppState('menu');
    setGameState(null);
  };

  switch (appState) {
    case 'menu':
      return (
        <MainMenu
          onNewGame={handleNewGame}
          onLoadGame={handleLoadGame}
          onCreationSuite={handleCreationSuite}
          onSettings={handleSettings}
          onAchievements={handleAchievements}
        />
      );
    
    case 'setup':
      return (
        <GameSetup
          onBack={handleBackToMenu}
          onStartGame={handleStartGame}
        />
      );
    
    case 'game':
      return gameState ? (
        <GameInterface
          initialGameState={gameState}
          onSaveGame={handleSaveGame}
          onMainMenu={handleBackToMenu}
        />
      ) : null;
    
    case 'creation':
      return (
        <CreationSuite
          onBack={handleBackToMenu}
        />
      );
    
    case 'load':
      return (
        <LoadGame
          onBack={handleBackToMenu}
          onLoadGame={handleLoadGameData}
        />
      );
    
    case 'settings':
      return (
        <Settings
          onBack={handleBackToMenu}
        />
      );
    
    default:
      return (
        <MainMenu
          onNewGame={handleNewGame}
          onLoadGame={handleLoadGame}
          onCreationSuite={handleCreationSuite}
          onSettings={handleSettings}
          onAchievements={handleAchievements}
        />
      );
  }
}

export default App;