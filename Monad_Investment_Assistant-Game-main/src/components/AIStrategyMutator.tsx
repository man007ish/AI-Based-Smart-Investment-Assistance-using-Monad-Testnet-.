import React, { useState, useEffect } from 'react';
import { AIStrategy } from '../types';
import { Bot, Plus, Settings, Play, Pause, BarChart3, Target, Zap, Copy, Trash2, Save, Edit3, Shield } from 'lucide-react';

const AIStrategyMutator: React.FC = () => {
  const [strategies, setStrategies] = useState<AIStrategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<AIStrategy | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    entryConditions: [''],
    exitConditions: [''],
    riskManagement: [''],
    positionSizing: '2% of portfolio'
  });

  useEffect(() => {
    loadStrategies();
  }, []);

  const loadStrategies = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockStrategies: AIStrategy[] = [
      {
        id: 'strategy-001',
        name: 'Momentum Trader',
        description: 'Buys assets showing strong upward momentum with high volume',
        parameters: {
          entryConditions: [
            'Price > 20-day moving average',
            'Volume > 1.5x average volume',
            'RSI < 70 (not overbought)',
            'MACD line above signal line'
          ],
          exitConditions: [
            'Price < 10-day moving average',
            'RSI > 80 (overbought)',
            'Volume < 0.5x average volume',
            'Stop loss: -5% from entry'
          ],
          riskManagement: [
            'Maximum 3% per trade',
            'Trailing stop loss',
            'Diversify across 5+ assets',
            'No trading during high volatility'
          ],
          positionSizing: '2% of portfolio per trade'
        },
        performance: {
          totalTrades: 156,
          winRate: 68.5,
          averageReturn: 12.3,
          maxDrawdown: -8.2,
          sharpeRatio: 1.45
        },
        isActive: true,
        createdAt: new Date(Date.now() - 86400000 * 30),
        lastModified: new Date(Date.now() - 86400000 * 2)
      },
      {
        id: 'strategy-002',
        name: 'Mean Reversion',
        description: 'Trades assets that have deviated significantly from their average price',
        parameters: {
          entryConditions: [
            'Price < 20-day moving average by 10%',
            'RSI < 30 (oversold)',
            'Bollinger Band position < 0.2',
            'Volume spike on reversal'
          ],
          exitConditions: [
            'Price > 20-day moving average',
            'RSI > 70',
            'Take profit: +15% from entry',
            'Stop loss: -8% from entry'
          ],
          riskManagement: [
            'Maximum 2% per trade',
            'Fixed stop loss',
            'Maximum 3 concurrent positions',
            'Wait 24h between trades'
          ],
          positionSizing: '1.5% of portfolio per trade'
        },
        performance: {
          totalTrades: 89,
          winRate: 72.1,
          averageReturn: 8.7,
          maxDrawdown: -12.5,
          sharpeRatio: 1.12
        },
        isActive: false,
        createdAt: new Date(Date.now() - 86400000 * 45),
        lastModified: new Date(Date.now() - 86400000 * 7)
      },
      {
        id: 'strategy-003',
        name: 'Breakout Trader',
        description: 'Identifies and trades breakouts from key resistance/support levels',
        parameters: {
          entryConditions: [
            'Price breaks above resistance with volume',
            'Consolidation period > 5 days',
            'Volume > 2x average on breakout',
            'No major resistance for 10% above'
          ],
          exitConditions: [
            'Price returns below breakout level',
            'Take profit: +20% from entry',
            'Stop loss: -7% from entry',
            'Volume dries up'
          ],
          riskManagement: [
            'Maximum 2.5% per trade',
            'Breakout confirmation required',
            'Avoid false breakouts',
            'Maximum 2 positions per asset'
          ],
          positionSizing: '2.5% of portfolio per trade'
        },
        performance: {
          totalTrades: 67,
          winRate: 58.2,
          averageReturn: 18.9,
          maxDrawdown: -15.3,
          sharpeRatio: 1.78
        },
        isActive: true,
        createdAt: new Date(Date.now() - 86400000 * 20),
        lastModified: new Date(Date.now() - 86400000 * 1)
      }
    ];
    
    setStrategies(mockStrategies);
    setIsLoading(false);
  };

  const toggleStrategy = (strategyId: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, isActive: !strategy.isActive }
        : strategy
    ));
  };

  const duplicateStrategy = (strategy: AIStrategy) => {
    const newStrategy: AIStrategy = {
      ...strategy,
      id: `strategy-${Date.now()}`,
      name: `${strategy.name} (Copy)`,
      isActive: false,
      createdAt: new Date(),
      lastModified: new Date()
    };
    setStrategies(prev => [newStrategy, ...prev]);
  };

  const deleteStrategy = (strategyId: string) => {
    setStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
  };

  const handleCreateStrategy = () => {
    const newStrategy: AIStrategy = {
      id: `strategy-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      parameters: {
        entryConditions: formData.entryConditions.filter(condition => condition.trim()),
        exitConditions: formData.exitConditions.filter(condition => condition.trim()),
        riskManagement: formData.riskManagement.filter(rule => rule.trim()),
        positionSizing: formData.positionSizing
      },
      performance: {
        totalTrades: 0,
        winRate: 0,
        averageReturn: 0,
        maxDrawdown: 0,
        sharpeRatio: 0
      },
      isActive: false,
      createdAt: new Date(),
      lastModified: new Date()
    };
    
    setStrategies(prev => [newStrategy, ...prev]);
    setShowCreateForm(false);
    setFormData({
      name: '',
      description: '',
      entryConditions: [''],
      exitConditions: [''],
      riskManagement: [''],
      positionSizing: '2% of portfolio'
    });
  };

  const addCondition = (type: 'entry' | 'exit' | 'risk') => {
    const field = type === 'entry' ? 'entryConditions' : type === 'exit' ? 'exitConditions' : 'riskManagement';
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeCondition = (type: 'entry' | 'exit' | 'risk', index: number) => {
    const field = type === 'entry' ? 'entryConditions' : type === 'exit' ? 'exitConditions' : 'riskManagement';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateCondition = (type: 'entry' | 'exit' | 'risk', index: number, value: string) => {
    const field = type === 'entry' ? 'entryConditions' : type === 'exit' ? 'exitConditions' : 'riskManagement';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((condition, i) => i === index ? value : condition)
    }));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bot className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Strategy Mutator</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading strategies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Bot className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Strategy Mutator</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Strategy</span>
        </button>
      </div>

      {/* Create Strategy Form */}
      {showCreateForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Strategy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Strategy Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Momentum Trader"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position Sizing</label>
              <input
                type="text"
                value={formData.positionSizing}
                onChange={(e) => setFormData(prev => ({ ...prev, positionSizing: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 2% of portfolio"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Describe your strategy..."
            />
          </div>

          {/* Entry Conditions */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Entry Conditions</label>
              <button
                onClick={() => addCondition('entry')}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                + Add Condition
              </button>
            </div>
            {formData.entryConditions.map((condition, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => updateCondition('entry', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Price > 20-day moving average"
                />
                <button
                  onClick={() => removeCondition('entry', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Exit Conditions */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Exit Conditions</label>
              <button
                onClick={() => addCondition('exit')}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                + Add Condition
              </button>
            </div>
            {formData.exitConditions.map((condition, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => updateCondition('exit', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Stop loss: -5% from entry"
                />
                <button
                  onClick={() => removeCondition('exit', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Risk Management */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Risk Management</label>
              <button
                onClick={() => addCondition('risk')}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                + Add Rule
              </button>
            </div>
            {formData.riskManagement.map((rule, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateCondition('risk', index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Maximum 3% per trade"
                />
                <button
                  onClick={() => removeCondition('risk', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCreateStrategy}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Strategy
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

      {/* Strategies List */}
      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bot className="h-5 w-5 text-primary-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  strategy.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {strategy.isActive ? 'Active' : 'Inactive'}
                </div>
                <button
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    strategy.isActive
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {strategy.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => duplicateStrategy(strategy)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteStrategy(strategy.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{strategy.performance.totalTrades}</div>
                <div className="text-xs text-gray-500">Total Trades</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{strategy.performance.winRate}%</div>
                <div className="text-xs text-gray-500">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{strategy.performance.averageReturn}%</div>
                <div className="text-xs text-gray-500">Avg Return</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{strategy.performance.maxDrawdown}%</div>
                <div className="text-xs text-gray-500">Max Drawdown</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{strategy.performance.sharpeRatio}</div>
                <div className="text-xs text-gray-500">Sharpe Ratio</div>
              </div>
            </div>

            {/* Strategy Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Target className="h-4 w-4 text-blue-500 mr-2" />
                  Entry Conditions
                </h4>
                <ul className="space-y-1">
                  {strategy.parameters.entryConditions.slice(0, 3).map((condition, index) => (
                    <li key={index} className="text-gray-600">• {condition}</li>
                  ))}
                  {strategy.parameters.entryConditions.length > 3 && (
                    <li className="text-gray-500">+{strategy.parameters.entryConditions.length - 3} more</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Zap className="h-4 w-4 text-red-500 mr-2" />
                  Exit Conditions
                </h4>
                <ul className="space-y-1">
                  {strategy.parameters.exitConditions.slice(0, 3).map((condition, index) => (
                    <li key={index} className="text-gray-600">• {condition}</li>
                  ))}
                  {strategy.parameters.exitConditions.length > 3 && (
                    <li className="text-gray-500">+{strategy.parameters.exitConditions.length - 3} more</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Shield className="h-4 w-4 text-green-500 mr-2" />
                  Risk Management
                </h4>
                <ul className="space-y-1">
                  {strategy.parameters.riskManagement.slice(0, 3).map((rule, index) => (
                    <li key={index} className="text-gray-600">• {rule}</li>
                  ))}
                  {strategy.parameters.riskManagement.length > 3 && (
                    <li className="text-gray-500">+{strategy.parameters.riskManagement.length - 3} more</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Created: {strategy.createdAt.toLocaleDateString()} • 
              Last modified: {strategy.lastModified.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {strategies.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No strategies created yet. Create your first AI trading strategy!
        </div>
      )}
    </div>
  );
};

export default AIStrategyMutator; 