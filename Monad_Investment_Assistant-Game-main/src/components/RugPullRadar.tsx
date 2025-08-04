import React, { useState, useEffect } from 'react';
import { RugPullRisk } from '../types';
import { Shield, AlertTriangle, Search, TrendingDown, Users, Clock, MessageSquare, BarChart3, Eye, EyeOff } from 'lucide-react';

const RugPullRadar: React.FC = () => {
  const [rugPullRisks, setRugPullRisks] = useState<RugPullRisk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'all' | 'low' | 'medium' | 'high' | 'extreme'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    loadRugPullRisks();
  }, []);

  const loadRugPullRisks = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRisks: RugPullRisk[] = [
      {
        symbol: 'PEPE2',
        riskScore: 87,
        riskLevel: 'extreme',
        factors: {
          liquidity: 15,
          holderConcentration: 92,
          contractAge: 2,
          socialSentiment: -45,
          priceVolatility: 89
        },
        warnings: [
          'Extremely high holder concentration (>90%)',
          'Very low liquidity relative to market cap',
          'Contract is only 2 days old',
          'Negative social sentiment trending',
          'Extreme price volatility detected'
        ],
        recommendations: [
          'Avoid this token completely',
          'If already invested, consider immediate exit',
          'Monitor for liquidity removal',
          'Check for suspicious contract functions'
        ],
        lastUpdated: new Date()
      },
      {
        symbol: 'MOONSHOT',
        riskScore: 72,
        riskLevel: 'high',
        factors: {
          liquidity: 28,
          holderConcentration: 78,
          contractAge: 5,
          socialSentiment: -12,
          priceVolatility: 65
        },
        warnings: [
          'High holder concentration (>75%)',
          'Low liquidity for token age',
          'Recent negative sentiment shift',
          'Above-average volatility'
        ],
        recommendations: [
          'Exercise extreme caution',
          'Consider reducing position size',
          'Set tight stop-loss orders',
          'Monitor holder distribution changes'
        ],
        lastUpdated: new Date(Date.now() - 3600000)
      },
      {
        symbol: 'SAFEMOON2',
        riskScore: 58,
        riskLevel: 'medium',
        factors: {
          liquidity: 45,
          holderConcentration: 65,
          contractAge: 12,
          socialSentiment: 8,
          priceVolatility: 42
        },
        warnings: [
          'Moderate holder concentration',
          'Some liquidity concerns',
          'Mixed social sentiment'
        ],
        recommendations: [
          'Monitor closely for changes',
          'Consider position sizing',
          'Watch for liquidity changes',
          'Track social sentiment trends'
        ],
        lastUpdated: new Date(Date.now() - 7200000)
      },
      {
        symbol: 'DEFI2024',
        riskScore: 34,
        riskLevel: 'low',
        factors: {
          liquidity: 72,
          holderConcentration: 45,
          contractAge: 45,
          socialSentiment: 23,
          priceVolatility: 28
        },
        warnings: [
          'Generally healthy metrics',
          'Minor liquidity fluctuations',
          'Some volatility expected'
        ],
        recommendations: [
          'Standard due diligence recommended',
          'Monitor for unusual activity',
          'Consider normal market risks'
        ],
        lastUpdated: new Date(Date.now() - 10800000)
      },
      {
        symbol: 'ETH2',
        riskScore: 12,
        riskLevel: 'low',
        factors: {
          liquidity: 95,
          holderConcentration: 25,
          contractAge: 365,
          socialSentiment: 67,
          priceVolatility: 15
        },
        warnings: [
          'Very low risk profile',
          'Excellent liquidity metrics',
          'Well-distributed holders'
        ],
        recommendations: [
          'Standard investment practices apply',
          'Monitor for market conditions',
          'Consider long-term holding'
        ],
        lastUpdated: new Date(Date.now() - 14400000)
      }
    ];
    
    setRugPullRisks(mockRisks);
    setIsLoading(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'extreme': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'extreme': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'low': return <Shield className="h-5 w-5 text-green-600" />;
      default: return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredRisks = rugPullRisks.filter(risk => {
    const matchesSearch = risk.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRiskLevel = selectedRiskLevel === 'all' || risk.riskLevel === selectedRiskLevel;
    return matchesSearch && matchesRiskLevel;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">RugPull Radar</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Scanning for rug pull risks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">RugPull Radar</h2>
        </div>
        <button
          onClick={loadRugPullRisks}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh Scan
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
            {(['all', 'low', 'medium', 'high', 'extreme'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedRiskLevel(level)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedRiskLevel === level
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {(['extreme', 'high', 'medium', 'low'] as const).map((level) => {
          const count = rugPullRisks.filter(risk => risk.riskLevel === level).length;
          return (
            <div key={level} className="text-center p-3 rounded-lg bg-gray-50">
              <div className={`text-2xl font-bold ${getRiskColor(level).split(' ')[0]}`}>{count}</div>
              <div className="text-sm text-gray-600 capitalize">{level} Risk</div>
            </div>
          );
        })}
        <div className="text-center p-3 rounded-lg bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">{rugPullRisks.length}</div>
          <div className="text-sm text-gray-600">Total Scanned</div>
        </div>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div key={risk.symbol} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getRiskIcon(risk.riskLevel)}
                <div>
                  <h3 className="font-semibold text-gray-900">{risk.symbol}</h3>
                  <p className="text-sm text-gray-500">
                    Risk Score: {risk.riskScore}/100
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                  {risk.riskLevel.toUpperCase()}
                </span>
                <button
                  onClick={() => setShowDetails(showDetails === risk.symbol ? null : risk.symbol)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {showDetails === risk.symbol ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{risk.factors.liquidity}%</div>
                <div className="text-xs text-gray-500">Liquidity</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{risk.factors.holderConcentration}%</div>
                <div className="text-xs text-gray-500">Concentration</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{risk.factors.contractAge}d</div>
                <div className="text-xs text-gray-500">Age</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{risk.factors.socialSentiment}</div>
                <div className="text-xs text-gray-500">Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{risk.factors.priceVolatility}%</div>
                <div className="text-xs text-gray-500">Volatility</div>
              </div>
            </div>

            {/* Detailed Analysis */}
            {showDetails === risk.symbol && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Warnings */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      Risk Warnings
                    </h4>
                    <ul className="space-y-1">
                      {risk.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {risk.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRisks.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No tokens found matching your criteria.
        </div>
      )}

      {/* AI Analysis Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">AI Risk Analysis Factors</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• <strong>Liquidity:</strong> Available trading volume and market depth</p>
          <p>• <strong>Holder Concentration:</strong> Distribution of tokens among addresses</p>
          <p>• <strong>Contract Age:</strong> Time since token deployment</p>
          <p>• <strong>Social Sentiment:</strong> Community sentiment and social media analysis</p>
          <p>• <strong>Price Volatility:</strong> Price stability and trading patterns</p>
        </div>
      </div>
    </div>
  );
};

export default RugPullRadar; 