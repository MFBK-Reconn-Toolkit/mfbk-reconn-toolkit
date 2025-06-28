// Environment variables are automatically available in Netlify Functions

// Import the Google Generative AI module
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Check if Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    const isConfigured = !!apiKey;

    // Test basic Gemini API connectivity
    let apiStatus = 'unknown';
    let apiMessage = 'API key not configured';
    let modelInfo = null;

    if (isConfigured) {
      try {
        // Initialize the Google Generative AI client
        const genAI = new GoogleGenerativeAI(apiKey);

        // Test with gemini-1.5-flash model (working model)
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            maxOutputTokens: 50,
            temperature: 0.1,
            responseMimeType: 'text/plain',
          },
        });

        console.log('Testing Gemini 1.5 Flash connectivity...');

        // Perform a simple test request
        const result = await model.generateContent('Test connectivity: respond with "OSINT AI Ready"');
        const response = await result.response;
        const testResponse = response.text();

        if (testResponse && testResponse.length > 0) {
          apiStatus = 'healthy';
          apiMessage = 'Gemini 1.5 Flash API connection successful';
          modelInfo = {
            model: 'gemini-1.5-flash',
            response_preview: testResponse.substring(0, 50) + '...',
            response_time: 'Fast',
            provider: 'Google Generative AI'
          };
        } else {
          apiStatus = 'error';
          apiMessage = 'Empty response from Gemini API';
        }
      } catch (testError) {
        apiStatus = 'error';
        
        if (testError.message.includes('API key') || testError.message.includes('401') || testError.message.includes('403')) {
          apiMessage = 'API authentication failed - check API key';
        } else if (testError.message.includes('429')) {
          apiStatus = 'rate_limited';
          apiMessage = 'API rate limit exceeded';
        } else if (testError.message.includes('quota')) {
          apiMessage = 'API quota exceeded - check billing';
        } else {
          apiMessage = `API test failed: ${testError.message}`;
        }
        
        console.error('Health check API test failed:', testError.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'healthy',
        service: 'MFBK OSINT AI Assistant',
        model: 'gemini-1.5-flash',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        api_configured: isConfigured,
        api_status: apiStatus,
        api_message: apiMessage,
        model_info: modelInfo,
        features: {
          osint_analysis: true,
          threat_intelligence: true,
          reconnaissance_guidance: true,
          ethical_compliance: true,
          advanced_search_techniques: true,
          real_time_assistance: true
        },
        capabilities: [
          'Domain & Subdomain Analysis',
          'Social Media Intelligence (SOCMINT)',
          'Digital Footprint Analysis',
          'Corporate Intelligence Gathering',
          'Technical Reconnaissance',
          'OPSEC & Security Guidance',
          'Tool Recommendations & Methodology',
          'Ethical Compliance & Legal Boundaries',
          'Google Dorking & Search Techniques',
          'Certificate Transparency Analysis',
          'DNS & Infrastructure Intelligence',
          'Email & Contact Enumeration'
        ],
        technical_specs: {
          model: 'gemini-1.5-flash',
          provider: 'Google Generative AI',
          response_format: 'text/plain',
          max_tokens: 1500,
          temperature: 0.7,
          streaming: 'available',
          rate_limit: '60 requests/minute (free tier)'
        },
        links: {
          osint_framework: 'https://osintframework.com/',
          intel_techniques: 'https://inteltechniques.com/',
          bellingcat_toolkit: 'https://docs.google.com/spreadsheets/d/18rtqh8EG2q1xBo2cLNyhIDuK9jrPGwYr9DI2UncoqJQ/',
          osint_curious: 'https://osintcurio.us/'
        }
      }),
    };

  } catch (error) {
    console.error('Health check error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        service: 'MFBK OSINT AI Assistant',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
        api_configured: false,
        api_status: 'error',
        api_message: 'Service unavailable',
        model: 'gemini-1.5-flash'
      }),
    };
  }
}; 
