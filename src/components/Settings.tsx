import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Monitor, Gamepad2, Shield, Star } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 90,
    soundEnabled: true,
    musicEnabled: true,
    fullscreen: false,
    resolution: '1920x1080',
    difficulty: 'normal',
    autoSave: true,
    autoSaveInterval: 5,
    fastForward: false,
    showRatings: true,
    showTips: true,
    cheatsEnabled: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const cheatCodes = [
    { code: 'MONEY', description: 'Add $1,000,000', unlocked: true },
    { code: 'POPULARITY', description: 'Max popularity for all wrestlers', unlocked: false },
    { code: 'NOGAP', description: 'Remove all injuries', unlocked: true },
    { code: 'FASTTIME', description: 'Speed up time progression', unlocked: false },
    { code: 'ALLSTARS', description: 'Unlock all wrestlers', unlocked: false },
    { code: 'INFINITE', description: 'Infinite money', unlocked: false }
  ];

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
            Settings
          </h1>

          <div className="space-y-8">
            {/* Audio Settings */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Volume2 className="w-6 h-6 mr-3" />
                Audio Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Master Volume</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.masterVolume}
                      onChange={(e) => handleSettingChange('masterVolume', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-white font-bold w-12">{settings.masterVolume}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Music Volume</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.musicVolume}
                      onChange={(e) => handleSettingChange('musicVolume', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-white font-bold w-12">{settings.musicVolume}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Sound Effects</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.sfxVolume}
                      onChange={(e) => handleSettingChange('sfxVolume', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-white font-bold w-12">{settings.sfxVolume}%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Enable Sound Effects</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.musicEnabled}
                      onChange={(e) => handleSettingChange('musicEnabled', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Enable Background Music</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Monitor className="w-6 h-6 mr-3" />
                Display Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Resolution</label>
                  <select
                    value={settings.resolution}
                    onChange={(e) => handleSettingChange('resolution', e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                  >
                    <option value="1920x1080">1920x1080 (Full HD)</option>
                    <option value="1366x768">1366x768</option>
                    <option value="1280x720">1280x720 (HD)</option>
                    <option value="2560x1440">2560x1440 (2K)</option>
                    <option value="3840x2160">3840x2160 (4K)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.fullscreen}
                      onChange={(e) => handleSettingChange('fullscreen', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Fullscreen Mode</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.showRatings}
                      onChange={(e) => handleSettingChange('showRatings', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Show Match Ratings</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.showTips}
                      onChange={(e) => handleSettingChange('showTips', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Show Gameplay Tips</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Gameplay Settings */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-3" />
                Gameplay Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Difficulty</label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                  >
                    <option value="easy">Easy</option>
                    <option value="normal">Normal</option>
                    <option value="hard">Hard</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Auto-Save Interval (minutes)</label>
                  <select
                    value={settings.autoSaveInterval}
                    onChange={(e) => handleSettingChange('autoSaveInterval', parseInt(e.target.value))}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
                  >
                    <option value={1}>1 minute</option>
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Enable Auto-Save</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.fastForward}
                      onChange={(e) => handleSettingChange('fastForward', e.target.checked)}
                      className="mr-3"
                    />
                    <span className="text-white">Fast Forward Mode</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Cheats */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Cheat Codes
              </h2>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.cheatsEnabled}
                    onChange={(e) => handleSettingChange('cheatsEnabled', e.target.checked)}
                    className="mr-3"
                  />
                  <span className="text-white font-semibold">Enable Cheats</span>
                </label>
                <p className="text-gray-400 text-sm mt-2">
                  Warning: Using cheats may disable achievements
                </p>
              </div>

              {settings.cheatsEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cheatCodes.map((cheat, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      cheat.unlocked 
                        ? 'border-green-400/30 bg-green-400/10' 
                        : 'border-gray-600 bg-gray-800/50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-yellow-400 font-mono font-bold">{cheat.code}</code>
                        {cheat.unlocked ? (
                          <Star className="w-5 h-5 text-green-400" />
                        ) : (
                          <Shield className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <p className={`text-sm ${cheat.unlocked ? 'text-white' : 'text-gray-500'}`}>
                        {cheat.description}
                      </p>
                      {cheat.unlocked && (
                        <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-all">
                          Activate
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Settings */}
            <div className="text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;