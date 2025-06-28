import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isMobile: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      isMobile: false
    };
  }

  // Mobile detection method
  private checkMobile = () => {
    const isMobile = window.innerWidth <= 768 || 
                    window.innerHeight <= 600 ||
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    'ontouchstart' in window ||
                    navigator.maxTouchPoints > 0;
    
    this.setState({ isMobile });
  };

  componentDidMount() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { isMobile } = this.state;

    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default mobile-responsive error UI
      return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center ${
          isMobile ? 'p-4' : 'p-8'
        }`}>
          <div className={`w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-red-500/30 text-center relative overflow-hidden ${
            isMobile ? 'max-w-sm p-6' : 'max-w-2xl p-8'
          }`}>
            {/* Mobile-Responsive Error Icon */}
            <div className={`bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl ${
              isMobile ? 'w-16 h-16 mb-4' : 'w-20 h-20 mb-6'
            }`}>
              <svg className={`text-white ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L4.064 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Mobile-Responsive Error Message */}
            <h1 className={`font-bold text-red-400 ${
              isMobile ? 'text-xl mb-3' : 'text-3xl mb-4'
            }`}>
              🚨 {isMobile ? 'Error Occurred' : 'Oops! Something went wrong'}
            </h1>
            
            <p className={`text-gray-300 leading-relaxed ${
              isMobile ? 'text-sm mb-4' : 'text-lg mb-6'
            }`}>
              {isMobile 
                ? 'The OSINT Toolkit encountered an error. Your data is safe.'
                : 'The MFBK-Reconn Toolkit encountered an unexpected error. Don\'t worry - your data is safe and this issue has been logged.'
              }
            </p>

            {/* Mobile-Responsive Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className={`bg-black/30 border border-red-500/30 rounded-xl text-left ${
                isMobile ? 'p-3 mb-4' : 'p-4 mb-6'
              }`}>
                <h3 className={`text-red-400 font-bold ${
                  isMobile ? 'text-sm mb-1' : 'mb-2'
                }`}>
                  {isMobile ? 'Error Details:' : 'Error Details (Development):'}
                </h3>
                <pre className={`text-red-300 overflow-auto ${
                  isMobile ? 'text-xs max-h-32' : 'text-sm max-h-40'
                }`}>
                  {this.state.error.name}: {this.state.error.message}
                  {!isMobile && this.state.error.stack && (
                    <>
                      {'\n\nStack Trace:\n'}
                      {this.state.error.stack}
                    </>
                  )}
                </pre>
                {!isMobile && this.state.errorInfo && (
                  <pre className={`text-orange-300 mt-2 overflow-auto ${
                    isMobile ? 'text-xs max-h-24' : 'text-sm max-h-40'
                  }`}>
                    {'\n\nComponent Stack:'}
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Mobile-Responsive Action Buttons */}
            <div className={`flex justify-center ${
              isMobile ? 'flex-col gap-3' : 'gap-4 flex-wrap'
            }`}>
              <button
                onClick={this.handleReload}
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg touch-manipulation ${
                  isMobile ? 'px-6 py-3 text-sm min-h-[48px] w-full' : 'px-6 py-3'
                }`}
              >
                <svg className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg touch-manipulation ${
                  isMobile ? 'px-6 py-3 text-sm min-h-[48px] w-full' : 'px-6 py-3'
                }`}
              >
                <svg className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </button>
            </div>

            {/* Mobile-Responsive Help Text */}
            <div className={`bg-blue-500/10 border border-blue-500/30 rounded-xl ${
              isMobile ? 'mt-6 p-3' : 'mt-8 p-4'
            }`}>
              <h3 className={`text-blue-400 font-bold ${
                isMobile ? 'text-sm mb-1' : 'mb-2'
              }`}>💡 Need Help?</h3>
              <p className={`text-gray-300 ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>
                {isMobile 
                  ? 'If this error persists, try clearing your browser cache or refreshing the page.'
                  : 'If this error persists, try clearing your browser cache or contact support. The MFBK-Reconn Toolkit has robust fallback systems to ensure core functionality remains available.'
                }
              </p>
            </div>

            {/* Mobile-Responsive Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute bg-red-400 rounded-full animate-pulse ${
                isMobile 
                  ? 'top-4 left-4 w-2 h-2' 
                  : 'top-10 left-10 w-4 h-4'
              }`}></div>
              <div className={`absolute bg-pink-400 rounded-full animate-bounce ${
                isMobile 
                  ? 'top-16 right-8 w-1.5 h-1.5' 
                  : 'top-32 right-16 w-2 h-2'
              }`}></div>
              <div className={`absolute bg-purple-400 rounded-full animate-ping ${
                isMobile 
                  ? 'bottom-8 left-8 w-2 h-2' 
                  : 'bottom-20 left-20 w-3 h-3'
              }`}></div>
            </div>

            {/* Mobile-Specific Safe Area Support */}
            {isMobile && (
              <div className="ios-safe-area"></div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 