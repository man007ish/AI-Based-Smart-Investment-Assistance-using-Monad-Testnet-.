import React, { useState, useEffect } from 'react';
import { Streak } from '../types';
import { Flame, Trophy, Star, Target, TrendingUp, Calendar, Zap, Gift, Crown } from 'lucide-react';

const Streaks: React.FC = () => {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockStreaks: Streak[] = [
      {
        id: 'streak-001',
        type: 'winning_trades',
        currentStreak: 8,
        longestStreak: 12,
        lastActivity: new Date(Date.now() - 86400000 * 2),
        rewards: [
          {
            level: 5,
            title: 'Hot Trader',
            description: '5 consecutive winning trades',
            unlocked: true
          },
          {
            level: 10,
            title: 'Streak Master',
            description: '10 consecutive winning trades',
            unlocked: false
          },
          {
            level: 15,
            title: 'Unstoppable',
            description: '15 consecutive winning trades',
            unlocked: false
          }
        ],
        nextMilestone: {
          target: 10,
          reward: 'Streak Master Badge + 100 XP'
        }
      },
      {
        id: 'streak-002',
        type: 'daily_login',
        currentStreak: 23,
        longestStreak: 45,
        lastActivity: new Date(),
        rewards: [
          {
            level: 7,
            title: 'Week Warrior',
            description: '7 consecutive days of login',
            unlocked: true
          },
          {
            level: 30,
            title: 'Monthly Master',
            description: '30 consecutive days of login',
            unlocked: false
          },
          {
            level: 100,
            title: 'Century Club',
            description: '100 consecutive days of login',
            unlocked: false
          }
        ],
        nextMilestone: {
          target: 30,
          reward: 'Monthly Master Badge + 500 XP'
        }
      },
      {
        id: 'streak-003',
        type: 'analysis_completed',
        currentStreak: 5,
        longestStreak: 8,
        lastActivity: new Date(Date.now() - 86400000 * 1),
        rewards: [
          {
            level: 3,
            title: 'Analyst',
            description: '3 consecutive AI analyses completed',
            unlocked: true
          },
          {
            level: 7,
            title: 'Research Pro',
            description: '7 consecutive AI analyses completed',
            unlocked: false
          },
          {
            level: 15,
            title: 'AI Expert',
            description: '15 consecutive AI analyses completed',
            unlocked: false
          }
        ],
        nextMilestone: {
          target: 7,
          reward: 'Research Pro Badge + 200 XP'
        }
      },
      {
        id: 'streak-004',
        type: 'portfolio_growth',
        currentStreak: 3,
        longestStreak: 7,
        lastActivity: new Date(Date.now() - 86400000 * 3),
        rewards: [
          {
            level: 3,
            title: 'Growth Tracker',
            description: '3 consecutive days of portfolio growth',
            unlocked: true
          },
          {
            level: 7,
            title: 'Growth Master',
            description: '7 consecutive days of portfolio growth',
            unlocked: false
          },
          {
            level: 14,
            title: 'Growth Legend',
            description: '14 consecutive days of portfolio growth',
            unlocked: false
          }
        ],
        nextMilestone: {
          target: 7,
          reward: 'Growth Master Badge + 300 XP'
        }
      }
    ];
    
    setStreaks(mockStreaks);
    setIsLoading(false);
  };

  const getStreakIcon = (type: string) => {
    switch (type) {
      case 'winning_trades': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'daily_login': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'analysis_completed': return <Target className="h-5 w-5 text-purple-600" />;
      case 'portfolio_growth': return <Star className="h-5 w-5 text-yellow-600" />;
      default: return <Flame className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStreakColor = (type: string) => {
    switch (type) {
      case 'winning_trades': return 'bg-green-50 border-green-200';
      case 'daily_login': return 'bg-blue-50 border-blue-200';
      case 'analysis_completed': return 'bg-purple-50 border-purple-200';
      case 'portfolio_growth': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStreakTitle = (type: string) => {
    switch (type) {
      case 'winning_trades': return 'Winning Trades';
      case 'daily_login': return 'Daily Login';
      case 'analysis_completed': return 'AI Analysis';
      case 'portfolio_growth': return 'Portfolio Growth';
      default: return 'Streak';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStreakStatus = (streak: Streak) => {
    const daysSinceLastActivity = Math.floor((Date.now() - streak.lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastActivity === 0) return 'active';
    if (daysSinceLastActivity === 1) return 'warning';
    return 'broken';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'broken': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'warning': return 'At Risk';
      case 'broken': return 'Broken';
      default: return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Flame className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Streaks & Achievements</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading streaks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Flame className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Streaks & Achievements</h2>
        </div>
        <button
          onClick={loadStreaks}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Streaks Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {streaks.reduce((sum, streak) => sum + streak.currentStreak, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Streaks</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">
            {streaks.reduce((sum, streak) => sum + streak.longestStreak, 0)}
          </div>
          <div className="text-sm text-gray-600">Longest Streaks</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-purple-50">
          <div className="text-2xl font-bold text-purple-600">
            {streaks.reduce((sum, streak) => sum + streak.rewards.filter(r => r.unlocked).length, 0)}
          </div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-orange-50">
          <div className="text-2xl font-bold text-orange-600">
            {streaks.filter(streak => getStreakStatus(streak) === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Streaks</div>
        </div>
      </div>

      {/* Streaks List */}
      <div className="space-y-4">
        {streaks.map((streak) => {
          const status = getStreakStatus(streak);
          const progressPercentage = getProgressPercentage(streak.currentStreak, streak.nextMilestone.target);
          
          return (
            <div key={streak.id} className={`border rounded-lg p-4 ${getStreakColor(streak.type)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStreakIcon(streak.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{getStreakTitle(streak.type)}</h3>
                    <p className="text-sm text-gray-600">
                      Current: {streak.currentStreak} | Longest: {streak.longestStreak}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {getStatusText(status)}
                  </span>
                  <Flame className={`h-5 w-5 ${status === 'active' ? 'text-orange-500' : 'text-gray-400'}`} />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to next milestone</span>
                  <span>{streak.currentStreak}/{streak.nextMilestone.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Next: {streak.nextMilestone.reward}</span>
                  <span>{progressPercentage.toFixed(1)}%</span>
                </div>
              </div>

              {/* Rewards */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  Rewards
                </h4>
                <div className="flex flex-wrap gap-2">
                  {streak.rewards.map((reward, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                        reward.unlocked
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {reward.unlocked ? (
                        <Star className="h-3 w-3" />
                      ) : (
                        <Target className="h-3 w-3" />
                      )}
                      <span>{reward.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  Last activity: {streak.lastActivity.toLocaleDateString()}
                </span>
                {status === 'warning' && (
                  <span className="text-yellow-600 font-medium">
                    ⚠️ Streak at risk - login today!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Showcase */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Crown className="h-5 w-5 text-yellow-600 mr-2" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streaks
            .flatMap(streak => streak.rewards.filter(reward => reward.unlocked))
            .slice(0, 3)
            .map((reward, index) => (
              <div key={index} className="bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900">{reward.title}</div>
                    <div className="text-xs text-gray-600">{reward.description}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Streak Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Streak Tips</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Login daily to maintain your daily login streak</p>
          <p>• Complete AI analyses regularly to build research streaks</p>
          <p>• Focus on quality trades to maintain winning streaks</p>
          <p>• Monitor your portfolio growth for consistent performance</p>
          <p>• Streaks reset if you miss a day, so stay consistent!</p>
        </div>
      </div>
    </div>
  );
};

export default Streaks; 