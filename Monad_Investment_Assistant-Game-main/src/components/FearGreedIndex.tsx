import React, { useState, useEffect } from 'react';
import { FearGreedIndex as FearGreedIndexType } from '../types';
import { TrendingUp, TrendingDown, Activity, BarChart3, Clock, Zap, Users, Coins } from 'lucide-react';

const FearGreedIndex: React.FC = () => {
  const [fearGreedData, setFearGreedData] = useState<FearGreedIndexType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  useEffect(() => {
    loadFearGreedData();
  }, [selectedTimeframe]);

  const loadFearGreedData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData: FearGreedIndexType = {
      value: 65,
      level: 'greed',
      factors: {
        volatility: 45,
        marketMomentum: 72,
        socialSentiment: 68,
        dominance: 58,
        volume: 81
      },
      onChainMetrics: {
        activeAddresses: 2450000,
        transactionCount: 890000,
        gasPrice: 25,
        defiTVL: 48500000000,
        stakingRatio: 0.42
      },
      timestamp: new Date()
    };
    
    setFearGreedData(mockData);
    setIsLoading(false);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'extreme_fear': return 'text-red-600 bg-red-100';
      case 'fear': return 'text-orange-600 bg-orange-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'greed': return 'text-blue-600 bg-blue-100';
      case 'extreme_greed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'extreme_fear': return <TrendingDown className="h-6 w-6 text-red-600" />;
      case 'fear': return <TrendingDown className="h-5 w-5 text-orange-600" />;
      case 'neutral': return <BarChart3 className="h-5 w-5 text-yellow-600" />;
      case 'greed': return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'extreme_greed': return <TrendingUp className="h-6 w-6 text-purple-600" />;
      default: return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getLevelDescription = (level: string) => {
    switch (level) {
      case 'extreme_fear': return 'Market showing extreme fear - potential buying opportunity';
      case 'fear': return 'Market sentiment is fearful - consider cautious accumulation';
      case 'neutral': return 'Market sentiment is balanced - normal trading conditions';
      case 'greed': return 'Market showing greed - consider taking profits';
      case 'extreme_greed': return 'Market showing extreme greed - high risk of correction';
      default: return 'Market sentiment is neutral';
    }
  };

  const getFactorColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-blue-600';
    if (value >= 40) return 'text-yellow-600';
    if (value >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getFactorIcon = (value: number) => {
    if (value >= 60) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (value <= 40) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart3 className="h-4 w-4 text-yellow-500" />;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Fear & Greed Index</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Analyzing market sentiment...</span>
        </div>
      </div>
    );
  }

  if (!fearGreedData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8 text-gray-600">
          Unable to load fear & greed data.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Fear & Greed Index</h2>
        </div>
        <div className="flex space-x-2">
          {(['1h', '24h', '7d'] as const).map((timeframe) => (
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

      {/* Main Index Display */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {getLevelIcon(fearGreedData.level)}
          <div>
            <div className="text-4xl font-bold text-gray-900">{fearGreedData.value}</div>
            <div className="text-sm text-gray-500">Fear & Greed Index</div>
          </div>
        </div>
        
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(fearGreedData.level)}`}>
          {fearGreedData.level.replace('_', ' ').toUpperCase()}
        </div>
        
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          {getLevelDescription(fearGreedData.level)}
        </p>
      </div>

      {/* Index Scale */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Extreme Fear</span>
          <span>Fear</span>
          <span>Neutral</span>
          <span>Greed</span>
          <span>Extreme Greed</span>
        </div>
        <div className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full relative">
          <div 
            className="absolute top-0 w-1 h-3 bg-white rounded-full shadow-lg"
            style={{ left: `${fearGreedData.value}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional Factors */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 text-primary-600 mr-2" />
            Traditional Factors
          </h3>
          <div className="space-y-4">
            {Object.entries(fearGreedData.factors).map(([factor, value]) => (
              <div key={factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getFactorIcon(value)}
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${value >= 60 ? 'bg-green-500' : value <= 40 ? 'bg-red-500' : 'bg-yellow-500'}`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold ${getFactorColor(value)}`}>
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On-Chain Metrics */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 text-primary-600 mr-2" />
            On-Chain Metrics
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(fearGreedData.onChainMetrics.activeAddresses / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-600">Active Addresses</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(fearGreedData.onChainMetrics.transactionCount / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-gray-600">Transactions</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ${(fearGreedData.onChainMetrics.defiTVL / 1000000000).toFixed(1)}B
                </div>
                <div className="text-xs text-gray-600">DeFi TVL</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(fearGreedData.onChainMetrics.stakingRatio * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Staking Ratio</div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Gas Price</span>
                <span className="text-sm text-gray-600">Gwei</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${fearGreedData.onChainMetrics.gasPrice < 30 ? 'bg-green-500' : fearGreedData.onChainMetrics.gasPrice > 50 ? 'bg-red-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min((fearGreedData.onChainMetrics.gasPrice / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {fearGreedData.onChainMetrics.gasPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
          <Activity className="h-5 w-5 text-primary-600 mr-2" />
          AI Market Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Current Analysis</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Market momentum is positive with strong volume</li>
              <li>• Social sentiment trending bullish</li>
              <li>• On-chain activity indicates healthy network usage</li>
              <li>• DeFi TVL showing steady growth</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Consider taking partial profits on high-performing assets</li>
              <li>• Maintain diversified portfolio allocation</li>
              <li>• Monitor for potential market correction signals</li>
              <li>• Focus on quality projects with strong fundamentals</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Historical Context */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Historical Context</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Current index is in the "Greed" territory, historically indicating potential for short-term volatility</p>
          <p>• Similar levels in the past have often preceded market consolidation periods</p>
          <p>• On-chain metrics suggest strong fundamental support despite elevated sentiment</p>
          <p>• Last updated: {fearGreedData.timestamp.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FearGreedIndex; 