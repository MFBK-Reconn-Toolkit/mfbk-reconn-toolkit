# 🕵️ MFBK-Reconn OSINT AI Chatbot - Super Tuned & Dynamic

## 🚀 Overview

This is a **super-tuned**, **dynamic**, and **powerfully enhanced** OSINT AI chatbot built with Google Gemini 2.5-Pro, specifically engineered for cybersecurity reconnaissance and intelligence gathering. The system features advanced prompt engineering with 500+ specialized instructions, dynamic response tuning, and comprehensive MFBK toolkit integration.

## ⚡ Key Features

### 🎯 Super-Tuned Configuration
- **Temperature: 2.0** - Maximum creativity and dynamic responses
- **Thinking Budget: Unlimited (-1)** - Deep analysis and comprehensive reasoning
- **Advanced Prompt Engineering** - 500+ lines of specialized OSINT instructions
- **Dynamic Context Awareness** - Adapts responses based on query type and user expertise

### 🛠️ Advanced Capabilities
- **Real-time Query Analysis** - Automatically categorizes investigation types
- **Tool Recommendation Engine** - Suggests optimal MFBK tools for each scenario
- **Expertise Level Adaptation** - Tailors responses for Beginner/Intermediate/Expert users
- **Comprehensive OSINT Coverage** - Covers all major intelligence disciplines
- **Interactive CLI Interface** - Rich, colorful terminal interface with progress indicators

### 🔍 OSINT Specializations
- **Domain Intelligence** - Subdomain enumeration, DNS analysis, certificate investigation
- **Social Intelligence** - SOCMINT, profile correlation, behavioral analysis
- **Corporate Intelligence** - Business investigation, financial analysis, supply chain research
- **Email Intelligence** - Email enumeration, SMTP analysis, breach correlation
- **Network Analysis** - Port scanning, service fingerprinting, infrastructure mapping
- **Web Security** - Vulnerability assessment, application testing, technology identification
- **Geospatial Intelligence** - Location analysis, satellite imagery, physical security assessment
- **Dark Web Investigation** - Tor analysis, cryptocurrency tracking, underground monitoring

## 📋 Requirements

```bash
# Core dependencies
pip install google-genai colorama rich python-dotenv

# Optional advanced features (uncomment in requirements.txt as needed)
pip install beautifulsoup4 selenium requests-html
pip install cryptography python-nmap dnspython shodan
pip install Pillow exifread nltk spacy
```

## 🔧 Installation & Setup

1. **Clone and Navigate:**
```bash
cd project/backend/python
```

2. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

3. **Set API Key (Optional):**
```bash
# Option 1: Environment variable
export GEMINI_API_KEY="your_api_key_here"

# Option 2: Use the default hardcoded key
# The system uses: AIzaSyD64PilK4OUTO4Yd4D1IHWRPgylsTxwMVA
```

## 🚀 Usage

### Interactive Mode (Recommended)
```bash
python main.py
```

### Single Query Mode
```bash
python main.py --single
```

### Test Suite
```bash
python test_osint_ai.py
```

## 🎯 Example Queries

### Domain Intelligence
```
"How can I perform comprehensive subdomain enumeration for example.com?"
"What's the best approach for DNS reconnaissance using MFBK tools?"
"Show me certificate transparency techniques for domain investigation"
```

### Social Intelligence
```
"What are advanced social media intelligence gathering techniques?"
"How do I correlate usernames across multiple platforms?"
"Show me behavioral analysis methods for social media profiles"
```

### Corporate Intelligence
```
"How can I investigate a company's digital footprint comprehensively?"
"What are the best tools for corporate financial intelligence?"
"Show me supply chain analysis techniques for security assessment"
```

### Network Analysis
```
"What are advanced port scanning techniques with evasion?"
"How do I perform network infrastructure mapping?"
"Show me service fingerprinting and vulnerability detection methods"
```

## 🔄 Dynamic Response System

The AI automatically adapts its responses based on:

### Investigation Type Detection
- **Domain Intelligence** - Keywords: subdomain, dns, domain, certificate, ssl
- **Social Intelligence** - Keywords: social, people, person, username, profile
- **Corporate Intelligence** - Keywords: company, business, corporate, organization
- **Email Intelligence** - Keywords: email, contact, communication, smtp, breach
- **Network Analysis** - Keywords: network, ip, port, scan, nmap, shodan
- **Web Security** - Keywords: web, website, application, vulnerability, sql
- **Geospatial Intelligence** - Keywords: location, geo, map, satellite, coordinate
- **Dark Web Investigation** - Keywords: dark, tor, onion, underground, marketplace

### Complexity Level Adaptation
- **Beginner** - Keywords: basic, beginner, simple, easy, start, "how to", "what is"
- **Expert** - Keywords: advanced, expert, complex, sophisticated, enterprise, military
- **Intermediate** - Default level with balanced technical depth

### Tool Recommendations
The system automatically suggests the most relevant tools from the MFBK arsenal:

```python
tool_recommendations = {
    "domain_intelligence": ["Subfinder", "Amass", "DNSrecon", "crt.sh", "Censys"],
    "social_intelligence": ["Sherlock", "WhatsMyName", "Pipl", "Social Searcher"],
    "corporate_intelligence": ["Crunchbase", "OpenCorporates", "SEC EDGAR", "DomainTools"],
    "email_intelligence": ["Hunter.io", "VoilaNorbert", "H8mail", "EmailHippo"],
    "network_analysis": ["Nmap", "Masscan", "Shodan", "Censys", "ZoomEye"],
    "web_security": ["Nuclei", "Nikto", "SQLmap", "Burp Suite", "OWASP ZAP"],
    # ... and more
}
```

## 📊 Session Management

The system automatically tracks:
- **Session ID** - Unique identifier for each investigation
- **Investigation Type** - Automatically detected category
- **Complexity Level** - User expertise assessment
- **Tools Recommended** - Suggested MFBK tools
- **Response Content** - Full AI responses for reference

## 🛡️ Security & Ethics

### Built-in Ethical Framework
- ✅ **Legal Compliance** - All advice follows international cyber laws
- ✅ **Ethical Boundaries** - Professional responsibility standards
- ✅ **Authorization Only** - Emphasizes permission-based testing
- ✅ **Privacy Protection** - Data minimization principles
- ✅ **Professional Standards** - Industry best practices

### Never Provides
- ❌ Illegal hacking techniques
- ❌ Unauthorized access methods
- ❌ Personal information exposure
- ❌ Harassment or stalking methods
- ❌ Malicious exploits

## 🔧 Advanced Configuration

### Custom Temperature Settings
```python
# In main.py, modify the generation_config:
self.generation_config = types.GenerateContentConfig(
    temperature=2,  # 0.0-2.0 (2.0 = maximum creativity)
    thinking_config=types.ThinkingConfig(
        thinking_budget=-1,  # -1 = unlimited thinking
    ),
    max_output_tokens=8192,  # Adjust response length
    top_k=40,  # Token selection diversity
    top_p=0.95,  # Cumulative probability threshold
)
```

### Environment Variables
```bash
# Optional API key override
export GEMINI_API_KEY="your_custom_api_key"

# Optional model override
export GEMINI_MODEL="gemini-2.5-pro"
```

## 📈 Performance Optimization

### For Maximum Creativity (Current Default)
```python
temperature=2.0  # Maximum creativity and dynamic responses
thinking_budget=-1  # Unlimited deep analysis
```

### For Balanced Performance
```python
temperature=0.7  # Balanced creativity vs accuracy
thinking_budget=1000  # Limited thinking for faster responses
```

### For Precise Analysis
```python
temperature=0.1  # Minimal creativity, maximum precision
thinking_budget=500  # Quick analysis
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
python test_osint_ai.py
```

Test components:
- ✅ Query Analysis System
- ✅ Prompt Generation Engine
- ✅ API Connection & Authentication
- ✅ Live Response Demo

## 📝 API Integration

### Using as a Module
```python
from main import DynamicOSINTChatbot

# Initialize chatbot
chatbot = DynamicOSINTChatbot()

# Analyze query
analysis = chatbot.analyze_query("How do I enumerate subdomains?")

# Generate response
for chunk in chatbot.process_query("Your OSINT question here"):
    print(chunk, end="")
```

## 🔍 Example Output

```
🎯 Investigation Type: Domain Intelligence
📊 Complexity Level: Intermediate  
🛠️ Recommended Tools: Subfinder, Amass, DNSrecon

🤖 Generating super-tuned OSINT response...

🕵️ **EXECUTIVE INTELLIGENCE BRIEF**

For comprehensive subdomain enumeration against example.com, I recommend a multi-vector approach utilizing passive reconnaissance, active enumeration, and certificate transparency analysis...

**PRIMARY METHODOLOGY:**

1. **Passive Reconnaissance Phase:**
   ```bash
   # Using Subfinder for passive enumeration
   subfinder -d example.com -o subdomains.txt
   
   # Certificate transparency with crt.sh
   curl -s "https://crt.sh/?q=%.example.com&output=json" | jq -r '.[].name_value'
   ```

2. **Active Enumeration Phase:**
   ```bash
   # Advanced Amass enumeration
   amass enum -active -d example.com -config config.ini -o amass_results.txt
   
   # DNS bruteforcing with custom wordlist
   amass enum -brute -d example.com -w custom_wordlist.txt
   ```

[Response continues with detailed technical procedures...]
```

## 📚 Advanced Features

### Tool Chaining Examples
```python
# Automatic workflow suggestions
"For maximum coverage, chain Subfinder → Amass → DNSrecon → Certificate analysis"

# Integration strategies  
"Correlate subdomain results with Shodan for service identification"

# Custom automation
"Develop Python scripts to automate the entire reconnaissance pipeline"
```

### OPSEC Considerations
- Anonymous investigation techniques
- VPN and proxy chain configuration
- Evidence preservation methods
- Legal compliance frameworks

## 🤝 Contributing

This OSINT AI system is designed to be:
- **Educational** - Training the next generation of OSINT practitioners
- **Practical** - Providing actionable intelligence procedures
- **Ethical** - Maintaining professional responsibility standards
- **Innovative** - Advancing the field of intelligence gathering

## 📞 Support

For questions about the OSINT AI system:
1. Review the comprehensive prompt engineering in `main.py`
2. Run the test suite to verify functionality
3. Check the query analysis system for proper categorization
4. Ensure API key is properly configured

---

**⚠️ Legal Notice:** This tool is for authorized security testing and educational purposes only. Always ensure you have explicit permission before conducting any reconnaissance activities. Respect privacy rights and follow all applicable laws and regulations. 