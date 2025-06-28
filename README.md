# 🔥 MFBK-Reconn Toolkit

**Advanced Cybersecurity Intelligence Gathering Platform with AI**

A comprehensive reconnaissance toolkit featuring a modern React frontend with Google Gemini AI integration, designed for cybersecurity professionals, penetration testers, and security researchers.

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.5.3-blue.svg)
![Netlify](https://img.shields.io/badge/netlify-functions-00C7B7.svg)
![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-4285F4.svg)

## 🚀 Key Features

- **🤖 AI-Powered OSINT Expert** - Google Gemini 1.5 Flash integration with specialized cybersecurity knowledge
- **🔍 Advanced Tool Database** - 1115+ cybersecurity tools with intelligent search and filtering (Updated Jan 2025)
- **🌐 Real-time Subdomain Enumeration** - Comprehensive domain intelligence gathering
- **📊 Interactive Security Dashboard** - Modern, responsive UI with real-time analytics
- **🛡️ Professional OSINT Workflows** - Expert guidance and methodology recommendations
- **⚡ Production-Ready Deployment** - Optimized for Netlify with serverless functions
- **📱 Mobile-Responsive Design** - Full functionality across all devices
- **🎨 Cyberpunk-Themed Interface** - Immersive dark theme with floating AI assistant
- **🚀 Enhanced Performance** - Optimized build system with advanced caching and lazy loading

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for robust development
- **Tailwind CSS** for modern, responsive styling
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for professional iconography
- **Vite 7.0** for lightning-fast development and builds

### AI Integration
- **Google Gemini 1.5 Flash** for intelligent OSINT assistance
- **Netlify Functions** for serverless AI backend
- **Real-time chat interface** with expert cybersecurity knowledge

### Deployment
- **Netlify** for production hosting and CI/CD
- **PWA Support** with service workers and manifest
- **SEO Optimized** with meta tags and structured data
- **Advanced Security Headers** for production-grade security

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Git
- Netlify account (free)
- Google Gemini API key: [Get yours here](https://makersuite.google.com/app/apikey)

### 1. Clone & Install
```bash
git clone https://github.com/0xmfbk/mfbk-reconn-toolkit.git
cd mfbk-reconn-toolkit/project
npm install
```

### 2. Environment Setup
```bash
# Create environment file for local development (optional)
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
```

### 3. Development Server
```bash
# Start development server
npm run dev

# Access at: http://localhost:3000
```

### 4. Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Netlify Deployment (Recommended)

1. **Push to GitHub**
2. **Connect Netlify to your repository**
3. **Configure build settings:**
   ```yaml
   Build command: npm run build
   Publish directory: dist
   Functions directory: netlify/functions
   Node version: 18
   ```
4. **Add environment variable:**
   ```
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
5. **Deploy and enjoy!**

See our comprehensive [Deployment Guide](GITHUB_UPLOAD_GUIDE.md) for detailed instructions.

## 📁 Project Structure

```
project/
├── src/                          # React application source
│   ├── components/
│   │   ├── ReconDashboard.tsx    # Main dashboard component
│   │   ├── OSINTSearchBar.tsx    # Search and filtering interface
│   │   ├── ErrorBoundary.tsx     # Error handling boundary
│   │   └── chat/
│   │       └── AIAssistant.tsx   # AI-powered chat assistant
│   ├── data/
│   │   └── toolCategories.ts     # Complete tool database (1115+ tools)
│   ├── services/
│   │   └── api.ts                # API service for AI integration
│   ├── utils/
│   │   └── reconUtils.ts         # Utility functions
│   ├── hooks/
│   │   └── usePerformance.ts     # Custom performance hooks
│   ├── index.css                 # Global styles and animations
│   └── main.tsx                  # React application entry point
├── netlify/
│   ├── functions/
│   │   ├── chat.js               # AI chat serverless function
│   │   └── health.js             # Health check endpoint
│   └── netlify.toml              # Netlify configuration
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── favicon.png               # Site favicon
│   ├── img.png                   # Brand logo
│   ├── _headers                  # Security headers
│   ├── _redirects                # URL redirects
│   ├── robots.txt                # SEO crawler instructions
│   └── sitemap.xml               # SEO sitemap
├── backend/                      # Backend documentation and config
│   ├── python/                   # Python backend examples
│   └── requirements.txt          # Python dependencies
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # This file
```

## 🎯 Tool Categories

Our comprehensive database includes 1115+ cybersecurity tools across 9 major categories:

### 🔍 **OSINT & General Intelligence** (170+ Tools)
- Open Source Intelligence platforms and frameworks
- Social media monitoring and analysis tools
- Public records and data aggregation services
- Image analysis and reverse search engines
- Geolocation and mapping tools

### 🌐 **Subdomain Enumeration** (100+ Tools)
- Passive and active subdomain discovery
- Certificate transparency log mining
- DNS enumeration and analysis
- Subdomain takeover detection

### 🔧 **Network Intelligence & ASN** (80+ Tools)
- BGP routing information and analysis
- Network infrastructure mapping
- IP geolocation and reputation services
- Regional Internet Registry data

### 🛡️ **DNS Intelligence** (90+ Tools)
- Command-line DNS tools and utilities
- Historical DNS data and analysis
- DNS security and monitoring services
- Advanced DNS enumeration techniques

### 🏢 **Company Intelligence** (120+ Tools)
- Business information and corporate research
- Professional networks and employee data
- Competitive intelligence platforms
- Financial and regulatory filings

### ⚡ **CLI Tools & Commands** (200+ Tools)
- Windows, Linux, and Kali CLI tools
- Network scanning and analysis utilities
- Web security testing frameworks
- Automation and scripting tools

### 📧 **Email & Social Intelligence** (180+ Tools)
- Email verification and discovery services
- Social media monitoring and analysis
- Username enumeration across platforms
- People search and background checks

### 🕸️ **Web Security & Testing** (250+ Tools)
- Vulnerability scanners and assessment tools
- Web application security testing
- API testing and fuzzing tools
- Browser security and automation

### 🔍 **Google Dorking & Search** (100+ Tools)
- Advanced Google search operators
- Specialized search engines and databases
- Document and file discovery techniques
- Academic and research platforms

## 🤖 AI-Powered Features

### Expert OSINT Assistant
- **Intelligent Recommendations** - Get expert advice on tool selection and methodology
- **Real-time Guidance** - Step-by-step assistance for complex investigations
- **Best Practices** - Ethical compliance and OPSEC recommendations
- **Custom Workflows** - Tailored reconnaissance strategies for specific targets

### Advanced Capabilities
- **Natural Language Queries** - Ask complex questions in plain English
- **Contextual Understanding** - AI remembers conversation context for better assistance
- **Tool Integration** - Seamless recommendations with direct tool access
- **Methodology Guidance** - Learn proper OSINT techniques and frameworks

## 🚀 Performance Features

### Optimization
- **Virtual Scrolling** for handling large datasets (1115+ tools)
- **Intelligent Search** with debounced filtering and fuzzy matching
- **Lazy Loading** for optimal performance across devices
- **Progressive Web App** with offline capability
- **Advanced Caching** with service workers and CDN optimization

### User Experience
- **Dark Theme** with cyberpunk aesthetics
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Floating AI Assistant** with advanced window management
- **Real-time Search** with instant results and suggestions
- **Accessibility** features for inclusive design

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Utilities
npm run clean        # Clean node_modules and reinstall (Unix/Mac)
npm run clean-win    # Windows-specific clean command
npm start            # Build and preview (production simulation)
```

## 🌟 Recent Updates (v2.1.0)

### ✨ **New Features**
- **Enhanced Tool Database** - Added 115+ new tools with verified URLs
- **Duplicate Removal** - Cleaned database for better user experience
- **Mobile Optimization** - Complete mobile-responsive design overhaul
- **AI Assistant Improvements** - Enhanced conversation context and memory
- **Performance Boost** - 40% faster loading with optimized build system

### 🔧 **Technical Improvements**
- **Build System** - Updated to Vite 7.0 with advanced optimizations
- **Security** - Enhanced security headers and CSP policies
- **SEO** - Improved meta tags and structured data
- **Accessibility** - WCAG 2.1 AA compliance improvements

### 🎨 **UI/UX Enhancements**
- **Visual Effects** - Advanced animations and micro-interactions
- **Color Scheme** - Refined cyberpunk theme with better contrast
- **Typography** - Improved readability and hierarchy
- **Navigation** - Enhanced search and filtering capabilities

## 🔐 Security Features

### 🛡️ **Production Security**
- Content Security Policy (CSP) headers
- XSS and clickjacking protection
- Secure HTTPS enforcement
- API key protection via environment variables
- Input validation and sanitization

### 📊 **Privacy & Compliance**
- No user data collection or tracking
- GDPR and privacy-friendly design
- Ethical use guidelines and disclaimers
- Transparent data handling practices

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Roadmap

### 🔮 **Version 2.2.0 (Q2 2025)**
- [ ] Advanced threat intelligence integration
- [ ] Custom tool category creation
- [ ] Collaborative investigation workflows
- [ ] Enhanced AI models and capabilities
- [ ] Multi-language support (Spanish, French, German)
- [ ] Advanced export and reporting features

### 🎯 **Version 2.3.0 (Q3 2025)**
- [ ] Real-time collaboration features
- [ ] Advanced API integrations
- [ ] Custom dashboard creation
- [ ] Enterprise security features
- [ ] Mobile app development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Ethical Use Disclaimer

**IMPORTANT**: This tool is designed for educational purposes and authorized security testing only. Users must:

- Obtain proper authorization before testing any systems
- Comply with all applicable laws and regulations
- Use tools responsibly and ethically
- Respect privacy and data protection rights

The developers are not responsible for any misuse of this tool.

## 🙏 Acknowledgments

- **OWASP** for security testing methodologies and frameworks
- **ProjectDiscovery** for inspiration in tool design and architecture
- **Google AI** for providing advanced language model capabilities
- **Cybersecurity Community** for tool recommendations and feedback
- **Open Source Contributors** for continuous improvements

## 📞 Support & Resources

### 🔗 **Links**
- **🌐 Live Demo**: [Your Netlify URL]
- **📦 Repository**: https://github.com/0xmfbk/mfbk-reconn-toolkit
- **📚 Documentation**: [Project Wiki](https://github.com/0xmfbk/mfbk-reconn-toolkit/wiki)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/0xmfbk/mfbk-reconn-toolkit/issues)

### 💬 **Community**
- **GitHub Discussions** for questions and feature requests
- **Security Forums** for professional networking
- **OSINT Communities** for methodology discussions

### 📧 **Contact**
For professional inquiries or support: **mustafabanikhalaf772@gmail.com**

---

## 🏆 **Built with Excellence**

**🛡️ MFBK Security Research Team** | **🤖 Powered by Google Gemini AI** | **⚡ Deployed on Netlify**

> *"Making cybersecurity intelligence accessible to everyone"*

---

**⭐ If this project helped you, please consider giving it a star on GitHub!** 
