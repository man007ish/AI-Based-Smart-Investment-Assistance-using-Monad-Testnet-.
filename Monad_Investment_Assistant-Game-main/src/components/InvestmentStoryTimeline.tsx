import React, { useState, useEffect } from 'react';
import { InvestmentStory, Portfolio } from '../types';
import { BookOpen, Plus, Clock, TrendingUp, TrendingDown, Target, BarChart3, Calendar, Star, Zap } from 'lucide-react';

interface InvestmentStoryTimelineProps {
  portfolio: Portfolio;
}

const InvestmentStoryTimeline: React.FC<InvestmentStoryTimelineProps> = ({ portfolio }) => {
  const [stories, setStories] = useState<InvestmentStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockStories: InvestmentStory[] = [
      {
        id: 'story-001',
        title: 'The DeFi Pioneer Journey',
        timeline: [
          {
            id: 'event-001',
            type: 'buy',
            title: 'First ETH Purchase',
            description: 'Entered the crypto market with 5 ETH at $2,800 per token',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 365),
            data: { symbol: 'ETH', quantity: 5, price: 2800 }
          },
          {
            id: 'event-002',
            type: 'market_event',
            title: 'DeFi Summer Discovery',
            description: 'Discovered DeFi protocols and yield farming opportunities',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 300),
            data: { protocols: ['Uniswap', 'Compound', 'Aave'] }
          },
          {
            id: 'event-003',
            type: 'buy',
            title: 'DeFi Token Accumulation',
            description: 'Started accumulating UNI, COMP, and AAVE tokens',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 250),
            data: { tokens: ['UNI', 'COMP', 'AAVE'] }
          },
          {
            id: 'event-004',
            type: 'ai_analysis',
            title: 'AI Portfolio Optimization',
            description: 'Used AI analysis to rebalance portfolio for better risk-adjusted returns',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 100),
            data: { aiScore: 8.5, recommendations: ['Increase ETH allocation', 'Add stablecoin exposure'] }
          },
          {
            id: 'event-005',
            type: 'rebalancing',
            title: 'Strategic Rebalancing',
            description: 'Rebalanced portfolio to 40% ETH, 30% DeFi tokens, 20% stablecoins, 10% emerging tokens',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 30),
            data: { newAllocations: { ETH: 40, DeFi: 30, Stable: 20, Emerging: 10 } }
          }
        ],
        summary: 'A year-long journey from traditional crypto investment to sophisticated DeFi portfolio management, leveraging AI insights for optimal performance.',
        keyInsights: [
          'Early adoption of DeFi protocols provided significant returns',
          'AI-driven portfolio optimization improved risk-adjusted returns by 15%',
          'Strategic rebalancing helped navigate market volatility',
          'Diversification across DeFi ecosystem reduced concentration risk'
        ],
        performanceMetrics: {
          totalReturn: 156.7,
          bestTrade: 'UNI token purchase during DeFi summer (+320%)',
          worstTrade: 'Early exit from COMP position (-25%)',
          averageHoldTime: 180,
          tradingFrequency: 'Low to Medium'
        },
        createdAt: new Date(Date.now() - 86400000 * 7)
      },
      {
        id: 'story-002',
        title: 'The Meme Token Adventure',
        timeline: [
          {
            id: 'event-006',
            type: 'buy',
            title: 'FOMO into Meme Tokens',
            description: 'Invested in DOGE and SHIB during the meme token craze',
            impact: 'negative',
            timestamp: new Date(Date.now() - 86400000 * 200),
            data: { tokens: ['DOGE', 'SHIB'], totalInvestment: 5000 }
          },
          {
            id: 'event-007',
            type: 'market_event',
            title: 'Meme Token Crash',
            description: 'Experienced significant losses as meme token bubble burst',
            impact: 'negative',
            timestamp: new Date(Date.now() - 86400000 * 180),
            data: { losses: 3500, lesson: 'Avoid FOMO investments' }
          },
          {
            id: 'event-008',
            type: 'ai_analysis',
            title: 'AI Risk Assessment',
            description: 'AI flagged meme tokens as high-risk, recommended exit strategy',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 170),
            data: { riskScore: 85, recommendation: 'Exit and reallocate to fundamentals' }
          },
          {
            id: 'event-009',
            type: 'sell',
            title: 'Strategic Exit',
            description: 'Sold remaining meme token positions and reallocated to blue-chip crypto',
            impact: 'positive',
            timestamp: new Date(Date.now() - 86400000 * 160),
            data: { reallocation: ['BTC', 'ETH'], recovered: 1500 }
          }
        ],
        summary: 'A cautionary tale of FOMO investing in meme tokens, followed by AI-guided recovery and return to fundamental-based investing.',
        keyInsights: [
          'FOMO investing often leads to poor timing and losses',
          'AI risk assessment can help avoid emotional investment decisions',
          'Recovery is possible with disciplined reallocation',
          'Fundamental analysis beats hype-driven investments'
        ],
        performanceMetrics: {
          totalReturn: -40.0,
          bestTrade: 'Early exit from SHIB (-15%)',
          worstTrade: 'DOGE purchase at peak (-65%)',
          averageHoldTime: 45,
          tradingFrequency: 'High (during crisis)'
        },
        createdAt: new Date(Date.now() - 86400000 * 3)
      }
    ];
    
    setStories(mockStories);
    setIsLoading(false);
  };

  const generateStory = async () => {
    setIsGenerating(true);
    
    // Simulate AI story generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newStory: InvestmentStory = {
      id: `story-${Date.now()}`,
      title: 'AI-Generated Investment Journey',
      timeline: [
        {
          id: `event-${Date.now()}-1`,
          type: 'buy',
          title: 'Portfolio Inception',
          description: 'Started investment journey with initial portfolio allocation',
          impact: 'positive',
          timestamp: new Date(Date.now() - 86400000 * 365),
          data: { initialValue: portfolio.totalValue * 0.7 }
        },
        {
          id: `event-${Date.now()}-2`,
          type: 'ai_analysis',
          title: 'AI Portfolio Analysis',
          description: 'First AI-powered portfolio analysis and recommendations',
          impact: 'positive',
          timestamp: new Date(Date.now() - 86400000 * 180),
          data: { aiScore: 7.8, recommendations: ['Diversify holdings', 'Add stablecoin exposure'] }
        },
        {
          id: `event-${Date.now()}-3`,
          type: 'rebalancing',
          title: 'Strategic Rebalancing',
          description: 'Implemented AI-recommended portfolio rebalancing',
          impact: 'positive',
          timestamp: new Date(Date.now() - 86400000 * 90),
          data: { rebalancingCost: 0.5, expectedBenefit: 2.3 }
        },
        {
          id: `event-${Date.now()}-4`,
          type: 'market_event',
          title: 'Market Volatility',
          description: 'Navigated through significant market volatility using AI insights',
          impact: 'neutral',
          timestamp: new Date(Date.now() - 86400000 * 30),
          data: { volatility: 'high', aiGuidance: 'hold and rebalance' }
        }
      ],
      summary: 'An AI-guided investment journey demonstrating the power of data-driven decision making in crypto markets.',
      keyInsights: [
        'AI analysis helped identify optimal entry and exit points',
        'Regular rebalancing improved risk-adjusted returns',
        'Emotional discipline was maintained through AI guidance',
        'Portfolio diversification reduced volatility impact'
      ],
      performanceMetrics: {
        totalReturn: 45.2,
        bestTrade: 'ETH accumulation during dip (+28%)',
        worstTrade: 'Early exit from BTC position (-8%)',
        averageHoldTime: 120,
        tradingFrequency: 'Low'
      },
      createdAt: new Date()
    };
    
    setStories(prev => [newStory, ...prev]);
    setShowCreateForm(false);
    setIsGenerating(false);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'sell': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'market_event': return <BarChart3 className="h-4 w-4 text-blue-600" />;
      case 'ai_analysis': return <Target className="h-4 w-4 text-purple-600" />;
      case 'rebalancing': return <Zap className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-green-500 bg-green-50';
      case 'negative': return 'border-red-500 bg-red-50';
      case 'neutral': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Investment Story Timeline</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading investment stories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Investment Story Timeline</h2>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Generate Story</span>
        </button>
      </div>

      {/* Generate Story Form */}
      {showCreateForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Investment Story</h3>
          <p className="text-gray-600 mb-4">
            AI will analyze your portfolio history and create a compelling narrative of your investment journey.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={generateStory}
              disabled={isGenerating}
              className={`px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Story...</span>
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4" />
                  <span>Generate AI Story</span>
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

      {/* Stories List */}
      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-3">{story.summary}</p>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${story.performanceMetrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {story.performanceMetrics.totalReturn >= 0 ? '+' : ''}{story.performanceMetrics.totalReturn}%
                    </div>
                    <div className="text-xs text-gray-500">Total Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{story.performanceMetrics.bestTrade}</div>
                    <div className="text-xs text-gray-500">Best Trade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{story.performanceMetrics.worstTrade}</div>
                    <div className="text-xs text-gray-500">Worst Trade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{story.performanceMetrics.averageHoldTime}d</div>
                    <div className="text-xs text-gray-500">Avg Hold Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{story.performanceMetrics.tradingFrequency}</div>
                    <div className="text-xs text-gray-500">Trading Style</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                {selectedStory === story.id ? 'Hide Timeline' : 'View Timeline'}
              </button>
            </div>

            {/* Key Insights */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                Key Insights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {story.keyInsights.map((insight, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            {selectedStory === story.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-4 w-4 text-primary-600 mr-2" />
                  Investment Timeline
                </h4>
                <div className="space-y-4">
                  {story.timeline.map((event, index) => (
                    <div key={event.id} className={`border-l-4 pl-4 py-2 ${getImpactColor(event.impact)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-gray-900">{event.title}</h5>
                            <span className="text-xs text-gray-500">
                              {event.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-4">
              Generated: {story.createdAt.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No investment stories generated yet. Create your first AI-generated story!
        </div>
      )}

      {/* AI Story Generator Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <BookOpen className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">How AI Generates Stories</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Analyzes your complete trading history and portfolio performance</p>
          <p>• Identifies key turning points and decision moments</p>
          <p>• Creates compelling narratives with actionable insights</p>
          <p>• Highlights learning opportunities and best practices</p>
          <p>• Provides context for market events and their impact</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStoryTimeline; 