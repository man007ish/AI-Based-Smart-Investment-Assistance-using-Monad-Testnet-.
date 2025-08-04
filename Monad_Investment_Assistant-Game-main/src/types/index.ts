export interface Investment {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  aiScore: number;
  recommendation: 'buy' | 'sell' | 'hold';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  change24h: number;
  assets: PortfolioAsset[];
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface AIAnalysis {
  id: string;
  symbol: string;
  analysis: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  factors: string[];
  timestamp: Date;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface WalletInfo {
  address: string;
  balance: number;
  network: string;
  isConnected: boolean;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  high24h: number;
  low24h: number;
}

// New types for AI-powered features

export interface PortfolioExplanation {
  id: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  riskAssessment: string;
  diversificationScore: number;
  performanceInsights: string[];
  timestamp: Date;
}

export interface SmartWallet {
  address: string;
  name?: string;
  aiScore: number;
  totalValue: number;
  profitLoss24h: number;
  profitLoss7d: number;
  profitLoss30d: number;
  tradingFrequency: number;
  successRate: number;
  strategies: string[];
  lastActive: Date;
  rank: number;
}

export interface AutoRebalancingBot {
  id: string;
  name: string;
  isActive: boolean;
  targetAllocations: { symbol: string; percentage: number }[];
  currentAllocations: { symbol: string; percentage: number }[];
  rebalancingThreshold: number;
  lastRebalanced: Date;
  performance: {
    totalTrades: number;
    successfulTrades: number;
    totalProfit: number;
    averageReturn: number;
  };
  settings: {
    autoRebalance: boolean;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    rebalanceFrequency: 'daily' | 'weekly' | 'monthly';
  };
}

export interface RugPullRisk {
  symbol: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  factors: {
    liquidity: number;
    holderConcentration: number;
    contractAge: number;
    socialSentiment: number;
    priceVolatility: number;
  };
  warnings: string[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface TokenHealthScore {
  symbol: string;
  overallScore: number;
  metrics: {
    liquidity: number;
    volume: number;
    marketCap: number;
    socialSentiment: number;
    developerActivity: number;
    communityGrowth: number;
    priceStability: number;
    contractSecurity: number;
  };
  breakdown: {
    excellent: string[];
    good: string[];
    needsImprovement: string[];
    critical: string[];
  };
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
}

export interface AIStrategy {
  id: string;
  name: string;
  description: string;
  parameters: {
    entryConditions: string[];
    exitConditions: string[];
    riskManagement: string[];
    positionSizing: string;
  };
  performance: {
    totalTrades: number;
    winRate: number;
    averageReturn: number;
    maxDrawdown: number;
    sharpeRatio: number;
  };
  isActive: boolean;
  createdAt: Date;
  lastModified: Date;
}

export interface WhatIfScenario {
  id: string;
  name: string;
  description: string;
  changes: {
    type: 'buy' | 'sell' | 'rebalance';
    symbol: string;
    quantity?: number;
    percentage?: number;
  }[];
  results: {
    newTotalValue: number;
    changeInValue: number;
    changePercentage: number;
    newAllocations: { symbol: string; percentage: number }[];
    riskAssessment: string;
    expectedReturn: number;
  };
  timestamp: Date;
}

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposalType: 'governance' | 'treasury' | 'parameter' | 'emergency';
  votingPower: number;
  currentVotes: {
    for: number;
    against: number;
    abstain: number;
  };
  deadline: Date;
  aiRecommendation: {
    vote: 'for' | 'against' | 'abstain';
    confidence: number;
    reasoning: string[];
    impact: 'positive' | 'negative' | 'neutral';
  };
}

export interface FearGreedIndex {
  value: number;
  level: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  factors: {
    volatility: number;
    marketMomentum: number;
    socialSentiment: number;
    dominance: number;
    volume: number;
  };
  onChainMetrics: {
    activeAddresses: number;
    transactionCount: number;
    gasPrice: number;
    defiTVL: number;
    stakingRatio: number;
  };
  timestamp: Date;
}

export interface InvestmentStory {
  id: string;
  title: string;
  timeline: InvestmentEvent[];
  summary: string;
  keyInsights: string[];
  performanceMetrics: {
    totalReturn: number;
    bestTrade: string;
    worstTrade: string;
    averageHoldTime: number;
    tradingFrequency: string;
  };
  createdAt: Date;
}

export interface InvestmentEvent {
  id: string;
  type: 'buy' | 'sell' | 'market_event' | 'ai_analysis' | 'rebalancing';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  data?: any;
}

export interface Streak {
  id: string;
  type: 'winning_trades' | 'daily_login' | 'analysis_completed' | 'portfolio_growth';
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  rewards: {
    level: number;
    title: string;
    description: string;
    unlocked: boolean;
  }[];
  nextMilestone: {
    target: number;
    reward: string;
  };
}

// Game-related types
export interface GameStats {
  score: number;
  coins: number;
  level: number;
  streak: number;
  totalPlayTime: number;
  gamesPlayed: number;
  bestScore: number;
}

export interface CoinReward {
  id: string;
  amount: number;
  reason: string;
  timestamp: Date;
  coinType: 'MONAD' | 'ETH' | 'BTC';
}

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  condition: string;
  reward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface GameSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  score: number;
  coinsEarned: number;
  coinType: 'MONAD' | 'ETH' | 'BTC';
  duration: number;
} 