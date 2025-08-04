import React, { useState } from 'react';
import { Plus, Minus, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { Portfolio as PortfolioType } from '../types';

interface PortfolioProps {
  portfolio: PortfolioType;
  onBuyAsset: (symbol: string, quantity: number, price: number) => void;
  onSellAsset: (symbol: string, quantity: number, price: number) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio, onBuyAsset, onSellAsset }) => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<string>('');
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleTransaction = () => {
    if (!selectedAsset || !quantity) return;

    const asset = portfolio.assets.find(a => a.symbol === selectedAsset);
    if (!asset) return;

    const quantityNum = parseFloat(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) return;

    if (transactionType === 'buy') {
      onBuyAsset(selectedAsset, quantityNum, asset.currentPrice);
    } else {
      if (quantityNum > asset.quantity) {
        alert('Insufficient quantity to sell');
        return;
      }
      onSellAsset(selectedAsset, quantityNum, asset.currentPrice);
    }

    setShowTransactionModal(false);
    setQuantity('');
    setSelectedAsset(null);
  };

  const totalProfitLoss = portfolio.assets.reduce((total, asset) => total + asset.profitLoss, 0);
  const totalProfitLossPercentage = (totalProfitLoss / (portfolio.totalValue - totalProfitLoss)) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Portfolio</h2>
        <p className="text-gray-600">
          Manage your investments and track your performance.
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
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
              <p className="text-sm font-medium text-gray-600">Total P&L</p>
              <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalProfitLoss.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm ${totalProfitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfitLossPercentage >= 0 ? '+' : ''}{totalProfitLossPercentage.toFixed(2)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">Total Return</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assets</p>
              <p className="text-2xl font-bold text-gray-900">{portfolio.assets.length}</p>
            </div>
            <div className="w-12 h-12 bg-monad-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-monad-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Active holdings</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actions</p>
              <p className="text-lg font-bold text-gray-900">Trade</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setTransactionType('buy');
                setShowTransactionModal(true);
              }}
              className="btn-primary w-full text-sm"
            >
              Buy Asset
            </button>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Assets</h3>
          <button
            onClick={() => {
              setTransactionType('sell');
              setShowTransactionModal(true);
            }}
            className="btn-secondary flex items-center space-x-2"
          >
            <Minus className="w-4 h-4" />
            <span>Sell Asset</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Asset</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Quantity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Avg Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Current Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Total Value</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">P&L</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.assets.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-monad-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{asset.symbol}</p>
                        <p className="text-sm text-gray-500">{asset.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="font-medium text-gray-900">{asset.quantity.toLocaleString()}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="text-gray-700">${asset.averagePrice.toFixed(2)}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="font-medium text-gray-900">${asset.currentPrice.toFixed(2)}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <span className="font-medium text-gray-900">${asset.totalValue.toLocaleString()}</span>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end space-x-1">
                      {asset.profitLoss >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`font-medium ${asset.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${asset.profitLoss.toFixed(2)}
                      </span>
                      <span className={`text-sm ${asset.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ({asset.profitLossPercentage >= 0 ? '+' : ''}{asset.profitLossPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAsset(asset.symbol);
                          setTransactionType('buy');
                          setShowTransactionModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAsset(asset.symbol);
                          setTransactionType('sell');
                          setShowTransactionModal(true);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {transactionType === 'buy' ? 'Buy Asset' : 'Sell Asset'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset
                </label>
                <select
                  value={selectedAsset || ''}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select asset...</option>
                  {portfolio.assets.map((asset) => (
                    <option key={asset.id} value={asset.symbol}>
                      {asset.symbol} - {asset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="input-field"
                />
              </div>

              {selectedAsset && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Current Price: <span className="font-medium text-gray-900">
                      ${portfolio.assets.find(a => a.symbol === selectedAsset)?.currentPrice.toFixed(2)}
                    </span>
                  </p>
                  {quantity && (
                    <p className="text-sm text-gray-600 mt-1">
                      Total: <span className="font-medium text-gray-900">
                        ${(parseFloat(quantity) * (portfolio.assets.find(a => a.symbol === selectedAsset)?.currentPrice || 0)).toFixed(2)}
                      </span>
                    </p>
                  )}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransaction}
                  disabled={!selectedAsset || !quantity}
                  className="btn-primary flex-1"
                >
                  {transactionType === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio; 