import React, { useState, useEffect } from 'react';
import { Portfolio, PortfolioExplanation } from '../types';
import { AIService } from '../services/aiService';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3, Zap, Shield } from 'lucide-react';

interface PortfolioExplanationProps {
  portfolio: Portfolio;
}

const PortfolioExplanationComponent: React.FC<PortfolioExplanationProps> = ({ portfolio }) => {
  const [explanation, setExplanation] = useState<PortfolioExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = new AIService();

  useEffect(() => {
    if (portfolio.assets.length > 0) {
      generateExplanation();
    }
  }, [portfolio]);

  const generateExplanation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockExplanation: PortfolioExplanation = {
        id: Date.now().toString(),
        summary: `Your portfolio is currently valued at $${portfolio.totalValue.toLocaleString()} with ${portfolio.assets.length} different assets. The portfolio shows ${portfolio.change24h > 0 ? 'positive' : 'negative'} momentum over the last 24 hours.`,
        strengths: [
          'Good diversification across multiple asset classes',
          'Strong performance in technology sector',
          'Consistent rebalancing strategy',
          'Low correlation between holdings'
        ],
        weaknesses: [
          'Overweight in high-risk assets',
          'Limited exposure to defensive sectors',
          'High concentration in top 3 holdings',
          'Insufficient liquidity allocation'
        ],
        recommendations: [
          'Consider increasing allocation to stable assets',
          'Diversify into emerging market tokens',
          'Implement stop-loss orders for volatile positions',
          'Add more DeFi yield-generating assets'
        ],
        riskAssessment: 'Your portfolio has a moderate-to-high risk profile with strong growth potential but significant volatility exposure.',
        diversificationScore: 7.2,
        performanceInsights: [
          'Top performer: ETH with 15.3% return',
          'Biggest drag: MEME with -8.2% loss',
          'Average holding period: 45 days',
          'Trading frequency: 2.3 trades per week'
        ],
        timestamp: new Date()
      };
      
      setExplanation(mockExplanation);
    } catch (err) {
      setError('Failed to generate portfolio explanation');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Portfolio Analysis</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Analyzing your portfolio...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Portfolio Analysis</h2>
        </div>
        <div className="text-red-600 text-center py-8">{error}</div>
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Portfolio Analysis</h2>
        </div>
        <div className="text-center py-8 text-gray-600">
          No portfolio data available for analysis.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Portfolio Analysis</h2>
        </div>
        <button
          onClick={generateExplanation}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh Analysis
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Portfolio Summary</h3>
        <p className="text-gray-700 leading-relaxed">{explanation.summary}</p>
      </div>

      {/* Diversification Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-900">Diversification Score</h3>
          <span className="text-2xl font-bold text-primary-600">{explanation.diversificationScore}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${explanation.diversificationScore * 10}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {explanation.strengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-gray-900">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {explanation.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <h3 className="text-lg font-medium text-gray-900">Risk Assessment</h3>
        </div>
        <p className="text-gray-700">{explanation.riskAssessment}</p>
      </div>

      {/* Recommendations */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-medium text-gray-900">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {explanation.recommendations.map((recommendation, index) => (
            <div key={index} className="bg-primary-50 rounded-lg p-3">
              <span className="text-gray-700">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-3">
          <BarChart3 className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-medium text-gray-900">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {explanation.performanceInsights.map((insight, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <span className="text-gray-700">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 text-center">
        Last updated: {explanation.timestamp.toLocaleString()}
      </div>
    </div>
  );
};

export default PortfolioExplanationComponent; 