import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaSearch, FaSatellite, FaCrosshairs, FaRocket, FaLayerGroup, FaMagic, FaBolt, FaShieldAlt, FaHandSparkles, FaKeyboard, FaMobile, FaTabletAlt, FaDesktop } from 'react-icons/fa';

interface OSINTSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
  showSuggestions: boolean;
  onSuggestionsToggle: (show: boolean) => void;
}

// Enhanced mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent.toLowerCase();
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      const mobileConditions = [
        width <= 768,
        height <= 600,
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
        hasTouch && width <= 1024,
        navigator.maxTouchPoints > 1
      ];
      
      setIsMobile(mobileConditions.some(condition => condition));
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('orientationchange', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, []);

  return isMobile;
};

const OSINTSearchBar: React.FC<OSINTSearchBarProps> = ({
  searchValue,
  onSearchChange,
  suggestions,
  onSuggestionSelect,
  showSuggestions,
  onSuggestionsToggle
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showMobileHints, setShowMobileHints] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Handle typing indicator
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Auto-focus on mount (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // AI-powered intelligent suggestions with enhanced relevance scoring
  const aiSuggestions = useMemo(() => {
    if (!searchValue || searchValue.length < 2) return [];
    
    const searchLower = searchValue.toLowerCase();
    const suggestionSets = [
      // Intelligence gathering
      ...(searchLower.includes('osint') || searchLower.includes('intel') ? [
        'shodan.io reconnaissance', 'pipl people search', 'maltego transforms', 'theHarvester email',
        'recon-ng modules', 'spiderfoot automation', 'amass subdomain', 'subfinder enumeration'
      ] : []),
      
      // Social media intelligence
      ...(searchLower.includes('social') || searchLower.includes('media') ? [
        'sherlock username', 'twint twitter', 'instagram osint', 'linkedin intelligence',
        'facebook dorking', 'tiktok analysis', 'telegram monitoring'
      ] : []),
      
      // Network reconnaissance
      ...(searchLower.includes('network') || searchLower.includes('scan') ? [
        'nmap network scan', 'masscan fast scan', 'zmap internet scan', 'rustscan speed',
        'naabu port discovery', 'httpx web probe', 'nuclei vulnerability'
      ] : []),
      
      // Domain and subdomain analysis
      ...(searchLower.includes('domain') || searchLower.includes('subdomain') ? [
        'subfinder passive', 'assetfinder domains', 'findomain discovery', 'knockpy enumeration',
        'sublist3r gathering', 'crt.sh certificates', 'chaos subdomain'
      ] : []),
      
      // Google dorking and search techniques
      ...(searchLower.includes('google') || searchLower.includes('dork') ? [
        'site: operator', 'filetype: search', 'intitle: technique', 'inurl: method',
        'cache: operator', 'related: search', 'info: command'
      ] : []),
      
      // Email and communication intelligence
      ...(searchLower.includes('email') || searchLower.includes('mail') ? [
        'hunter.io email finder', 'clearbit connect', 'email permutator', 'email verification',
        'breach database search', 'email header analysis'
      ] : []),
      
      // Web application testing
      ...(searchLower.includes('web') || searchLower.includes('app') ? [
        'burp suite professional', 'owasp zap proxy', 'gobuster directory', 'dirb brute force',
        'ffuf fuzzer', 'wfuzz web fuzzer', 'nikto scanner'
      ] : [])
    ];

    return suggestionSets
      .filter(suggestion => 
        suggestion.toLowerCase().includes(searchLower) ||
        searchLower.split(' ').some(term => suggestion.toLowerCase().includes(term))
      )
      .slice(0, 8)
      .map(suggestion => suggestion.charAt(0).toUpperCase() + suggestion.slice(1));
  }, [searchValue]);

  const allSuggestions = [...new Set([...suggestions, ...aiSuggestions])].slice(0, 6);

  // Enhanced keyboard shortcuts (moved after allSuggestions declaration)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Arrow key navigation for suggestions
      if (showSuggestions && allSuggestions.length > 0) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev < allSuggestions.length - 1 ? prev + 1 : 0
          );
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : allSuggestions.length - 1
          );
        } else if (event.key === 'Enter' && selectedSuggestionIndex >= 0) {
          event.preventDefault();
          onSuggestionSelect(allSuggestions[selectedSuggestionIndex]);
          setSelectedSuggestionIndex(-1);
        }
      }
      
      // Escape to clear search and blur
      if (event.key === 'Escape') {
        if (searchValue) {
          onSearchChange('');
        } else {
          searchInputRef.current?.blur();
        }
        onSuggestionsToggle(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchValue, onSearchChange, onSuggestionsToggle, showSuggestions, allSuggestions, selectedSuggestionIndex, onSuggestionSelect]);

  // Reset selected suggestion index when suggestions change
  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [allSuggestions]);

  const handleFocus = () => {
    setIsFocused(true);
    onSuggestionsToggle(true);
    if (isMobile) {
      setShowMobileHints(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      onSuggestionsToggle(false);
      setShowMobileHints(false);
    }, 200);
  };

  // Quick action categories for OSINT workflow
  const quickActions = [
    { label: '9 Categories', color: 'from-purple-500 to-pink-600', icon: FaHandSparkles },
    { label: 'Pro Intelligence', color: 'from-green-500 to-emerald-600', icon: FaDesktop },
    { label: 'Real-time Data', color: 'from-orange-500 to-red-600', icon: FaMobile }
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${isMobile ? 'mb-6' : 'mb-8'}`}>
      {/* Enhanced Main Search Container */}
      <div className="relative z-50">
        {/* Fixed glassmorphism search input with proper interaction */}
        <div className={`relative backdrop-blur-xl bg-gradient-to-r from-slate-800/60 via-slate-700/50 to-slate-800/60 border-2 ${
          isFocused 
            ? 'border-cyan-400/70 shadow-xl shadow-cyan-500/30' 
            : 'border-slate-600/50 shadow-lg shadow-slate-900/25'
        } rounded-2xl transition-all duration-300 overflow-visible ${
          isMobile ? 'h-12' : 'h-14'
        }`}>
          
          {/* Enhanced Multi-layered Glow Effect - Non-blocking */}
          <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/3 to-pink-500/5 transition-opacity duration-300 rounded-2xl pointer-events-none ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/3 to-transparent transition-opacity duration-500 rounded-2xl pointer-events-none ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}></div>

          {/* Search icon - Non-blocking */}
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none ${
            isFocused ? 'text-cyan-400 scale-110' : 'text-slate-400'
          }`}>
            <FaSearch className={`${isMobile ? 'text-base' : 'text-lg'}`} />
          </div>

          {/* AI Magic Indicator - Non-blocking */}
          <div className={`absolute right-16 top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none ${
            isFocused && searchValue ? 'text-purple-400 scale-110 animate-pulse' : 'text-slate-500 opacity-60'
          }`}>
            <FaHandSparkles className={`${isMobile ? 'text-sm' : 'text-base'}`} />
          </div>

          {/* Enhanced search input with better accessibility */}
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isMobile ? "Search 1000+ OSINT tools..." : "🔍 Search 1000+ OSINT tools, techniques, and intelligence platforms..."}
            className={`relative z-10 w-full bg-transparent text-white placeholder-slate-400 focus:outline-none transition-all duration-300 font-medium ${
              isMobile 
                ? 'pl-10 pr-14 py-2.5 text-sm' 
                : 'pl-12 pr-16 py-3 text-base'
            }`}
            inputMode={isMobile ? "search" : undefined}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            maxLength={1000}
            aria-label="Search OSINT tools"
            role="searchbox"
            style={{ 
              position: 'relative', 
              zIndex: 10,
              pointerEvents: 'auto'
            }}
          />

          {/* Enhanced Character counter - Non-blocking */}
          {searchValue && (
            <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 transition-opacity duration-300 pointer-events-none ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 bg-slate-700/80 rounded-md ${
                searchValue.length > 800 ? 'text-orange-400' : 'text-slate-400'
              }`}>
                {searchValue.length}/1000
              </span>
            </div>
          )}

          {/* Enhanced Focus Ring */}
          {isFocused && (
            <div className="absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Enhanced Suggestions Panel */}
        {showSuggestions && allSuggestions.length > 0 && (
          <div className={`absolute z-60 w-full backdrop-blur-xl bg-slate-800/95 border border-slate-600/60 rounded-2xl shadow-2xl shadow-slate-900/60 overflow-hidden ${
            isMobile ? 'mt-2 max-h-64' : 'mt-3 max-h-80'
          }`}>
            <div className="overflow-y-auto">
              {allSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSuggestionSelect(suggestion);
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`cursor-pointer transition-all duration-200 border-b border-slate-700/50 last:border-b-0 ${
                    index === selectedSuggestionIndex 
                      ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-cyan-400/30' 
                      : 'hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20'
                  } ${isMobile ? 'px-4 py-2.5' : 'px-6 py-3'}`}
                >
                  <div className="flex items-center gap-3">
                    <FaHandSparkles className={`transition-colors duration-200 ${
                      index === selectedSuggestionIndex ? 'text-cyan-300' : 'text-purple-400'
                    } ${isMobile ? 'text-sm' : 'text-base'}`} />
                    <span className={`font-medium transition-colors duration-200 ${
                      index === selectedSuggestionIndex ? 'text-cyan-100' : 'text-white'
                    } ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {suggestion}
                    </span>
                    {index === selectedSuggestionIndex && (
                      <div className="ml-auto flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-cyan-600/40 text-cyan-200 rounded text-xs font-mono">Enter</kbd>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Mobile Touch Hints */}
        {isMobile && showMobileHints && (
          <div className="absolute z-40 w-full mt-2 p-3 backdrop-blur-xl bg-slate-800/95 border border-slate-600/50 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <FaMobile className="text-cyan-400" />
              <span>Touch-optimized • Voice search ready • 1000+ tools available</span>
            </div>
          </div>
        )}

        {/* Search Status Indicator */}
        {searchValue && (
          <div className={`absolute z-30 left-0 top-full mt-1 transition-all duration-300 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/90 border border-slate-600/40 rounded-full backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 font-medium">
                Searching {searchValue.length > 20 ? `"${searchValue.substring(0, 20)}..."` : `"${searchValue}"`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Keyboard Shortcuts - Desktop Only */}
      {!isMobile && (
        <div className="flex items-center justify-center gap-3 mt-4 opacity-70 hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2">
            <FaKeyboard className="text-slate-500 text-sm" />
            <span className="text-slate-500 text-sm">Quick shortcuts:</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-700/80 text-slate-300 rounded-md text-xs font-mono shadow-sm border border-slate-600/50">Ctrl</kbd>
            <span className="text-slate-500 text-xs">+</span>
            <kbd className="px-2 py-1 bg-slate-700/80 text-slate-300 rounded-md text-xs font-mono shadow-sm border border-slate-600/50">K</kbd>
            <span className="text-slate-500 text-xs ml-2">to focus</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-700/80 text-slate-300 rounded-md text-xs font-mono shadow-sm border border-slate-600/50">↑</kbd>
            <kbd className="px-2 py-1 bg-slate-700/80 text-slate-300 rounded-md text-xs font-mono shadow-sm border border-slate-600/50">↓</kbd>
            <span className="text-slate-500 text-xs ml-1">navigate</span>
          </div>
        </div>
      )}

      {/* Enhanced Quick Actions with Better Interaction */}
      <div className={`flex items-center justify-center gap-3 flex-wrap ${
        isMobile ? 'mt-5' : 'mt-7'
      }`}>
        {quickActions.map((action, index) => (
          <div
            key={index}
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isMobile ? 'flex-1 min-w-0' : ''
            }`}
            onClick={() => {
              // Add click functionality to quick actions
              if (action.label.includes('Search')) {
                searchInputRef.current?.focus();
              }
            }}
          >
            <div className={`bg-gradient-to-r ${action.color} rounded-xl text-white font-semibold text-center backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
              isMobile ? 'px-2 py-1.5' : 'px-3 py-2'
            }`}>
              
              {/* Subtle hover animation */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="flex items-center justify-center gap-1.5 relative z-10">
                <action.icon className={`${isMobile ? 'text-xs' : 'text-sm'} group-hover:scale-110 transition-transform duration-300`} />
                <span className={`${
                  isMobile ? 'text-xs truncate' : 'text-sm'
                } group-hover:tracking-wide transition-all duration-300`}>
                  {action.label}
                </span>
              </div>
            </div>
            
            {/* Enhanced Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300 -z-10 scale-110`}></div>
            
            {/* Subtle pulse effect on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.color} rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-300 animate-pulse`}></div>
          </div>
        ))}
      </div>

      {/* Enhanced Search Tips */}
      {!searchValue && !isFocused && (
        <div className={`text-center mt-4 transition-all duration-300 ${
          isMobile ? 'px-2' : 'px-4'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-full backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            <span className={`text-slate-400 font-medium ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              Try searching: "nmap", "subdomain", "osint", "burp suite"
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSINTSearchBar; 