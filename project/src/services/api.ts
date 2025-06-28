// API Service for Netlify Functions Integration with Google Gemini AI

// Use Netlify Functions for production deployment
const NETLIFY_FUNCTIONS_URL = '/.netlify/functions';

// Legacy endpoints for backward compatibility (will use fallback)
const PYTHON_BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const GO_BACKEND_URL = import.meta.env.VITE_GO_API_URL || 'http://localhost:8080';

interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

interface OSINTChatRequest {
  message: string;
  session_id?: string;
}

interface OSINTChatResponse {
  status: 'success' | 'error';
  response?: string;
  session_id?: string;
  model?: string;
  timestamp?: string;
  error?: string;
}

interface HealthCheckResponse {
  status: 'healthy' | 'error';
  service: string;
  model: string;
  version: string;
  timestamp: string;
  api_configured: boolean;
  api_status: string;
  api_message: string;
  features: {
    osint_analysis: boolean;
    threat_intelligence: boolean;
    reconnaissance_guidance: boolean;
    ethical_compliance: boolean;
  };
  capabilities: string[];
}

interface ReconRequest {
  target: string;
  tasks: string[];
  options?: any;
}

interface SubdomainRequest {
  domain: string;
  wordlist?: string[];
  options?: any;
}

interface NetworkScanRequest {
  target: string;
  ports?: string;
  options?: any;
}

interface VulnerabilityScanRequest {
  target: string;
  scan_type?: string;
  options?: any;
}

class ApiService {
  private async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // OSINT AI Assistant APIs (Netlify Functions with Gemini)
  async chatWithOSINTAI(request: OSINTChatRequest): Promise<OSINTChatResponse> {
    return this.makeRequest(`${NETLIFY_FUNCTIONS_URL}/chat`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async checkOSINTAI(): Promise<boolean> {
    try {
      const response: HealthCheckResponse = await this.makeRequest(`${NETLIFY_FUNCTIONS_URL}/health`);
      return response.status === 'healthy' && response.api_status === 'healthy';
    } catch (error) {
      console.error('OSINT AI health check failed:', error);
      return false;
    }
  }

  async getOSINTHealthStatus(): Promise<HealthCheckResponse> {
    return this.makeRequest(`${NETLIFY_FUNCTIONS_URL}/health`);
  }

  // Legacy Python Backend APIs (with fallback simulation)
  async startReconnaissance(request: ReconRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${PYTHON_BACKEND_URL}/api/recon/start`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation for static deployment
      return {
        status: 'success',
        data: {
          task_id: `recon_sim_${Date.now()}`,
          message: 'Reconnaissance simulation started',
          simulation_mode: true
        }
      };
    }
  }

  async getReconnaissanceStatus(taskId: string): Promise<ApiResponse> {
    try {
      return this.makeRequest(`${PYTHON_BACKEND_URL}/api/recon/status/${taskId}`);
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          status: 'completed',
          simulation_mode: true,
          results: { message: 'Simulation completed' }
        }
      };
    }
  }

  async enumerateSubdomains(request: SubdomainRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${PYTHON_BACKEND_URL}/api/subdomain/enumerate`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          subdomains: [`www.${request.domain}`, `mail.${request.domain}`, `ftp.${request.domain}`],
          simulation_mode: true
        }
      };
    }
  }

  async scanNetwork(request: NetworkScanRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${PYTHON_BACKEND_URL}/api/network/scan`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          open_ports: ['80', '443', '22'],
          simulation_mode: true
        }
      };
    }
  }

  async scanVulnerabilities(request: VulnerabilityScanRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${PYTHON_BACKEND_URL}/api/vulnerability/scan`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          vulnerabilities: [],
          message: 'No critical vulnerabilities found (simulation)',
          simulation_mode: true
        }
      };
    }
  }

  async getAvailableTools(): Promise<ApiResponse> {
    try {
      return this.makeRequest(`${PYTHON_BACKEND_URL}/api/tools/available`);
    } catch (error) {
      // Fallback with static tool list
      return {
        status: 'success',
        data: {
          tools: ['subfinder', 'nmap', 'nikto', 'dirb'],
          simulation_mode: true
        }
      };
    }
  }

  // Go Backend APIs (with fallback simulation)
  async enumerateSubdomainsGo(request: SubdomainRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${GO_BACKEND_URL}/api/subfinder/enumerate`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          subdomains: [`api.${request.domain}`, `cdn.${request.domain}`, `admin.${request.domain}`],
          simulation_mode: true
        }
      };
    }
  }

  async scanPortsGo(request: NetworkScanRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${GO_BACKEND_URL}/api/naabu/scan`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          open_ports: ['80', '443', '8080', '8443'],
          simulation_mode: true
        }
      };
    }
  }

  async scanVulnerabilitiesGo(request: VulnerabilityScanRequest): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${GO_BACKEND_URL}/api/nuclei/scan`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          vulnerabilities: ['info: SSL certificate information', 'low: HTTP security headers missing'],
          simulation_mode: true
        }
      };
    }
  }

  async probeHttpGo(request: { urls: string[] }): Promise<ApiResponse> {
    try {
      return this.makeRequest(
        `${GO_BACKEND_URL}/api/httpx/probe`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          live_urls: request.urls.slice(0, 2),
          simulation_mode: true
        }
      };
    }
  }

  async getAvailableGoTools(): Promise<ApiResponse> {
    try {
      return this.makeRequest(`${GO_BACKEND_URL}/api/tools/available`);
    } catch (error) {
      // Fallback simulation
      return {
        status: 'success',
        data: {
          tools: ['subfinder', 'naabu', 'nuclei', 'httpx'],
          simulation_mode: true
        }
      };
    }
  }

  // Backend Health Checks
  async checkPythonBackend(): Promise<boolean> {
    try {
      const response = await fetch(`${PYTHON_BACKEND_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async checkGoBackend(): Promise<boolean> {
    try {
      const response = await fetch(`${GO_BACKEND_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Legacy OSINT AI methods (for backward compatibility)
  async getOSINTSession(sessionId?: string): Promise<any> {
    // Redirect to new Gemini-powered health check
    return this.getOSINTHealthStatus();
  }

  async exportOSINTSession(request: { session_id: string; format: string }): Promise<any> {
    // Future implementation for session export
    return {
      status: 'success',
      data: { message: 'Export functionality coming soon with Gemini integration' }
    };
  }

  async clearOSINTSession(sessionId: string): Promise<any> {
    // Sessions are stateless with Gemini API
    return {
      status: 'success',
      data: { message: 'Session cleared (Gemini API is stateless)' }
    };
  }

  async getOSINTCapabilities(): Promise<any> {
    // Return capabilities from health check
    try {
      const health = await this.getOSINTHealthStatus();
      return {
        status: 'success',
        data: {
          capabilities: health.capabilities,
          features: health.features,
          model: health.model
        }
      };
    } catch (error) {
      return {
        status: 'error',
        error: 'Unable to fetch capabilities'
      };
    }
  }

  // WebSocket connection (future enhancement)
  createWebSocketConnection(): WebSocket | null {
    try {
      // For now, return null as we're using HTTP-based Gemini API
      // Future enhancement could add WebSocket support
      return null;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      return null;
    }
  }

  // Enhanced error handling
  async retryRequest(requestFn: () => Promise<any>, maxRetries: number = 3): Promise<any> {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }
    
    throw lastError;
  }
}

// Export singleton instance
export const apiService = new ApiService(); 