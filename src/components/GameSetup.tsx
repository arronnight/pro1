import React, { useState } from 'react';
import { ArrowLeft, User, Building, Star, Crown } from 'lucide-react';
import { allCompanies } from '../data/companies';

interface GameSetupProps {
  onBack: () => void;
  onStartGame: (playerName: string, companyId: string | null, mode: 'booker' | 'wrestler') => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onBack, onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<'booker' | 'wrestler'>('booker');
  const [showCompanies, setShowCompanies] = useState(false);

  const handleStart = () => {
    if (playerName.trim()) {
      onStartGame(playerName, selectedCompany, gameMode);
    }
  };

  const majorCompanies = allCompanies.filter(c => c.type === 'major');
  const indieCompanies = allCompanies.filter(c => c.type === 'indie');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back to Menu
          </button>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Create Your Wrestling Empire
          </h1>

          {/* Player Name */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">
              <User className="w-5 h-5 inline mr-2" />
              Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Game Mode Selection */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-3">
              <Crown className="w-5 h-5 inline mr-2" />
              Game Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setGameMode('booker')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  gameMode === 'booker'
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="text-white font-bold text-lg">Booker Mode</h3>
                <p className="text-gray-300 text-sm mt-2">
                  Run a wrestling promotion and book matches
                </p>
              </button>
              <button
                onClick={() => setGameMode('wrestler')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  gameMode === 'wrestler'
                    ? 'border-yellow-400 bg-yellow-400/20'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="text-white font-bold text-lg">Be A Pro</h3>
                <p className="text-gray-300 text-sm mt-2">
                  Play as a wrestler climbing the ranks
                </p>
              </button>
            </div>
          </div>

          {/* Company Selection (only for booker mode) */}
          {gameMode === 'booker' && (
            <div className="mb-8">
              <label className="block text-white text-lg font-semibold mb-3">
                <Building className="w-5 h-5 inline mr-2" />
                Choose Your Promotion
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedCompany === null
                      ? 'border-green-400 bg-green-400/20'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <Star className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <h3 className="text-white font-bold">Start Your Own</h3>
                  <p className="text-gray-300 text-sm mt-2">Create a new promotion from scratch</p>
                </button>
                <button
                  onClick={() => setShowCompanies(!showCompanies)}
                  className="p-6 rounded-xl border-2 border-gray-600 bg-gray-700/50 hover:border-gray-500 transition-all"
                >
                  <Building className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h3 className="text-white font-bold">Take Over Existing</h3>
                  <p className="text-gray-300 text-sm mt-2">Manage an established promotion</p>
                </button>
              </div>

              {showCompanies && (
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-4">Major Promotions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {majorCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => setSelectedCompany(company.id)}
                        className={`p-4 rounded-lg border transition-all text-left ${
                          selectedCompany === company.id
                            ? 'border-yellow-400 bg-yellow-400/20'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{company.logo}</span>
                          <div>
                            <h5 className="text-white font-semibold">{company.name}</h5>
                            <p className="text-gray-300 text-sm">
                              ${(company.money / 1000000).toFixed(0)}M • {company.popularity}% popularity
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <h4 className="text-white font-bold mb-4">Independent Promotions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {indieCompanies.slice(0, 12).map((company) => (
                      <button
                        key={company.id}
                        onClick={() => setSelectedCompany(company.id)}
                        className={`p-3 rounded-lg border transition-all text-left ${
                          selectedCompany === company.id
                            ? 'border-yellow-400 bg-yellow-400/20'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{company.logo}</span>
                          <div>
                            <h6 className="text-white text-sm font-semibold truncate">{company.name}</h6>
                            <p className="text-gray-400 text-xs">{company.popularity}% popularity</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className={`px-12 py-4 rounded-xl text-xl font-bold transition-all ${
                playerName.trim()
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105 shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;