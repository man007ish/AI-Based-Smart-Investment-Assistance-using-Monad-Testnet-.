import React, { useState, useEffect } from 'react';
import { WhatIfScenario, Portfolio } from '../types';
import { Play, Plus, BarChart3, TrendingUp, TrendingDown, Target, Calculator, Save, Trash2 } from 'lucide-react';

interface WhatIfSimulatorProps {
  portfolio: Portfolio;
}

const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ portfolio }) => {
  const [scenarios, setScenarios] = useState<WhatIfScenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    changes: [
      { type: 'buy' as const, symbol: '', quantity: 0, percentage: 0 }
    ]
  });

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockScenarios: WhatIfScenario[] = [
      {
        id: 'scenario-001',
        name: 'Aggressive ETH Position',
        description: 'Increase ETH allocation to 50% of portfolio',
        changes: [
          { type: 'buy', symbol: 'ETH', quantity: 10, percentage: 0 }
        ],
        results: {
          newTotalValue: 125000,
          changeInValue: 15000,
          changePercentage: 13.6,
          newAllocations: [
            { symbol: 'ETH', percentage: 50 },
            { symbol: 'BTC', percentage: 25 },
            { symbol: 'USDC', percentage: 15 },
            { symbol: 'MEME', percentage: 10 }
          ],
          riskAssessment: 'High risk due to concentration in single asset',
          expectedReturn: 18.5
        },
        timestamp: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: 'scenario-002',
        name: 'Conservative Rebalance',
        description: 'Increase stablecoin allocation and reduce volatile assets',
        changes: [
          { type: 'sell', symbol: 'MEME', quantity: 5, percentage: 0 },
          { type: 'buy', symbol: 'USDC', quantity: 0, percentage: 0 }
        ],
        results: {
          newTotalValue: 108000,
          changeInValue: -2000,
          changePercentage: -1.8,
          newAllocations: [
            { symbol: 'ETH', percentage: 35 },
            { symbol: 'BTC', percentage: 25 },
            { symbol: 'USDC', percentage: 35 },
            { symbol: 'MEME', percentage: 5 }
          ],
          riskAssessment: 'Low risk with increased stability',
          expectedReturn: 6.2
        },
        timestamp: new Date(Date.now() - 86400000 * 5)
      },
      {
        id: 'scenario-003',
        name: 'Diversification Strategy',
        description: 'Add new assets to improve portfolio diversification',
        changes: [
          { type: 'buy', symbol: 'DEFI', quantity: 100, percentage: 0 },
          { type: 'buy', symbol: 'LINK', quantity: 50, percentage: 0 }
        ],
        results: {
          newTotalValue: 112000,
          changeInValue: 2000,
          changePercentage: 1.8,
          newAllocations: [
            { symbol: 'ETH', percentage: 30 },
            { symbol: 'BTC', percentage: 20 },
            { symbol: 'USDC', percentage: 20 },
            { symbol: 'MEME', percentage: 10 },
            { symbol: 'DEFI', percentage: 12 },
            { symbol: 'LINK', percentage: 8 }
          ],
          riskAssessment: 'Medium risk with improved diversification',
          expectedReturn: 12.8
        },
        timestamp: new Date(Date.now() - 86400000 * 1)
      }
    ];
    
    setScenarios(mockScenarios);
    setIsLoading(false);
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newScenario: WhatIfScenario = {
      id: `scenario-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      changes: formData.changes.filter(change => change.symbol.trim()),
      results: {
        newTotalValue: portfolio.totalValue + Math.random() * 20000 - 5000,
        changeInValue: Math.random() * 20000 - 5000,
        changePercentage: Math.random() * 20 - 5,
        newAllocations: [
          { symbol: 'ETH', percentage: 30 + Math.random() * 20 },
          { symbol: 'BTC', percentage: 20 + Math.random() * 15 },
          { symbol: 'USDC', percentage: 15 + Math.random() * 10 },
          { symbol: 'MEME', percentage: 10 + Math.random() * 5 }
        ],
        riskAssessment: Math.random() > 0.5 ? 'Medium risk with balanced approach' : 'High risk due to concentration',
        expectedReturn: 8 + Math.random() * 15
      },
      timestamp: new Date()
    };
    
    setScenarios(prev => [newScenario, ...prev]);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      changes: [{ type: 'buy', symbol: '', quantity: 0, percentage: 0 }]
    });
    setIsSimulating(false);
  };

  const addChange = () => {
    setFormData(prev => ({
      ...prev,
      changes: [...prev.changes, { type: 'buy', symbol: '', quantity: 0, percentage: 0 }]
    }));
  };

  const removeChange = (index: number) => {
    setFormData(prev => ({
      ...prev,
      changes: prev.changes.filter((_, i) => i !== index)
    }));
  };

  const updateChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      changes: prev.changes.map((change, i) => 
        i === index ? { ...change, [field]: value } : change
      )
    }));
  };

  const deleteScenario = (scenarioId: string) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== scenarioId));
  };

  const getRiskColor = (assessment: string) => {
    if (assessment.includes('High')) return 'text-red-600 bg-red-100';
    if (assessment.includes('Medium')) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">What-If Simulator</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading scenarios...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">What-If Simulator</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Scenario</span>
        </button>
      </div>

      {/* Create Scenario Form */}
      {showCreateForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Scenario</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scenario Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Aggressive ETH Position"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe the scenario..."
              />
            </div>
          </div>

          {/* Portfolio Changes */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Portfolio Changes</label>
              <button
                onClick={addChange}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                + Add Change
              </button>
            </div>
            {formData.changes.map((change, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                <select
                  value={change.type}
                  onChange={(e) => updateChange(index, 'type', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="rebalance">Rebalance</option>
                </select>
                <input
                  type="text"
                  value={change.symbol}
                  onChange={(e) => updateChange(index, 'symbol', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Symbol (e.g., ETH)"
                />
                <input
                  type="number"
                  value={change.quantity}
                  onChange={(e) => updateChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Quantity"
                />
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={change.percentage}
                    onChange={(e) => updateChange(index, 'percentage', parseFloat(e.target.value) || 0)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="%"
                  />
                  <button
                    onClick={() => removeChange(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 ${
                isSimulating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSimulating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Simulating...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Run Simulation</span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scenarios List */}
      <div className="space-y-4">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{scenario.name}</h3>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </div>
              <button
                onClick={() => deleteScenario(scenario.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Changes Summary */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Changes:</h4>
              <div className="flex flex-wrap gap-2">
                {scenario.changes.map((change, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      change.type === 'buy' 
                        ? 'bg-green-100 text-green-700' 
                        : change.type === 'sell'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {change.type.toUpperCase()} {change.symbol} {change.quantity && change.quantity > 0 ? `(${change.quantity})` : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  ${scenario.results.newTotalValue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">New Total Value</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-semibold flex items-center justify-center ${
                  scenario.results.changeInValue >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {scenario.results.changeInValue >= 0 ? '+' : ''}${scenario.results.changeInValue.toLocaleString()}
                  {scenario.results.changeInValue >= 0 ? (
                    <TrendingUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                </div>
                <div className="text-xs text-gray-500">Change in Value</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-semibold ${
                  scenario.results.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {scenario.results.changePercentage >= 0 ? '+' : ''}{scenario.results.changePercentage.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Change %</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">
                  {scenario.results.expectedReturn.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Expected Return</div>
              </div>
            </div>

            {/* New Allocations */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">New Allocations:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {scenario.results.newAllocations.map((allocation, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{allocation.symbol}</span>
                    <span className="text-sm text-gray-600">{allocation.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(scenario.results.riskAssessment)}`}>
                  {scenario.results.riskAssessment.split(' ')[0]} Risk
                </span>
                <span className="text-xs text-gray-500">{scenario.results.riskAssessment}</span>
              </div>
              <span className="text-xs text-gray-500">
                {scenario.timestamp.toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {scenarios.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No scenarios created yet. Create your first what-if scenario!
        </div>
      )}

      {/* Current Portfolio Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">Current Portfolio</h3>
        </div>
        <div className="text-sm text-gray-600">
          Total Value: ${portfolio.totalValue.toLocaleString()} • 
          Assets: {portfolio.assets.length} • 
          24h Change: {portfolio.change24h > 0 ? '+' : ''}{portfolio.change24h}%
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator; 