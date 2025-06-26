
import React, { useEffect, useState, useRef } from 'react';

interface AutoScout24WidgetProps {
  dealerId: string;
  language?: string;
  width?: string;
  height?: string;
}

const AutoScout24Widget: React.FC<AutoScout24WidgetProps> = ({
  dealerId,
  language = "de",
  width = "100%",
  height = "1000px"
}) => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const loadWidget = () => {
      // Set timeout for fallback
      timeoutId = setTimeout(() => {
        setLoadingTimeout(true);
        console.log('Widget loading timeout reached');
      }, 8000);

      // Clean up any existing script
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }

      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Create script element
      const script = document.createElement('script');
      script.src = 'https://widget.autoscout24.com/ch/haendler-angebote.js';
      script.setAttribute('data-dealer-id', dealerId);
      script.setAttribute('data-language', language);
      script.setAttribute('data-width', width);
      script.setAttribute('data-height', height);
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('AutoScout24 script loaded successfully');
        setWidgetLoaded(true);
        clearTimeout(timeoutId);
      };

      script.onerror = (error) => {
        console.error('Failed to load AutoScout24 widget script:', error);
        setLoadingTimeout(true);
        clearTimeout(timeoutId);
      };

      // Try appending to container first, then document body as fallback
      if (containerRef.current) {
        containerRef.current.appendChild(script);
      } else {
        document.body.appendChild(script);
      }
      
      scriptRef.current = script;
    };

    // Load widget with a small delay to ensure DOM is ready
    const loadDelay = setTimeout(loadWidget, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(loadDelay);
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [dealerId, language, width, height]);

  return (
    <div className="w-full">
      <div className="min-h-[1000px] w-full relative" style={{ minHeight: height }}>
        {/* Loading state */}
        {!widgetLoaded && !loadingTimeout && (
          <div className="flex justify-center items-center py-16 absolute inset-0 bg-white z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">AutoScout24 Widget wird geladen...</p>
              <p className="text-gray-500 text-sm mt-2">Dies kann einen Moment dauern...</p>
            </div>
          </div>
        )}

        {/* Fallback content if widget fails to load */}
        {loadingTimeout && (
          <div className="flex flex-col justify-center items-center py-16 bg-gray-50 rounded-lg min-h-[600px]">
            <div className="text-center max-w-md">
              <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Widget konnte nicht geladen werden</h3>
              <p className="text-gray-600 mb-6">
                Das AutoScout24 Widget ist momentan nicht verfügbar. Besuchen Sie direkt unsere AutoScout24-Seite für alle aktuellen Fahrzeuge.
              </p>
              <div className="space-y-3">
                <a
                  href={`https://www.autoscout24.ch/de/s/seller-${dealerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Direkt zu AutoScout24
                </a>
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Seite neu laden
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Widget container */}
        <div 
          ref={containerRef}
          className={`w-full ${widgetLoaded ? 'block' : 'hidden'}`}
          style={{ minHeight: height }}
        >
          {/* AutoScout24 widget will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default AutoScout24Widget;
