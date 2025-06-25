import React, { useState } from 'react';
import { Users, Star, DollarSign, Heart, Shield, Search, Filter } from 'lucide-react';
import { GameState, Wrestler } from '../types/game';
import { allWrestlers } from '../data/wrestlers';

interface RosterManagerProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
}

const RosterManager: React.FC<RosterManagerProps> = ({ gameState, onUpdateGameState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [sortBy, setSortBy] = useState('ovr');
  const [showFreeAgents, setShowFreeAgents] = useState(false);

  const getDisplayWrestlers = () => {
    let wrestlers = showFreeAgents 
      ? allWrestlers.filter(w => w.company === 'free-agent')
      : Object.values(gameState.wrestlers);

    // Filter by search term
    if (searchTerm) {
      wrestlers = wrestlers.filter(w => 
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.gimmick.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by company
    if (filterCompany !== 'all') {
      wrestlers = wrestlers.filter(w => w.company === filterCompany);
    }

    // Sort wrestlers
    wrestlers.sort((a, b) => {
      switch (sortBy) {
        case 'ovr':
          return b.ovr - a.ovr;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'salary':
          return b.contract.salary - a.contract.salary;
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    return wrestlers;
  };

  const handleSignWrestler = (wrestler: Wrestler) => {
    const salary = wrestler.ovr * 10000; // Base salary calculation
    if (gameState.money >= salary) {
      const newWrestler = {
        ...wrestler,
        company: gameState.playerCompany || 'custom',
        contract: { salary, duration: 2 }
      };

      onUpdateGameState({
        ...gameState,
        wrestlers: {
          ...gameState.wrestlers,
          [wrestler.id]: newWrestler
        },
        money: gameState.money - salary
      });
    }
  };

  const handleReleaseWrestler = (wrestlerId: string) => {
    const newWrestlers = { ...gameState.wrestlers };
    delete newWrestlers[wrestlerId];
    
    onUpdateGameState({
      ...gameState,
      wrestlers: newWrestlers
    });
  };

  const companies = ['all', 'wwe', 'aew', 'njpw', 'impact', 'roh', 'gcw', 'free-agent'];
  const displayWrestlers = getDisplayWrestlers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Roster Management</h1>
        <button
          onClick={() => setShowFreeAgents(!showFreeAgents)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            showFreeAgents
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {showFreeAgents ? 'View My Roster' : 'Browse Free Agents'}
        </button>
      </div>

      {/* Controls */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search wrestlers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Company Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400 appearance-none"
            >
              {companies.map(company => (
                <option key={company} value={company}>
                  {company === 'all' ? 'All Companies' : company.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
          >
            <option value="ovr">Overall Rating</option>
            <option value="name">Name</option>
            <option value="salary">Salary</option>
            <option value="popularity">Popularity</option>
          </select>

          {/* Stats */}
          <div className="text-white text-center">
            <p className="text-sm text-gray-300">Total: {displayWrestlers.length}</p>
            <p className="font-semibold">{showFreeAgents ? 'Free Agents' : 'My Roster'}</p>
          </div>
        </div>
      </div>

      {/* Wrestler Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayWrestlers.map((wrestler) => (
          <div key={wrestler.id} className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{wrestler.name}</h3>
                <p className="text-gray-300">{wrestler.gimmick}</p>
                <p className="text-sm text-gray-400">{wrestler.company.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-white font-bold">{wrestler.ovr}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  wrestler.alignment === 'face' ? 'bg-blue-600/20 text-blue-400' :
                  wrestler.alignment === 'heel' ? 'bg-red-600/20 text-red-400' :
                  'bg-gray-600/20 text-gray-400'
                }`}>
                  {wrestler.alignment.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-400">Wrestling</p>
                <p className="text-white font-semibold">{wrestler.wrestling}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Charisma</p>
                <p className="text-white font-semibold">{wrestler.charisma}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Mic</p>
                <p className="text-white font-semibold">{wrestler.mic}</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Age:</span>
                <span className="text-white">{wrestler.age}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Experience:</span>
                <span className="text-white">{wrestler.experience} years</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Popularity:</span>
                <span className="text-white">{wrestler.popularity}%</span>
              </div>
              {wrestler.injured && (
                <div className="flex items-center text-red-400">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">Injured</span>
                </div>
              )}
            </div>

            {/* Contract Info */}
            <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Salary:</span>
                <span className="text-green-400 font-semibold">
                  ${wrestler.contract.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Contract:</span>
                <span className="text-white">{wrestler.contract.duration} years</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {showFreeAgents ? (
                <button
                  onClick={() => handleSignWrestler(wrestler)}
                  disabled={gameState.money < wrestler.ovr * 10000}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    gameState.money >= wrestler.ovr * 10000
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Sign (${(wrestler.ovr * 10000).toLocaleString()})
                </button>
              ) : (
                <button
                  onClick={() => handleReleaseWrestler(wrestler.id)}
                  className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                >
                  Release
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {displayWrestlers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No wrestlers found</p>
        </div>
      )}
    </div>
  );
};

export default RosterManager;