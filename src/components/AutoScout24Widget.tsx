
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  const [proxyLoaded, setProxyLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<'widget' | 'proxy' | 'iframe' | 'fallback'>('widget');
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const tryWidget = () => {
      console.log('Trying AutoScout24 widget...');
      setCurrentMethod('widget');
      
      timeoutId = setTimeout(() => {
        if (!widgetLoaded) {
          console.log('Widget failed, trying proxy...');
          tryProxy();
        }
      }, 5000);

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

      script.onerror = () => {
        console.log('AutoScout24 script failed, trying proxy...');
        clearTimeout(timeoutId);
        tryProxy();
      };

      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
      
      scriptRef.current = script;
    };

    const tryProxy = async () => {
      console.log('Trying proxy method...');
      setCurrentMethod('proxy');
      
      try {
        const { data, error } = await supabase.functions.invoke('autoscout24-proxy');
        
        if (error) throw error;
        
        if (containerRef.current && data) {
          // Create an iframe to display the proxied content
          const iframe = document.createElement('iframe');
          iframe.style.width = '100%';
          iframe.style.height = height;
          iframe.style.border = 'none';
          iframe.srcdoc = data;
          
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(iframe);
          setProxyLoaded(true);
          
          console.log('Proxy method successful');
        } else {
          throw new Error('No data received from proxy');
        }
      } catch (error) {
        console.log('Proxy failed, trying iframe...', error);
        tryIframe();
      }
    };

    const tryIframe = () => {
      console.log('Trying iframe method...');
      setCurrentMethod('iframe');
      
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <iframe
            src="https://www.autoscout24.ch/de/s/seller-${dealerId}"
            width="100%"
            height="${height}"
            frameborder="0"
            style="border: none; border-radius: 8px;"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            title="AutoScout24 Fahrzeuge"
          ></iframe>
        `;
        
        // Set a timeout to show fallback if iframe doesn't work
        setTimeout(() => {
          if (currentMethod === 'iframe') {
            setLoadingTimeout(true);
            setCurrentMethod('fallback');
          }
        }, 8000);
      }
    };

    // Start with widget method
    const loadDelay = setTimeout(tryWidget, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(loadDelay);
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [dealerId, language, width, height]);

  const getLoadingMessage = () => {
    switch (currentMethod) {
      case 'widget':
        return 'AutoScout24 Widget wird geladen...';
      case 'proxy':
        return 'Lade Fahrzeuge über Proxy...';
      case 'iframe':
        return 'Lade AutoScout24 Seite...';
      default:
        return 'Lade Fahrzeuge...';
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-[1000px] w-full relative" style={{ minHeight: height }}>
        {/* Loading state */}
        {!widgetLoaded && !proxyLoaded && !loadingTimeout && (
          <div className="flex justify-center items-center py-16 absolute inset-0 bg-white z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">{getLoadingMessage()}</p>
              <p className="text-gray-500 text-sm mt-2">Versuche verschiedene Lademethoden...</p>
            </div>
          </div>
        )}

        {/* Fallback content if all methods fail */}
        {loadingTimeout && currentMethod === 'fallback' && (
          <div className="flex flex-col justify-center items-center py-16 bg-gray-50 rounded-lg min-h-[600px]">
            <div className="text-center max-w-md">
              <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fahrzeuge können nicht eingebettet werden</h3>
              <p className="text-gray-600 mb-6">
                Alle Lademethoden wurden versucht. Besuchen Sie direkt unsere AutoScout24-Seite für alle aktuellen Fahrzeuge.
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
          className={`w-full ${(widgetLoaded || proxyLoaded || currentMethod === 'iframe') && !loadingTimeout ? 'block' : 'hidden'}`}
          style={{ minHeight: height }}
        >
          {/* AutoScout24 content will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default AutoScout24Widget;
