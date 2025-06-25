import React from 'react';
import { Play, Pause, FastForward, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { GameState, CalendarEvent } from '../types/game';

interface TimeControlProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
  onAdvanceTime: (days: number) => void;
}

const TimeControl: React.FC<TimeControlProps> = ({ gameState, onUpdateGameState, onAdvanceTime }) => {
  const currentDate = new Date(gameState.currentDate);
  const upcomingEvents = gameState.calendar
    .filter(event => new Date(event.date) > currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const criticalEvents = upcomingEvents.filter(event => event.requiresAttention);

  const handleTimeAdvance = (days: number) => {
    if (criticalEvents.length > 0 && days > 1) {
      const nextCritical = criticalEvents[0];
      const daysUntilEvent = Math.ceil((new Date(nextCritical.date).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilEvent <= days) {
        // Auto-stop before critical event
        onAdvanceTime(Math.max(1, daysUntilEvent - 1));
        return;
      }
    }
    onAdvanceTime(days);
  };

  const togglePause = () => {
    onUpdateGameState({
      ...gameState,
      timeProgression: {
        ...gameState.timeProgression,
        paused: !gameState.timeProgression.paused
      }
    });
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className="text-gray-300">Week {Math.ceil(currentDate.getDate() / 7)} of {currentDate.toLocaleDateString('en-US', { month: 'long' })}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={togglePause}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
              gameState.timeProgression.paused
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {gameState.timeProgression.paused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </button>
        </div>
      </div>

      {/* Time Advancement Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleTimeAdvance(1)}
          disabled={gameState.timeProgression.paused}
          className="flex items-center justify-center px-4 py-3 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Clock className="w-5 h-5 mr-2" />
          Advance 1 Day
        </button>
        
        <button
          onClick={() => handleTimeAdvance(3)}
          disabled={gameState.timeProgression.paused}
          className="flex items-center justify-center px-4 py-3 bg-purple-600/20 text-purple-400 border border-purple-400/30 rounded-lg hover:bg-purple-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FastForward className="w-5 h-5 mr-2" />
          Advance 3 Days
        </button>
        
        <button
          onClick={() => handleTimeAdvance(7)}
          disabled={gameState.timeProgression.paused}
          className="flex items-center justify-center px-4 py-3 bg-orange-600/20 text-orange-400 border border-orange-400/30 rounded-lg hover:bg-orange-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FastForward className="w-5 h-5 mr-2" />
          Advance 1 Week
        </button>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          Upcoming Events
        </h3>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No upcoming events scheduled</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const eventDate = new Date(event.date);
              const daysUntil = Math.ceil((eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border transition-all ${
                    event.requiresAttention
                      ? 'border-red-400/50 bg-red-400/10'
                      : event.priority === 'high'
                      ? 'border-yellow-400/50 bg-yellow-400/10'
                      : 'border-gray-600 bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${
                        event.requiresAttention ? 'text-red-400' : 'text-white'
                      }`}>
                        {event.title}
                      </h4>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {eventDate.toLocaleDateString()} ({daysUntil} days)
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      {event.requiresAttention && (
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        event.priority === 'critical' ? 'bg-red-600/20 text-red-400' :
                        event.priority === 'high' ? 'bg-yellow-600/20 text-yellow-400' :
                        event.priority === 'medium' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {event.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeControl;