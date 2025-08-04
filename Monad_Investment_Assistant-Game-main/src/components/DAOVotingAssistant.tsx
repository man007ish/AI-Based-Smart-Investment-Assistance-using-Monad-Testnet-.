import React, { useState, useEffect } from 'react';
import { DAOProposal } from '../types';
import { Vote, TrendingUp, TrendingDown, Clock, Users, Target, AlertTriangle, CheckCircle, XCircle, Minus } from 'lucide-react';

const DAOVotingAssistant: React.FC = () => {
  const [proposals, setProposals] = useState<DAOProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockProposals: DAOProposal[] = [
      {
        id: 'prop-001',
        title: 'Increase Treasury Allocation for DeFi Development',
        description: 'Proposal to allocate 500 ETH from treasury for DeFi protocol development and partnerships',
        proposalType: 'treasury',
        votingPower: 1000,
        currentVotes: {
          for: 650,
          against: 280,
          abstain: 70
        },
        deadline: new Date(Date.now() + 86400000 * 3), // 3 days from now
        aiRecommendation: {
          vote: 'for',
          confidence: 87,
          reasoning: [
            'Strong alignment with DAO\'s DeFi focus',
            'Clear use case and expected ROI',
            'Reasonable allocation amount',
            'Experienced team behind proposal'
          ],
          impact: 'positive'
        }
      },
      {
        id: 'prop-002',
        title: 'Update Governance Parameters',
        description: 'Reduce quorum requirement from 10% to 7% and increase voting period to 5 days',
        proposalType: 'governance',
        votingPower: 1000,
        currentVotes: {
          for: 420,
          against: 520,
          abstain: 60
        },
        deadline: new Date(Date.now() + 86400000 * 1), // 1 day from now
        aiRecommendation: {
          vote: 'against',
          confidence: 72,
          reasoning: [
            'Lower quorum may lead to less representative decisions',
            'Current parameters have worked well historically',
            'Risk of governance attacks with lower thresholds',
            'Insufficient justification for changes'
          ],
          impact: 'negative'
        }
      },
      {
        id: 'prop-003',
        title: 'Emergency Protocol Upgrade',
        description: 'Critical security patch for smart contract vulnerability discovered in core protocol',
        proposalType: 'emergency',
        votingPower: 1000,
        currentVotes: {
          for: 890,
          against: 80,
          abstain: 30
        },
        deadline: new Date(Date.now() + 86400000 * 0.5), // 12 hours from now
        aiRecommendation: {
          vote: 'for',
          confidence: 95,
          reasoning: [
            'Critical security vulnerability requires immediate action',
            'Patch has been thoroughly tested by security team',
            'Risk of exploitation is high',
            'Emergency nature justifies expedited process'
          ],
          impact: 'positive'
        }
      },
      {
        id: 'prop-004',
        title: 'Community Grant Program',
        description: 'Establish 100 ETH fund for community-driven projects and initiatives',
        proposalType: 'treasury',
        votingPower: 1000,
        currentVotes: {
          for: 380,
          against: 450,
          abstain: 170
        },
        deadline: new Date(Date.now() + 86400000 * 7), // 7 days from now
        aiRecommendation: {
          vote: 'abstain',
          confidence: 45,
          reasoning: [
            'Good intention but lacks clear selection criteria',
            'Risk of fund misuse without proper oversight',
            'Community support is mixed',
            'Need more details on governance structure'
          ],
          impact: 'neutral'
        }
      },
      {
        id: 'prop-005',
        title: 'Tokenomics Adjustment',
        description: 'Increase staking rewards by 2% and reduce inflation rate by 1%',
        proposalType: 'parameter',
        votingPower: 1000,
        currentVotes: {
          for: 720,
          against: 220,
          abstain: 60
        },
        deadline: new Date(Date.now() + 86400000 * 4), // 4 days from now
        aiRecommendation: {
          vote: 'for',
          confidence: 78,
          reasoning: [
            'Balanced approach to tokenomics',
            'Encourages long-term holding',
            'Reduces inflationary pressure',
            'Community strongly supports the change'
          ],
          impact: 'positive'
        }
      }
    ];
    
    setProposals(mockProposals);
    setIsLoading(false);
  };

  const getVoteIcon = (vote: string) => {
    switch (vote) {
      case 'for': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'against': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'abstain': return <Minus className="h-5 w-5 text-gray-600" />;
      default: return <Vote className="h-5 w-5 text-gray-600" />;
    }
  };

  const getVoteColor = (vote: string) => {
    switch (vote) {
      case 'for': return 'text-green-600 bg-green-100';
      case 'against': return 'text-red-600 bg-red-100';
      case 'abstain': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProposalTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'treasury': return 'text-blue-600 bg-blue-100';
      case 'governance': return 'text-purple-600 bg-purple-100';
      case 'parameter': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'neutral': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Expiring soon';
  };

  const getVotePercentage = (votes: number, total: number) => {
    return ((votes / total) * 100).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Vote className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">DAO Voting Assistant</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading proposals...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Vote className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">DAO Voting Assistant</h2>
        </div>
        <button
          onClick={loadProposals}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Refresh Proposals
        </button>
      </div>

      {/* Proposals Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">{proposals.length}</div>
          <div className="text-sm text-gray-600">Active Proposals</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {proposals.filter(p => p.aiRecommendation.vote === 'for').length}
          </div>
          <div className="text-sm text-gray-600">AI Recommends For</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-red-50">
          <div className="text-2xl font-bold text-red-600">
            {proposals.filter(p => p.aiRecommendation.vote === 'against').length}
          </div>
          <div className="text-sm text-gray-600">AI Recommends Against</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-yellow-50">
          <div className="text-2xl font-bold text-yellow-600">
            {proposals.filter(p => p.deadline.getTime() - Date.now() < 86400000).length}
          </div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProposalTypeColor(proposal.proposalType)}`}>
                    {proposal.proposalType.toUpperCase()}
                  </span>
                  {proposal.proposalType === 'emergency' && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      URGENT
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{proposal.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{proposal.description}</p>
                
                {/* AI Recommendation */}
                <div className="flex items-center space-x-3 mb-3">
                  {getVoteIcon(proposal.aiRecommendation.vote)}
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVoteColor(proposal.aiRecommendation.vote)}`}>
                      AI: {proposal.aiRecommendation.vote.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {proposal.aiRecommendation.confidence}% confidence
                    </span>
                    {getImpactIcon(proposal.aiRecommendation.impact)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {getTimeRemaining(proposal.deadline)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProposal(selectedProposal === proposal.id ? null : proposal.id)}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  {selectedProposal === proposal.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>

            {/* Voting Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Voting Progress</span>
                <span>{proposal.currentVotes.for + proposal.currentVotes.against + proposal.currentVotes.abstain} / {proposal.votingPower} votes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-500 h-2 rounded-l-full"
                  style={{ width: `${getVotePercentage(proposal.currentVotes.for, proposal.votingPower)}%` }}
                ></div>
                <div 
                  className="bg-red-500 h-2"
                  style={{ 
                    width: `${getVotePercentage(proposal.currentVotes.against, proposal.votingPower)}%`,
                    marginLeft: `${getVotePercentage(proposal.currentVotes.for, proposal.votingPower)}%`
                  }}
                ></div>
                <div 
                  className="bg-gray-400 h-2 rounded-r-full"
                  style={{ 
                    width: `${getVotePercentage(proposal.currentVotes.abstain, proposal.votingPower)}%`,
                    marginLeft: `${getVotePercentage(proposal.currentVotes.for + proposal.currentVotes.against, proposal.votingPower)}%`
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>For: {proposal.currentVotes.for} ({getVotePercentage(proposal.currentVotes.for, proposal.votingPower)}%)</span>
                <span>Against: {proposal.currentVotes.against} ({getVotePercentage(proposal.currentVotes.against, proposal.votingPower)}%)</span>
                <span>Abstain: {proposal.currentVotes.abstain} ({getVotePercentage(proposal.currentVotes.abstain, proposal.votingPower)}%)</span>
              </div>
            </div>

            {/* Detailed Analysis */}
            {selectedProposal === proposal.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-3">AI Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Reasoning</h5>
                    <ul className="space-y-1">
                      {proposal.aiRecommendation.reasoning.map((reason, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Key Factors</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Proposal Type:</span>
                        <span className="font-medium">{proposal.proposalType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Voting Power:</span>
                        <span className="font-medium">{proposal.votingPower}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium">{proposal.aiRecommendation.confidence}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expected Impact:</span>
                        <span className={`font-medium capitalize ${proposal.aiRecommendation.impact === 'positive' ? 'text-green-600' : proposal.aiRecommendation.impact === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                          {proposal.aiRecommendation.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {proposals.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No active proposals found.
        </div>
      )}

      {/* AI Assistant Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-900">How AI Makes Recommendations</h3>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Analyzes proposal content, context, and historical voting patterns</p>
          <p>• Considers DAO's mission, values, and strategic objectives</p>
          <p>• Evaluates potential risks, benefits, and long-term impact</p>
          <p>• Reviews community sentiment and expert opinions</p>
          <p>• Assesses technical feasibility and implementation risks</p>
        </div>
      </div>
    </div>
  );
};

export default DAOVotingAssistant; 