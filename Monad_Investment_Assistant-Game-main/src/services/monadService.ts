import { ethers } from 'ethers';
import { Investment, Portfolio } from '../types';

// RPC configuration with fallbacks
const RPC_URLS = [
  'https://rpc.testnet.monad.xyz', // Monad testnet
  'https://eth-sepolia.g.alchemy.com/v2/demo', // Sepolia testnet as fallback
  'https://rpc.ankr.com/eth_goerli', // Goerli testnet as fallback
];

export class MonadService {
  private provider: ethers.JsonRpcProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;





  async connectWallet(): Promise<string | null> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to use this application.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please connect your MetaMask wallet.');
      }

      // Try to initialize provider with fallback RPCs
      if (!this.provider) {
        try {
          this.provider = await this.initializeProvider();
        } catch (providerError) {
          console.warn('Provider initialization failed, using demo mode:', providerError);
          // Return the first account for demo purposes
          return accounts[0];
        }
      }
      
      try {
        this.signer = await this.provider.getSigner();
        const address = await this.signer.getAddress();
        return address;
      } catch (signerError) {
        console.warn('Signer creation failed, using demo mode:', signerError);
        // Return the first account for demo purposes
        return accounts[0];
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      if (error instanceof Error) {
        throw new Error(`MetaMask connection failed: ${error.message}`);
      }
      throw new Error('Failed to connect to MetaMask. Please check your wallet connection.');
    }
  }

  private async initializeProvider(): Promise<ethers.JsonRpcProvider> {
    for (const rpcUrl of RPC_URLS) {
      try {
        console.log(`Trying RPC: ${rpcUrl}`);
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        
        // Test the connection with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        );
        
        await Promise.race([
          provider.getNetwork(),
          timeoutPromise
        ]);
        
        console.log(`Successfully connected to: ${rpcUrl}`);
        return provider;
      } catch (error) {
        console.warn(`Failed to connect to ${rpcUrl}:`, error);
        continue;
      }
    }
    
    // If all RPCs fail, use the first one as a last resort (for demo purposes)
    console.warn('All RPCs failed, using fallback mode');
    return new ethers.JsonRpcProvider(RPC_URLS[0]);
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (!this.provider) {
        return '0';
      }
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }

  async sendTransaction(to: string, amount: string): Promise<string | null> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });
      return tx.hash;
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  }

  async getTransactionStatus(txHash: string): Promise<'pending' | 'completed' | 'failed'> {
    try {
      if (!this.provider) {
        return 'failed';
      }
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) return 'pending';
      return receipt.status === 1 ? 'completed' : 'failed';
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      return 'failed';
    }
  }

  async getNetworkInfo() {
    try {
      if (!this.provider) {
        return null;
      }
      const network = await this.provider.getNetwork();
      return {
        chainId: network.chainId,
        name: network.name,
        rpcUrl: 'Connected to blockchain network',
      };
    } catch (error) {
      console.error('Failed to get network info:', error);
      return null;
    }
  }
}

// Mock data for development
export const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Monad Token',
    symbol: 'MONAD',
    price: 0.85,
    change24h: 5.2,
    marketCap: 85000000,
    volume24h: 1200000,
    aiScore: 8.5,
    recommendation: 'buy',
    riskLevel: 'medium',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3200,
    change24h: -2.1,
    marketCap: 384000000000,
    volume24h: 15000000000,
    aiScore: 7.8,
    recommendation: 'hold',
    riskLevel: 'low',
  },
  {
    id: '3',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 65000,
    change24h: 1.5,
    marketCap: 1200000000000,
    volume24h: 25000000000,
    aiScore: 9.2,
    recommendation: 'buy',
    riskLevel: 'low',
  },
];

export const mockPortfolio: Portfolio = {
  id: '1',
  name: 'My Portfolio',
  totalValue: 12500,
  change24h: 3.2,
  assets: [
    {
      id: '1',
      symbol: 'MONAD',
      name: 'Monad Token',
      quantity: 1000,
      averagePrice: 0.80,
      currentPrice: 0.85,
      totalValue: 850,
      profitLoss: 50,
      profitLossPercentage: 6.25,
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      quantity: 2.5,
      averagePrice: 3100,
      currentPrice: 3200,
      totalValue: 8000,
      profitLoss: 250,
      profitLossPercentage: 3.23,
    },
  ],
}; 