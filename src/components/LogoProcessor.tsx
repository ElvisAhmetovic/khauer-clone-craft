
import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface LogoProcessorProps {
  onLogoReady: (logoUrl: string) => void;
}

const LogoProcessor = ({ onLogoReady }: LogoProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processLogo = async () => {
      try {
        console.log('Starting logo processing...');
        
        // Fetch the original logo
        const response = await fetch('/lovable-uploads/93c1bf18-c1ae-4c22-bff0-2ef805a96560.png');
        const blob = await response.blob();
        
        // Load image
        const imageElement = await loadImage(blob);
        console.log('Image loaded successfully');
        
        // Remove background
        const transparentBlob = await removeBackground(imageElement);
        console.log('Background removed successfully');
        
        // Create URL for the transparent logo
        const transparentUrl = URL.createObjectURL(transparentBlob);
        onLogoReady(transparentUrl);
        
        setIsProcessing(false);
      } catch (error) {
        console.error('Error processing logo:', error);
        // Fallback to original logo if processing fails
        onLogoReady('/lovable-uploads/93c1bf18-c1ae-4c22-bff0-2ef805a96560.png');
        setIsProcessing(false);
      }
    };

    processLogo();
  }, [onLogoReady]);

  if (isProcessing) {
    return (
      <div className="w-16 h-12 bg-gray-700 animate-pulse rounded"></div>
    );
  }

  return null;
};

export default LogoProcessor;
