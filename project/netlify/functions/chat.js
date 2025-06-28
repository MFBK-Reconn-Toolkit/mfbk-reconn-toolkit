// Environment variables are automatically available in Netlify Functions

// Import the Google Generative AI module
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event, context) => {
  console.log('Chat function called:', event.httpMethod);

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Processing POST request...');
    
    // Parse request body
    const requestBody = JSON.parse(event.body || '{}');
    const { message } = requestBody;
    
    console.log('Received message:', message?.substring(0, 50) + '...');

    if (!message || typeof message !== 'string') {
      console.log('Invalid message format');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          status: 'error',
          error: 'Invalid request: message is required'
        }),
      };
    }

    // Get Gemini API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API key configured:', !!apiKey);
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          status: 'error',
          error: 'AI service not configured. Please contact support.'
        }),
      };
    }

    console.log('Initializing Gemini AI...');
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use gemini-1.5-flash model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      },
    });

    console.log('Sending request to Gemini...');
    
    // Enhanced OSINT prompt with clear formatting instructions
    const prompt = `You are an expert OSINT (Open Source Intelligence) and cybersecurity consultant. Please help with this question:

"${message}"

Guidelines for your response:
- Provide practical, actionable advice
- Use clear, simple language without excessive symbols or formatting
- Focus on specific tools, techniques, and methodologies
- Include step-by-step guidance when relevant
- Always emphasize ethical and legal compliance
- Keep the response professional and easy to read
- Use simple bullet points or numbered lists when needed
- Avoid complex symbols, asterisks, or heavy formatting

Please provide a comprehensive but easy-to-read response.`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiResponse = response.text();

    console.log('Received AI response, length:', aiResponse?.length);

    if (!aiResponse) {
      throw new Error('Empty response from AI model');
    }

    // Clean up the response - remove excessive symbols and improve readability
    aiResponse = aiResponse
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove asterisks
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/`{1,3}/g, '') // Remove code blocks
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to plain text
      .replace(/\n{3,}/g, '\n\n') // Reduce multiple line breaks
      .replace(/^\s+|\s+$/g, '') // Trim whitespace
      .replace(/•/g, '-') // Replace bullet points with simple dashes
      .replace(/►/g, '-') // Replace arrow bullets with dashes
      .replace(/▶/g, '-') // Replace play symbols with dashes
      .replace(/🔸/g, '-') // Replace diamond symbols with dashes
      .replace(/🔹/g, '-') // Replace diamond symbols with dashes
      .replace(/📍/g, '') // Remove location pins
      .replace(/🎯/g, '') // Remove target symbols
      .replace(/⚡/g, '') // Remove lightning symbols
      .replace(/🚀/g, '') // Remove rocket symbols
      .replace(/🔧/g, '') // Remove wrench symbols
      .replace(/🛡️/g, '') // Remove shield symbols
      .replace(/🔍/g, '') // Remove magnifying glass
      .replace(/🌐/g, '') // Remove globe symbols
      .replace(/📊/g, '') // Remove chart symbols
      .replace(/💡/g, '') // Remove lightbulb symbols
      .replace(/⭐/g, '') // Remove star symbols
      .replace(/✅/g, '') // Remove checkmarks
      .replace(/❌/g, '') // Remove X marks
      .replace(/⚠️/g, 'Warning:') // Replace warning symbol with text
      .replace(/ℹ️/g, 'Info:') // Replace info symbol with text
      .replace(/💭/g, '') // Remove thought bubbles
      .replace(/🤔/g, '') // Remove thinking face
      .replace(/📝/g, '') // Remove memo symbols
      .replace(/📋/g, '') // Remove clipboard symbols
      .replace(/🔗/g, '') // Remove link symbols
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Format clean response
    const formattedResponse = `OSINT Expert Assistant

${aiResponse}

Security Reminder: Always ensure you have proper authorization before conducting any reconnaissance activities. Follow ethical guidelines and respect privacy laws.

Essential OSINT Resources:
- OSINT Framework (osintframework.com) - Comprehensive tool directory
- Intel Techniques (inteltechniques.com) - Advanced investigation methods
- Bellingcat Toolkit - Online investigation tools
- OSINT Curious - Community resources and tutorials

Use the tool categories above to find specific OSINT tools for your investigation needs.`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        response: formattedResponse,
        session_id: `osint_${Date.now()}`,
        model: 'gemini-1.5-flash',
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);

    // Enhanced error handling
    let errorMessage = 'An unexpected error occurred while processing your request.';
    let statusCode = 500;

    if (error.message?.includes('API key') || error.message?.includes('401') || error.message?.includes('403')) {
      errorMessage = 'Authentication error. Please check API configuration.';
      statusCode = 401;
    } else if (error.message?.includes('quota') || error.message?.includes('429')) {
      errorMessage = 'Service temporarily unavailable due to high demand. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
      errorMessage = 'Network connection error. Please try again.';
      statusCode = 503;
    }

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        status: 'error',
        error: errorMessage,
        timestamp: new Date().toISOString(),
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
    };
  }
}; 
