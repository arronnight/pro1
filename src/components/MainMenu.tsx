import React, { useState } from 'react';
import { Play, Save, Settings, Users, Trophy, Zap, Crown, Star } from 'lucide-react';

interface MainMenuProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onCreationSuite: () => void;
  onSettings: () => void;
  onAchievements: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onNewGame,
  onLoadGame,
  onCreationSuite,
  onSettings,
  onAchievements
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: 'new-game', label: 'New Game', icon: Play, onClick: onNewGame, color: 'from-yellow-400 to-orange-500' },
    { id: 'load-game', label: 'Load Game', icon: Save, onClick: onLoadGame, color: 'from-blue-400 to-purple-500' },
    { id: 'creation-suite', label: 'Creation Suite', icon: Users, onClick: onCreationSuite, color: 'from-green-400 to-teal-500' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, onClick: onAchievements, color: 'from-purple-400 to-pink-500' },
    { id: 'settings', label: 'Settings', icon: Settings, onClick: onSettings, color: 'from-gray-400 to-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 animate-pulse">
          <Crown className="w-16 h-16 text-yellow-400/20 rotate-12" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce">
          <Star className="w-12 h-12 text-purple-400/20 -rotate-12" />
        </div>
        <div className="absolute bottom-32 left-40 animate-pulse">
          <Zap className="w-20 h-20 text-blue-400/20 rotate-45" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce">
          <Trophy className="w-14 h-14 text-orange-400/20 -rotate-6" />
        </div>
      </div>

      {/* Main menu container */}
      <div className="relative z-10 text-center">
        {/* Game title */}
        <div className="mb-16">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 tracking-wider drop-shadow-2xl">
            WRESTLING
          </h1>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wider drop-shadow-2xl">
            EMPIRE
          </h2>
          <p className="text-xl text-gray-300 mt-4 font-medium tracking-wide">
            The Ultimate Wrestling Booker Simulation
          </p>
        </div>

        {/* Menu items */}
        <div className="space-y-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  group relative w-96 h-16 rounded-xl border-2 border-transparent
                  bg-gradient-to-r ${item.color} p-0.5
                  transform transition-all duration-300 ease-out
                  ${hoveredItem === item.id ? 'scale-110 shadow-2xl' : 'hover:scale-105'}
                `}
              >
                <div className="w-full h-full bg-gray-900/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon className={`w-6 h-6 mr-3 transition-transform duration-300 ${hoveredItem === item.id ? 'scale-110' : ''}`} />
                  <span className="text-xl font-bold text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
                
                {/* Glow effect */}
                <div className={`
                  absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 blur-xl
                  transition-opacity duration-300 -z-10
                  ${hoveredItem === item.id ? 'opacity-50' : ''}
                `} />
              </button>
            );
          })}
        </div>

        {/* Version info */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-500 text-sm">Version 1.0.0 - The Ultimate Wrestling Experience</p>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainMenu;