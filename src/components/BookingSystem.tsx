import React, { useState } from 'react';
import { Calendar, Plus, Star, Trophy, MapPin, Clock } from 'lucide-react';
import { GameState, Match, Show } from '../types/game';
import { matchTypes, venues } from '../data/moves';

interface BookingSystemProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
}

const BookingSystem: React.FC<BookingSystemProps> = ({ gameState, onUpdateGameState }) => {
  const [activeTab, setActiveTab] = useState('matches');
  const [showCreateMatch, setShowCreateMatch] = useState(false);

  const tabs = [
    { id: 'matches', label: 'Matches', icon: Trophy },
    { id: 'shows', label: 'Shows', icon: Calendar },
    { id: 'schedule', label: 'Schedule', icon: Clock }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matches':
        return <MatchesView gameState={gameState} onShowCreate={() => setShowCreateMatch(true)} />;
      case 'shows':
        return <ShowsView gameState={gameState} />;
      case 'schedule':
        return <ScheduleView gameState={gameState} />;
      default:
        return <MatchesView gameState={gameState} onShowCreate={() => setShowCreateMatch(true)} />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Booking System</h1>

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

      {/* Create Match Modal */}
      {showCreateMatch && (
        <CreateMatchModal
          gameState={gameState}
          onClose={() => setShowCreateMatch(false)}
          onCreateMatch={(match) => {
            onUpdateGameState({
              ...gameState,
              matches: {
                ...gameState.matches,
                [match.id]: match
              }
            });
            setShowCreateMatch(false);
          }}
        />
      )}
    </div>
  );
};

// Matches View Component
const MatchesView: React.FC<{ gameState: GameState; onShowCreate: () => void }> = ({ 
  gameState, 
  onShowCreate 
}) => {
  const matches = Object.values(gameState.matches);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Match Management</h2>
        <button
          onClick={onShowCreate}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Match
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{match.type}</h3>
                <div className="flex items-center text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{match.venue}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{new Date(match.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                match.booked 
                  ? 'bg-green-600/20 text-green-400' 
                  : 'bg-yellow-600/20 text-yellow-400'
              }`}>
                {match.booked ? 'Booked' : 'Draft'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-white font-semibold">Participants:</h4>
              {match.participants.map((wrestlerId) => {
                const wrestler = gameState.wrestlers[wrestlerId];
                return wrestler ? (
                  <div key={wrestlerId} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-2">
                    <span className="text-white">{wrestler.name}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white text-sm">{wrestler.ovr}</span>
                    </div>
                  </div>
                ) : null;
              })}
            </div>

            {match.result && (
              <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                <h4 className="text-white font-semibold mb-2">Match Result:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Winner:</span>
                    <p className="text-white">{gameState.wrestlers[match.result.winner]?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Rating:</span>
                    <p className="text-white">{match.result.rating}/100</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {!match.booked && (
                <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Book Match
                </button>
              )}
              <button className="py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No matches created yet</p>
          <p className="text-gray-500 text-sm">Create your first match to get started</p>
        </div>
      )}
    </div>
  );
};

// Create Match Modal Component
const CreateMatchModal: React.FC<{
  gameState: GameState;
  onClose: () => void;
  onCreateMatch: (match: Match) => void;
}> = ({ gameState, onClose, onCreateMatch }) => {
  const [matchType, setMatchType] = useState(matchTypes[0]);
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [selectedWrestlers, setSelectedWrestlers] = useState<string[]>([]);
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);

  const availableWrestlers = Object.values(gameState.wrestlers);

  const handleCreateMatch = () => {
    if (selectedWrestlers.length >= 2) {
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        type: matchType,
        participants: selectedWrestlers,
        venue: selectedVenue,
        date: matchDate,
        booked: false
      };
      onCreateMatch(newMatch);
    }
  };

  const toggleWrestler = (wrestlerId: string) => {
    if (selectedWrestlers.includes(wrestlerId)) {
      setSelectedWrestlers(selectedWrestlers.filter(id => id !== wrestlerId));
    } else {
      setSelectedWrestlers([...selectedWrestlers, wrestlerId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Create New Match</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Match Type */}
          <div>
            <label className="block text-white font-semibold mb-3">Match Type</label>
            <select
              value={matchType}
              onChange={(e) => setMatchType(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
            >
              {matchTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-white font-semibold mb-3">Venue</label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
            >
              {venues.map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-white font-semibold mb-3">Match Date</label>
            <input
              type="date"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Wrestler Selection */}
          <div>
            <label className="block text-white font-semibold mb-3">
              Select Wrestlers ({selectedWrestlers.length} selected)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {availableWrestlers.map((wrestler) => (
                <button
                  key={wrestler.id}
                  onClick={() => toggleWrestler(wrestler.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    selectedWrestlers.includes(wrestler.id)
                      ? 'border-yellow-400 bg-yellow-400/20'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-left">
                    <p className="text-white font-semibold">{wrestler.name}</p>
                    <p className="text-gray-300 text-sm">{wrestler.gimmick}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white">{wrestler.ovr}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleCreateMatch}
              disabled={selectedWrestlers.length < 2}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                selectedWrestlers.length >= 2
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Create Match
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components
const ShowsView: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
    <p className="text-white">Show management coming soon...</p>
  </div>
);

const ScheduleView: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
    <p className="text-white">Schedule management coming soon...</p>
  </div>
);

export default BookingSystem;