import React, { useState } from 'react';
import { User, Trophy, Heart, Zap, Target, Calendar, Star, Award } from 'lucide-react';
import { GameState, Wrestler, MatchAction } from '../types/game';
import MatchSimulator from './MatchSimulator';

interface BeAProInterfaceProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
}

const BeAProInterface: React.FC<BeAProInterfaceProps> = ({ gameState, onUpdateGameState }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inMatch, setInMatch] = useState(false);

  const playerWrestler = gameState.playerWrestler ? gameState.wrestlers[gameState.playerWrestler] : null;
  const beAProStats = gameState.beAProStats;

  if (!playerWrestler || !beAProStats) {
    return (
      <div className="text-center py-12">
        <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No wrestler selected for Be A Pro mode</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'career', label: 'Career', icon: Trophy },
    { id: 'training', label: 'Training', icon: Target },
    { id: 'storylines', label: 'Storylines', icon: Star }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab wrestler={playerWrestler} stats={beAProStats} />;
      case 'career':
        return <CareerTab wrestler={playerWrestler} stats={beAProStats} />;
      case 'training':
        return <TrainingTab wrestler={playerWrestler} onUpdateGameState={onUpdateGameState} gameState={gameState} />;
      case 'storylines':
        return <StorylinesTab wrestler={playerWrestler} stats={beAProStats} />;
      default:
        return <OverviewTab wrestler={playerWrestler} stats={beAProStats} />;
    }
  };

  if (inMatch) {
    return (
      <MatchSimulator
        gameState={gameState}
        onUpdateGameState={onUpdateGameState}
        onExitMatch={() => setInMatch(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">{playerWrestler.name}</h1>
          <p className="text-xl text-gray-300">{playerWrestler.gimmick}</p>
        </div>
        
        {beAProStats.nextMatch && (
          <button
            onClick={() => setInMatch(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Enter Match
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center">
            <Heart className="w-6 h-6 text-red-400 mr-2" />
            <div>
              <p className="text-gray-300 text-sm">Health</p>
              <p className="text-xl font-bold text-white">{beAProStats.currentHealth}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-yellow-400 mr-2" />
            <div>
              <p className="text-gray-300 text-sm">Momentum</p>
              <p className="text-xl font-bold text-white">{beAProStats.currentMomentum}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-gold-400 mr-2" />
            <div>
              <p className="text-gray-300 text-sm">Championships</p>
              <p className="text-xl font-bold text-white">{beAProStats.championships.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-purple-400 mr-2" />
            <div>
              <p className="text-gray-300 text-sm">Overall</p>
              <p className="text-xl font-bold text-white">{playerWrestler.ovr}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {renderTabContent()}
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ wrestler: Wrestler; stats: any }> = ({ wrestler, stats }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Wrestler Stats</h3>
      <div className="space-y-3">
        {['wrestling', 'charisma', 'entertainment', 'mic', 'look', 'strength', 'speed', 'stamina'].map((stat) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="text-gray-300 capitalize">{stat}:</span>
            <div className="flex items-center">
              <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${wrestler[stat as keyof Wrestler]}%` }}
                />
              </div>
              <span className="text-white font-semibold w-8">{wrestler[stat as keyof Wrestler]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Career Record</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-green-400">{stats.wins}</p>
          <p className="text-gray-300 text-sm">Wins</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-400">{stats.losses}</p>
          <p className="text-gray-300 text-sm">Losses</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-400">{stats.draws}</p>
          <p className="text-gray-300 text-sm">Draws</p>
        </div>
      </div>
    </div>
  </div>
);

// Career Tab Component
const CareerTab: React.FC<{ wrestler: Wrestler; stats: any }> = ({ wrestler, stats }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
    <h3 className="text-xl font-bold text-white mb-4">Championship History</h3>
    {stats.championships.length === 0 ? (
      <p className="text-gray-400 text-center py-8">No championships won yet</p>
    ) : (
      <div className="space-y-3">
        {stats.championships.map((title: string, index: number) => (
          <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <Award className="w-6 h-6 text-gold-400 mr-3" />
            <span className="text-white font-semibold">{title}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Training Tab Component
const TrainingTab: React.FC<{ wrestler: Wrestler; onUpdateGameState: any; gameState: GameState }> = ({ 
  wrestler, 
  onUpdateGameState, 
  gameState 
}) => {
  const handleTraining = (stat: string, cost: number) => {
    if (gameState.money >= cost) {
      const updatedWrestler = {
        ...wrestler,
        [stat]: Math.min(100, wrestler[stat as keyof Wrestler] as number + 1)
      };
      
      onUpdateGameState({
        ...gameState,
        money: gameState.money - cost,
        wrestlers: {
          ...gameState.wrestlers,
          [wrestler.id]: updatedWrestler
        }
      });
    }
  };

  const trainingOptions = [
    { stat: 'wrestling', name: 'Wrestling Training', cost: 5000, icon: Target },
    { stat: 'charisma', name: 'Charisma Coaching', cost: 3000, icon: Star },
    { stat: 'strength', name: 'Strength Training', cost: 4000, icon: Zap },
    { stat: 'speed', name: 'Speed Training', cost: 4000, icon: Zap },
    { stat: 'stamina', name: 'Cardio Training', cost: 3500, icon: Heart }
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Training Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainingOptions.map((option) => {
          const Icon = option.icon;
          const currentValue = wrestler[option.stat as keyof Wrestler] as number;
          const canAfford = gameState.money >= option.cost;
          const maxedOut = currentValue >= 100;
          
          return (
            <button
              key={option.stat}
              onClick={() => handleTraining(option.stat, option.cost)}
              disabled={!canAfford || maxedOut}
              className={`p-4 rounded-lg border transition-all text-left ${
                canAfford && !maxedOut
                  ? 'border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20'
                  : 'border-gray-600 bg-gray-700/50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white font-semibold">{option.name}</span>
                </div>
                <span className="text-green-400 font-bold">${option.cost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current: {currentValue}</span>
                <span className="text-gray-300">→ {Math.min(100, currentValue + 1)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Storylines Tab Component
const StorylinesTab: React.FC<{ wrestler: Wrestler; stats: any }> = ({ wrestler, stats }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
    <h3 className="text-xl font-bold text-white mb-4">Active Storylines</h3>
    {stats.storylines.length === 0 ? (
      <p className="text-gray-400 text-center py-8">No active storylines</p>
    ) : (
      <div className="space-y-3">
        {stats.storylines.map((storyline: string, index: number) => (
          <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
            <p className="text-white">{storyline}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default BeAProInterface;