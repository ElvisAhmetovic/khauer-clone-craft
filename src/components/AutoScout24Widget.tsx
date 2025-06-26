
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    // Set a timeout to show fallback if widget doesn't load
    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000); // 10 seconds

    // Remove any existing script to avoid duplicates
    const existingScript = document.querySelector('script[src*="autoscout24.com/ch/haendler-angebote.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Remove any existing widget container content
    const container = document.getElementById('autoscout24-widget-container');
    if (container) {
      // Clear any existing content except our loading message
      const existingWidget = container.querySelector('[data-autoscout24-widget]');
      if (existingWidget) {
        existingWidget.remove();
      }
    }

    // Create and append the AutoScout24 widget script
    const script = document.createElement('script');
    script.src = 'https://widget.autoscout24.com/ch/haendler-angebote.js';
    script.setAttribute('data-dealer-id', dealerId);
    script.setAttribute('data-language', language);
    script.setAttribute('data-width', width);
    script.setAttribute('data-height', height);
    script.async = true;

    // Add load event listener
    script.onload = () => {
      console.log('AutoScout24 script loaded successfully');
      setWidgetLoaded(true);
      clearTimeout(timeout);
    };

    script.onerror = () => {
      console.error('Failed to load AutoScout24 widget script');
      setLoadingTimeout(true);
      clearTimeout(timeout);
    };

    // Append to document head instead of body for better compatibility
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      clearTimeout(timeout);
      const scriptToRemove = document.querySelector('script[src*="autoscout24.com/ch/haendler-angebote.js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [dealerId, language, width, height]);

  return (
    <div className="w-full">
      <div id="autoscout24-widget-container" className="min-h-[1000px] w-full relative">
        {/* Loading state */}
        {!widgetLoaded && !loadingTimeout && (
          <div className="flex justify-center items-center py-8 absolute inset-0 bg-white z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400 mx-auto mb-4"></div>
              <p className="text-gray-600">AutoScout24 Widget wird geladen...</p>
            </div>
          </div>
        )}

        {/* Fallback content if widget fails to load */}
        {loadingTimeout && (
          <div className="flex flex-col justify-center items-center py-16 bg-gray-50 rounded-lg">
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
            </div>
          </div>
        )}

        {/* This is where the AutoScout24 widget will inject its content */}
        <div data-autoscout24-widget className={widgetLoaded ? 'block' : 'hidden'}>
          {/* Widget content will be injected here by the script */}
        </div>
      </div>
    </div>
  );
};

export default AutoScout24Widget;
