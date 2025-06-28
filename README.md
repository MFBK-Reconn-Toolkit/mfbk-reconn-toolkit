# 🔥 MFBK-Reconn Toolkit

**Advanced Cybersecurity Intelligence Platform with AI-Powered Assistant**

A comprehensive OSINT reconnaissance toolkit featuring 1115+ cybersecurity tools, Google Gemini AI integration, and a modern React interface designed for security professionals, penetration testers, and researchers.

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.5.3-blue.svg)
![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4.svg)

## 🎯 What's In This Project

### 🔍 **Comprehensive Tool Database**
- **1115+ Cybersecurity Tools** organized in 9 major categories
- **Real-time Search & Filtering** with intelligent suggestions
- **Direct Tool Access** with working URLs and command examples
- **No Duplicates** - cleaned and verified database

### 🤖 **AI-Powered OSINT Assistant**
- **Google Gemini 1.5 Flash** integration for expert guidance
- **Floating Chat Interface** with advanced window management
- **Real-time OSINT Advice** and methodology recommendations
- **Ethical Guidelines** and best practices included

### 📱 **Modern User Interface**
- **Mobile-Responsive Design** optimized for all devices
- **Cyberpunk Theme** with professional dark interface
- **Advanced Animations** and smooth micro-interactions
- **Touch-Friendly Controls** for mobile and tablet users

### ⚡ **Performance Optimized**
- **Fast Loading** with optimized build system
- **Virtual Scrolling** for handling large tool datasets
- **Progressive Web App** capabilities
- **Intelligent Caching** for better performance

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Build System:** Vite 7.0 with advanced optimizations
- **AI Integration:** Google Generative AI SDK
- **Deployment:** Netlify with serverless functions
- **Icons:** React Icons + Lucide React
- **Animations:** Framer Motion

## 🗂️ Tool Categories

### 🔍 **OSINT & General Intelligence** (170+ Tools)
Complete OSINT frameworks, search engines, social media tools, and investigative platforms.

### 🌐 **Subdomain Enumeration** (100+ Tools)
Passive and active subdomain discovery, DNS enumeration, and certificate transparency tools.

### 🔧 **Network Intelligence & ASN** (80+ Tools)
BGP information, network mapping, IP analysis, and regional registry data.

### 🛡️ **DNS Intelligence** (90+ Tools)
DNS analysis tools, historical data, security monitoring, and advanced enumeration.

### 🏢 **Company Intelligence** (120+ Tools)
Business research, corporate data, professional networks, and competitive intelligence.

### ⚡ **CLI Tools & Commands** (200+ Tools)
Command-line utilities for Windows, Linux, and Kali with ready-to-use commands.

### 📧 **Email & Social Intelligence** (180+ Tools)
Email verification, social media monitoring, username enumeration, and people search.

### 🕸️ **Web Security & Testing** (250+ Tools)
Vulnerability scanners, web application testing, API tools, and security frameworks.

### 🔍 **Google Dorking & Search** (100+ Tools)
Advanced search operators, specialized databases, and document discovery techniques.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Google Gemini API key: [Get yours here](https://makersuite.google.com/app/apikey)

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mfbk-reconn-toolkit.git
cd mfbk-reconn-toolkit/project

# Install dependencies
npm install

# Start development server
npm run dev
# Access at: http://localhost:3000
```

### Environment Setup (Optional for local AI)
```bash
# Create .env.local file
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
```

## 🌐 Live Deployment

### Deploy to Netlify (Recommended)
1. **Push to GitHub** - Upload your code to a GitHub repository
2. **Connect Netlify** - Link your repository to Netlify
3. **Configure Build:**
   ```
   Build command: npm run build
   Publish directory: dist
   Functions directory: netlify/functions
   ```
4. **Add API Key:** Set `GEMINI_API_KEY` in environment variables
5. **Deploy!** - Your site will be live in minutes

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── ReconDashboard.tsx      # Main dashboard with tool display
│   │   ├── OSINTSearchBar.tsx      # Search and filtering interface
│   │   ├── ErrorBoundary.tsx       # Error handling component
│   │   └── chat/
│   │       └── AIAssistant.tsx     # AI chat assistant
│   ├── data/
│   │   └── toolCategories.ts       # Complete tool database (1115+ tools)
│   ├── services/
│   │   └── api.ts                  # API communication layer
│   ├── utils/
│   │   └── reconUtils.ts           # Utility functions
│   └── hooks/
│       └── usePerformance.ts       # Performance monitoring
├── netlify/
│   └── functions/
│       ├── chat.js                 # AI chat endpoint
│       └── health.js               # Service health check
├── public/
│   ├── favicon.png                 # Site favicon
│   ├── img.png                     # Brand logo
│   ├── manifest.json               # PWA configuration
│   ├── _headers                    # Security headers
│   └── _redirects                  # URL routing
└── package.json                    # Dependencies and scripts
```

## 🎮 Features & Usage

### 🔍 **Tool Discovery**
- **Browse by Category** - Explore tools organized by function
- **Smart Search** - Find tools by name, type, or description
- **Quick Access** - Copy commands and visit tool websites instantly
- **Mobile Friendly** - Full functionality on phones and tablets

### 🤖 **AI Assistant**
- **Expert Guidance** - Get OSINT methodology advice
- **Tool Recommendations** - AI suggests best tools for your needs
- **Ethical Compliance** - Always emphasizes legal and ethical practices
- **Real-time Help** - Ask questions and get immediate responses

### 📱 **Mobile Experience**
- **Touch Optimized** - Large buttons and touch-friendly interface
- **Responsive Layout** - Adapts to any screen size
- **Fast Performance** - Optimized for mobile networks
- **Offline Capable** - PWA features for offline access

## 🔒 Security & Privacy

### 🛡️ **Security Features**
- **No Data Collection** - Your searches and usage are private
- **Secure API Handling** - Environment variables protect sensitive keys
- **HTTPS Only** - All connections are encrypted
- **CSP Headers** - Content Security Policy prevents XSS attacks

### 🔐 **Privacy Protection**
- **No Tracking** - No analytics or user behavior monitoring
- **No Cookies** - No unnecessary data storage
- **Open Source** - Full transparency in code and functionality
- **GDPR Compliant** - Respects privacy regulations

## 🔧 Available Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Check code quality
npm start            # Build and preview (production simulation)
```

## 📊 What Makes This Different

### ✨ **Comprehensive Database**
Unlike scattered tool lists, we provide 1115+ tools in one organized, searchable interface.

### 🤖 **AI Integration**
Built-in expert AI assistant powered by Google Gemini for real-time OSINT guidance.

### 📱 **Mobile-First**
Fully responsive design that works perfectly on phones, tablets, and desktops.

### ⚡ **Performance**
Optimized for speed with virtual scrolling, lazy loading, and intelligent caching.

### 🔒 **Security**
Production-ready with security headers, HTTPS enforcement, and privacy protection.

## ⚠️ Ethical Use

**This tool is for authorized security testing and educational purposes only.**

### ✅ **Always Remember:**
- Obtain proper authorization before testing systems
- Respect privacy and data protection laws
- Use tools responsibly and ethically
- Follow your organization's security policies
- Report vulnerabilities through proper channels

## 🤝 Contributing

We welcome contributions to improve the toolkit:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/improvement`
3. **Commit** changes: `git commit -m 'Add improvement'`
4. **Push** to branch: `git push origin feature/improvement`
5. **Submit** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

### 🔗 **Links**
- **GitHub Repository**: https://github.com/YOUR_USERNAME/mfbk-reconn-toolkit
- **Issues & Bug Reports**: https://github.com/YOUR_USERNAME/mfbk-reconn-toolkit/issues
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

### 📧 **Contact**
- **Email**: mustafabanikhalaf772@gmail.com
- **Project Issues**: Use GitHub Issues for technical problems

---

## 🏆 **Ready to Use**

This toolkit is **production-ready** and includes everything you need:
- ✅ **1115+ Verified Tools** with working URLs
- ✅ **AI-Powered Assistant** for expert guidance  
- ✅ **Mobile-Responsive** design for any device
- ✅ **Security-First** approach with privacy protection
- ✅ **Easy Deployment** to Netlify or any hosting platform

**🚀 Deploy your OSINT toolkit today and start gathering intelligence responsibly!**

---

**⭐ Star this repository if it helps your security research!** 
