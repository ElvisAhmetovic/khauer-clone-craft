
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
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const tryWidget = () => {
      console.log('Trying AutoScout24 widget...');
      setCurrentMethod('widget');
      setError(null);
      
      timeoutId = setTimeout(() => {
        if (!widgetLoaded) {
          console.log('Widget failed, trying enhanced proxy...');
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
        console.log('AutoScout24 script failed, trying enhanced proxy...');
        clearTimeout(timeoutId);
        tryProxy();
      };

      if (containerRef.current) {
        containerRef.current.appendChild(script);
      }
      
      scriptRef.current = script;
    };

    const tryProxy = async () => {
      console.log('Trying enhanced proxy method...');
      setCurrentMethod('proxy');
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke('autoscout24-proxy');
        
        if (error) {
          console.error('Proxy error:', error);
          throw error;
        }
        
        if (containerRef.current && data) {
          // Create a sandboxed iframe to display the proxied content
          const iframe = document.createElement('iframe');
          iframe.style.width = '100%';
          iframe.style.height = height;
          iframe.style.border = 'none';
          iframe.style.borderRadius = '8px';
          iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-modals');
          iframe.srcdoc = data;
          
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(iframe);
          setProxyLoaded(true);
          
          console.log('Enhanced proxy method successful');
        } else {
          throw new Error('No data received from enhanced proxy');
        }
      } catch (error) {
        console.log('Enhanced proxy failed, trying direct iframe...', error);
        setError(`Proxy failed: ${error.message}`);
        tryDirectIframe();
      }
    };

    const tryDirectIframe = () => {
      console.log('Trying direct iframe method...');
      setCurrentMethod('iframe');
      
      if (containerRef.current) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.autoscout24.ch/de/s/seller-${dealerId}`;
        iframe.style.width = '100%';
        iframe.style.height = height;
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-modals');
        iframe.title = 'AutoScout24 Fahrzeuge';
        
        // Handle iframe load events
        iframe.onload = () => {
          console.log('Direct iframe loaded successfully');
        };
        
        iframe.onerror = () => {
          console.log('Direct iframe failed, showing fallback');
          setError('Iframe loading failed');
          setTimeout(() => {
            setLoadingTimeout(true);
            setCurrentMethod('fallback');
          }, 2000);
        };
        
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(iframe);
        
        // Set a timeout to show fallback if iframe doesn't work
        setTimeout(() => {
          if (currentMethod === 'iframe') {
            console.log('Iframe timeout, showing fallback');
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
        return 'Lade Fahrzeuge über Enhanced Proxy...';
      case 'iframe':
        return 'Lade AutoScout24 Seite direkt...';
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
              <p className="text-gray-500 text-sm mt-2">
                {currentMethod === 'widget' && 'Versuche Original Widget...'}
                {currentMethod === 'proxy' && 'Versuche Enhanced Proxy mit Anti-Detection...'}
                {currentMethod === 'iframe' && 'Versuche direkten Zugriff...'}
              </p>
              {error && (
                <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Enhanced fallback content */}
        {loadingTimeout && currentMethod === 'fallback' && (
          <div className="flex flex-col justify-center items-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg min-h-[600px]">
            <div className="text-center max-w-lg mx-auto px-6">
              <div className="bg-gradient-to-br from-lime-100 to-lime-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Direktzugriff erforderlich</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                AutoScout24 blockiert die Einbettung ihrer Inhalte aus Sicherheitsgründen. 
                Alle unsere Fahrzeuge sind jedoch weiterhin auf unserer offiziellen AutoScout24-Seite verfügbar.
              </p>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-600 text-sm">
                    <strong>Technische Details:</strong> {error}
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <a
                  href={`https://www.autoscout24.ch/de/s/seller-${dealerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Zu AutoScout24 wechseln
                </a>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Seite neu laden
                  </button>
                  
                  <a
                    href="tel:+41763367799"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Anrufen
                  </a>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg shadow-inner">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Warum passiert das?</strong><br/>
                  AutoScout24 verwendet erweiterte Sicherheitsmaßnahmen (X-Frame-Options, CSP) 
                  um ihre Inhalte vor unbefugter Einbettung zu schützen.
                </p>
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
