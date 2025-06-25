import React from 'react';
import { ArrowLeft, Save, Trash2, Calendar, User, Building } from 'lucide-react';
import { getAllSaveGames, loadGameFromStorage } from '../utils/gameLogic';

interface LoadGameProps {
  onBack: () => void;
  onLoadGame: (saveData: any) => void;
}

const LoadGame: React.FC<LoadGameProps> = ({ onBack, onLoadGame }) => {
  const saveGames = getAllSaveGames();

  const handleLoad = (slot: number) => {
    const saveData = loadGameFromStorage(slot);
    if (saveData) {
      onLoadGame(saveData);
    }
  };

  const handleDelete = (slot: number) => {
    if (confirm('Are you sure you want to delete this save game?')) {
      localStorage.removeItem(`wrestlingBooker_save_${slot}`);
      window.location.reload();
    }
  };

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
            Load Game
          </h1>

          {saveGames.length === 0 ? (
            <div className="text-center py-12">
              <Save className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No save games found</p>
              <p className="text-gray-500">Start a new game to create your first save</p>
            </div>
          ) : (
            <div className="space-y-4">
              {saveGames.map((save) => (
                <div key={save.slot} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-5 h-5 text-blue-400 mr-2" />
                        <h3 className="text-xl font-bold text-white">{save.playerName}</h3>
                        <span className="ml-4 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold">
                          Slot {save.slot}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Building className="w-4 h-4 mr-2" />
                          {save.playerCompany ? 
                            save.companies?.[save.playerCompany]?.name || 'Custom Company' : 'Independent'
                          }
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(save.date).toLocaleDateString()}
                        </div>
                        <div className="text-green-400 font-semibold">
                          ${save.money?.toLocaleString() || '0'}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 ml-6">
                      <button
                        onClick={() => handleLoad(save.slot)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                      >
                        Load Game
                      </button>
                      <button
                        onClick={() => handleDelete(save.slot)}
                        className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadGame;