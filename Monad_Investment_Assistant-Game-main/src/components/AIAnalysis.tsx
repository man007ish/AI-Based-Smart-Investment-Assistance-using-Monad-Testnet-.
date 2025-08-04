import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { AIAnalysis, Investment } from '../types';
import { AIService } from '../services/aiService';

interface AIAnalysisProps {
  investments: Investment[];
  onAnalysisComplete: (analysis: AIAnalysis) => void;
}

const AIAnalysisComponent: React.FC<AIAnalysisProps> = ({ investments, onAnalysisComplete }) => {
  const [selectedInvestment, setSelectedInvestment] = useState<string>('');
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const aiService = new AIService();

  const handleAnalyze = async () => {
    if (!selectedInvestment) return;

    setIsAnalyzing(true);
    const investment = investments.find(inv => inv.symbol === selectedInvestment);
    
    if (investment) {
      const marketData = {
        price: investment.price,
        change24h: investment.change24h,
        volume24h: investment.volume24h,
        marketCap: investment.marketCap,
      };

      try {
        const result = await aiService.analyzeInvestment(investment.symbol, marketData);
        setAnalysis(result);
        onAnalysisComplete(result);
      } catch (error) {
        console.error('Analysis failed:', error);
      }
    }
    
    setIsAnalyzing(false);
  };

  const handleOptimizePortfolio = async () => {
    setIsAnalyzing(true);
    
    try {
      const mockPortfolio = {
        totalValue: 12500,
        assets: [
          { symbol: 'MONAD', quantity: 1000, averagePrice: 0.80 },
          { symbol: 'ETH', quantity: 2.5, averagePrice: 3100 },
        ],
      };

      const result = await aiService.optimizePortfolio(mockPortfolio, investments);
      setOptimizationResult(result);
    } catch (error) {
      console.error('Portfolio optimization failed:', error);
    }
    
    setIsAnalyzing(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Investment Analysis</h2>
        <p className="text-gray-600">
          Get AI-powered insights and recommendations for your investments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investment Analysis */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Brain className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Investment Analysis</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Investment
              </label>
              <select
                value={selectedInvestment}
                onChange={(e) => setSelectedInvestment(e.target.value)}
                className="input-field"
              >
                <option value="">Choose an investment...</option>
                {investments.map((investment) => (
                  <option key={investment.id} value={investment.symbol}>
                    {investment.symbol} - {investment.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!selectedInvestment || isAnalyzing}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Analyze Investment</span>
                </>
              )}
            </button>
          </div>

          {analysis && (
            <div className="mt-6 space-y-4">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getSentimentColor(analysis.sentiment)}`}>
                {getSentimentIcon(analysis.sentiment)}
                <span className="text-sm font-medium capitalize">{analysis.sentiment}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{analysis.analysis}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-900">Confidence</p>
                  <p className="text-lg font-bold text-blue-600">{analysis.confidence}%</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-purple-900">Factors</p>
                  <p className="text-sm text-purple-700">{analysis.factors.length} identified</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.factors.map((factor, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Optimization */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-6 h-6 text-monad-600" />
            <h3 className="text-lg font-semibold text-gray-900">Portfolio Optimization</h3>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Let AI optimize your portfolio for better returns and risk management.
            </p>

            <button
              onClick={handleOptimizePortfolio}
              disabled={isAnalyzing}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  <span>Optimize Portfolio</span>
                </>
              )}
            </button>
          </div>

          {optimizationResult && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-900">Current Value</p>
                  <p className="text-lg font-bold text-green-600">
                    ${optimizationResult.currentValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-900">Expected Return</p>
                  <p className="text-lg font-bold text-blue-600">
                    {optimizationResult.expectedReturn.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Risk Assessment</span>
                </div>
                <p className="text-sm text-yellow-700">{optimizationResult.riskAssessment}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommended Changes</h4>
                <div className="space-y-3">
                  {optimizationResult.recommendedChanges.map((rec: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{rec.symbol}</p>
                        <p className="text-sm text-gray-500">{rec.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary-600">{rec.recommendedAllocation}%</p>
                        <p className="text-xs text-gray-500">{rec.reasoning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="card mt-8">
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Market Trends</h4>
            <p className="text-sm text-gray-600">
              AI analyzes market patterns and identifies emerging trends
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-monad-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-monad-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Risk Assessment</h4>
            <p className="text-sm text-gray-600">
              Advanced algorithms evaluate risk factors and volatility
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Smart Recommendations</h4>
            <p className="text-sm text-gray-600">
              Personalized investment suggestions based on your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisComponent; 