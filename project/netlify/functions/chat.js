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

    // Use gemini-1.5-flash model with dynamic token limits
    const maxTokens = isSimpleGreeting ? 50 : isShortMessage ? 150 : 800;
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: maxTokens,
      },
    });

    console.log('Sending request to Gemini...');
    
    // Detect simple greetings and short responses
    const isSimpleGreeting = /^(hi|hello|hey|thanks|thank you|bye|goodbye|ok|okay|yes|no|what|who|start|begin)$/i.test(message.trim());
    const isShortMessage = message.trim().length < 30;
    
    console.log('Message analysis:', {
      message: message.trim(),
      isSimpleGreeting,
      isShortMessage,
      length: message.trim().length
    });
    
    let prompt;
    
    if (isSimpleGreeting) {
      prompt = `Respond very briefly to this greeting: "${message}". Keep it to 1-2 sentences maximum. You are an OSINT AI Assistant.`;
    } else if (isShortMessage) {
      prompt = `You are an OSINT expert. Answer this briefly in 2-3 sentences maximum: "${message}". Be direct and concise.`;
    } else {
      prompt = `You are an expert OSINT (Open Source Intelligence) consultant. Help with this question: "${message}". 

Guidelines:
- Keep response under 400 words
- Be practical and actionable
- Use simple language
- Avoid excessive symbols or formatting
- Provide 2-3 key points maximum

Be concise and helpful.`;
    }

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

    // Format response based on input type - NO MORE STATIC TEMPLATES
    let formattedResponse;
    
    if (isSimpleGreeting) {
      // Simple greetings get minimal response
      formattedResponse = aiResponse.trim();
    } else if (isShortMessage) {
      // Short messages get brief response without boilerplate
      formattedResponse = aiResponse.trim();
    } else {
      // Only complex OSINT queries get the full template
      formattedResponse = `${aiResponse}

Security Reminder: Always ensure proper authorization before conducting reconnaissance activities.

Essential OSINT Resources:
- OSINT Framework (osintframework.com)
- Intel Techniques (inteltechniques.com)
- Bellingcat Toolkit

Use the tool categories above for specific OSINT tools.`;
    }

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
