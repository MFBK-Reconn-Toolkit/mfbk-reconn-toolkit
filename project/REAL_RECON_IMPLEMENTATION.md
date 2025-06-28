# Real Reconnaissance Implementation Guide

This project currently uses demo/mock data. Here's how to implement **REAL** reconnaissance functionality:

## Backend Implementation Options

### Option 1: Python Backend (Recommended)
Create a Flask/FastAPI backend that executes real tools:

```python
# backend/recon_engine.py
import subprocess
import json
import requests
from concurrent.futures import ThreadPoolExecutor

class ReconEngine:
    def __init__(self):
        self.results = {}
    
    def subdomain_enumeration(self, domain):
        """Real subdomain enumeration using multiple tools"""
        subdomains = set()
        
        # Subfinder
        try:
            result = subprocess.run(['subfinder', '-d', domain, '-silent'], 
                                 capture_output=True, text=True, timeout=300)
            subdomains.update(result.stdout.strip().split('\n'))
        except:
            pass
            
        # Certificate Transparency
        try:
            response = requests.get(f'https://crt.sh/?q=%.{domain}&output=json')
            for cert in response.json():
                subdomains.add(cert['name_value'])
        except:
            pass
            
        return list(filter(None, subdomains))
    
    def dns_lookup(self, domain):
        """Real DNS enumeration"""
        records = {}
        record_types = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT']
        
        for record_type in record_types:
            try:
                result = subprocess.run(['dig', '+short', domain, record_type],
                                     capture_output=True, text=True)
                if result.stdout.strip():
                    records[record_type] = result.stdout.strip().split('\n')
            except:
                pass
                
        return records
    
    def port_scan(self, target):
        """Real port scanning with nmap"""
        try:
            result = subprocess.run(['nmap', '-T4', '-F', target],
                                 capture_output=True, text=True, timeout=600)
            return result.stdout
        except:
            return "Port scan failed"
    
    def whois_lookup(self, domain):
        """Real WHOIS data"""
        try:
            result = subprocess.run(['whois', domain],
                                 capture_output=True, text=True)
            return result.stdout
        except:
            return "WHOIS lookup failed"
    
    def shodan_search(self, query, api_key):
        """Real Shodan API integration"""
        try:
            response = requests.get(f'https://api.shodan.io/shodan/host/search',
                                  params={'key': api_key, 'query': query})
            return response.json()
        except:
            return {}

# API endpoints
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/auto-recon', methods=['POST'])
def start_recon():
    data = request.json
    target = data['target']
    tasks = data['tasks']
    
    engine = ReconEngine()
    results = {}
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {}
        
        if 'subdomain_enum' in tasks:
            futures['subdomains'] = executor.submit(engine.subdomain_enumeration, target)
        if 'dns_lookup' in tasks:
            futures['dns'] = executor.submit(engine.dns_lookup, target)
        if 'port_scan' in tasks:
            futures['ports'] = executor.submit(engine.port_scan, target)
        if 'whois_lookup' in tasks:
            futures['whois'] = executor.submit(engine.whois_lookup, target)
            
        for key, future in futures.items():
            try:
                results[key] = future.result(timeout=300)
            except Exception as e:
                results[key] = f"Error: {str(e)}"
    
    return jsonify({'results': results})
```

### Option 2: Node.js Backend
```javascript
// backend/recon-server.js
const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();

app.post('/api/auto-recon', async (req, res) => {
    const { target, tasks } = req.body;
    const results = {};
    
    const execPromise = (command) => {
        return new Promise((resolve, reject) => {
            exec(command, { timeout: 300000 }, (error, stdout, stderr) => {
                if (error) reject(error);
                else resolve(stdout);
            });
        });
    };
    
    try {
        if (tasks.includes('subdomain_enum')) {
            results.subdomains = await execPromise(`subfinder -d ${target} -silent`);
        }
        
        if (tasks.includes('dns_lookup')) {
            results.dns_a = await execPromise(`dig +short ${target} A`);
            results.dns_mx = await execPromise(`dig +short ${target} MX`);
        }
        
        if (tasks.includes('port_scan')) {
            results.ports = await execPromise(`nmap -T4 -F ${target}`);
        }
        
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

## Required Tools Installation

### Linux/WSL Setup:
```bash
# Install reconnaissance tools
sudo apt update

# Subdomain enumeration
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/tomnomnom/assetfinder@latest

# DNS tools
sudo apt install dnsutils

# Port scanning
sudo apt install nmap

# WHOIS
sudo apt install whois

# Web tools
pip install requests beautifulsoup4 scrapy
```

### Docker Implementation:
```dockerfile
# Dockerfile
FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    golang-go \
    python3 \
    python3-pip \
    dnsutils \
    nmap \
    whois \
    curl \
    wget

# Install Go tools
RUN go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
RUN go install github.com/tomnomnom/assetfinder@latest

# Install Python tools
RUN pip3 install requests flask

COPY . /app
WORKDIR /app

CMD ["python3", "recon_server.py"]
```

## Real API Integrations

### 1. Certificate Transparency
```javascript
async function getCertificateTransparency(domain) {
    const response = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
    const certs = await response.json();
    return certs.map(cert => cert.name_value).filter(Boolean);
}
```

### 2. Shodan API
```javascript
async function shodanSearch(query, apiKey) {
    const response = await fetch(`https://api.shodan.io/shodan/host/search?key=${apiKey}&query=${query}`);
    return await response.json();
}
```

### 3. VirusTotal API
```javascript
async function virusTotalDomain(domain, apiKey) {
    const response = await fetch(`https://www.virustotal.com/vtapi/v2/domain/report?apikey=${apiKey}&domain=${domain}`);
    return await response.json();
}
```

### 4. Wayback Machine
```javascript
async function waybackMachine(url) {
    const response = await fetch(`https://web.archive.org/cdx/search/cdx?url=${url}&output=json&limit=100`);
    return await response.json();
}
```

## Frontend Integration

Replace the demo `handleAutoRecon` function:

```typescript
const handleAutoRecon = async (e: React.FormEvent) => {
    e.preventDefault();
    setAutoLoading(true);
    
    try {
        const response = await fetch('/api/auto-recon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                target: autoTarget, 
                tasks: autoTasks,
                options: {
                    shodan_api_key: process.env.REACT_APP_SHODAN_API_KEY,
                    virustotal_api_key: process.env.REACT_APP_VT_API_KEY
                }
            })
        });
        
        const data = await response.json();
        setAutoResults(data.results);
        
    } catch (error) {
        setAutoError('Real reconnaissance failed: ' + error.message);
    } finally {
        setAutoLoading(false);
    }
};
```

## Security Considerations

⚠️ **IMPORTANT WARNINGS:**

1. **Legal Compliance**: Only scan domains you own or have explicit permission to test
2. **Rate Limiting**: Implement proper rate limiting to avoid being banned
3. **API Keys**: Store API keys securely (environment variables, not in code)
4. **Input Validation**: Sanitize all user inputs to prevent command injection
5. **Timeouts**: Set appropriate timeouts for all operations
6. **Error Handling**: Implement comprehensive error handling

## Environment Setup

Create `.env` file:
```
SHODAN_API_KEY=your_shodan_api_key
VIRUSTOTAL_API_KEY=your_virustotal_api_key
BACKEND_URL=http://localhost:5000
```

## Getting Started

1. **Choose Backend**: Python Flask or Node.js Express
2. **Install Tools**: Use package managers or Docker
3. **Get API Keys**: Register for Shodan, VirusTotal, etc.
4. **Test Locally**: Start with safe domains you own
5. **Deploy Securely**: Use proper authentication and rate limiting

This transforms your UI into a **real reconnaissance platform** instead of just a demo! 