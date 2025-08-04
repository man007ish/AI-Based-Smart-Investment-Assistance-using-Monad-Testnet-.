import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, AlertTriangle } from 'lucide-react';
import { Portfolio, Investment } from '../types';

interface DashboardProps {
  portfolio: Portfolio;
  investments: Investment[];
  walletAddress: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ portfolio, investments, walletAddress }) => {
  const topPerformers = investments
    .filter(inv => inv.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

  const riskDistribution = {
    low: investments.filter(inv => inv.riskLevel === 'low').length,
    medium: investments.filter(inv => inv.riskLevel === 'medium').length,
    high: investments.filter(inv => inv.riskLevel === 'high').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back{walletAddress ? `, ${walletAddress.slice(0, 6)}...` : ''}!
        </h2>
        <p className="text-gray-600">
          Your AI-powered investment assistant is ready to help you make informed decisions.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolio.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {portfolio.change24h >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${portfolio.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.change24h >= 0 ? '+' : ''}{portfolio.change24h.toFixed(2)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">24h</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">{portfolio.assets.length}</p>
            </div>
            <div className="w-12 h-12 bg-monad-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-monad-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Active investments</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Score</p>
              <p className="text-2xl font-bold text-gray-900">8.5</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Portfolio health</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Level</p>
              <p className="text-2xl font-bold text-gray-900">Medium</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Balanced risk</p>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Portfolio Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
          <div className="space-y-4">
            {portfolio.assets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{asset.symbol}</p>
                    <p className="text-sm text-gray-500">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${asset.totalValue.toLocaleString()}</p>
                  <p className={`text-sm ${asset.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {asset.profitLossPercentage >= 0 ? '+' : ''}{asset.profitLossPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-monad-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{investment.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{investment.symbol}</p>
                    <p className="text-sm text-gray-500">{investment.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${investment.price.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{investment.change24h.toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">{riskDistribution.low}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Low Risk</p>
            <p className="text-xs text-gray-500">{riskDistribution.low} assets</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-yellow-600 font-bold">{riskDistribution.medium}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Medium Risk</p>
            <p className="text-xs text-gray-500">{riskDistribution.medium} assets</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-red-600 font-bold">{riskDistribution.high}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">High Risk</p>
            <p className="text-xs text-gray-500">{riskDistribution.high} assets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 