import { GameStats, CoinReward, GameAchievement, GameSession } from '../types';

export class GameService {
  private static instance: GameService;
  private gameStats: GameStats;
  private coinRewards: CoinReward[];
  private achievements: GameAchievement[];
  private gameSessions: GameSession[];

  constructor() {
    this.gameStats = this.loadGameStats();
    this.coinRewards = this.loadCoinRewards();
    this.achievements = this.loadAchievements();
    this.gameSessions = this.loadGameSessions();
  }

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  // Coin earning rates for different cryptocurrencies
  private coinRates = {
    MONAD: { base: 10, multiplier: 1.5, bonusMultiplier: 2.0 },
    ETH: { base: 5, multiplier: 1.2, bonusMultiplier: 1.5 },
    BTC: { base: 3, multiplier: 1.1, bonusMultiplier: 1.3 },
  };

  // Calculate coins earned based on score and selected coin
  calculateCoinsEarned(score: number, coinType: 'MONAD' | 'ETH' | 'BTC', playTime: number): number {
    const rate = this.coinRates[coinType];
    const baseCoins = Math.floor((score / 100) * rate.base * rate.multiplier);
    
    // Bonus calculations
    let bonusCoins = 0;
    
    // High score bonus
    if (score > this.gameStats.bestScore) {
      bonusCoins += 50;
    }
    
    // Streak bonus
    if (this.gameStats.streak >= 3) {
      bonusCoins += 25;
    }
    
    // Long play session bonus
    if (playTime > 300) { // 5 minutes
      bonusCoins += 15;
    }
    
    // Level bonus
    const levelBonus = Math.floor(this.gameStats.level * 5);
    bonusCoins += levelBonus;
    
    return baseCoins + bonusCoins;
  }

  // Start a new game session
  startGameSession(coinType: 'MONAD' | 'ETH' | 'BTC'): GameSession {
    const session: GameSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      score: 0,
      coinsEarned: 0,
      coinType,
      duration: 0,
    };
    
    this.gameSessions.push(session);
    this.saveGameSessions();
    
    return session;
  }

  // End a game session and calculate rewards
  endGameSession(sessionId: string, finalScore: number): CoinReward | null {
    const session = this.gameSessions.find(s => s.id === sessionId);
    if (!session) return null;

    session.endTime = new Date();
    session.score = finalScore;
    session.duration = session.endTime.getTime() - session.startTime.getTime();

    const coinsEarned = this.calculateCoinsEarned(
      finalScore,
      session.coinType,
      session.duration / 1000
    );
    
    session.coinsEarned = coinsEarned;

    // Update game stats
    this.updateGameStats(finalScore, coinsEarned, session.duration / 1000);

    // Create coin reward
    const reward: CoinReward = {
      id: Date.now().toString(),
      amount: coinsEarned,
      reason: `Game completed - Score: ${finalScore}`,
      timestamp: new Date(),
      coinType: session.coinType,
    };

    this.coinRewards.unshift(reward);
    if (this.coinRewards.length > 50) {
      this.coinRewards = this.coinRewards.slice(0, 50);
    }

    this.saveCoinRewards();
    this.saveGameStats();
    this.saveGameSessions();

    return reward;
  }

  // Update game statistics
  private updateGameStats(score: number, coinsEarned: number, playTime: number): void {
    this.gameStats.score = score;
    this.gameStats.coins += coinsEarned;
    this.gameStats.gamesPlayed += 1;
    this.gameStats.totalPlayTime += playTime;
    this.gameStats.level = Math.floor(this.gameStats.totalPlayTime / 3600) + 1;
    this.gameStats.streak += 1;
    this.gameStats.bestScore = Math.max(this.gameStats.bestScore, score);

    // Check for achievements
    this.checkAchievements();
  }

  // Check and unlock achievements
  private checkAchievements(): void {
    const newAchievements: GameAchievement[] = [];

    // High Scorer achievement
    if (this.gameStats.bestScore >= 1000 && !this.achievements.find(a => a.id === 'high_scorer')?.unlocked) {
      newAchievements.push({
        id: 'high_scorer',
        title: 'High Scorer',
        description: 'Score 1000+ points in a single game',
        condition: 'Score 1000+ points',
        reward: 100,
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    // Streak Master achievement
    if (this.gameStats.streak >= 5 && !this.achievements.find(a => a.id === 'streak_master')?.unlocked) {
      newAchievements.push({
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 5+ game streak',
        condition: '5+ game streak',
        reward: 75,
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    // Dedicated Player achievement
    if (this.gameStats.gamesPlayed >= 10 && !this.achievements.find(a => a.id === 'dedicated_player')?.unlocked) {
      newAchievements.push({
        id: 'dedicated_player',
        title: 'Dedicated Player',
        description: 'Play 10+ games',
        condition: 'Play 10+ games',
        reward: 50,
        unlocked: true,
        unlockedAt: new Date(),
      });
    }

    // Add new achievements and award coins
    newAchievements.forEach(achievement => {
      this.achievements.push(achievement);
      this.gameStats.coins += achievement.reward;
    });

    if (newAchievements.length > 0) {
      this.saveAchievements();
      this.saveGameStats();
    }
  }

  // Get current game stats
  getGameStats(): GameStats {
    return { ...this.gameStats };
  }

  // Get recent coin rewards
  getRecentRewards(limit: number = 10): CoinReward[] {
    return this.coinRewards.slice(0, limit);
  }

  // Get all achievements
  getAchievements(): GameAchievement[] {
    return [...this.achievements];
  }

  // Get game sessions
  getGameSessions(limit: number = 20): GameSession[] {
    return this.gameSessions.slice(0, limit);
  }

  // Get earning rates for different coins
  getCoinRates() {
    return { ...this.coinRates };
  }

  // Reset game stats (for testing)
  resetGameStats(): void {
    this.gameStats = {
      score: 0,
      coins: 100,
      level: 1,
      streak: 0,
      totalPlayTime: 0,
      gamesPlayed: 0,
      bestScore: 0,
    };
    this.saveGameStats();
  }

  // Local storage methods
  private loadGameStats(): GameStats {
    try {
      const stored = localStorage.getItem('gameStats');
      return stored ? JSON.parse(stored) : {
        score: 0,
        coins: 100,
        level: 1,
        streak: 0,
        totalPlayTime: 0,
        gamesPlayed: 0,
        bestScore: 0,
      };
    } catch {
      return {
        score: 0,
        coins: 100,
        level: 1,
        streak: 0,
        totalPlayTime: 0,
        gamesPlayed: 0,
        bestScore: 0,
      };
    }
  }

  private saveGameStats(): void {
    localStorage.setItem('gameStats', JSON.stringify(this.gameStats));
  }

  private loadCoinRewards(): CoinReward[] {
    try {
      const stored = localStorage.getItem('coinRewards');
      const rewards = stored ? JSON.parse(stored) : [];
      return rewards.map((reward: any) => ({
        ...reward,
        timestamp: new Date(reward.timestamp),
      }));
    } catch {
      return [];
    }
  }

  private saveCoinRewards(): void {
    localStorage.setItem('coinRewards', JSON.stringify(this.coinRewards));
  }

  private loadAchievements(): GameAchievement[] {
    try {
      const stored = localStorage.getItem('gameAchievements');
      const achievements = stored ? JSON.parse(stored) : [];
      return achievements.map((achievement: any) => ({
        ...achievement,
        unlockedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined,
      }));
    } catch {
      return [];
    }
  }

  private saveAchievements(): void {
    localStorage.setItem('gameAchievements', JSON.stringify(this.achievements));
  }

  private loadGameSessions(): GameSession[] {
    try {
      const stored = localStorage.getItem('gameSessions');
      const sessions = stored ? JSON.parse(stored) : [];
      return sessions.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
    } catch {
      return [];
    }
  }

  private saveGameSessions(): void {
    localStorage.setItem('gameSessions', JSON.stringify(this.gameSessions));
  }
} 