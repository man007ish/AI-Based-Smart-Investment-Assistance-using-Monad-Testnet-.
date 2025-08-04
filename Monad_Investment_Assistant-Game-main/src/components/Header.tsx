import React from 'react';
import { Wallet, TrendingUp, BarChart3, Brain, Settings } from 'lucide-react';

interface HeaderProps {
  walletAddress: string | null;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  error?: string | null;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ walletAddress, onConnectWallet, onDisconnectWallet, error, isLoading }) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isMetaMaskNotInstalled = error?.includes('MetaMask is not installed');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-monad-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Monad Investment Assistant</h1>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#dashboard" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
              <a href="#portfolio" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Portfolio</span>
              </a>
              <a href="#ai-analysis" className="text-gray-600 hover:text-primary-600 flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>AI Analysis</span>
              </a>
            </nav>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">Connected</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-lg">
                  <span className="text-sm text-gray-700 font-mono">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <button
                  onClick={onDisconnectWallet}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg max-w-xs">
                  <div>Connect your MetaMask wallet to start trading</div>
                  <div className="text-blue-600 mt-1">Demo mode available if network connection fails</div>
                </div>
                {error && (
                  <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg max-w-xs">
                    <div>{error}</div>
                    {isMetaMaskNotInstalled && (
                      <div className="mt-1">
                        <a 
                          href="https://metamask.io/download/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Download MetaMask
                        </a>
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={onConnectWallet}
                  disabled={isLoading}
                  className={`btn-primary flex items-center space-x-2 px-4 py-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              </div>
            )}
            
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 