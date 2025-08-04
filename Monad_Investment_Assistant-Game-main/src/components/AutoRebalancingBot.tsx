import React, { useState, useEffect } from 'react';
import { AutoRebalancingBot, Portfolio } from '../types';
import { Bot, Settings, Play, Pause, TrendingUp, BarChart3, Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface AutoRebalancingBotProps {
  portfolio: Portfolio;
}

const AutoRebalancingBotComponent: React.FC<AutoRebalancingBotProps> = ({ portfolio }) => {
  const [bot, setBot] = useState<AutoRebalancingBot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);

  useEffect(() => {
    loadBot();
  }, []);

  const loadBot = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockBot: AutoRebalancingBot = {
      id: 'bot-001',
      name: 'AI Portfolio Balancer',
      isActive: true,
      targetAllocations: [
        { symbol: 'ETH', percentage: 40 },
        { symbol: 'BTC', percentage: 30 },
        { symbol: 'USDC', percentage: 20 },
        { symbol: 'MEME', percentage: 10 }
      ],
      currentAllocations: [
        { symbol: 'ETH', percentage: 38.5 },
        { symbol: 'BTC', percentage: 32.1 },
        { symbol: 'USDC', percentage: 18.9 },
        { symbol: 'MEME', percentage: 10.5 }
      ],
      rebalancingThreshold: 5,
      lastRebalanced: new Date(Date.now() - 86400000), // 1 day ago
      performance: {
        totalTrades: 47,
        successfulTrades: 42,
        totalProfit: 12500,
        averageReturn: 8.7
      },
      settings: {
        autoRebalance: true,
        riskTolerance: 'moderate',
        rebalanceFrequency: 'weekly'
      }
    };
    
    setBot(mockBot);
    setIsLoading(false);
  };

  const toggleBot = async () => {
    if (!bot) return;
    
    setIsRebalancing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBot(prev => prev ? {
      ...prev,
      isActive: !prev.isActive,
      lastRebalanced: new Date()
    } : null);
    
    setIsRebalancing(false);
  };

  const triggerRebalance = async () => {
    if (!bot) return;
    
    setIsRebalancing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate rebalancing
    setBot(prev => prev ? {
      ...prev,
      currentAllocations: prev.targetAllocations.map(target => ({
        ...target,
        percentage: target.percentage + (Math.random() - 0.5) * 2 // Small random adjustment
      })),
      lastRebalanced: new Date(),
      performance: {
        ...prev.performance,
        totalTrades: prev.performance.totalTrades + 1,
        successfulTrades: prev.performance.successfulTrades + 1,
        totalProfit: prev.performance.totalProfit + Math.random() * 1000
      }
    } : null);
    
    setIsRebalancing(false);
  };

  const getDeviation = (current: number, target: number) => {
    return Math.abs(current - target);
  };

  const needsRebalancing = (current: number, target: number) => {
    return getDeviation(current, target) > (bot?.rebalancingThreshold || 5);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bot className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Auto-Rebalancing Bot</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading bot configuration...</span>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8 text-gray-600">
          No bot configuration found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">{bot.name}</h2>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            bot.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {bot.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={toggleBot}
            disabled={isRebalancing}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              bot.isActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            } ${isRebalancing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRebalancing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : bot.isActive ? (
              <>
                <Pause className="h-4 w-4 inline mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 inline mr-2" />
                Start
              </>
            )}
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{bot.performance.totalTrades}</div>
          <div className="text-sm text-gray-600">Total Trades</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{bot.performance.successfulTrades}</div>
          <div className="text-sm text-gray-600">Successful</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">${bot.performance.totalProfit.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Profit</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{bot.performance.averageReturn}%</div>
          <div className="text-sm text-gray-600">Avg Return</div>
        </div>
      </div>

      {/* Allocation Comparison */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Portfolio Allocations</h3>
          <button
            onClick={triggerRebalance}
            disabled={isRebalancing || !bot.isActive}
            className={`px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${
              isRebalancing || !bot.isActive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRebalancing ? 'Rebalancing...' : 'Rebalance Now'}
          </button>
        </div>
        
        <div className="space-y-3">
          {bot.targetAllocations.map((target) => {
            const current = bot.currentAllocations.find(c => c.symbol === target.symbol);
            const deviation = current ? getDeviation(current.percentage, target.percentage) : 0;
            const needsRebalance = current ? needsRebalancing(current.percentage, target.percentage) : false;
            
            return (
              <div key={target.symbol} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{target.symbol}</span>
                    {needsRebalance && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Deviation: {deviation.toFixed(1)}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Target</span>
                      <span className="font-medium">{target.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${target.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Current</span>
                      <span className={`font-medium ${needsRebalance ? 'text-red-600' : 'text-green-600'}`}>
                        {current?.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          needsRebalance ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${current?.percentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bot Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Tolerance
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={bot.settings.riskTolerance}
                onChange={(e) => setBot(prev => prev ? {
                  ...prev,
                  settings: { ...prev.settings, riskTolerance: e.target.value as any }
                } : null)}
              >
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rebalance Frequency
              </label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={bot.settings.rebalanceFrequency}
                onChange={(e) => setBot(prev => prev ? {
                  ...prev,
                  settings: { ...prev.settings, rebalanceFrequency: e.target.value as any }
                } : null)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rebalancing Threshold (%)
              </label>
              <input 
                type="number"
                min="1"
                max="20"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={bot.rebalancingThreshold}
                onChange={(e) => setBot(prev => prev ? {
                  ...prev,
                  rebalancingThreshold: parseInt(e.target.value)
                } : null)}
              />
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="autoRebalance"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={bot.settings.autoRebalance}
                onChange={(e) => setBot(prev => prev ? {
                  ...prev,
                  settings: { ...prev.settings, autoRebalance: e.target.checked }
                } : null)}
              />
              <label htmlFor="autoRebalance" className="ml-2 block text-sm text-gray-700">
                Auto-rebalance when threshold is exceeded
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">
              Last rebalanced: {bot.lastRebalanced.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Threshold: {bot.rebalancingThreshold}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRebalancingBotComponent; 