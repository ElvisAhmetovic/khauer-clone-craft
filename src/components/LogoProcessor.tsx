
import { useState, useEffect } from 'react';

interface LogoProcessorProps {
  onLogoReady: (logoUrl: string) => void;
}

const LogoProcessor = ({ onLogoReady }: LogoProcessorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simply use the original logo without any processing
    const logoUrl = '/lovable-uploads/93c1bf18-c1ae-4c22-bff0-2ef805a96560.png';
    onLogoReady(logoUrl);
    setIsLoading(false);
  }, [onLogoReady]);

  if (isLoading) {
    return (
      <div className="w-16 h-12 bg-gray-700 animate-pulse rounded"></div>
    );
  }

  return null;
};

export default LogoProcessor;
