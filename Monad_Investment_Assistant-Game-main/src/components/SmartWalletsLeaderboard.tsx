import React, { useState, useEffect } from 'react';
import { SmartWallet } from '../types';
import { Trophy, TrendingUp, TrendingDown, Activity, Target, Crown, Star, Users } from 'lucide-react';

const SmartWalletsLeaderboard: React.FC = () => {
  const [smartWallets, setSmartWallets] = useState<SmartWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    loadSmartWallets();
  }, [selectedTimeframe]);

  const loadSmartWallets = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockWallets: SmartWallet[] = [
      {
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        name: 'Whale Alert',
        aiScore: 9.8,
        totalValue: 2847500,
        profitLoss24h: 125000,
        profitLoss7d: 450000,
        profitLoss30d: 1200000,
        tradingFrequency: 15,
        successRate: 94.2,
        strategies: ['Momentum Trading', 'Arbitrage', 'Yield Farming'],
        lastActive: new Date(),
        rank: 1
      },
      {
        address: '0x8ba1f109551bD432803012645Hac136c772c3e3',
        name: 'DeFi Master',
        aiScore: 9.5,
        totalValue: 1568000,
        profitLoss24h: 89000,
        profitLoss7d: 320000,
        profitLoss30d: 850000,
        tradingFrequency: 12,
        successRate: 91.8,
        strategies: ['DeFi Protocols', 'Liquidity Mining', 'Flash Loans'],
        lastActive: new Date(Date.now() - 3600000),
        rank: 2
      },
      {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'Crypto Ninja',
        aiScore: 9.2,
        totalValue: 892000,
        profitLoss24h: 67000,
        profitLoss7d: 245000,
        profitLoss30d: 620000,
        tradingFrequency: 8,
        successRate: 89.5,
        strategies: ['Swing Trading', 'Technical Analysis', 'News Trading'],
        lastActive: new Date(Date.now() - 7200000),
        rank: 3
      },
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        name: 'Yield Hunter',
        aiScore: 8.9,
        totalValue: 567000,
        profitLoss24h: 45000,
        profitLoss7d: 180000,
        profitLoss30d: 480000,
        tradingFrequency: 6,
        successRate: 87.3,
        strategies: ['Yield Optimization', 'Staking', 'Governance'],
        lastActive: new Date(Date.now() - 10800000),
        rank: 4
      },
      {
        address: '0x9876543210fedcba9876543210fedcba98765432',
        name: 'Arbitrage Pro',
        aiScore: 8.7,
        totalValue: 423000,
        profitLoss24h: 34000,
        profitLoss7d: 125000,
        profitLoss30d: 320000,
        tradingFrequency: 25,
        successRate: 85.1,
        strategies: ['Cross-DEX Arbitrage', 'MEV', 'Flash Trading'],
        lastActive: new Date(Date.now() - 1800000),
        rank: 5
      },
      {
        address: '0xfedcba0987654321fedcba0987654321fedcba09',
        name: 'Meme Lord',
        aiScore: 8.4,
        totalValue: 298000,
        profitLoss24h: 28000,
        profitLoss7d: 95000,
        profitLoss30d: 240000,
        tradingFrequency: 18,
        successRate: 82.7,
        strategies: ['Meme Trading', 'Social Sentiment', 'Pump Detection'],
        lastActive: new Date(Date.now() - 5400000),
        rank: 6
      },
      {
        address: '0x5555555555555555555555555555555555555555',
        name: 'Stable Master',
        aiScore: 8.1,
        totalValue: 189000,
        profitLoss24h: 12000,
        profitLoss7d: 45000,
        profitLoss30d: 120000,
        tradingFrequency: 4,
        successRate: 79.8,
        strategies: ['Stablecoin Farming', 'Risk Management', 'DCA'],
        lastActive: new Date(Date.now() - 14400000),
        rank: 7
      },
      {
        address: '0x6666666666666666666666666666666666666666',
        name: 'NFT Trader',
        aiScore: 7.8,
        totalValue: 145000,
        profitLoss24h: 8900,
        profitLoss7d: 32000,
        profitLoss30d: 85000,
        tradingFrequency: 3,
        successRate: 76.4,
        strategies: ['NFT Flipping', 'Floor Trading', 'Rare Hunting'],
        lastActive: new Date(Date.now() - 21600000),
        rank: 8
      }
    ];
    
    setSmartWallets(mockWallets);
    setIsLoading(false);
  };

  const getProfitLoss = (wallet: SmartWallet) => {
    switch (selectedTimeframe) {
      case '24h': return wallet.profitLoss24h;
      case '7d': return wallet.profitLoss7d;
      case '30d': return wallet.profitLoss30d;
      default: return wallet.profitLoss24h;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-gray-500 font-semibold">#{rank}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Trophy className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Smart Wallets Leaderboard</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading smart wallets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Trophy className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Smart Wallets Leaderboard</h2>
        </div>
        <div className="flex space-x-2">
          {(['24h', '7d', '30d'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>AI-detected smart wallets ranked by performance and trading strategies</span>
        </div>
      </div>

      <div className="space-y-4">
        {smartWallets.map((wallet) => {
          const profitLoss = getProfitLoss(wallet);
          const isPositive = profitLoss >= 0;
          
          return (
            <div key={wallet.address} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(wallet.rank)}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {wallet.name || `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">{wallet.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${wallet.totalValue.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}${Math.abs(profitLoss).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{wallet.aiScore}</div>
                  <div className="text-xs text-gray-500">AI Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{wallet.successRate}%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{wallet.tradingFrequency}</div>
                  <div className="text-xs text-gray-500">Trades/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {wallet.lastActive.toLocaleTimeString()}
                  </div>
                  <div className="text-xs text-gray-500">Last Active</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {wallet.strategies.map((strategy, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {strategy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">How AI Detects Smart Wallets</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Consistent positive returns across multiple timeframes</p>
          <p>• High success rate in trading decisions</p>
          <p>• Sophisticated trading strategies and patterns</p>
          <p>• Optimal risk management and position sizing</p>
          <p>• Active participation in DeFi protocols</p>
        </div>
      </div>
    </div>
  );
};

export default SmartWalletsLeaderboard; 