import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Clock, User, ChevronRight } from 'lucide-react';
import { GameState, Email } from '../types/game';
import { GameEngine } from '../utils/gameLogic';

interface EmailSystemProps {
  gameState: GameState;
  onUpdateGameState: (gameState: GameState) => void;
}

const EmailSystem: React.FC<EmailSystemProps> = ({ gameState, onUpdateGameState }) => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [gameEngine] = useState(new GameEngine(gameState));

  useEffect(() => {
    // Simulate receiving new emails periodically
    const emailInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        const newEmail = gameEngine.generateRandomEmail();
        onUpdateGameState({
          ...gameState,
          inbox: [...gameState.inbox, newEmail]
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(emailInterval);
  }, [gameState, gameEngine, onUpdateGameState]);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      const updatedInbox = gameState.inbox.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      );
      onUpdateGameState({
        ...gameState,
        inbox: updatedInbox
      });
    }
  };

  const handleChoice = (choice: { text: string; effect: () => void }) => {
    choice.effect();
    setSelectedEmail(null);
  };

  const unreadCount = gameState.inbox.filter(email => !email.read).length;
  const sortedEmails = [...gameState.inbox].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Email System</h1>
        <div className="flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-400/30">
          <Mail className="w-5 h-5 mr-2" />
          <span className="font-semibold">{unreadCount} Unread</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Email List */}
        <div className="lg:col-span-1 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white font-bold">Inbox ({gameState.inbox.length})</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {sortedEmails.length === 0 ? (
              <div className="p-6 text-center">
                <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No emails yet</p>
              </div>
            ) : (
              sortedEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => handleEmailClick(email)}
                  className={`w-full p-4 text-left hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 ${
                    selectedEmail?.id === email.id ? 'bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        {email.read ? (
                          <MailOpen className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        ) : (
                          <Mail className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                        )}
                        <span className={`text-sm truncate ${
                          email.read ? 'text-gray-300' : 'text-white font-semibold'
                        }`}>
                          {email.from}
                        </span>
                      </div>
                      <p className={`text-sm truncate mb-1 ${
                        email.read ? 'text-gray-400' : 'text-white'
                      }`}>
                        {email.subject}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(email.date).toLocaleDateString()}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              {/* Email Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedEmail.subject}</h2>
                    <div className="flex items-center text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{selectedEmail.from}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(selectedEmail.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedEmail.content}
                  </p>
                </div>

                {/* Choices */}
                {selectedEmail.choices && selectedEmail.choices.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h3 className="text-white font-bold mb-4">How do you respond?</h3>
                    <div className="space-y-3">
                      {selectedEmail.choices.map((choice, index) => (
                        <button
                          key={index}
                          onClick={() => handleChoice(choice)}
                          className="w-full p-4 text-left bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg transition-all"
                        >
                          <span className="text-white font-semibold">{choice.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSystem;