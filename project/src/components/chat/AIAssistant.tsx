import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaBrain, FaTimes, FaPaperPlane, FaSpinner, FaCopy, FaTrash, FaRobot, FaUser, FaDownload, FaLightbulb, FaSearch, FaCode, FaShieldAlt, FaNetworkWired, FaEye, FaCog, FaExpand, FaCompress, FaRedo, FaGripVertical, FaWindowRestore } from 'react-icons/fa';
import { apiService } from '../../services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface WindowState {
  width: number;
  height: number;
  x: number;
  y: number;
  viewMode: 'normal' | 'fullscreen';
  isMobile: boolean;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showSettings, setShowSettings] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Format assistant messages for better readability
  const formatAssistantMessage = (content: string): string => {
    return content
      // Format section headers (ALL CAPS followed by content)
      .replace(/^([A-Z\s&]+)$/gm, '<div class="font-bold text-cyan-300 mt-3 mb-2 text-sm">$1</div>')
      // Format step headers (Step X: Description)
      .replace(/^(Step \d+:?\s*[^\n]+)$/gm, '<div class="font-semibold text-white mt-2 mb-1">$1</div>')
      // Format arrow bullet points (→ Content)
      .replace(/^→\s*([^\n]+)$/gm, '<div class="flex items-start gap-2 ml-2 my-1"><span class="text-cyan-400 mt-0.5 flex-shrink-0">→</span><span class="text-slate-200">$1</span></div>')
      // Format regular bullet points (• Content)
      .replace(/^•\s*([^\n]+)$/gm, '<div class="flex items-start gap-2 ml-2 my-1"><span class="text-cyan-400 mt-0.5 flex-shrink-0">•</span><span class="text-slate-200">$1</span></div>')
      // Format status lines (Status: Content)
      .replace(/^(Status:?\s*[^\n]+)$/gm, '<div class="text-green-300 font-medium mt-3 text-sm">$1</div>')
      // Format question lines (ending with ?)
      .replace(/^([^\n]*\?)\s*$/gm, '<div class="text-cyan-200 font-medium mt-3">$1</div>')
      // Format lines that start with a capital letter and end with colon (section dividers)
      .replace(/^([A-Z][^:\n]*:)\s*$/gm, '<div class="font-semibold text-cyan-300 mt-3 mb-1 border-b border-slate-600/30 pb-1">$1</div>')
      // Convert line breaks to proper spacing
      .replace(/\n\n+/g, '<div class="my-2"></div>')
      .replace(/\n/g, '<br>')
      // Wrap everything in a container
      .replace(/^(.+)$/s, '<div class="text-slate-100 leading-relaxed">$1</div>');
  };

  // Detect mobile device with enhanced detection
  const isMobileDevice = () => {
    return window.innerWidth <= 768 || 
           window.innerHeight <= 600 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           'ontouchstart' in window ||
           navigator.maxTouchPoints > 0;
  };

  // Window state management with mobile detection
  const [windowState, setWindowState] = useState<WindowState>({
    width: 1000,
    height: 700,
    x: 0,
    y: 0,
    viewMode: 'normal',
    isMobile: false
  });

  // Quick action suggestions - mobile optimized
  const quickActions = [
    { icon: FaSearch, text: "Google Dorking", prompt: "Show me advanced Google dorking techniques for OSINT research" },
    { icon: FaNetworkWired, text: "Subdomain Enum", prompt: "Explain comprehensive subdomain enumeration strategies" },
    { icon: FaEye, text: "Social Intel", prompt: "How to gather intelligence from social media platforms ethically" },
    { icon: FaShieldAlt, text: "OPSEC Tips", prompt: "What are the essential OPSEC measures for reconnaissance?" },
    { icon: FaCode, text: "API Discovery", prompt: "How to discover and analyze APIs during reconnaissance" },
    { icon: FaBrain, text: "Threat Intel", prompt: "Explain threat intelligence gathering and analysis techniques" }
  ];

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = isMobileDevice();
      setWindowState(prev => {
        const newState = { ...prev, isMobile: mobile };
        
        if (mobile) {
          // Mobile: Compact size with better positioning
          const mobileWidth = Math.min(window.innerWidth - 16, 360); // Max 360px width with 8px margin each side
          const mobileHeight = Math.min(window.innerHeight - 80, 600); // Max 600px height with more top/bottom margin
          return {
            ...newState,
            width: mobileWidth,
            height: mobileHeight,
            x: (window.innerWidth - mobileWidth) / 2, // Center horizontally
            y: Math.max(60, (window.innerHeight - mobileHeight) / 2), // Center vertically with minimum top offset
            viewMode: 'normal'
          };
        } else if (prev.isMobile && !mobile) {
          // Switching from mobile to desktop
          return {
            ...newState,
            width: 1000,
            height: 700,
            x: (window.innerWidth - 1000) / 2,
            y: (window.innerHeight - 700) / 2,
            viewMode: 'normal'
          };
        }
        
        return newState;
      });
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load saved window preferences
  useEffect(() => {
    const savedState = localStorage.getItem('osint-chat-window-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Don't apply saved state on mobile
        if (!isMobileDevice()) {
          setWindowState(prev => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Failed to load window state:', error);
      }
    }
  }, []);

  // Save window state to localStorage (only for desktop)
  useEffect(() => {
    if (!windowState.isMobile) {
      localStorage.setItem('osint-chat-window-state', JSON.stringify(windowState));
    }
  }, [windowState]);

  // Initialize chatbot with enhanced welcome message
  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm your OSINT Intelligence Assistant, powered by Google Gemini 2.5 Pro. I'm here to help you with cybersecurity reconnaissance and intelligence gathering.

I specialize in several key areas:

INTELLIGENCE GATHERING
→ Web Intelligence: Deep web analysis and hidden data discovery
→ Social Intelligence: Multi-platform social media investigations
→ Corporate Intelligence: Business research and competitive analysis
→ Technical Intelligence: Infrastructure and security assessments

SECURITY & INVESTIGATION
→ Digital Footprinting: Comprehensive persona analysis
→ Vulnerability Assessment: Security posture evaluation
→ Legal Compliance: Ethical boundaries and regulations
→ Evidence Collection: Forensic documentation standards

AI CAPABILITIES
→ Real-time Analysis: Instant intelligent responses
→ Contextual Guidance: Situation-specific recommendations
→ Tool Integration: Direct access to 1000+ OSINT tools
→ Adaptive Learning: Personalized assistance

You can ask me about:
• Advanced Google dorking techniques
• Subdomain enumeration strategies  
• Social media intelligence gathering
• OPSEC best practices for investigators
• API discovery and analysis techniques
• Threat intelligence methodologies

Status: AI Model Active | Secure Connection | Ready for Analysis

What reconnaissance challenge can I help you solve today?`,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  }, [isOpen, chatMessages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollChatToBottom();
  }, [chatMessages]);

  // Focus input when opened (avoid on mobile to prevent keyboard issues)
  useEffect(() => {
    if (isOpen && inputRef.current && !windowState.isMobile) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, windowState.isMobile]);

  // Handle window positioning (desktop only)
  useEffect(() => {
    if (isOpen && windowRef.current && !windowState.isMobile) {
      if (windowState.x === 0 && windowState.y === 0) {
        // Center the window
        const centerX = (window.innerWidth - windowState.width) / 2;
        const centerY = (window.innerHeight - windowState.height) / 2;
        setWindowState(prev => ({ ...prev, x: centerX, y: centerY }));
      }
    }
  }, [isOpen, windowState.width, windowState.height, windowState.isMobile]);

  const scrollChatToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const setViewMode = (mode: WindowState['viewMode']) => {
    // On mobile, handle sizing differently
    if (windowState.isMobile) {
      if (mode === 'fullscreen') {
        // Mobile fullscreen uses most of the screen
        setWindowState(prev => ({ 
          ...prev, 
          viewMode: 'fullscreen',
          width: window.innerWidth - 8,
          height: window.innerHeight - 40,
          x: 4,
          y: 20
        }));
      } else {
        // Mobile normal is compact
        const mobileWidth = Math.min(window.innerWidth - 16, 360);
        const mobileHeight = Math.min(window.innerHeight - 80, 600);
        setWindowState(prev => ({ 
          ...prev, 
          viewMode: 'normal',
          width: mobileWidth,
          height: mobileHeight,
          x: (window.innerWidth - mobileWidth) / 2,
          y: Math.max(60, (window.innerHeight - mobileHeight) / 2)
        }));
      }
      return;
    }

    let newDimensions = { width: 1000, height: 700 };
    
    switch (mode) {
      case 'normal':
        newDimensions = { width: 1000, height: 700 };
        break;
      case 'fullscreen':
        newDimensions = { width: window.innerWidth, height: window.innerHeight };
        break;
    }

    setWindowState(prev => ({ 
      ...prev, 
      viewMode: mode,
      ...newDimensions,
      x: mode === 'fullscreen' ? 0 : (window.innerWidth - newDimensions.width) / 2,
      y: mode === 'fullscreen' ? 0 : (window.innerHeight - newDimensions.height) / 2
    }));
  };

  // Drag functionality (disabled on mobile)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.viewMode === 'fullscreen' || windowState.isMobile) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y
    });
  };

  // Touch support for dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (windowState.viewMode === 'fullscreen' || windowState.isMobile) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - windowState.x,
      y: touch.clientY - windowState.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || windowState.viewMode === 'fullscreen' || windowState.isMobile) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Constrain to viewport
    const maxX = window.innerWidth - windowState.width;
    const maxY = window.innerHeight - windowState.height;

    setWindowState(prev => ({
      ...prev,
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    }));
  }, [isDragging, dragStart, windowState.width, windowState.height, windowState.viewMode, windowState.isMobile]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || windowState.viewMode === 'fullscreen' || windowState.isMobile) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = window.innerWidth - windowState.width;
    const maxY = window.innerHeight - windowState.height;

    setWindowState(prev => ({
      ...prev,
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    }));
  }, [isDragging, dragStart, windowState.width, windowState.height, windowState.viewMode, windowState.isMobile]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Add event listeners for dragging (both mouse and touch)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const generateOSINTResponse = async (userInput: string): Promise<string> => {
    try {
      const response = await apiService.chatWithOSINTAI({
        message: userInput,
        session_id: `osint_${Date.now()}`
      });

      if (response.status === 'success' && response.response) {
        return response.response;
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      
      // Enhanced fallback response
      return `I'm experiencing connectivity issues, but I can still provide immediate OSINT guidance for your query.

Quick Analysis for: "${userInput}"

IMMEDIATE ACTION PLAN

Step 1: Passive Reconnaissance
→ Start with search engines using advanced operators
→ Check public records and databases  
→ Review social media and professional networks

Step 2: Essential Tools
→ Subdomain Discovery: Subfinder, Amass, Assetfinder
→ DNS Analysis: DNSrecon, Fierce, MXToolbox
→ Network Intelligence: Shodan, Censys, ZoomEye
→ OSINT Frameworks: Recon-ng, Maltego, SpiderFoot

Step 3: Security Reminders
→ Ensure proper authorization before investigation
→ Follow ethical guidelines and respect privacy
→ Document findings with proper attribution

Service Status: Reconnecting... Please try again shortly for detailed AI analysis.

You can use the tool categories above for immediate access to specialized OSINT tools.`;
    }
  };

  const simulateTyping = useCallback(async (message: string) => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: `typing-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    
    setChatMessages(prev => [...prev, typingMessage]);
    
    // Simulate typing delay based on message length
    const typingDelay = Math.min(Math.max(message.length * 20, 1000), 3000);
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    
    // Remove typing indicator and add real message
    setChatMessages(prev => {
      const filtered = prev.filter(msg => !msg.isTyping);
      return [
        ...filtered,
        {
          id: Date.now().toString(),
          role: 'assistant' as const,
          content: message,
          timestamp: new Date()
        }
      ];
    });
    
    setIsTyping(false);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const message = messageText || chatInput.trim();
    if (!message || isChatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await generateOSINTResponse(message);
      await simulateTyping(response);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = 'I encountered an error processing your request. Please try again or contact support if the issue persists.\n\nError has been logged for technical review.';
      await simulateTyping(errorMessage);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    setShowQuickActions(true);
  };

  const exportChat = () => {
    const chatContent = chatMessages
      .filter(msg => !msg.isTyping)
      .map(msg => `[${msg.timestamp.toLocaleString()}] ${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerateLastResponse = async () => {
    const lastUserMessage = [...chatMessages].reverse().find(msg => msg.role === 'user');
    if (lastUserMessage) {
      // Remove last assistant message
      setChatMessages(prev => {
        const lastAssistantIndex = prev.map(msg => msg.role).lastIndexOf('assistant');
        if (lastAssistantIndex !== -1) {
          return prev.slice(0, lastAssistantIndex);
        }
        return prev;
      });
      
      // Regenerate response
      setIsChatLoading(true);
      try {
        const response = await generateOSINTResponse(lastUserMessage.content);
        await simulateTyping(response);
      } catch (error) {
        const errorMessage = 'Failed to regenerate response. Please try again.';
        await simulateTyping(errorMessage);
      } finally {
        setIsChatLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  const windowStyle: React.CSSProperties = {
    width: windowState.width,
    height: windowState.height,
    transform: `translate(${windowState.x}px, ${windowState.y}px)`,
    transition: isDragging ? 'none' : 'all 0.3s ease',
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    // Add safe area support for mobile
    ...(windowState.isMobile && {
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      paddingLeft: 'env(safe-area-inset-left, 0px)',
      paddingRight: 'env(safe-area-inset-right, 0px)'
    })
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Enhanced backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/40 to-black/60 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
      ></div>
      
      {/* Main chat container */}
      <div 
        ref={windowRef}
        style={windowStyle}
        className={`bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border border-cyan-400/30 overflow-hidden pointer-events-auto flex flex-col ${
          windowState.isMobile && windowState.viewMode === 'fullscreen' ? 'rounded-none' : 
          windowState.isMobile ? 'rounded-2xl' : 'rounded-3xl'
        }`}
      >
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.1)_0%,transparent_50%)]"></div>
        </div>

        {/* Enhanced Header with Window Controls */}
        <div 
          ref={headerRef}
          className={`relative z-10 flex items-center justify-between border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 ${
            windowState.isMobile ? 'p-2.5 cursor-default' : 'p-4 cursor-move'
          }`}
          onMouseDown={windowState.isMobile ? undefined : handleMouseDown}
          onTouchStart={windowState.isMobile ? undefined : handleTouchStart}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl ${
                windowState.isMobile ? 'w-8 h-8' : 'w-10 h-10'
              }`}>
                <FaBrain className={`text-white animate-pulse ${windowState.isMobile ? 'text-sm' : 'text-lg'}`} />
              </div>
              <div className={`absolute -top-1 -right-1 bg-green-400 rounded-full animate-ping ${
                windowState.isMobile ? 'w-2 h-2' : 'w-3 h-3'
              }`}></div>
              <div className={`absolute -top-1 -right-1 bg-green-400 rounded-full ${
                windowState.isMobile ? 'w-2 h-2' : 'w-3 h-3'
              }`}></div>
            </div>
            <div>
              <h3 className={`text-white font-black tracking-wide ${
                windowState.isMobile ? 'text-base' : 'text-lg'
              }`}>OSINT AI Assistant</h3>
              <div className="flex items-center gap-2">
                <div className={`bg-green-400 rounded-full animate-pulse ${
                  windowState.isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
                }`}></div>
                <p className={`text-cyan-300 font-semibold ${
                  windowState.isMobile ? 'text-[10px]' : 'text-xs'
                }`}>Powered by Gemini 2.5 Pro • Online</p>
              </div>
            </div>
          </div>
          
          {/* Window Controls */}
          <div className={`flex items-center ${windowState.isMobile ? 'gap-1' : 'gap-2'}`}>
            {/* View Mode Selector - Mobile & Desktop */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110 ${
                  windowState.isMobile ? 'p-1.5 min-h-[32px] min-w-[32px]' : 'p-2'
                }`}
                title="Window settings"
              >
                <FaCog className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
              </button>
              
              {showSettings && (
                <div className={`absolute top-full right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl overflow-hidden z-50 ${
                  windowState.isMobile ? 'min-w-[160px]' : 'min-w-[200px]'
                }`}>
                  <div className={`border-b border-slate-700/50 ${windowState.isMobile ? 'p-2' : 'p-3'}`}>
                    <h4 className={`text-white font-bold ${windowState.isMobile ? 'text-xs' : 'text-sm'}`}>
                      {windowState.isMobile ? 'Size' : 'View Mode'}
                    </h4>
                  </div>
                  <div className={windowState.isMobile ? 'p-1' : 'p-2'}>
                    {[
                      { 
                        mode: 'normal' as const, 
                        label: windowState.isMobile ? 'Compact' : 'Normal', 
                        icon: FaWindowRestore 
                      },
                      { 
                        mode: 'fullscreen' as const, 
                        label: windowState.isMobile ? 'Large' : 'Fullscreen', 
                        icon: FaExpand 
                      }
                    ].map(({ mode, label, icon: Icon }) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setViewMode(mode);
                          setShowSettings(false);
                        }}
                        className={`w-full flex items-center gap-2 rounded-lg transition-all ${
                          windowState.isMobile ? 'p-1.5' : 'p-2 gap-3'
                        } ${
                          windowState.viewMode === mode
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                      >
                        <Icon className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
                        <span className={windowState.isMobile ? 'text-xs' : 'text-sm'}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Export Chat */}
            <button
              onClick={exportChat}
              className={`rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 ${
                windowState.isMobile ? 'p-2 min-h-[36px] min-w-[36px]' : 'p-2'
              }`}
              title="Export chat"
            >
              <FaDownload className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
            </button>
            
            {/* Clear Chat */}
            <button
              onClick={clearChat}
              className={`rounded-lg bg-slate-700/50 hover:bg-red-500/50 text-slate-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110 ${
                windowState.isMobile ? 'p-2 min-h-[36px] min-w-[36px]' : 'p-2'
              }`}
              title="Clear chat"
            >
              <FaTrash className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
            </button>
            
            {/* Close */}
            <button
              onClick={onClose}
              className={`rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-all duration-300 transform hover:scale-110 ${
                windowState.isMobile ? 'p-2 min-h-[36px] min-w-[36px]' : 'p-2'
              }`}
              title="Close assistant"
            >
              <FaTimes className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
            </button>
          </div>
        </div>

        {/* Drag Handle - Hide on mobile */}
        {windowState.viewMode !== 'fullscreen' && !windowState.isMobile && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600/50 rounded-b-full cursor-move" 
               onMouseDown={handleMouseDown}
               onTouchStart={handleTouchStart}></div>
        )}

        {/* Quick Actions */}
        {showQuickActions && chatMessages.length <= 1 && (
          <div className={`relative z-10 border-b border-slate-700/50 ${windowState.isMobile ? 'p-3' : 'p-4'}`}>
            <div className="flex items-center gap-2 mb-3">
              <FaLightbulb className={`text-yellow-400 ${windowState.isMobile ? 'text-xs' : 'text-sm'}`} />
              <span className={`text-white font-semibold ${windowState.isMobile ? 'text-xs' : 'text-sm'}`}>Quick Actions</span>
            </div>
            <div className={`grid gap-2 ${
              windowState.isMobile ? 'grid-cols-2' : 
              windowState.viewMode === 'normal' ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSendMessage(action.prompt);
                    setShowQuickActions(false);
                  }}
                  className={`flex items-center gap-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-cyan-500/20 hover:to-purple-500/20 border border-slate-600/40 hover:border-cyan-400/40 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                    windowState.isMobile ? 'p-2.5' : 'p-3'
                  }`}
                >
                  <action.icon className={`text-cyan-400 group-hover:animate-pulse flex-shrink-0 ${
                    windowState.isMobile ? 'text-xs' : 'text-sm'
                  }`} />
                  <span className={`text-slate-300 group-hover:text-white font-medium ${
                    windowState.isMobile ? 'text-xs' : 'text-xs'
                  }`}>{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Chat Messages */}
        <div className={`flex-1 overflow-y-auto space-y-3 chatbot-messages ${
          windowState.isMobile ? 'p-3' : 'p-4 space-y-4'
        }`}>
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in-bottom`}
            >
              <div className={`${windowState.isMobile ? 'max-w-[90%]' : 'max-w-[85%]'} ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-start ${windowState.isMobile ? 'gap-1.5' : 'gap-2'} ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    windowState.isMobile ? 'w-6 h-6' : 'w-8 h-8'
                  } ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600'
                  }`}>
                    {message.role === 'user' ? (
                      <FaUser className={`text-white ${windowState.isMobile ? 'text-[8px]' : 'text-xs'}`} />
                    ) : (
                      <FaRobot className={`text-white ${windowState.isMobile ? 'text-[8px]' : 'text-xs'}`} />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`relative group ${message.role === 'user' ? (windowState.isMobile ? 'mr-0.5' : 'mr-1') : (windowState.isMobile ? 'ml-0.5' : 'ml-1')}`}>
                    {message.isTyping ? (
                      <div className={`bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-xl border border-slate-500/40 rounded-2xl shadow-xl ${
                        windowState.isMobile ? 'p-2' : 'p-3'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className={`bg-cyan-400 rounded-full animate-bounce ${
                              windowState.isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
                            }`}></div>
                            <div className={`bg-cyan-400 rounded-full animate-bounce ${
                              windowState.isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
                            }`} style={{ animationDelay: '0.1s' }}></div>
                            <div className={`bg-cyan-400 rounded-full animate-bounce ${
                              windowState.isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'
                            }`} style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className={`text-slate-300 ${windowState.isMobile ? 'text-xs' : 'text-xs'}`}>AI thinking...</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`relative backdrop-blur-xl border shadow-xl transition-all duration-300 group-hover:shadow-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-cyan-600/90 to-blue-600/90 border-cyan-400/40 text-white rounded-2xl rounded-br-lg'
                            : 'bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-slate-500/40 text-slate-100 rounded-2xl rounded-bl-lg'
                        }`}
                      >
                        <div className={windowState.isMobile ? 'p-2.5' : 'p-3'}>
                          <div className={`whitespace-pre-wrap leading-relaxed ${
                            windowState.isMobile ? 'text-xs' : 
                            windowState.viewMode === 'fullscreen' ? 'text-base' : 'text-sm'
                          } ${
                            message.role === 'assistant' ? 'space-y-2' : ''
                          }`}>
                            {message.role === 'assistant' ? (
                              <div 
                                className="formatted-message"
                                dangerouslySetInnerHTML={{ 
                                  __html: formatAssistantMessage(message.content) 
                                }}
                              />
                            ) : (
                              message.content
                            )}
                          </div>
                          <div className={`flex items-center justify-between border-t ${
                            windowState.isMobile ? 'mt-1.5 pt-1.5' : 'mt-2 pt-2'
                          } ${
                            message.role === 'user' ? 'border-white/20' : 'border-slate-600/40'
                          }`}>
                            <div className={`opacity-70 ${windowState.isMobile ? 'text-[10px]' : 'text-xs'}`}>
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                            <div className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${
                              windowState.isMobile ? 'gap-0.5' : 'gap-1'
                            }`}>
                              <button
                                onClick={() => copyToClipboard(message.content)}
                                className={`rounded-lg transition-all hover:scale-110 ${
                                  windowState.isMobile ? 'p-0.5' : 'p-1'
                                } ${
                                  message.role === 'user' 
                                    ? 'hover:bg-white/20 text-white/70 hover:text-white' 
                                    : 'hover:bg-slate-600/50 text-slate-400 hover:text-slate-200'
                                }`}
                                title="Copy message"
                              >
                                <FaCopy className={windowState.isMobile ? 'text-[8px]' : 'text-xs'} />
                              </button>
                              {message.role === 'assistant' && (
                                <button
                                  onClick={regenerateLastResponse}
                                  className={`rounded-lg hover:bg-slate-600/50 text-slate-400 hover:text-slate-200 transition-all hover:scale-110 ${
                                    windowState.isMobile ? 'p-0.5' : 'p-1'
                                  }`}
                                  title="Regenerate response"
                                >
                                  <FaRedo className={windowState.isMobile ? 'text-[8px]' : 'text-xs'} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className={`relative z-10 border-t border-cyan-400/20 bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80 backdrop-blur-xl ${
          windowState.isMobile ? 'p-3' : 'p-4'
        }`}>
          <div className={`flex ${windowState.isMobile ? 'gap-2' : 'gap-3'}`}>
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                inputMode={windowState.isMobile ? "text" : undefined}
                autoCapitalize={windowState.isMobile ? "sentences" : undefined}
                autoCorrect={windowState.isMobile ? "on" : undefined}
                placeholder={windowState.isMobile ? "Ask about OSINT techniques..." : "Ask about OSINT techniques, tools, reconnaissance strategies..."}
                className={`w-full bg-slate-900/80 border-2 border-slate-600/40 focus:border-cyan-400/60 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none backdrop-blur-sm ${
                  windowState.isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'
                } ${
                  windowState.viewMode === 'fullscreen' && !windowState.isMobile ? 'text-base' : 'text-sm'
                }`}
                disabled={isChatLoading}
                rows={1}
                style={{ 
                  minHeight: windowState.isMobile ? '36px' : 
                  windowState.viewMode === 'fullscreen' ? '48px' : '40px' 
                }}
              />
              
              {/* Character count */}
              <div className={`absolute bottom-1 right-2 text-slate-500 ${
                windowState.isMobile ? 'text-[10px]' : 'text-xs'
              }`}>
                {chatInput.length}/1000
              </div>
            </div>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!chatInput.trim() || isChatLoading}
              className={`bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-xl hover:shadow-cyan-500/30 ${
                windowState.isMobile ? 'px-4 py-2 gap-1 min-w-[64px] min-h-[36px] text-xs' : 
                windowState.viewMode === 'fullscreen' ? 'px-6 py-3 gap-2 min-w-[100px]' : 'px-6 py-3 gap-2 min-w-[80px] text-sm'
              }`}
            >
              {isChatLoading ? (
                <>
                  <FaSpinner className={`animate-spin ${windowState.isMobile ? 'text-xs' : 'text-sm'}`} />
                  {(windowState.viewMode === 'fullscreen' && !windowState.isMobile) && <span>Sending...</span>}
                </>
              ) : (
                <>
                  <FaPaperPlane className={windowState.isMobile ? 'text-xs' : 'text-sm'} />
                  {(windowState.viewMode === 'fullscreen' && !windowState.isMobile) && <span>Send</span>}
                </>
              )}
            </button>
          </div>
          
          {/* Keyboard shortcuts - Hide on mobile */}
          {!windowState.isMobile && windowState.viewMode !== 'fullscreen' && (
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span>💡 <kbd className="px-1 py-0.5 bg-slate-700/50 rounded text-xs">Enter</kbd> to send</span>
                <span>🔄 <kbd className="px-1 py-0.5 bg-slate-700/50 rounded text-xs">Shift+Enter</kbd> for new line</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Resize Handles - Hide on mobile */}
        {windowState.viewMode !== 'fullscreen' && !windowState.isMobile && (
          <>
            {/* Corner resize handles */}
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity">
              <FaGripVertical className="text-slate-400 text-xs transform rotate-45" />
            </div>
            <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize opacity-50 hover:opacity-100 transition-opacity">
              <FaGripVertical className="text-slate-400 text-xs transform -rotate-45" />
            </div>
            <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize opacity-50 hover:opacity-100 transition-opacity">
              <FaGripVertical className="text-slate-400 text-xs transform -rotate-45" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant; 
