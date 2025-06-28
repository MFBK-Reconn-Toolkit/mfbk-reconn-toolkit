// Verification utilities for subdomain and directory checking
export const verifySubdomain = async (subdomain: string): Promise<{
  subdomain: string;
  status: 'Live' | 'Dead' | 'Error';
  responseCode: number | null;
  responseTime: number;
  ssl: boolean;
  redirect: string | null;
  server: string | null;
  title: string | null;
  verified: boolean;
  error: string | null;
}> => {
  const startTime = performance.now();
  
  try {
    // Try HTTPS first
    const httpsUrl = `https://${subdomain}`;
    const httpUrl = `http://${subdomain}`;
    
    let response: Response;
    let finalUrl = httpsUrl;
    let ssl = true;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      response = await fetch(httpsUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    } catch {
      // If HTTPS fails, try HTTP
      ssl = false;
      finalUrl = httpUrl;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      response = await fetch(httpUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
    }
    
    const responseTime = performance.now() - startTime;
    
    return {
      subdomain,
      status: response.ok ? 'Live' : 'Dead',
      responseCode: response.status,
      responseTime: Math.round(responseTime),
      ssl,
      redirect: response.redirected ? response.url : null,
      server: response.headers.get('server'),
      title: null, // Would need full response to extract title
      verified: true,
      error: null
    };
    
  } catch (error) {
    const responseTime = performance.now() - startTime;
    
    return {
      subdomain,
      status: 'Error',
      responseCode: null,
      responseTime: Math.round(responseTime),
      ssl: false,
      redirect: null,
      server: null,
      title: null,
      verified: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Batch verification with rate limiting
export const verifyBatch = async (
  items: string[],
  verifyFunction: (item: string, ...args: any[]) => Promise<any>,
  batchSize: number = 5,
  delay: number = 100,
  ...args: any[]
): Promise<any[]> => {
  const results: any[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPromises = batch.map(item => verifyFunction(item, ...args));
    
    try {
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults.map(result => 
        result.status === 'fulfilled' ? result.value : { error: 'Failed' }
      ));
    } catch (error) {
      // Add error results for failed batch
      results.push(...batch.map(() => ({ error: 'Batch failed' })));
    }
    
    // Add delay between batches to avoid overwhelming servers
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return results;
};

// Data cleaning and processing utilities
export const cleanResults = (data: string, type: string): string => {
  if (!data) return '';
  
  const lines = data.split('\n').filter(line => line.trim());
  
  switch (type) {
    case 'subdomain':
      return lines
        .filter(line => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(line.trim()))
        .map(line => line.trim().toLowerCase())
        .filter((line, index, arr) => arr.indexOf(line) === index) // Remove duplicates
        .sort()
        .join('\n');
        
    case 'ip':
      return lines
        .filter(line => /^(\d{1,3}\.){3}\d{1,3}$/.test(line.trim()))
        .filter((line, index, arr) => arr.indexOf(line) === index)
        .sort((a, b) => {
          const aParts = a.split('.').map(Number);
          const bParts = b.split('.').map(Number);
          for (let i = 0; i < 4; i++) {
            if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
          }
          return 0;
        })
        .join('\n');
        
    case 'url':
      return lines
        .filter(line => /^https?:\/\/.+/.test(line.trim()))
        .filter((line, index, arr) => arr.indexOf(line) === index)
        .sort()
        .join('\n');
        
    default:
      return lines
        .filter((line, index, arr) => arr.indexOf(line) === index)
        .sort()
        .join('\n');
  }
};

// Search and filtering utilities
export const performGlobalSearch = (query: string, categories: any[]) => {
  if (!query || !query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const results: any[] = [];
  
  categories.forEach(category => {
    const matchingTools = category.tools.filter((tool: any) => {
      try {
        // Safely check each property with null/undefined handling
        const nameMatch = tool.name && tool.name.toLowerCase().includes(searchTerm);
        const descriptionMatch = tool.description && tool.description.toLowerCase().includes(searchTerm);
        const typeMatch = tool.type && tool.type.toLowerCase().includes(searchTerm);
        const commandMatch = tool.command && tool.command.toLowerCase().includes(searchTerm);
        
        return nameMatch || descriptionMatch || typeMatch || commandMatch;
      } catch (error) {
        console.warn('Error searching tool:', tool, error);
        return false;
      }
    });
    
    if (matchingTools && matchingTools.length > 0) {
      results.push({
        category: category, // Pass the full category object, not just the title
        categoryId: category.id,
        tools: matchingTools,
        matchCount: matchingTools.length
      });
    }
  });
  
  return results;
};

// Generate search suggestions
export const generateSearchSuggestions = (query: string): string[] => {
  const suggestions = [
    'subdomain enumeration',
    'OSINT framework',
    'DNS reconnaissance', 
    'network scanning',
    'vulnerability assessment',
    'social media intelligence',
    'email investigation',
    'certificate transparency',
    'BGP analysis',
    'IP geolocation',
    'malware analysis',
    'threat intelligence',
    'digital forensics',
    'password security',
    'web application testing',
    'API security',
    'cloud security',
    'mobile security',
    'wireless security',
    'blockchain analysis',
    'nmap',
    'gobuster',
    'subfinder',
    'amass',
    'nuclei',
    'massdns',
    'httpx',
    'ffuf',
    'burp suite',
    'sublist3r'
  ];
  
  // Return empty array when no query - don't show suggestions on page load
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  const queryLower = query.toLowerCase().trim();
  
  try {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(queryLower)
    );
    
    return filtered.length > 0 ? filtered.slice(0, 8) : suggestions.slice(0, 5);
  } catch (error) {
    console.warn('Error generating search suggestions:', error);
    return suggestions.slice(0, 5);
  }
};

// Target validation utilities
export const validateTarget = async (target: string): Promise<{
  valid: boolean;
  type: 'domain' | 'ip' | 'url' | 'invalid';
  suggestions?: string[];
}> => {
  // Clean the target
  const cleanTarget = target.trim().toLowerCase();
  
  // Domain validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.([a-zA-Z]{2,}\.)*[a-zA-Z]{2,}$/;
  if (domainRegex.test(cleanTarget)) {
    return { valid: true, type: 'domain' };
  }
  
  // IP validation
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipRegex.test(cleanTarget)) {
    const parts = cleanTarget.split('.').map(Number);
    if (parts.every(part => part >= 0 && part <= 255)) {
      return { valid: true, type: 'ip' };
    }
  }
  
  // URL validation
  try {
    new URL(cleanTarget);
    return { valid: true, type: 'url' };
  } catch {}
  
  // Generate suggestions for invalid targets
  const suggestions = [];
  if (cleanTarget.includes('.')) {
    suggestions.push(`www.${cleanTarget}`);
    if (!cleanTarget.startsWith('http')) {
      suggestions.push(`https://${cleanTarget}`);
    }
  }
  
  return { 
    valid: false, 
    type: 'invalid',
    suggestions: suggestions.length > 0 ? suggestions : ['example.com', 'google.com', 'github.com']
  };
};

// Export utilities for HTML generation
export const generateHTMLReport = (results: any[], title: string): string => {
  const timestamp = new Date().toISOString();
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - MFBK Reconnaissance Report</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        .header h1 { margin: 0; font-size: 2.5rem; }
        .header p { margin: 0.5rem 0 0 0; opacity: 0.9; }
        .content { padding: 2rem; }
        .result-item {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            margin: 1rem 0;
            padding: 1rem;
            border-radius: 0 5px 5px 0;
        }
        .result-title { font-weight: bold; color: #2c3e50; margin-bottom: 0.5rem; }
        .result-data { 
            background: #ecf0f1;
            padding: 1rem;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
        }
        .stat-number { font-size: 2rem; font-weight: bold; display: block; }
        .stat-label { opacity: 0.9; }
        .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 1rem;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔥 MFBK Reconnaissance Report</h1>
            <p>${title} | Generated: ${new Date(timestamp).toLocaleString()}</p>
        </div>
        
        <div class="content">
            <div class="stats">
                <div class="stat-card">
                    <span class="stat-number">${results.length}</span>
                    <span class="stat-label">Total Results</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${new Date(timestamp).toLocaleDateString()}</span>
                    <span class="stat-label">Scan Date</span>
                </div>
            </div>
            
            ${results.map((result, index) => `
                <div class="result-item">
                    <div class="result-title">Result #${index + 1}: ${result.name || `Item ${index + 1}`}</div>
                    <div class="result-data">${result.data || JSON.stringify(result, null, 2)}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            Generated by MFBK-Reconn Toolkit | Professional OSINT Platform
        </div>
    </div>
</body>
</html>`;
}; 
