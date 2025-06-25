import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, DollarSign, Mail, Trophy, Settings, 
  Star, Building, Zap, Crown, Save, Menu, X, Clock, User 
} from 'lucide-react';
import { GameState, CalendarEvent } from '../types/game';
import { GameEngine } from '../utils/gameLogic';
import RosterManager from './RosterManager';
import BookingSystem from './BookingSystem';
import EmailSystem from './EmailSystem';
import TimeControl from './TimeControl';
import BeAProInterface from './BeAProInterface';

interface GameInterfaceProps {
  initialGameState: GameState;
  onSaveGame: (gameState: GameState) => void;
  onMainMenu: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  initialGameState,
  onSaveGame,
  onMainMenu
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameEngine] = useState(new GameEngine(initialGameState));
  const [activeTab, setActiveTab] = useState(gameState.mode === 'wrestler' ? 'beapro' : 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Auto-save every 5 minutes
    const autoSave = setInterval(() => {
      onSaveGame(gameState);
    }, 300000);

    return () => clearInterval(autoSave);
  }, [gameState, onSaveGame]);

  const handleSave = () => {
    onSaveGame(gameState);
    // Show save notification
  };

  const handleAdvanceTime = (days: number) => {
    const currentDate = new Date(gameState.currentDate);
    const newDate = new Date(currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
    
    // Generate random events during time progression
    const newEvents: CalendarEvent[] = [];
    
    // Check for weekly shows
    for (let i = 1; i <= days; i++) {
      const checkDate = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const dayOfWeek = checkDate.getDay();
      
      // Add weekly show events
      Object.values(gameState.companies).forEach(company => {
        company.weeklyShows?.forEach(show => {
          if (show.dayOfWeek === dayOfWeek) {
            newEvents.push({
              id: `show-${company.id}-${checkDate.toISOString()}`,
              type: 'show',
              title: `${show.name} - ${company.name}`,
              description: `Weekly show at ${show.venue}`,
              date: checkDate.toISOString(),
              priority: 'high',
              requiresAttention: company.id === gameState.playerCompany,
              companyId: company.id
            });
          }
        });
      });
    }

    // Update wrestler conditions (injuries, fatigue, etc.)
    const updatedWrestlers = { ...gameState.wrestlers };
    Object.keys(updatedWrestlers).forEach(wrestlerId => {
      const wrestler = updatedWrestlers[wrestlerId];
      
      // Heal injuries
      if (wrestler.injured && wrestler.injuryDays) {
        wrestler.injuryDays = Math.max(0, wrestler.injuryDays - days);
        if (wrestler.injuryDays === 0) {
          wrestler.injured = false;
          delete wrestler.injuryDays;
        }
      }
      
      // Reduce fatigue
      wrestler.fatigue = Math.max(0, wrestler.fatigue - (days * 5));
      
      // Age wrestlers (very slowly)
      if (Math.random() < 0.01 * days) {
        wrestler.age += 1;
      }
    });

    setGameState({
      ...gameState,
      currentDate: newDate.toISOString(),
      wrestlers: updatedWrestlers,
      calendar: [...gameState.calendar, ...newEvents]
    });
  };

  const tabs = gameState.mode === 'wrestler' 
    ? [
        { id: 'beapro', label: 'Be A Pro', icon: User },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'achievements', label: 'Achievements', icon: Trophy }
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: Building },
        { id: 'roster', label: 'Roster', icon: Users },
        { id: 'booking', label: 'Booking', icon: Calendar },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'finances', label: 'Finances', icon: DollarSign },
        { id: 'achievements', label: 'Achievements', icon: Trophy }
      ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView gameState={gameState} onAdvanceTime={handleAdvanceTime} />;
      case 'beapro':
        return <BeAProInterface gameState={gameState} onUpdateGameState={setGameState} />;
      case 'roster':
        return <RosterManager gameState={gameState} onUpdateGameState={setGameState} />;
      case 'booking':
        return <BookingSystem gameState={gameState} onUpdateGameState={setGameState} />;
      case 'email':
        return <EmailSystem gameState={gameState} onUpdateGameState={setGameState} />;
      case 'calendar':
        return <TimeControl gameState={gameState} onUpdateGameState={setGameState} onAdvanceTime={handleAdvanceTime} />;
      case 'finances':
        return <FinancesView gameState={gameState} />;
      case 'achievements':
        return <AchievementsView gameState={gameState} />;
      default:
        return gameState.mode === 'wrestler' 
          ? <BeAProInterface gameState={gameState} onUpdateGameState={setGameState} />
          : <DashboardView gameState={gameState} onAdvanceTime={handleAdvanceTime} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex">
      {/* Sidebar */}
      <div className={`bg-gray-800/90 backdrop-blur-sm transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4">
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          {/* Player Info */}
          {sidebarOpen && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
              <h3 className="text-white font-bold">{gameState.playerName}</h3>
              <p className="text-gray-300 text-sm">
                {gameState.mode === 'wrestler' 
                  ? gameState.playerWrestler ? gameState.wrestlers[gameState.playerWrestler]?.name : 'Wrestler'
                  : gameState.playerCompany ? 
                    gameState.companies[gameState.playerCompany]?.name || 'Custom Promotion' : 
                    'Independent'
                }
              </p>
              <div className="flex items-center mt-2">
                <DollarSign className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 font-semibold">
                  ${gameState.money.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-blue-400 mr-1" />
                <span className="text-blue-400 text-sm">
                  {new Date(gameState.currentDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-6 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="ml-3">{tab.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="mt-8 space-y-2">
              <button
                onClick={handleSave}
                className="w-full flex items-center p-3 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
              >
                <Save className="w-5 h-5 mr-3" />
                Save Game
              </button>
              <button
                onClick={onMainMenu}
                className="w-full flex items-center p-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
              >
                <Menu className="w-5 h-5 mr-3" />
                Main Menu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Enhanced Dashboard component with time controls
const DashboardView: React.FC<{ gameState: GameState; onAdvanceTime: (days: number) => void }> = ({ 
  gameState, 
  onAdvanceTime 
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
      
      {/* Time Control */}
      <TimeControl 
        gameState={gameState} 
        onUpdateGameState={() => {}} 
        onAdvanceTime={onAdvanceTime} 
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-400 mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Balance</p>
              <p className="text-2xl font-bold text-white">${gameState.money.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Reputation</p>
              <p className="text-2xl font-bold text-white">{gameState.reputation}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Roster Size</p>
              <p className="text-2xl font-bold text-white">
                {Object.keys(gameState.wrestlers).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <p className="text-gray-300 text-sm">Unread Emails</p>
              <p className="text-2xl font-bold text-white">
                {gameState.inbox.filter(email => !email.read).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <Zap className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-white">Welcome to Wrestling Empire!</span>
          </div>
          <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <Crown className="w-5 h-5 text-purple-400 mr-3" />
            <span className="text-white">Your wrestling empire awaits your command.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other views
const FinancesView: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="text-white">
    <h1 className="text-4xl font-bold mb-8">Financial Management</h1>
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <p>Financial management system coming soon...</p>
    </div>
  </div>
);

const AchievementsView: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="text-white">
    <h1 className="text-4xl font-bold mb-8">Achievements & Trophies</h1>
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <p>Achievement system coming soon...</p>
    </div>
  </div>
);

export default GameInterface;