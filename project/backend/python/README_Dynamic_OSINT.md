# 🕵️ MFBK Dynamic OSINT AI v2.0 - Free Tier Optimized

## 🚀 **Next-Generation OSINT Intelligence Assistant**

Ultra-modern, dynamic OSINT chatbot powered by Google Gemini with:
- **Real-time streaming responses**
- **Dynamic context awareness** 
- **Free tier quota management**
- **Advanced OSINT prompt engineering**
- **Professional-grade capabilities**

## ⚡ **Free Tier Optimization**

This version is specifically optimized for Google Gemini's free tier:

### **Model Selection:**
- **Primary:** Gemini-1.5-Flash (15 requests/minute)
- **Backup:** Gemini-1.5-Flash (same model for consistency)
- **Previous:** Gemini-1.5-Pro (only 2 requests/minute)

### **Quota Limits:**
- **Requests:** 15 per minute, 1500 per day
- **Tokens:** Optimized prompts (4K max vs 8K)
- **Retry Logic:** Automatic exponential backoff

### **Smart Features:**
- **Simple Query Detection** - Lightweight responses for greetings
- **Intelligent Prompt Sizing** - Reduced tokens for free tier
- **Auto-Retry Logic** - Handles quota limits gracefully
- **Wait Recommendations** - Suggests optimal timing

## 🔧 **Installation & Setup**

### **1. Quick Install:**
```bash
# Run the installer
./install_dynamic_osint.bat

# Or manual install
pip install google-generativeai rich colorama
```

### **2. Set API Key:**
```bash
# Windows
set GEMINI_API_KEY=your_api_key_here

# Linux/Mac
export GEMINI_API_KEY=your_api_key_here
```

### **3. Launch:**
```bash
python dynamic_osint_ai.py
```

## 🎯 **Usage Tips for Free Tier**

### **Optimal Usage:**
- **Wait 5-10 seconds** between complex queries
- **Use simple greetings** for quick responses
- **Break down complex questions** into smaller parts
- **Avoid rapid-fire queries** to prevent quota hits

### **Query Examples:**
```
✅ Good: "Hi" (uses quick config)
✅ Good: "How to enumerate subdomains?"
✅ Good: "Social media OSINT techniques"

⚠️ Moderate: Very detailed complex analysis queries
❌ Avoid: Rapid consecutive complex queries
```

### **Error Handling:**
- **429 Quota Error:** Automatic retry with exponential backoff
- **Wait Times:** 20s, 40s, 80s between retries
- **Recovery:** Intelligent suggestions for optimization

## 🛠️ **Features**

### **OSINT Domains Covered:**
- **Subdomain Reconnaissance** - Subfinder, Amass, Assetfinder
- **Social Intelligence** - Sherlock, WhatsMyName, Maigret  
- **Network Reconnaissance** - Nmap, Masscan, Shodan
- **Web Intelligence** - Nuclei, HTTPx, Waybackurls

### **Dynamic Capabilities:**
- **Context-Aware Responses** - Adapts to query type
- **Expertise Level Detection** - Beginner/Intermediate/Expert
- **Tool Recommendations** - Smart suggestions based on query
- **Session Analytics** - Track usage and performance

### **Free Tier Management:**
- **Quota Monitoring** - Real-time limit tracking
- **Smart Retry Logic** - Exponential backoff on limits
- **Token Optimization** - Reduced prompts for efficiency
- **Usage Recommendations** - Tips for optimal free tier use

### **Enhanced Response Formatting:**
- **Clean Syntax** - Removes excessive stars (*), backticks (`), quotes (")
- **Professional Structure** - Standardized headers and sections
- **Smart Cleanup** - Automatic markdown remnant removal
- **Command Highlighting** - Clear formatting for OSINT commands
- **Better Readability** - Optimized spacing and visual flow

## 📊 **Commands**

```
🔍 [query]     - Ask any OSINT question
analytics      - View session analytics  
save          - Save session with metadata
help          - Show help information
quit          - Exit assistant
```

## ⚠️ **Quota Management**

### **Free Tier Limits:**
- **15 requests per minute** (Gemini-1.5-Flash)
- **1500 requests per day** 
- **Automatic retry** on quota exceeded
- **Exponential backoff** (20s → 40s → 80s)

### **Optimization Features:**
- **Simple Query Detection** - Uses fewer tokens
- **Intelligent Prompting** - Optimized for free tier
- **Error Recovery** - Graceful quota limit handling
- **Usage Tips** - Built-in guidance for efficiency

## 🚀 **Upgrade Path**

For higher usage, consider upgrading to paid tier:
- **Gemini-1.5-Pro:** 360 requests/minute
- **Higher token limits** 
- **Advanced features**
- **Priority processing**

Upgrade at: https://ai.google.dev/pricing

## 🛡️ **Ethical Guidelines**

- **Legal compliance** paramount
- **Authorization-only** investigations  
- **Privacy protection** protocols
- **Professional responsibility** standards
- **Responsible disclosure** practices

## 🎯 **Perfect for:**

- **Security professionals** learning OSINT
- **Students** studying cybersecurity
- **Bug bounty hunters** doing reconnaissance
- **Researchers** needing intelligence guidance
- **Anyone** interested in ethical information gathering

---

**Ready to become an OSINT expert with AI assistance? Start your dynamic intelligence journey today!** 🕵️‍♀️🚀 