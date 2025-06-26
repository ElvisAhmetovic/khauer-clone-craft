
import React, { useEffect } from 'react';

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
  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.querySelector('script[src*="autoscout24.com/ch/haendler-angebote.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append the AutoScout24 widget script
    const script = document.createElement('script');
    script.src = 'https://widget.autoscout24.com/ch/haendler-angebote.js';
    script.setAttribute('data-dealer-id', dealerId);
    script.setAttribute('data-language', language);
    script.setAttribute('data-width', width);
    script.setAttribute('data-height', height);
    script.async = true;

    // Append to document body
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector('script[src*="autoscout24.com/ch/haendler-angebote.js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [dealerId, language, width, height]);

  return (
    <div className="w-full">
      <div id="autoscout24-widget-container" className="min-h-[1000px] w-full">
        {/* The AutoScout24 widget will be injected here */}
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400 mx-auto mb-4"></div>
            <p className="text-gray-600">AutoScout24 Widget wird geladen...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScout24Widget;
