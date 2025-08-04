import { AIAnalysis, Investment } from '../types';

export class AIService {
  // Simulated AI analysis - in a real app, this would connect to an AI API
  async analyzeInvestment(symbol: string, marketData: any): Promise<AIAnalysis> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const analysis = this.generateAnalysis(symbol, marketData);
    const sentiment = this.determineSentiment(analysis);
    const confidence = this.calculateConfidence(marketData);

    return {
      id: Date.now().toString(),
      symbol,
      analysis,
      sentiment,
      confidence,
      factors: this.extractFactors(marketData),
      timestamp: new Date(),
    };
  }

  private generateAnalysis(symbol: string, marketData: any): string {
    const { change24h, volume24h, marketCap } = marketData;
    
    let analysis = `Analysis for ${symbol}:\n\n`;
    
    if (change24h > 5) {
      analysis += `• Strong positive momentum with ${change24h.toFixed(2)}% gain in 24h\n`;
    } else if (change24h > 0) {
      analysis += `• Moderate growth with ${change24h.toFixed(2)}% increase\n`;
    } else if (change24h > -5) {
      analysis += `• Slight decline of ${Math.abs(change24h).toFixed(2)}%\n`;
    } else {
      analysis += `• Significant decline of ${Math.abs(change24h).toFixed(2)}%\n`;
    }

    if (volume24h > 1000000) {
      analysis += `• High trading volume indicates strong market interest\n`;
    }

    if (marketCap > 1000000000) {
      analysis += `• Large market cap suggests stability\n`;
    }

    analysis += `\nTechnical indicators suggest ${this.getRecommendation(change24h, volume24h)} position.`;
    
    return analysis;
  }

  private determineSentiment(analysis: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['positive', 'growth', 'increase', 'strong', 'buy'];
    const negativeWords = ['decline', 'decrease', 'weak', 'sell', 'risk'];
    
    const positiveCount = positiveWords.filter(word => 
      analysis.toLowerCase().includes(word)
    ).length;
    const negativeCount = negativeWords.filter(word => 
      analysis.toLowerCase().includes(word)
    ).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateConfidence(marketData: any): number {
    const { change24h, volume24h, marketCap } = marketData;
    
    let confidence = 50; // Base confidence
    
    // Volume factor
    if (volume24h > 1000000) confidence += 10;
    if (volume24h > 10000000) confidence += 10;
    
    // Price movement factor
    if (Math.abs(change24h) > 10) confidence += 15;
    if (Math.abs(change24h) > 20) confidence += 10;
    
    // Market cap factor
    if (marketCap > 1000000000) confidence += 5;
    
    return Math.min(confidence, 95);
  }

  private extractFactors(marketData: any): string[] {
    const factors = [];
    const { change24h, volume24h, marketCap } = marketData;

    if (change24h > 5) factors.push('Strong momentum');
    if (volume24h > 1000000) factors.push('High volume');
    if (marketCap > 1000000000) factors.push('Large market cap');
    if (change24h < -5) factors.push('Price decline');
    if (volume24h < 100000) factors.push('Low volume');

    return factors;
  }

  private getRecommendation(change24h: number, volume24h: number): string {
    if (change24h > 5 && volume24h > 1000000) return 'a buy';
    if (change24h < -5) return 'a sell';
    return 'holding';
  }

  // Portfolio optimization using AI
  async optimizePortfolio(portfolio: any, availableInvestments: Investment[]): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const recommendations = availableInvestments
      .filter(inv => inv.aiScore > 7.5)
      .map(inv => ({
        symbol: inv.symbol,
        name: inv.name,
        recommendedAllocation: this.calculateAllocation(inv.aiScore, inv.riskLevel),
        reasoning: `High AI score (${inv.aiScore}/10) with ${inv.riskLevel} risk level`,
      }))
      .slice(0, 5);

    return {
      currentValue: portfolio.totalValue,
      recommendedChanges: recommendations,
      expectedReturn: this.calculateExpectedReturn(recommendations),
      riskAssessment: this.assessPortfolioRisk(recommendations),
    };
  }

  private calculateAllocation(aiScore: number, riskLevel: string): number {
    let allocation = aiScore * 5; // Base allocation
    
    if (riskLevel === 'low') allocation += 10;
    if (riskLevel === 'high') allocation -= 5;
    
    return Math.min(allocation, 25); // Max 25% per asset
  }

  private calculateExpectedReturn(recommendations: any[]): number {
    return recommendations.reduce((total, rec) => {
      return total + (rec.recommendedAllocation * 0.08); // 8% expected return
    }, 0);
  }

  private assessPortfolioRisk(recommendations: any[]): string {
    const avgRisk = recommendations.reduce((total, rec) => {
      return total + (rec.recommendedAllocation * 0.5);
    }, 0) / recommendations.length;

    if (avgRisk < 10) return 'Low risk';
    if (avgRisk < 15) return 'Medium risk';
    return 'High risk';
  }
} 