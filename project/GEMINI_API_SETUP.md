# 🤖 Google Gemini AI Integration Setup

## 🚀 Quick Setup Guide

Your MFBK-Reconn Toolkit now includes **Google Gemini Pro AI** integration for powerful OSINT intelligence analysis!

### 1. **Get Your Gemini API Key**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy your API key (starts with `AIza...`)

### 2. **Configure on Netlify (Production)**

**For Live Website:**

1. Go to your **Netlify Dashboard**
2. Navigate to: `Site Settings` → `Environment Variables`
3. Click **"Add Variable"**
4. Add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyC1NjASFJHGSDFGSHDFGSHDFHSDF...` (your actual key)
5. Click **"Save"**
6. **Redeploy** your site (triggers automatic rebuild)

### 3. **Configure for Local Development**

**Create `.env` file in project root:**

```bash
# .env
GEMINI_API_KEY=AIzaSyC1NjASFJHGSDFGSHDFGSHDFHSDF...
```

### 4. **Verify Setup**

1. **Deploy to Netlify** or run locally
2. **Open the chatbot** (floating hacker bot bottom-right)
3. **Send a test message:** `"How do I investigate a domain?"`
4. **Success:** You'll get intelligent OSINT guidance
5. **Failure:** Check error messages for troubleshooting

---

## 🔧 Troubleshooting

### ❌ "API configuration error"
- **Problem:** API key not set or invalid
- **Solution:** Double-check your `GEMINI_API_KEY` in Netlify environment variables

### ❌ "API authentication failed"
- **Problem:** Invalid API key format
- **Solution:** Regenerate API key at [Google AI Studio](https://makersuite.google.com/app/apikey)

### ❌ "Rate limit exceeded"
- **Problem:** Too many requests to Gemini API
- **Solution:** Wait 1-2 minutes, then try again. Consider upgrading your quota.

### ❌ "Network connection error"
- **Problem:** Netlify functions not deployed
- **Solution:** Ensure you've pushed all code and Netlify has rebuilt

---

## 🎯 Features Enabled

With Gemini AI configured, your OSINT Assistant can:

### **🕵️ Intelligence Analysis**
- Advanced OSINT methodology guidance
- Step-by-step investigation workflows
- Tool recommendations and usage tips
- Real-time threat intelligence insights

### **🔍 Reconnaissance Planning**
- Domain and subdomain enumeration strategies
- Social media intelligence (SOCMINT) techniques
- Corporate intelligence gathering methods
- Digital footprint analysis approaches

### **🛡️ Security & Ethics**
- OPSEC best practices and guidelines
- Legal compliance and ethical boundaries
- Evidence collection and documentation
- Privacy considerations and responsible disclosure

### **📊 Interactive Assistance**
- Natural language query processing
- Contextual OSINT recommendations
- Customized investigation roadmaps
- Real-time methodology adaptation

---

## 💡 Example Queries

Try these powerful queries once setup is complete:

```
"How do I investigate a company's digital footprint?"
"What are advanced Google dorking techniques for OSINT?"
"Show me subdomain enumeration strategies for penetration testing"
"How to gather email intelligence ethically and legally?"
"What OPSEC measures should I take during reconnaissance?"
"Explain certificate transparency for domain investigation"
"How to analyze social media for corporate intelligence?"
"What are the best tools for DNS enumeration?"
```

---

## 🔒 Security & Privacy

### **API Key Security**
- ✅ Never commit API keys to Git repositories
- ✅ Use environment variables only
- ✅ Rotate keys regularly (every 90 days)
- ✅ Monitor usage in Google Cloud Console

### **Data Privacy**
- ✅ Gemini API calls are made server-side (Netlify Functions)
- ✅ No chat history stored permanently
- ✅ Queries processed on Google's secure infrastructure
- ✅ No sensitive data logged or cached

### **Rate Limiting**
- 🎯 **Free Tier:** 60 requests per minute
- 🎯 **Paid Tier:** Higher limits available
- 🎯 **Smart Throttling:** Built-in rate limit handling

---

## 🎛️ Advanced Configuration

### **Custom Model Settings**

You can modify the AI behavior in `netlify/functions/chat.js`:

```javascript
generationConfig: {
  temperature: 0.7,        // Creativity (0.0-1.0)
  topK: 40,               // Token selection diversity
  topP: 0.95,             // Nucleus sampling
  maxOutputTokens: 2048,   // Response length
}
```

### **System Prompt Customization**

Edit the `OSINT_SYSTEM_PROMPT` in `netlify/functions/chat.js` to customize the AI's expertise and personality.

---

## 📈 Usage Analytics

### **Monitor API Usage**
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your API key to view usage metrics
4. Set up billing alerts if needed

### **Cost Management**
- **Free Tier:** 60 requests/minute (generous for most users)
- **Paid Tier:** $0.001 per 1K characters (very affordable)
- **Estimated Cost:** ~$5-10/month for heavy usage

---

## 🆘 Support

### **Issues with Setup?**
1. Check the **browser console** for error messages
2. Verify **Netlify function logs** in your dashboard
3. Test your **API key directly** at [Google AI Studio](https://makersuite.google.com/app/apikey)

### **Feature Requests**
- Enhanced conversation memory
- Custom OSINT tool integration
- Advanced threat intelligence feeds
- Multi-language support

---

## ✅ Checklist

- [ ] Created Gemini API key
- [ ] Added `GEMINI_API_KEY` to Netlify environment variables
- [ ] Deployed/redeployed site on Netlify
- [ ] Tested chatbot with sample query
- [ ] Verified intelligent responses are working
- [ ] Set up usage monitoring (optional)

**🎉 Once complete, you'll have a production-ready AI-powered OSINT assistant!** 