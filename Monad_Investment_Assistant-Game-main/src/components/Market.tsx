import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Star, Eye, Plus } from 'lucide-react';
import { Investment } from '../types';

interface MarketProps {
  investments: Investment[];
  onAddToWatchlist: (investment: Investment) => void;
  onBuyInvestment: (investment: Investment) => void;
}

const Market: React.FC<MarketProps> = ({ investments, onAddToWatchlist, onBuyInvestment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change24h' | 'aiScore'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredInvestments = investments
    .filter(inv => 
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'change24h':
          aValue = a.change24h;
          bValue = b.change24h;
          break;
        case 'aiScore':
          aValue = a.aiScore;
          bValue = b.aiScore;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: 'name' | 'price' | 'change24h' | 'aiScore') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'buy': return 'text-green-600 bg-green-50';
      case 'sell': return 'text-red-600 bg-red-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Market</h2>
        <p className="text-gray-600">
          Discover investment opportunities and track market performance.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search investments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="input-field max-w-xs"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low-High)</option>
              <option value="price-desc">Price (High-Low)</option>
              <option value="change24h-desc">Best Performers</option>
              <option value="change24h-asc">Worst Performers</option>
              <option value="aiScore-desc">AI Score (High-Low)</option>
              <option value="aiScore-asc">AI Score (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-primary-600">{investments.length}</p>
          <p className="text-sm text-gray-500">Available investments</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Gainers</h3>
          <p className="text-3xl font-bold text-green-600">
            {investments.filter(inv => inv.change24h > 0).length}
          </p>
          <p className="text-sm text-gray-500">Positive 24h change</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Recommended</h3>
          <p className="text-3xl font-bold text-blue-600">
            {investments.filter(inv => inv.recommendation === 'buy').length}
          </p>
          <p className="text-sm text-gray-500">Buy recommendations</p>
        </div>
        
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Risk</h3>
          <p className="text-3xl font-bold text-green-600">
            {investments.filter(inv => inv.riskLevel === 'low').length}
          </p>
          <p className="text-sm text-gray-500">Conservative options</p>
        </div>
      </div>

      {/* Investments Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Asset</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 cursor-pointer hover:text-primary-600" onClick={() => handleSort('price')}>
                  Price
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 cursor-pointer hover:text-primary-600" onClick={() => handleSort('change24h')}>
                  24h Change
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Market Cap</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700 cursor-pointer hover:text-primary-600" onClick={() => handleSort('aiScore')}>
                  AI Score
                </th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Recommendation</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Risk</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestments.map((investment) => (
                <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-monad-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{investment.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{investment.symbol}</p>
                        <p className="text-sm text-gray-500">{investment.name}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="text-right py-4 px-4">
                    <span className="font-medium text-gray-900">${investment.price.toLocaleString()}</span>
                  </td>
                  
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end space-x-1">
                      {investment.change24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${investment.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.change24h >= 0 ? '+' : ''}{investment.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  
                  <td className="text-right py-4 px-4">
                    <span className="text-gray-700">${(investment.marketCap / 1000000).toFixed(1)}M</span>
                  </td>
                  
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-gray-900">{investment.aiScore}/10</span>
                    </div>
                  </td>
                  
                  <td className="text-center py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(investment.recommendation)}`}>
                      {investment.recommendation.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="text-center py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                      {investment.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="text-center py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onAddToWatchlist(investment)}
                        className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                        title="Add to watchlist"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onBuyInvestment(investment)}
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Buy investment"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInvestments.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No investments found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Market; 