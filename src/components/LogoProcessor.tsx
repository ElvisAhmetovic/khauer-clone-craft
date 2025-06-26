
import { useState, useEffect } from 'react';

interface LogoProcessorProps {
  onLogoReady: (logoUrl: string) => void;
}

const LogoProcessor = ({ onLogoReady }: LogoProcessorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use the new KURDO Car logo
    const logoUrl = '/lovable-uploads/82fd3310-1324-4e76-a0ad-92b0c54c4e1d.png';
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
