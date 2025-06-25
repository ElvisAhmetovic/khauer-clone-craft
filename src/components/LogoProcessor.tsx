
import { useState, useEffect } from 'react';

interface LogoProcessorProps {
  onLogoReady: (logoUrl: string) => void;
}

const LogoProcessor = ({ onLogoReady }: LogoProcessorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use the new KURDO Car logo
    const logoUrl = '/lovable-uploads/0570d214-0aa4-4f12-8cbc-15482512d8a9.png';
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
