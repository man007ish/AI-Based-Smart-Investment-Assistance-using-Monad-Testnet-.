import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Coins, Target, Zap, Star } from 'lucide-react';
import { GameService } from '../services/gameService';
import { GameStats, CoinReward } from '../types';

const Game: React.FC = () => {
  const gameService = GameService.getInstance();
  
  const [gameStats, setGameStats] = useState<GameStats>(gameService.getGameStats());
  const [coinRewards, setCoinRewards] = useState<CoinReward[]>(gameService.getRecentRewards());
  const [achievements, setAchievements] = useState(gameService.getAchievements());
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<'MONAD' | 'ETH' | 'BTC'>('MONAD');
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Coin earning rates
  const coinRates = gameService.getCoinRates();

  const handleGameStart = useCallback(() => {
    setIsGameActive(true);
    
    // Start a new game session using the service
    const session = gameService.startGameSession(selectedCoin);
    setCurrentSession(session.id);
    
    // Update local state
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, [gameService, selectedCoin]);

  const handleGameEnd = useCallback((finalScore: number) => {
    setIsGameActive(false);
    
    if (currentSession) {
      // End the game session and get the reward
      const reward = gameService.endGameSession(currentSession, finalScore);
      
      if (reward) {
        // Update local state with new data from service
        setGameStats(gameService.getGameStats());
        setCoinRewards(gameService.getRecentRewards());
        setAchievements(gameService.getAchievements());
        
        // Show reward notification
        setNotification({
          message: `🎉 Earned ${reward.amount} ${reward.coinType} coins!`,
          type: 'success'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      }
    }
    
    setCurrentSession(null);
  }, [gameService, currentSession]);

  // Load initial data from service
  useEffect(() => {
    setGameStats(gameService.getGameStats());
    setCoinRewards(gameService.getRecentRewards());
    setAchievements(gameService.getAchievements());
  }, [gameService]);

  // Simulate game score updates (in real implementation, this would come from iframe messages)
  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        // Simulate score updates
        const simulatedScore = Math.floor(Math.random() * 1000) + 100;
        setGameStats(prev => ({ ...prev, score: simulatedScore }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isGameActive]);

  // Listen for iframe messages (for real integration)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://phoboslab.org') {
        const { type, data } = event.data;
        
        switch (type) {
          case 'gameStart':
            handleGameStart();
            break;
          case 'gameEnd':
            handleGameEnd(data.score);
            break;
          case 'scoreUpdate':
            setGameStats(prev => ({ ...prev, score: data.score }));
            break;
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleGameStart, handleGameEnd]);

  const getCoinIcon = (coin: string) => {
    switch (coin) {
      case 'MONAD':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'ETH':
        return <Coins className="w-4 h-4 text-blue-500" />;
      case 'BTC':
        return <Star className="w-4 h-4 text-orange-500" />;
      default:
        return <Coins className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Play & Earn</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getCoinIcon(selectedCoin)}
                  <span className="font-semibold text-gray-700">{gameStats.coins}</span>
                </div>
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value as 'MONAD' | 'ETH' | 'BTC')}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="MONAD">MONAD</option>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                </select>
              </div>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current Score</p>
                    <p className="text-xl font-bold text-blue-600">{gameStats.score}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Best Score</p>
                    <p className="text-xl font-bold text-green-600">{gameStats.bestScore}</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Level</p>
                    <p className="text-xl font-bold text-purple-600">{gameStats.level}</p>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-xl font-bold text-orange-600">{gameStats.streak}</p>
                  </div>
                </div>
              </div>
            </div>

                         {/* Game Iframe */}
             <div className="relative bg-gray-100 rounded-lg p-4">
               <div className="w-full max-w-4xl mx-auto" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                 <iframe
                   ref={iframeRef}
                   src="https://phoboslab.org/xtype/canvas.html"
                   width="100%"
                   height="100%"
                   className="border-0 rounded-lg shadow-lg bg-white"
                   title="XType Game"
                   allow="fullscreen"
                   style={{ 
                     minHeight: '400px',
                     maxHeight: '600px'
                   }}
                 />
               </div>
               
               {/* Game Controls Overlay */}
               <div className="absolute top-4 right-4 md:top-8 md:right-8 flex space-x-2 z-10">
                 <button
                   onClick={handleGameStart}
                   disabled={isGameActive}
                   className={`px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium shadow-lg ${
                     isGameActive
                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       : 'bg-green-600 text-white hover:bg-green-700'
                   }`}
                 >
                   {isGameActive ? 'Playing...' : 'Start'}
                 </button>
                 <button
                   onClick={() => handleGameEnd(gameStats.score)}
                   disabled={!isGameActive}
                   className={`px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium shadow-lg ${
                     !isGameActive
                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       : 'bg-red-600 text-white hover:bg-red-700'
                   }`}
                 >
                   End
                 </button>
               </div>
               
               {/* Game Instructions */}
               <div className="mt-4 text-center">
                 <p className="text-xs md:text-sm text-gray-600">
                   Use arrow keys or WASD to move, spacebar to shoot. Click the game area to focus.
                 </p>
               </div>
             </div>

            {/* Coin Earning Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earning Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(coinRates).map(([coin, rate]) => (
                  <div key={coin} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCoinIcon(coin)}
                      <span className="font-medium">{coin}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Base: {rate.base}</p>
                      <p className="text-sm text-gray-600">Multiplier: {rate.multiplier}x</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Rewards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rewards</h3>
            <div className="space-y-3">
                             {coinRewards.slice(0, 5).map((reward) => (
                 <div key={reward.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                   <div>
                     <div className="flex items-center space-x-2">
                       {getCoinIcon(reward.coinType)}
                       <p className="font-medium text-green-800">+{reward.amount} {reward.coinType}</p>
                     </div>
                     <p className="text-sm text-green-600">{reward.reason}</p>
                   </div>
                   <span className="text-xs text-gray-500">
                     {reward.timestamp.toLocaleTimeString()}
                   </span>
                 </div>
               ))}
              {coinRewards.length === 0 && (
                <p className="text-gray-500 text-center py-4">No rewards yet. Start playing to earn!</p>
              )}
            </div>
          </div>

                     {/* Achievements */}
           <div className="bg-white rounded-lg shadow-lg p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
             <div className="space-y-3">
               {achievements.map((achievement) => (
                 <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                   achievement.unlocked ? 'bg-yellow-50' : 'bg-gray-50'
                 }`}>
                   <Trophy className={`w-5 h-5 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                   <div className="flex-1">
                     <p className={`font-medium ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
                       {achievement.title}
                     </p>
                     <p className="text-sm text-gray-600">{achievement.description}</p>
                     {achievement.unlocked && (
                       <p className="text-xs text-green-600 mt-1">
                         +{achievement.reward} coins earned
                       </p>
                     )}
                   </div>
                   {achievement.unlocked && (
                     <div className="text-xs text-gray-500">
                       {achievement.unlockedAt?.toLocaleDateString()}
                     </div>
                   )}
                 </div>
               ))}
               {achievements.length === 0 && (
                 <p className="text-gray-500 text-center py-4">No achievements yet. Keep playing to unlock them!</p>
               )}
             </div>
           </div>

          {/* Game Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-medium">{gameStats.gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Play Time:</span>
                <span className="font-medium">{Math.floor(gameStats.totalPlayTime / 60)}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-medium">
                  {gameStats.gamesPlayed > 0 ? Math.floor(gameStats.score / gameStats.gamesPlayed) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game; 