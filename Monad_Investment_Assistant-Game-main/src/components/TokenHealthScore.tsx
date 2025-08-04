import React, { useState, useEffect } from 'react';
import { TokenHealthScore as TokenHealthScoreType } from '../types';
import { Activity, TrendingUp, TrendingDown, Heart, BarChart3, Search, Eye, EyeOff, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const TokenHealthScore: React.FC = () => {
  const [healthScores, setHealthScores] = useState<TokenHealthScoreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrend, setSelectedTrend] = useState<'all' | 'improving' | 'stable' | 'declining'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    loadHealthScores();
  }, []);

  const loadHealthScores = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockHealthScores: TokenHealthScoreType[] = [
      {
        symbol: 'ETH',
        overallScore: 92,
        metrics: {
          liquidity: 95,
          volume: 88,
          marketCap: 96,
          socialSentiment: 85,
          developerActivity: 94,
          communityGrowth: 89,
          priceStability: 87,
          contractSecurity: 98
        },
        breakdown: {
          excellent: ['Market Cap', 'Contract Security', 'Liquidity'],
          good: ['Developer Activity', 'Community Growth', 'Volume'],
          needsImprovement: ['Price Stability'],
          critical: []
        },
        trend: 'improving',
        lastUpdated: new Date()
      },
      {
        symbol: 'BTC',
        overallScore: 89,
        metrics: {
          liquidity: 92,
          volume: 85,
          marketCap: 98,
          socialSentiment: 82,
          developerActivity: 88,
          communityGrowth: 84,
          priceStability: 90,
          contractSecurity: 95
        },
        breakdown: {
          excellent: ['Market Cap', 'Contract Security', 'Price Stability'],
          good: ['Liquidity', 'Developer Activity'],
          needsImprovement: ['Community Growth', 'Volume'],
          critical: []
        },
        trend: 'stable',
        lastUpdated: new Date(Date.now() - 3600000)
      },
      {
        symbol: 'MEME',
        overallScore: 67,
        metrics: {
          liquidity: 72,
          volume: 65,
          marketCap: 58,
          socialSentiment: 75,
          developerActivity: 45,
          communityGrowth: 68,
          priceStability: 52,
          contractSecurity: 78
        },
        breakdown: {
          excellent: [],
          good: ['Liquidity', 'Social Sentiment', 'Contract Security'],
          needsImprovement: ['Volume', 'Community Growth', 'Price Stability'],
          critical: ['Developer Activity', 'Market Cap']
        },
        trend: 'declining',
        lastUpdated: new Date(Date.now() - 7200000)
      },
      {
        symbol: 'USDC',
        overallScore: 94,
        metrics: {
          liquidity: 96,
          volume: 92,
          marketCap: 90,
          socialSentiment: 88,
          developerActivity: 91,
          communityGrowth: 85,
          priceStability: 98,
          contractSecurity: 97
        },
        breakdown: {
          excellent: ['Price Stability', 'Contract Security', 'Liquidity'],
          good: ['Developer Activity', 'Volume', 'Market Cap'],
          needsImprovement: ['Community Growth'],
          critical: []
        },
        trend: 'improving',
        lastUpdated: new Date(Date.now() - 10800000)
      },
      {
        symbol: 'DEFI',
        overallScore: 78,
        metrics: {
          liquidity: 82,
          volume: 75,
          marketCap: 68,
          socialSentiment: 72,
          developerActivity: 85,
          communityGrowth: 79,
          priceStability: 65,
          contractSecurity: 88
        },
        breakdown: {
          excellent: ['Contract Security'],
          good: ['Liquidity', 'Developer Activity', 'Community Growth'],
          needsImprovement: ['Volume', 'Social Sentiment', 'Price Stability'],
          critical: ['Market Cap']
        },
        trend: 'stable',
        lastUpdated: new Date(Date.now() - 14400000)
      }
    ];
    
    setHealthScores(mockHealthScores);
    setIsLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Heart className="h-5 w-5 text-green-600" />;
    if (score >= 80) return <Activity className="h-5 w-5 text-blue-600" />;
    if (score >= 70) return <Activity className="h-5 w-5 text-yellow-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-blue-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 80) return 'text-blue-600';
    if (value >= 70) return 'text-yellow-600';
    if (value >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredScores = healthScores.filter(score => {
    const matchesSearch = score.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrend = selectedTrend === 'all' || score.trend === selectedTrend;
    return matchesSearch && matchesTrend;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Token Health Score</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Analyzing token health...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Token Health Score</h2>
        </div>
        <button
          onClick={loadHealthScores}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh Analysis
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {(['all', 'improving', 'stable', 'declining'] as const).map((trend) => (
              <button
                key={trend}
                onClick={() => setSelectedTrend(trend)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTrend === trend
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {trend.charAt(0).toUpperCase() + trend.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {(['improving', 'stable', 'declining'] as const).map((trend) => {
          const count = healthScores.filter(score => score.trend === trend).length;
          return (
            <div key={trend} className="text-center p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-center space-x-1 mb-1">
                {getTrendIcon(trend)}
                <span className="text-2xl font-bold text-gray-900">{count}</span>
              </div>
              <div className="text-sm text-gray-600 capitalize">{trend}</div>
            </div>
          );
        })}
        <div className="text-center p-3 rounded-lg bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">
            {(healthScores.reduce((sum, score) => sum + score.overallScore, 0) / healthScores.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Avg Score</div>
        </div>
      </div>

      {/* Health Scores List */}
      <div className="space-y-4">
        {filteredScores.map((score) => (
          <div key={score.symbol} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getScoreIcon(score.overallScore)}
                <div>
                  <h3 className="font-semibold text-gray-900">{score.symbol}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(score.overallScore)}`}>
                      {score.overallScore}/100
                    </span>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(score.trend)}
                      <span className="text-xs text-gray-500 capitalize">{score.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(showDetails === score.symbol ? null : score.symbol)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {showDetails === score.symbol ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-3">
              {Object.entries(score.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-sm font-semibold ${getMetricColor(value)}`}>{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>

            {/* Detailed Analysis */}
            {showDetails === score.symbol && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Excellent Metrics */}
                  {score.breakdown.excellent.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Excellent (90+)
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {score.breakdown.excellent.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Good Metrics */}
                  {score.breakdown.good.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Activity className="h-4 w-4 text-blue-500 mr-2" />
                        Good (80-89)
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {score.breakdown.good.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Needs Improvement */}
                  {score.breakdown.needsImprovement.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        Needs Improvement (70-79)
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {score.breakdown.needsImprovement.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Critical Issues */}
                  {score.breakdown.critical.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        Critical (&lt;70)
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {score.breakdown.critical.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredScores.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No tokens found matching your criteria.
        </div>
      )}

      {/* Health Metrics Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Health Score Metrics</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• <strong>Liquidity:</strong> Available trading volume and market depth</p>
          <p>• <strong>Volume:</strong> 24-hour trading volume</p>
          <p>• <strong>Market Cap:</strong> Total market capitalization</p>
          <p>• <strong>Social Sentiment:</strong> Community sentiment analysis</p>
          <p>• <strong>Developer Activity:</strong> Code commits and updates</p>
          <p>• <strong>Community Growth:</strong> Social media and community metrics</p>
          <p>• <strong>Price Stability:</strong> Price volatility and stability</p>
          <p>• <strong>Contract Security:</strong> Smart contract audit and security</p>
        </div>
      </div>
    </div>
  );
};

export default TokenHealthScore; 