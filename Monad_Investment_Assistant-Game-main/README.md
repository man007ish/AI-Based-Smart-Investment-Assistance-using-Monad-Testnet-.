# Monad Investment Assistant

A modern, AI-powered investment assistant web application built with React, TypeScript, and Tailwind CSS, integrated with the Monad testnet for blockchain interactions.

## 🚀 Features

### Core Functionality
- **Dashboard**: Overview of portfolio performance, market trends, and key metrics
- **Portfolio Management**: Track assets, buy/sell investments, and monitor P&L
- **Market Analysis**: Browse available investments with AI-powered recommendations
- **AI Analysis**: Get intelligent investment insights and portfolio optimization
- **Wallet Integration**: Connect to MetaMask and interact with Monad testnet

### AI-Powered Features
- **Investment Analysis**: AI-driven analysis of market data and trends
- **Portfolio Optimization**: Smart recommendations for portfolio rebalancing
- **Risk Assessment**: Automated risk evaluation and classification
- **Sentiment Analysis**: Market sentiment analysis for investment decisions

### Blockchain Integration
- **Monad Testnet**: Full integration with Monad blockchain testnet
- **Wallet Connection**: MetaMask integration for secure transactions
- **Transaction Management**: Send and track blockchain transactions
- **Balance Monitoring**: Real-time wallet balance and asset tracking

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Blockchain**: Ethers.js, Web3.js, Monad testnet
- **UI Components**: Lucide React icons, Framer Motion
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks and context

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monad-investment-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Monad Testnet Setup
The application is configured to work with the Monad testnet by default:

- **RPC URL**: `https://rpc.testnet.monad.xyz`
- **Chain ID**: 1337
- **Network Name**: Monad Testnet

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_MONAD_RPC_URL=https://rpc.testnet.monad.xyz
REACT_APP_CHAIN_ID=1337
REACT_APP_NETWORK_NAME=Monad Testnet
```

## 🎯 Usage

### Getting Started
1. **Connect Wallet**: Click "Connect Wallet" to link your MetaMask
2. **Explore Dashboard**: View your portfolio overview and market insights
3. **Browse Market**: Discover investment opportunities with AI recommendations
4. **Manage Portfolio**: Buy/sell assets and track performance
5. **AI Analysis**: Get intelligent insights and optimization suggestions

### Key Features

#### Dashboard
- Portfolio value and performance metrics
- Asset distribution visualization
- Top performers and risk assessment
- Real-time market data

#### Portfolio Management
- Asset tracking with P&L calculation
- Buy/sell functionality with transaction history
- Portfolio optimization recommendations
- Risk level monitoring

#### Market Analysis
- Comprehensive investment listings
- AI-powered recommendations
- Advanced filtering and sorting
- Market trend analysis

#### AI Analysis
- Investment-specific analysis
- Portfolio optimization suggestions
- Risk assessment and sentiment analysis
- Confidence scoring and factor identification

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and wallet connection
│   ├── Dashboard.tsx   # Main dashboard view
│   ├── Portfolio.tsx   # Portfolio management
│   ├── Market.tsx      # Market analysis
│   └── AIAnalysis.tsx  # AI-powered analysis
├── services/           # Business logic and API calls
│   ├── monadService.ts # Monad blockchain integration
│   └── aiService.ts    # AI analysis services
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 🔌 API Integration

### Monad Blockchain
- **Provider**: Ethers.js JsonRpcProvider
- **Network**: Monad testnet
- **Features**: Wallet connection, transaction sending, balance checking

### AI Services
- **Analysis Engine**: Simulated AI analysis with real-time processing
- **Portfolio Optimization**: Smart allocation recommendations
- **Risk Assessment**: Multi-factor risk evaluation

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 to #0EA5E9)
- **Monad**: Cyan gradient (#0EA5E9 to #0284C7)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Components
- **Cards**: Consistent card design with shadows and borders
- **Buttons**: Primary and secondary button styles
- **Forms**: Input fields with focus states
- **Tables**: Responsive data tables with hover effects

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 🔒 Security Considerations

- **Wallet Security**: Never store private keys in the application
- **Transaction Validation**: Always verify transaction details before signing
- **Network Security**: Use HTTPS in production environments
- **Data Privacy**: Implement proper data encryption for sensitive information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for demonstration purposes only. It is not financial advice and should not be used for actual investment decisions. Always consult with a qualified financial advisor before making investment decisions.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common questions
- Contact the development team

## 🔄 Updates

Stay updated with the latest features and improvements:
- Follow the repository for updates
- Check the changelog for version history
- Subscribe to release notifications

---

**Built with ❤️ for the Monad ecosystem** 