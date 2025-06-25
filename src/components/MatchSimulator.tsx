import React, { useState, useEffect } from 'react';
import { Sword, Shield, Zap, Heart, Target, ArrowLeft, Crown } from 'lucide-react';
import { GameState, Wrestler, MatchAction } from '../types/game';

interface MatchSimulatorProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
  onExitMatch: () => void;
}

const MatchSimulator: React.FC<MatchSimulatorProps> = ({ gameState, onUpdateGameState, onExitMatch }) => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [playerMomentum, setPlayerMomentum] = useState(50);
  const [opponentMomentum, setOpponentMomentum] = useState(50);
  const [matchLog, setMatchLog] = useState<string[]>([]);
  const [matchPhase, setMatchPhase] = useState<'early' | 'middle' | 'late' | 'finish'>('early');
  const [winner, setWinner] = useState<string | null>(null);

  const playerWrestler = gameState.playerWrestler ? gameState.wrestlers[gameState.playerWrestler] : null;
  const opponent = Object.values(gameState.wrestlers).find(w => w.id !== gameState.playerWrestler);

  if (!playerWrestler || !opponent) {
    return <div>Error: Missing wrestler data</div>;
  }

  const matchActions: MatchAction[] = [
    {
      id: 'strike',
      name: 'Strike Attack',
      type: 'strike',
      damage: 8,
      momentum: 5,
      stamina: 5,
      difficulty: 20,
      description: 'A basic striking attack'
    },
    {
      id: 'grapple',
      name: 'Grapple Move',
      type: 'grapple',
      damage: 12,
      momentum: 8,
      stamina: 8,
      difficulty: 35,
      description: 'A technical grappling maneuver'
    },
    {
      id: 'aerial',
      name: 'High-Flying Move',
      type: 'aerial',
      damage: 15,
      momentum: 12,
      stamina: 15,
      difficulty: 50,
      description: 'A spectacular aerial attack',
      requirements: { momentum: 30 }
    },
    {
      id: 'signature',
      name: 'Signature Move',
      type: 'signature',
      damage: 20,
      momentum: 15,
      stamina: 12,
      difficulty: 40,
      description: 'Your signature wrestling move',
      requirements: { momentum: 50 }
    },
    {
      id: 'finisher',
      name: 'Finisher',
      type: 'finisher',
      damage: 35,
      momentum: 25,
      stamina: 20,
      difficulty: 60,
      description: 'Your devastating finishing move',
      requirements: { momentum: 75 }
    }
  ];

  const calculateSuccess = (action: MatchAction, wrestler: Wrestler): boolean => {
    const baseChance = wrestler.wrestling + wrestler.strength + wrestler.speed;
    const difficultyModifier = action.difficulty;
    const momentumBonus = playerMomentum > 70 ? 20 : playerMomentum > 40 ? 10 : 0;
    
    const successChance = (baseChance / 3) + momentumBonus - difficultyModifier;
    return Math.random() * 100 < successChance;
  };

  const executeAction = (action: MatchAction) => {
    if (action.requirements?.momentum && playerMomentum < action.requirements.momentum) {
      addToLog(`Not enough momentum for ${action.name}!`);
      return;
    }

    const success = calculateSuccess(action, playerWrestler);
    
    if (success) {
      const damage = action.damage + Math.floor(Math.random() * 5);
      const newOpponentHealth = Math.max(0, opponentHealth - damage);
      const newPlayerMomentum = Math.min(100, playerMomentum + action.momentum);
      
      setOpponentHealth(newOpponentHealth);
      setPlayerMomentum(newPlayerMomentum);
      
      addToLog(`${playerWrestler.name} successfully executes ${action.name} for ${damage} damage!`);
      
      if (newOpponentHealth <= 0) {
        setWinner(playerWrestler.id);
        addToLog(`${playerWrestler.name} wins the match!`);
        return;
      }
    } else {
      addToLog(`${playerWrestler.name} attempts ${action.name} but it's countered!`);
      setPlayerMomentum(Math.max(0, playerMomentum - 10));
    }

    // Opponent's turn
    setTimeout(() => {
      opponentTurn();
    }, 1500);
  };

  const opponentTurn = () => {
    const availableActions = matchActions.filter(action => 
      !action.requirements?.momentum || opponentMomentum >= action.requirements.momentum
    );
    
    const randomAction = availableActions[Math.floor(Math.random() * availableActions.length)];
    const success = Math.random() * 100 < (opponent.wrestling + opponent.strength) / 2;
    
    if (success) {
      const damage = randomAction.damage + Math.floor(Math.random() * 5);
      const newPlayerHealth = Math.max(0, playerHealth - damage);
      const newOpponentMomentum = Math.min(100, opponentMomentum + randomAction.momentum);
      
      setPlayerHealth(newPlayerHealth);
      setOpponentMomentum(newOpponentMomentum);
      
      addToLog(`${opponent.name} hits ${randomAction.name} for ${damage} damage!`);
      
      if (newPlayerHealth <= 0) {
        setWinner(opponent.id);
        addToLog(`${opponent.name} wins the match!`);
        return;
      }
    } else {
      addToLog(`${opponent.name} attempts ${randomAction.name} but misses!`);
      setOpponentMomentum(Math.max(0, opponentMomentum - 10));
    }
  };

  const addToLog = (message: string) => {
    setMatchLog(prev => [...prev.slice(-4), message]);
  };

  const handleMatchEnd = () => {
    if (winner === playerWrestler.id) {
      // Player wins
      const updatedStats = {
        ...gameState.beAProStats!,
        wins: gameState.beAProStats!.wins + 1,
        currentMomentum: Math.min(100, gameState.beAProStats!.currentMomentum + 20)
      };
      
      onUpdateGameState({
        ...gameState,
        beAProStats: updatedStats
      });
    } else {
      // Player loses
      const updatedStats = {
        ...gameState.beAProStats!,
        losses: gameState.beAProStats!.losses + 1,
        currentMomentum: Math.max(0, gameState.beAProStats!.currentMomentum - 10)
      };
      
      onUpdateGameState({
        ...gameState,
        beAProStats: updatedStats
      });
    }
    
    onExitMatch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExitMatch}
            className="flex items-center text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Exit Match
          </button>
          
          <h1 className="text-3xl font-bold text-white">
            {playerWrestler.name} vs {opponent.name}
          </h1>
          
          <div className="text-white text-right">
            <p className="text-sm text-gray-300">Match Phase</p>
            <p className="font-bold capitalize">{matchPhase}</p>
          </div>
        </div>

        {/* Health and Momentum Bars */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Player */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-400/50">
            <h3 className="text-xl font-bold text-blue-400 mb-4">{playerWrestler.name}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-400" />
                    Health
                  </span>
                  <span className="text-white font-bold">{playerHealth}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-red-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Momentum
                  </span>
                  <span className="text-white font-bold">{playerMomentum}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${playerMomentum}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Opponent */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-red-400/50">
            <h3 className="text-xl font-bold text-red-400 mb-4">{opponent.name}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-400" />
                    Health
                  </span>
                  <span className="text-white font-bold">{opponentHealth}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-red-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${opponentHealth}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    Momentum
                  </span>
                  <span className="text-white font-bold">{opponentMomentum}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${opponentMomentum}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Match Actions */}
        {!winner && (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Choose Your Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {matchActions.map((action) => {
                const canUse = !action.requirements?.momentum || playerMomentum >= action.requirements.momentum;
                const Icon = action.type === 'strike' ? Sword : 
                           action.type === 'grapple' ? Shield :
                           action.type === 'finisher' ? Crown : Target;
                
                return (
                  <button
                    key={action.id}
                    onClick={() => executeAction(action)}
                    disabled={!canUse}
                    className={`p-4 rounded-lg border transition-all ${
                      canUse
                        ? 'border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20'
                        : 'border-gray-600 bg-gray-700/50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${canUse ? 'text-yellow-400' : 'text-gray-500'}`} />
                    <p className={`font-semibold text-sm ${canUse ? 'text-white' : 'text-gray-500'}`}>
                      {action.name}
                    </p>
                    <p className={`text-xs mt-1 ${canUse ? 'text-gray-300' : 'text-gray-600'}`}>
                      {action.damage} DMG
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Match Log */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Match Commentary</h3>
          <div className="space-y-2 h-32 overflow-y-auto">
            {matchLog.map((log, index) => (
              <p key={index} className="text-gray-300 text-sm">
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* Match End */}
        {winner && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                {winner === playerWrestler.id ? 'Victory!' : 'Defeat!'}
              </h2>
              <p className="text-gray-300 mb-6">
                {winner === playerWrestler.id 
                  ? `${playerWrestler.name} wins the match!`
                  : `${opponent.name} wins the match!`
                }
              </p>
              <button
                onClick={handleMatchEnd}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchSimulator;