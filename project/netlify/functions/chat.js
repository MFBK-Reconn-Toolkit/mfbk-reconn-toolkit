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
    
    // Advanced message analysis for intelligent response manipulation
    const trimmedMessage = message.trim().toLowerCase();
    const messageLength = message.trim().length;
    
    // Comprehensive greeting detection
    const greetings = ['hi', 'hello', 'hey', 'hii', 'hiii', 'yo', 'sup'];
    const gratitude = ['thanks', 'thank you', 'thx', 'ty', 'appreciate'];
    const farewells = ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit'];
    const confirmations = ['ok', 'okay', 'yes', 'yep', 'yeah', 'sure', 'alright', 'no', 'nope'];
    const questions = ['what', 'who', 'how', 'why', 'when', 'where'];
    const actions = ['start', 'begin', 'go', 'help', 'info'];
    
    const isGreeting = greetings.some(g => trimmedMessage === g || trimmedMessage.startsWith(g + ' '));
    const isGratitude = gratitude.some(g => trimmedMessage.includes(g));
    const isFarewell = farewells.some(g => trimmedMessage.includes(g));
    const isConfirmation = confirmations.some(g => trimmedMessage === g);
    const isSimpleQuestion = questions.some(g => trimmedMessage.startsWith(g)) && messageLength < 20;
    const isAction = actions.some(g => trimmedMessage === g || trimmedMessage.includes(g));
    
    // Categorize message types
    const isSimpleGreeting = isGreeting || isGratitude || isFarewell || isConfirmation || isAction;
    const isShortMessage = messageLength < 30;
    const isComplexQuery = messageLength > 100;
    const isOSINTQuery = /\b(osint|reconnaissance|recon|subdomain|dns|google|dork|social|intel|scan|enum|vulnerability|malware|threat|investigation|forensic|security|hack|pentest|exploit)\b/i.test(trimmedMessage);
    
    console.log('Advanced message analysis:', {
      message: trimmedMessage,
      length: messageLength,
      categories: {
        isSimpleGreeting,
        isShortMessage,
        isComplexQuery,
        isOSINTQuery,
        isGreeting,
        isGratitude,
        isFarewell,
        isSimpleQuestion
      }
    });
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Dynamic token limits based on message analysis
    let maxTokens;
    if (isSimpleGreeting) {
      maxTokens = 30; // Very short for greetings
    } else if (isShortMessage && !isOSINTQuery) {
      maxTokens = 100; // Brief for general short messages
    } else if (isOSINTQuery && isShortMessage) {
      maxTokens = 200; // More detail for OSINT questions
    } else if (isComplexQuery) {
      maxTokens = 600; // Detailed for complex queries
    } else {
      maxTokens = 300; // Default moderate length
    }
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: maxTokens,
      },
    });

    console.log('Sending request to Gemini with', maxTokens, 'max tokens...');
    
    // Advanced prompt generation based on message analysis
    let prompt;
    
    if (isGreeting) {
      prompt = `Respond to this greeting: "${message}". Be brief and friendly. You are an OSINT AI Assistant. 1 sentence only.`;
    } else if (isGratitude) {
      prompt = `Respond to this thanks: "${message}". Be brief and encouraging. 1 sentence only.`;
    } else if (isFarewell) {
      prompt = `Respond to this farewell: "${message}". Be brief and professional. 1 sentence only.`;
    } else if (isConfirmation) {
      prompt = `Respond to this confirmation: "${message}". Be brief and guide them to ask OSINT questions. 1 sentence only.`;
    } else if (isSimpleQuestion && !isOSINTQuery) {
      prompt = `Answer this simple question: "${message}". You are an OSINT specialist. Keep to 2 sentences maximum. Be direct.`;
    } else if (isOSINTQuery && isShortMessage) {
      prompt = `You are an OSINT expert. Answer this OSINT question concisely: "${message}". 
      
      Requirements:
      - 2-3 sentences maximum
      - Provide specific tools or techniques
      - Be actionable and practical
      - No excessive formatting`;
    } else if (isComplexQuery && isOSINTQuery) {
      prompt = `You are an expert OSINT consultant. Provide comprehensive guidance for: "${message}".
      
      Structure your response:
      - 3-4 key points maximum
      - Specific tools and techniques
      - Step-by-step guidance
      - Keep under 300 words
      - Use simple bullet points only
      - No symbols or excessive formatting`;
    } else if (isComplexQuery) {
      prompt = `You are an OSINT expert. Help with this question: "${message}".
      
      Guidelines:
      - Keep under 250 words
      - 2-3 main points
      - Be practical and direct
      - Simple language only`;
    } else {
      prompt = `You are an OSINT specialist. Answer briefly: "${message}". 
      
      Keep response:
      - Under 150 words
      - 2-3 sentences maximum  
      - Direct and practical
      - No excessive formatting`;
    }

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiResponse = response.text();

    console.log('Received AI response, length:', aiResponse?.length);

    if (!aiResponse) {
      throw new Error('Empty response from AI model');
    }

    // Advanced response manipulation and cleaning
    console.log('Raw AI response length:', aiResponse?.length);
    
    // Phase 1: Remove all markdown and symbols
    aiResponse = aiResponse
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '') // Remove asterisks
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/`{1,3}/g, '') // Remove code blocks
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to plain text
      .replace(/^\s*[-•►▶🔸🔹]\s*/gm, '→ ') // Normalize all bullets to arrows
      .replace(/\n{3,}/g, '\n\n') // Reduce multiple line breaks
      .trim();

    // Phase 2: Remove all emojis and special symbols
    aiResponse = aiResponse
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/[📍🎯⚡🚀🔧🛡️🔍🌐📊💡⭐✅❌💭🤔📝📋🔗]/g, '')
      .replace(/⚠️/g, 'Warning: ')
      .replace(/ℹ️/g, 'Info: ')
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Phase 3: Intelligent length control based on message type
    if (isSimpleGreeting) {
      // Extract only the first sentence for greetings
      const firstSentence = aiResponse.split(/[.!?]/)[0];
      aiResponse = firstSentence + (firstSentence.length < aiResponse.length ? '.' : '');
    } else if (isShortMessage && !isOSINTQuery) {
      // Limit to first 2 sentences for non-OSINT short messages
      const sentences = aiResponse.split(/[.!?]+/).filter(s => s.trim().length > 0);
      aiResponse = sentences.slice(0, 2).join('. ') + '.';
    } else if (aiResponse.length > 500) {
      // Truncate overly long responses
      const sentences = aiResponse.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const maxSentences = isComplexQuery ? 5 : 3;
      aiResponse = sentences.slice(0, maxSentences).join('. ') + '.';
    }

    // Phase 4: Format for readability
    aiResponse = aiResponse
      .replace(/\n\s*\n/g, '\n\n') // Clean up spacing
      .replace(/→\s*→/g, '→') // Remove duplicate arrows
      .replace(/\.\s*\./g, '.') // Remove duplicate periods
      .trim();

    console.log('Processed AI response length:', aiResponse?.length);

    // Intelligent response formatting based on message analysis
    let formattedResponse;
    
    if (isSimpleGreeting || isGratitude || isFarewell || isConfirmation) {
      // Minimal response for social interactions
      formattedResponse = aiResponse.trim();
    } else if (isSimpleQuestion && !isOSINTQuery) {
      // Brief response for general questions
      formattedResponse = aiResponse.trim();
    } else if (isOSINTQuery && isShortMessage) {
      // OSINT questions get minimal security reminder
      formattedResponse = `${aiResponse}

Remember: Always ensure proper authorization before conducting reconnaissance.`;
    } else if (isComplexQuery && isOSINTQuery) {
      // Complex OSINT queries get comprehensive template
      formattedResponse = `${aiResponse}

Security Reminder: Always ensure proper authorization before conducting reconnaissance activities.

Essential OSINT Resources:
→ OSINT Framework (osintframework.com)
→ Intel Techniques (inteltechniques.com)
→ Bellingcat Toolkit

Use the tool categories above for specialized OSINT tools.`;
    } else if (isComplexQuery) {
      // Other complex queries get minimal template
      formattedResponse = `${aiResponse}

Tip: For specialized OSINT tools, check the categories above.`;
    } else {
      // Default: clean response without templates
      formattedResponse = aiResponse.trim();
    }

    // Final quality control and validation
    const responseLength = formattedResponse.length;
    const wordCount = formattedResponse.split(/\s+/).length;
    const sentenceCount = formattedResponse.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Ensure response meets quality standards
    if (isSimpleGreeting && responseLength > 100) {
      // Force very short responses for greetings
      const firstSentence = formattedResponse.split(/[.!?]/)[0];
      formattedResponse = firstSentence + '.';
    } else if (isShortMessage && responseLength > 200 && !isOSINTQuery) {
      // Limit non-OSINT short message responses
      const sentences = formattedResponse.split(/[.!?]+/).filter(s => s.trim().length > 0);
      formattedResponse = sentences.slice(0, 2).join('. ') + '.';
    }

    console.log('Final response quality check:', {
      category: isOSINTQuery ? 'OSINT' : isSimpleGreeting ? 'Greeting' : 'General',
      length: responseLength,
      words: wordCount,
      sentences: sentenceCount,
      tokenLimit: maxTokens,
      templateAdded: formattedResponse.includes('Security Reminder') || formattedResponse.includes('Remember:')
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        response: formattedResponse,
        session_id: `osint_${Date.now()}`,
        model: 'gemini-1.5-flash',
        timestamp: new Date().toISOString(),
        metadata: {
          messageType: isOSINTQuery ? 'osint' : isSimpleGreeting ? 'greeting' : 'general',
          responseLength: responseLength,
          wordCount: wordCount,
          maxTokens: maxTokens
        }
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
