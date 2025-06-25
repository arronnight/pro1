import React, { useState } from 'react';
import { ArrowLeft, Users, Building, Zap, Trophy, Plus, Edit } from 'lucide-react';

interface CreationSuiteProps {
  onBack: () => void;
}

const CreationSuite: React.FC<CreationSuiteProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('wrestlers');

  const tabs = [
    { id: 'wrestlers', label: 'Create Wrestler', icon: Users },
    { id: 'companies', label: 'Create Company', icon: Building },
    { id: 'moves', label: 'Create Moves', icon: Zap },
    { id: 'championships', label: 'Create Championship', icon: Trophy }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wrestlers':
        return <WrestlerCreator />;
      case 'companies':
        return <CompanyCreator />;
      case 'moves':
        return <MoveCreator />;
      case 'championships':
        return <ChampionshipCreator />;
      default:
        return <WrestlerCreator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-yellow-400 transition-colors mr-6"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back to Menu
            </button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Creation Suite
            </h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
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

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

// Wrestler Creator Component
const WrestlerCreator: React.FC = () => {
  const [wrestlerData, setWrestlerData] = useState({
    name: '',
    gimmick: '',
    hometown: '',
    height: '',
    weight: '',
    alignment: 'face' as 'face' | 'heel' | 'neutral',
    wrestling: 50,
    charisma: 50,
    entertainment: 50,
    mic: 50,
    look: 50,
    finishers: [''],
    moveset: ['']
  });

  const handleStatChange = (stat: string, value: number) => {
    setWrestlerData(prev => ({
      ...prev,
      [stat]: Math.max(0, Math.min(100, value))
    }));
  };

  const addMove = (type: 'finishers' | 'moveset') => {
    setWrestlerData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const updateMove = (type: 'finishers' | 'moveset', index: number, value: string) => {
    setWrestlerData(prev => ({
      ...prev,
      [type]: prev[type].map((move, i) => i === index ? value : move)
    }));
  };

  const removeMove = (type: 'finishers' | 'moveset', index: number) => {
    setWrestlerData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-8">Create Custom Wrestler</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
          
          <div>
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              value={wrestlerData.name}
              onChange={(e) => setWrestlerData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
              placeholder="Enter wrestler name..."
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Gimmick</label>
            <input
              type="text"
              value={wrestlerData.gimmick}
              onChange={(e) => setWrestlerData(prev => ({ ...prev, gimmick: e.target.value }))}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
              placeholder="Enter gimmick..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Height</label>
              <input
                type="text"
                value={wrestlerData.height}
                onChange={(e) => setWrestlerData(prev => ({ ...prev, height: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                placeholder="6'0&quot;"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Weight</label>
              <input
                type="text"
                value={wrestlerData.weight}
                onChange={(e) => setWrestlerData(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                placeholder="220 lbs"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Alignment</label>
            <select
              value={wrestlerData.alignment}
              onChange={(e) => setWrestlerData(prev => ({ ...prev, alignment: e.target.value as 'face' | 'heel' | 'neutral' }))}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
            >
              <option value="face">Face (Good Guy)</option>
              <option value="heel">Heel (Bad Guy)</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Attributes</h3>
          
          {['wrestling', 'charisma', 'entertainment', 'mic', 'look'].map((stat) => (
            <div key={stat}>
              <label className="block text-white font-semibold mb-2 capitalize">{stat}</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wrestlerData[stat as keyof typeof wrestlerData] as number}
                  onChange={(e) => handleStatChange(stat, parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-white font-bold w-12">
                  {wrestlerData[stat as keyof typeof wrestlerData]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Finishers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Finishers</h3>
            <button
              onClick={() => addMove('finishers')}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          
          <div className="space-y-3">
            {wrestlerData.finishers.map((finisher, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={finisher}
                  onChange={(e) => updateMove('finishers', index, e.target.value)}
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                  placeholder="Enter finisher name..."
                />
                <button
                  onClick={() => removeMove('finishers', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Moveset */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Moveset</h3>
            <button
              onClick={() => addMove('moveset')}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {wrestlerData.moveset.map((move, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={move}
                  onChange={(e) => updateMove('moveset', index, e.target.value)}
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                  placeholder="Enter move name..."
                />
                <button
                  onClick={() => removeMove('moveset', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all">
          Create Wrestler
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other creators
const CompanyCreator: React.FC = () => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
    <h2 className="text-3xl font-bold text-white mb-8">Create Custom Company</h2>
    <p className="text-gray-300">Company creation tools coming soon...</p>
  </div>
);

const MoveCreator: React.FC = () => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
    <h2 className="text-3xl font-bold text-white mb-8">Create Custom Moves</h2>
    <p className="text-gray-300">Move creation tools coming soon...</p>
  </div>
);

const ChampionshipCreator: React.FC = () => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
    <h2 className="text-3xl font-bold text-white mb-8">Create Custom Championship</h2>
    <p className="text-gray-300">Championship creation tools coming soon...</p>
  </div>
);

export default CreationSuite;