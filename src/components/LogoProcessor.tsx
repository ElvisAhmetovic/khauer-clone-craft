
import { useState, useEffect } from 'react';

interface LogoProcessorProps {
  onLogoReady: (logoUrl: string) => void;
}

const LogoProcessor = ({ onLogoReady }: LogoProcessorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use the new KURDO Car logo
    const logoUrl = '/lovable-uploads/e08f20a3-3161-47dd-8a8a-b2ca5a602040.png';
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
