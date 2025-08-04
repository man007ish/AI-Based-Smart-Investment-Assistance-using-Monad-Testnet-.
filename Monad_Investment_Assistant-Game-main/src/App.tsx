import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import AIAnalysisComponent from './components/AIAnalysis';
import PortfolioExplanationComponent from './components/PortfolioExplanation';
import SmartWalletsLeaderboard from './components/SmartWalletsLeaderboard';
import AutoRebalancingBotComponent from './components/AutoRebalancingBot';
import RugPullRadar from './components/RugPullRadar';
import TokenHealthScore from './components/TokenHealthScore';
import AIStrategyMutator from './components/AIStrategyMutator';
import WhatIfSimulator from './components/WhatIfSimulator';
import DAOVotingAssistant from './components/DAOVotingAssistant';
import FearGreedIndex from './components/FearGreedIndex';
import InvestmentStoryTimeline from './components/InvestmentStoryTimeline';
import Streaks from './components/Streaks';
import Game from './components/Game';
import { MonadService, mockInvestments, mockPortfolio } from './services/monadService';
import { AIAnalysis, Investment, Portfolio as PortfolioType } from './types';

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'portfolio' | 'market' | 'ai-analysis' | 'portfolio-explanation' | 'smart-wallets' | 'auto-rebalancing' | 'rug-pull-radar' | 'token-health' | 'strategy-mutator' | 'what-if-simulator' | 'dao-voting' | 'fear-greed' | 'investment-story' | 'streaks' | 'game'>('dashboard');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [portfolio, setPortfolio] = useState<PortfolioType>(mockPortfolio);
  const [watchlist, setWatchlist] = useState<Investment[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aiAnalyses, setAiAnalyses] = useState<AIAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monadService = new MonadService();

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const address = await monadService.connectWallet();
      if (address) {
        setWalletAddress(address);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to connect to MetaMask. Please check your wallet connection.');
      }
    }
    setIsLoading(false);
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
  };

  const handleBuyAsset = (symbol: string, quantity: number, price: number) => {
    const updatedPortfolio = { ...portfolio };
    const existingAsset = updatedPortfolio.assets.find(asset => asset.symbol === symbol);

    if (existingAsset) {
      // Update existing asset
      const totalQuantity = existingAsset.quantity + quantity;
      const totalCost = (existingAsset.quantity * existingAsset.averagePrice) + (quantity * price);
      existingAsset.quantity = totalQuantity;
      existingAsset.averagePrice = totalCost / totalQuantity;
      existingAsset.currentPrice = price;
      existingAsset.totalValue = totalQuantity * price;
      existingAsset.profitLoss = existingAsset.totalValue - totalCost;
      existingAsset.profitLossPercentage = (existingAsset.profitLoss / totalCost) * 100;
    } else {
      // Add new asset
      const newAsset = {
        id: Date.now().toString(),
        symbol,
        name: investments.find(inv => inv.symbol === symbol)?.name || symbol,
        quantity,
        averagePrice: price,
        currentPrice: price,
        totalValue: quantity * price,
        profitLoss: 0,
        profitLossPercentage: 0,
      };
      updatedPortfolio.assets.push(newAsset);
    }

    // Update portfolio total value
    updatedPortfolio.totalValue = updatedPortfolio.assets.reduce((total, asset) => total + asset.totalValue, 0);
    setPortfolio(updatedPortfolio);
  };

  const handleSellAsset = (symbol: string, quantity: number, price: number) => {
    const updatedPortfolio = { ...portfolio };
    const asset = updatedPortfolio.assets.find(asset => asset.symbol === symbol);

    if (asset && asset.quantity >= quantity) {
      asset.quantity -= quantity;
      asset.currentPrice = price;
      asset.totalValue = asset.quantity * price;
      asset.profitLoss = asset.totalValue - (asset.quantity * asset.averagePrice);
      asset.profitLossPercentage = (asset.profitLoss / (asset.quantity * asset.averagePrice)) * 100;

      // Remove asset if quantity becomes 0
      if (asset.quantity === 0) {
        updatedPortfolio.assets = updatedPortfolio.assets.filter(a => a.symbol !== symbol);
      }
    }

    // Update portfolio total value
    updatedPortfolio.totalValue = updatedPortfolio.assets.reduce((total, asset) => total + asset.totalValue, 0);
    setPortfolio(updatedPortfolio);
  };

  const handleAddToWatchlist = (investment: Investment) => {
    if (!watchlist.find(item => item.id === investment.id)) {
      setWatchlist([...watchlist, investment]);
    }
  };

  const handleBuyInvestment = (investment: Investment) => {
    // This would typically open a buy modal or navigate to portfolio
    handleBuyAsset(investment.symbol, 1, investment.price);
  };

  const handleAnalysisComplete = (analysis: AIAnalysis) => {
    setAiAnalyses(prev => [analysis, ...prev.slice(0, 9)]); // Keep last 10 analyses
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            portfolio={portfolio}
            investments={investments}
            walletAddress={walletAddress}
          />
        );
      case 'portfolio':
        return (
          <Portfolio
            portfolio={portfolio}
            onBuyAsset={handleBuyAsset}
            onSellAsset={handleSellAsset}
          />
        );
      case 'market':
        return (
          <Market
            investments={investments}
            onAddToWatchlist={handleAddToWatchlist}
            onBuyInvestment={handleBuyInvestment}
          />
        );
      case 'ai-analysis':
        return (
          <AIAnalysisComponent
            investments={investments}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
      case 'portfolio-explanation':
        return (
          <PortfolioExplanationComponent
            portfolio={portfolio}
          />
        );
      case 'smart-wallets':
        return <SmartWalletsLeaderboard />;
      case 'auto-rebalancing':
        return (
          <AutoRebalancingBotComponent
            portfolio={portfolio}
          />
        );
      case 'rug-pull-radar':
        return <RugPullRadar />;
      case 'token-health':
        return <TokenHealthScore />;
      case 'strategy-mutator':
        return <AIStrategyMutator />;
      case 'what-if-simulator':
        return (
          <WhatIfSimulator
            portfolio={portfolio}
          />
        );
      case 'dao-voting':
        return <DAOVotingAssistant />;
      case 'fear-greed':
        return <FearGreedIndex />;
      case 'investment-story':
        return (
          <InvestmentStoryTimeline
            portfolio={portfolio}
          />
        );
      case 'streaks':
        return <Streaks />;
      case 'game':
        return <Game />;
      default:
        return (
          <Dashboard
            portfolio={portfolio}
            investments={investments}
            walletAddress={walletAddress}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        error={error}
        isLoading={isLoading}
      />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap space-x-8 overflow-x-auto">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'dashboard'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('portfolio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'portfolio'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setCurrentView('market')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'market'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setCurrentView('ai-analysis')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'ai-analysis'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Analysis
            </button>
            <button
              onClick={() => setCurrentView('portfolio-explanation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'portfolio-explanation'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Portfolio AI
            </button>
            <button
              onClick={() => setCurrentView('smart-wallets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'smart-wallets'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Smart Wallets
            </button>
            <button
              onClick={() => setCurrentView('auto-rebalancing')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'auto-rebalancing'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Auto Rebalancing
            </button>
            <button
              onClick={() => setCurrentView('rug-pull-radar')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'rug-pull-radar'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rug Pull Radar
            </button>
            <button
              onClick={() => setCurrentView('token-health')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'token-health'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Token Health
            </button>
            <button
              onClick={() => setCurrentView('strategy-mutator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'strategy-mutator'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Strategy Mutator
            </button>
            <button
              onClick={() => setCurrentView('what-if-simulator')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'what-if-simulator'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              What-If Simulator
            </button>
            <button
              onClick={() => setCurrentView('dao-voting')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'dao-voting'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              DAO Voting
            </button>
            <button
              onClick={() => setCurrentView('fear-greed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'fear-greed'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fear & Greed
            </button>
            <button
              onClick={() => setCurrentView('investment-story')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'investment-story'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Investment Story
            </button>
            <button
              onClick={() => setCurrentView('streaks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'streaks'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Streaks
            </button>
            <button
              onClick={() => setCurrentView('game')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                currentView === 'game'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Play & Earn
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          renderCurrentView()
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Powered by Monad Testnet • AI-Powered Investment Assistant
            </p>
            <p className="text-gray-400 text-xs mt-2">
              This is a demonstration application. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 