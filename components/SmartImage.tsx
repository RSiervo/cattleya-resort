
import React, { useState, useEffect } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  localSrc?: string;
  fallbackSrc: string;
}

/**
 * SmartImage prioritizes a local path from the public directory.
 * If the image fails to load (e.g., file not found), it switches to the remote fallback.
 */
const SmartImage: React.FC<SmartImageProps> = ({ localSrc, fallbackSrc, className, alt, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(localSrc || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  // If localSrc changes externally, reset the error state
  useEffect(() => {
    setCurrentSrc(localSrc || fallbackSrc);
    setHasError(false);
  }, [localSrc, fallbackSrc]);

  const handleError = () => {
    if (!hasError && localSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default SmartImage;
