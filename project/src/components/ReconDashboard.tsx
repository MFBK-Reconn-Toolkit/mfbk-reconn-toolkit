import React, { useState, useMemo, memo, useEffect, useCallback, lazy, Suspense } from 'react';
import { FaShieldAlt, FaRobot, FaSearch, FaExternalLinkAlt, FaTerminal, FaChevronRight, FaStar, FaFire, FaGem, FaRocket, FaBars, FaTimes } from 'react-icons/fa';
import { toolCategories } from '../data/toolCategories';
import { useDebounce, usePerformanceMonitor } from '../hooks/usePerformance';
import { performGlobalSearch, generateSearchSuggestions } from '../utils/reconUtils';
import OSINTSearchBar from './OSINTSearchBar';
import AIAssistant from './chat/AIAssistant';
import ErrorBoundary from './ErrorBoundary';
// Logo image is in public folder, accessed via URL
const logoImage = '/img.png';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
                 window.innerHeight <= 600 ||
                 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                 'ontouchstart' in window ||
                 navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Enhanced Top-Left Corner Logo Component with Circular Image
const TopLeftLogo = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`fixed z-50 ${
      isMobile ? 'top-4 left-4' : 'top-6 left-6'
    }`}>
      {/* Simple Frame Container */}
      <div className="relative group">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        {/* Main Container */}
        <div className={`relative flex items-center gap-2 bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-cyan-500/30 ${
          isMobile ? 'p-1.5' : 'p-2'
        }`}>
          
          {/* Enhanced Circular Logo Container */}
          <div className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
            isMobile ? 'w-6 h-6' : 'w-8 h-8'
          }`}>
            
            {/* Perfect Circular Logo Image */}
            <img 
              src={logoImage} 
              alt="MFBK Logo" 
              className={`object-cover rounded-full border-2 border-cyan-400/30 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/60 shadow-lg ${
                isMobile ? 'w-6 h-6' : 'w-8 h-8'
              }`}
              style={{
                filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.3)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.2))',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
            
            {/* Enhanced AI Indicator */}
            <div className={`absolute bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/50 animate-pulse border border-white/30 ${
              isMobile ? '-top-0.5 -right-0.5 w-2.5 h-2.5' : '-top-1 -right-1 w-3 h-3'
            }`}>
              <span className={`text-white font-bold ${
                isMobile ? 'text-[6px]' : 'text-[8px]'
              }`}>AI</span>
            </div>

            {/* Subtle Orbiting Effect */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className={`absolute top-0 left-1/2 bg-cyan-400/50 rounded-full -translate-x-1/2 shadow-sm animate-pulse ${
                isMobile ? 'w-0.5 h-0.5 -translate-y-1.5' : 'w-1 h-1 -translate-y-2'
              }`}></div>
              <div className={`absolute top-1/2 right-0 bg-purple-400/50 rounded-full -translate-y-1/2 shadow-sm animate-pulse ${
                isMobile ? 'w-0.5 h-0.5 translate-x-1.5' : 'w-1 h-1 translate-x-2'
              }`}></div>
              <div className={`absolute bottom-0 left-1/2 bg-pink-400/50 rounded-full -translate-x-1/2 shadow-sm animate-pulse ${
                isMobile ? 'w-0.5 h-0.5 translate-y-1.5' : 'w-1 h-1 translate-y-2'
              }`}></div>
              <div className={`absolute top-1/2 left-0 bg-green-400/50 rounded-full -translate-y-1/2 shadow-sm animate-pulse ${
                isMobile ? 'w-0.5 h-0.5 -translate-x-1.5' : 'w-1 h-1 -translate-x-2'
              }`}></div>
            </div>
          </div>
          
          {/* Enhanced 0xmfbk Text */}
          <div className="flex flex-col">
            <span className={`text-cyan-300 font-bold tracking-wide transition-colors duration-300 group-hover:text-cyan-200 ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              0xmfbk
            </span>
            {!isMobile && (
              <span className="text-slate-400 text-xs font-medium transition-colors duration-300 group-hover:text-slate-300">
                OSINT
              </span>
            )}
          </div>

          {/* Responsive Status Indicator */}
          <div className={`ml-auto flex items-center ${isMobile ? 'hidden' : ''}`}>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
          </div>
        </div>

        {/* Mobile Status Indicator */}
        {isMobile && (
          <div className="absolute -bottom-0.5 -right-0.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Lazy Loading Hook for Performance
const useLazyLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px' // Load slightly before entering viewport
        }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, []);
  
  return { ref, isVisible };
};

// Mobile Performance Optimized Tool Card Component
const ToolCard = memo(({ tool, index }: { tool: any; index: number }) => {
  const isMobile = useIsMobile();
  const { ref, isVisible } = useLazyLoading();
  
  // Placeholder for unloaded cards
  if (!isVisible) {
    return (
      <div 
        ref={ref}
        className={`bg-slate-800/40 border border-slate-600/20 rounded-2xl animate-pulse ${
          isMobile ? 'h-48 p-4' : 'h-56 p-6'
        }`}
      >
        <div className="space-y-3">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700/30 rounded w-full"></div>
          <div className="h-3 bg-slate-700/30 rounded w-2/3"></div>
          <div className={`h-10 bg-slate-700/40 rounded ${isMobile ? 'mt-4' : 'mt-6'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`group relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-xl border border-slate-600/40 rounded-2xl hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden will-change-transform ${
        isMobile ? 'p-4 hover:scale-[1.01]' : 'p-6 hover:-translate-y-1 hover:scale-[1.02]'
      }`}
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: 'slideInBottom 0.4s ease-out forwards'
      }}
    >
      {/* Simplified background effects for mobile performance */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 rounded-2xl ${
        isMobile ? 'group-hover:opacity-50' : 'group-hover:opacity-100'
      }`}></div>
      
      {/* Reduced border glow for mobile */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      )}
      
      <div className="relative z-10">
        {/* Optimized header */}
        <div className={`flex items-start justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-2 ${isMobile ? 'mb-1.5' : 'mb-2'}`}>
              <h3 className={`text-white font-bold group-hover:text-cyan-300 transition-colors duration-300 truncate ${
                isMobile ? 'text-base leading-tight' : 'text-lg'
              }`}>
                {tool.name}
              </h3>
              {tool.type && (
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 font-semibold rounded-full border border-cyan-400/30 backdrop-blur-sm ${
                    isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'
                  }`}>
                    <FaGem className="text-xs flex-shrink-0" />
                    <span className="truncate">{isMobile ? tool.type.substring(0, 3) : tool.type}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Optimized description */}
        <p className={`text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors line-clamp-2 ${
          isMobile ? 'text-sm mb-3' : 'text-sm mb-4'
        }`}>
          {tool.description}
        </p>
        
        {/* Streamlined action buttons */}
        <div className={`space-y-2 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
          {tool.link && (
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-200 group/button touch-manipulation ${
                isMobile ? 'px-3 py-2.5 text-sm min-h-[44px] active:scale-95' : 'px-4 py-3 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30'
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <FaExternalLinkAlt className={`flex-shrink-0 ${isMobile ? 'text-xs' : 'text-sm'}`} />
                <span className="truncate">Visit Tool</span>
              </span>
              <FaChevronRight className={`flex-shrink-0 group-hover/button:translate-x-1 transition-transform ${
                isMobile ? 'text-xs' : 'text-sm'
              }`} />
            </a>
          )}
          
          {tool.command && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-xl blur-sm"></div>
              <div className={`relative flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-600/40 rounded-xl group/command hover:border-green-400/40 transition-all duration-300 ${
                isMobile ? 'px-3 py-2.5 min-h-[44px]' : 'px-4 py-3'
              }`}>
                <FaTerminal className={`text-green-400 flex-shrink-0 ${isMobile ? 'text-xs' : 'text-sm'}`} />
                <code className={`text-green-300 font-mono truncate flex-1 ${
                  isMobile ? 'text-xs' : 'text-xs'
                }`}>
                  {tool.command}
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(tool.command)}
                  className={`bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-md transition-colors opacity-0 group-hover/command:opacity-100 ${
                    isMobile ? 'px-2 py-1 text-xs min-w-[44px] min-h-[32px]' : 'px-2 py-1 text-xs'
                  }`}
                  title="Copy command"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Mobile Performance Optimized Category Section
const CategorySection = memo(({ category, searchResults }: { category: any; searchResults?: any }) => {
  const toolsToShow = searchResults?.tools || category.tools;
  const IconComponent = category.icon;
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(isMobile ? 6 : 12);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Memoize visible tools for performance
  const visibleTools = useMemo(() => {
    if (isExpanded || toolsToShow.length <= visibleCount) {
      return toolsToShow;
    }
    return toolsToShow.slice(0, visibleCount);
  }, [toolsToShow, visibleCount, isExpanded]);
  
  const remainingCount = toolsToShow.length - visibleCount;
  
  return (
    <section className={isMobile ? 'mb-12' : 'mb-16'}>
      {/* Optimized Category Header */}
      <div className={`flex items-center gap-4 bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-3xl transition-all duration-300 ${
        isMobile ? 'p-4 mb-6 flex-col text-center hover:border-cyan-400/30' : 'gap-6 p-6 mb-8 hover:border-cyan-400/40'
      }`}>
        <div className="relative">
          <div className={`bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-200 ${
            isMobile ? 'w-12 h-12 text-lg hover:scale-105' : 'w-16 h-16 text-2xl hover:rotate-6'
          }`}>
            <IconComponent />
          </div>
          <div className={`absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center ${
            isMobile ? 'w-4 h-4' : 'w-6 h-6'
          }`}>
            <FaFire className={`text-white ${isMobile ? 'text-[8px]' : 'text-xs'}`} />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className={`text-white font-black bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text ${
            isMobile ? 'text-xl mb-1' : 'text-3xl mb-2'
          }`}>
            {category.title}
          </h2>
          <p className={`text-slate-400 font-medium ${
            isMobile ? 'text-sm mb-2' : 'text-base'
          }`}>{category.description}</p>
          
          {searchResults && (
            <div className={`flex items-center gap-2 ${isMobile ? 'mt-2 justify-center' : 'mt-3'}`}>
              <div className={`bg-cyan-500/20 text-cyan-300 font-bold rounded-full border border-cyan-400/30 ${
                isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
              }`}>
                <FaStar className="inline mr-1" />
                {searchResults.matchCount} tools found
              </div>
            </div>
          )}
          
          {!searchResults && (
            <div className={`flex items-center gap-2 ${isMobile ? 'mt-2 justify-center' : 'mt-3'}`}>
              <div className={`bg-purple-500/20 text-purple-300 font-bold rounded-full border border-purple-400/30 ${
                isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
              }`}>
                <FaRocket className="inline mr-1" />
                {toolsToShow.length} tools available
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Performance Optimized Tools Grid */}
      <div className={`grid gap-4 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
      }`}>
        {visibleTools.map((tool: any, index: number) => (
          <ToolCard key={`${tool.name}-${index}`} tool={tool} index={index} />
        ))}
      </div>
      
      {/* Load More Button for Mobile Performance */}
      {!isExpanded && remainingCount > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setIsExpanded(true)}
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation ${
              isMobile ? 'px-6 py-3 text-sm min-h-[44px]' : 'px-8 py-3 hover:scale-105'
            }`}
          >
            <FaRocket className={`${isMobile ? 'text-sm' : 'text-base'}`} />
            <span>Show {remainingCount} More Tools</span>
            <div className={`bg-cyan-400/20 text-cyan-300 rounded-full font-bold ${
              isMobile ? 'px-2 py-0.5 text-xs' : 'px-2 py-1 text-xs'
            }`}>
              +{remainingCount}
            </div>
          </button>
        </div>
      )}
    </section>
  );
});

// Enhanced Mobile-Responsive Title Component with Smaller, Eye-Friendly Design
const LogoComponent = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`text-center ${isMobile ? 'mb-8 mt-12' : 'mb-12 mt-16'}`}>
      {/* Main Title Section with Smaller Logo */}
      <div className={`flex items-center justify-center ${
        isMobile ? 'flex-col gap-3 mb-6' : 'gap-6 mb-8'
      }`}>
        
        {/* Enhanced Original Logo Container - Bigger Size */}
        <div className="relative group">
          {/* Enhanced background glow for bigger logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
          
          {/* Bigger main logo container */}
          <div className={`relative bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-500/30 transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-500 border-2 border-white/20 ${
            isMobile ? 'w-18 h-18' : 'w-24 h-24'
          }`}>
            {/* Bigger Shield Icon */}
            <FaShieldAlt className={`text-white drop-shadow-xl ${
              isMobile ? 'text-xl' : 'text-3xl'
            }`} />
            
            {/* Bigger AI indicator */}
            <div className={`absolute bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-pulse ${
              isMobile ? '-top-1.5 -right-1.5 w-6 h-6' : '-top-2 -right-2 w-8 h-8'
            }`}>
              <span className={`text-white font-bold ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>AI</span>
            </div>
            
            {/* Enhanced orbiting dots for bigger logo */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s' }}>
              <div className={`absolute top-0 left-1/2 bg-cyan-400 rounded-full -translate-x-1/2 shadow-sm ${
                isMobile ? 'w-1.5 h-1.5 -translate-y-3' : 'w-2 h-2 -translate-y-4'
              }`}></div>
              <div className={`absolute top-1/2 right-0 bg-purple-400 rounded-full -translate-y-1/2 shadow-sm ${
                isMobile ? 'w-1.5 h-1.5 translate-x-3' : 'w-2 h-2 translate-x-4'
              }`}></div>
              <div className={`absolute bottom-0 left-1/2 bg-pink-400 rounded-full -translate-x-1/2 shadow-sm ${
                isMobile ? 'w-1.5 h-1.5 translate-y-3' : 'w-2 h-2 translate-y-4'
              }`}></div>
              <div className={`absolute top-1/2 left-0 bg-green-400 rounded-full -translate-y-1/2 shadow-sm ${
                isMobile ? 'w-1.5 h-1.5 -translate-x-3' : 'w-2 h-2 -translate-x-4'
              }`}></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Title Section to complement bigger logo */}
        <div className={isMobile ? 'text-center' : 'text-left'}>
          <h1 className={`font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight ${
            isMobile ? 'text-3xl mb-2' : 'text-5xl mb-3'
          }`}>
            MFBK-RECONN TOOLKIT
          </h1>
          <p className={`text-slate-400 font-semibold tracking-wide ${
            isMobile ? 'text-base' : 'text-xl'
          }`}>
            Advanced Cybersecurity Intelligence Platform
          </p>
          <p className={`text-slate-500 font-medium ${
            isMobile ? 'text-sm mt-1' : 'text-base mt-2'
          }`}>
            Powered by AI • 1000+ Tools • Real-time Intelligence
          </p>
        </div>
      </div>

      {/* Smaller Status Indicators */}
      <div className={`flex items-center justify-center gap-3 flex-wrap ${
        isMobile ? 'gap-2' : 'gap-4'
      }`}>
        <div className={`flex items-center gap-2 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border border-green-400/40 rounded-xl backdrop-blur-xl shadow-md shadow-green-500/15 hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 ${
          isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
        }`}>
          <div className="relative">
            <div className={`bg-green-400 rounded-full animate-pulse ${
              isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'
            }`}></div>
            <div className={`absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 ${
              isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'
            }`}></div>
          </div>
          <span className={`text-green-300 font-bold tracking-wide ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}>
            {isMobile ? 'ONLINE' : 'SYSTEM ONLINE'}
          </span>
        </div>
        
        <div className={`flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border border-purple-400/40 rounded-xl backdrop-blur-xl shadow-md shadow-purple-500/15 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 ${
          isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
        }`}>
          <FaSearch className={`text-purple-300 animate-pulse ${
            isMobile ? 'text-sm' : 'text-base'
          }`} />
          <span className={`text-purple-300 font-bold tracking-wide ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}>
            {isMobile ? '1000+ TOOLS' : '1000+ TOOLS READY'}
          </span>
        </div>
        
        <div className={`flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 border border-cyan-400/40 rounded-xl backdrop-blur-xl shadow-md shadow-cyan-500/15 hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 ${
          isMobile ? 'px-3 py-1.5' : 'px-4 py-2'
        }`}>
          <FaRobot className={`text-cyan-300 animate-bounce ${
            isMobile ? 'text-sm' : 'text-base'
          }`} />
          <span className={`text-cyan-300 font-bold tracking-wide ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}>
            {isMobile ? 'AI POWERED' : 'AI POWERED'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({ 
  selectedFilter, 
  setSelectedFilter, 
  toolCategories, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: any) => {
  return (
    <div className="lg:hidden mb-6">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/40 rounded-2xl text-white font-bold transition-all duration-300 hover:border-cyan-400/40"
      >
        <span className="flex items-center gap-3">
          <FaBars className="text-cyan-400" />
          Filter Categories
        </span>
        <FaChevronRight className={`transition-transform duration-300 ${
          isMobileMenuOpen ? 'rotate-90' : ''
        }`} />
      </button>

      {/* Mobile filter menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 bg-gradient-to-br from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-xl border border-slate-600/40 rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={() => {
              setSelectedFilter('all');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 border-b border-slate-600/30 ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 border-cyan-400/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FaSearch className="text-lg" />
            <span>All Tools</span>
            {selectedFilter === 'all' && (
              <FaStar className="ml-auto text-cyan-400" />
            )}
          </button>
          
          {toolCategories.map((category: any) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedFilter(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 font-bold transition-all duration-300 border-b border-slate-600/30 last:border-b-0 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-300 border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <IconComponent className="text-lg" />
                <span className="truncate">{category.title}</span>
                {selectedFilter === category.id && (
                  <FaStar className="ml-auto text-cyan-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Main Enhanced Mobile-Responsive Component
const ReconDashboard: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isMobile = useIsMobile();
  
  // Performance monitoring
  const { metrics, updateMetric } = usePerformanceMonitor();
  
  // Enhanced debounced search with mobile-specific timing
  const debouncedSearch = useDebounce(searchValue, isMobile ? 500 : 300);
  
  // Optimized search results with performance tracking
  const searchResults = useMemo(() => {
    if (!debouncedSearch.trim()) return [];
    
    const startTime = performance.now();
    const results = performGlobalSearch(debouncedSearch, toolCategories);
    const searchTime = performance.now() - startTime;
    
    updateMetric('searchTime', searchTime);
    
    // Log performance for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Search performance: ${searchTime.toFixed(2)}ms for "${debouncedSearch}"`);
    }
    
    return results;
  }, [debouncedSearch, updateMetric]);
  
  // Memoized suggestions with reduced frequency for mobile
  const suggestions = useMemo(() => {
    if (searchValue.length < (isMobile ? 3 : 2)) return [];
    return generateSearchSuggestions(searchValue);
  }, [searchValue, isMobile]);
  
  // Optimized filtered categories
  const filteredCategories = useMemo(() => {
    if (selectedFilter === 'all') return toolCategories;
    return toolCategories.filter(cat => cat.id === selectedFilter);
  }, [selectedFilter]);
  
  // Mobile-specific performance optimization
  useEffect(() => {
    if (isMobile) {
      // Optimize for mobile by reducing animation overhead
      document.documentElement.style.setProperty('--animation-duration', '0.2s');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
  }, [isMobile]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Don't automatically show suggestions - let OSINTSearchBar handle this
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)]"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        
        {/* Top-Left Corner Logo */}
        <TopLeftLogo />

        {/* Enhanced Mobile-Responsive Floating AI Assistant Button */}
        <button
          onClick={toggleChatbot}
          className={`fixed bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-2xl shadow-cyan-500/30 flex items-center justify-center text-white hover:scale-110 hover:rotate-12 transition-all duration-300 z-50 border-4 border-white/20 group ${
            isMobile 
              ? 'bottom-6 right-6 w-14 h-14' 
              : 'bottom-8 right-8 w-20 h-20'
          }`}
          title="Open AI Assistant"
        >
          <FaRobot className={`group-hover:animate-bounce ${
            isMobile ? 'text-lg' : 'text-2xl'
          }`} />
          <div className={`absolute bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse flex items-center justify-center ${
            isMobile ? '-top-1 -right-1 w-4 h-4' : '-top-2 -right-2 w-6 h-6'
          }`}>
            <span className={`text-white font-bold ${
              isMobile ? 'text-[10px]' : 'text-sm'
            }`}>AI</span>
          </div>
        </button>

        {/* Enhanced AI Assistant Chatbot */}
        {isChatbotOpen && (
          <AIAssistant
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`relative z-10 ${isMobile ? 'px-4 pb-24' : 'container mx-auto px-6 pb-32'}`}>
          {/* Enhanced Logo Component */}
          <LogoComponent />
          
          {/* Enhanced Search Bar */}
          <div className={isMobile ? 'mb-8' : 'mb-12'}>
            <OSINTSearchBar
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              onSuggestionSelect={handleSuggestionSelect}
              onSuggestionsToggle={setShowSuggestions}
            />
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            toolCategories={toolCategories}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          
          {/* Enhanced Desktop Filter Tabs */}
          {!isMobile && (
            <div className="hidden lg:flex justify-center mb-12">
              <div className="flex flex-wrap gap-3 bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-3">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    selectedFilter === 'all'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <FaSearch />
                  All Tools
                </button>
                {toolCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedFilter(category.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                        selectedFilter === category.id
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      <IconComponent />
                      <span className="whitespace-nowrap">{category.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Results Display */}
          <div className="space-y-16">
            {debouncedSearch.length >= 2 ? (
              // Search Results View
              searchResults.length > 0 ? (
                searchResults.map((categoryResult) => (
                  <CategorySection
                    key={categoryResult.category.id}
                    category={categoryResult.category}
                    searchResults={categoryResult}
                  />
                ))
              ) : (
                <div className={`text-center ${isMobile ? 'py-12' : 'py-20'}`}>
                  <div className={`bg-gradient-to-br from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-3xl ${
                    isMobile ? 'p-8 mx-4' : 'p-12 max-w-md mx-auto'
                  }`}>
                    <FaSearch className={`text-slate-500 mx-auto ${isMobile ? 'text-4xl mb-4' : 'text-6xl mb-6'}`} />
                    <h3 className={`text-white font-bold ${isMobile ? 'text-xl mb-3' : 'text-2xl mb-4'}`}>
                      No Tools Found
                    </h3>
                    <p className={`text-slate-400 ${isMobile ? 'text-sm leading-relaxed' : 'text-base leading-relaxed'}`}>
                      Try adjusting your search terms or browse our categories to discover powerful OSINT tools.
                    </p>
                  </div>
                </div>
              )
            ) : (
              // Category View
              filteredCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ReconDashboard;
