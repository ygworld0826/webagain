// src/components/ModelPortfolio/ModelCard.tsx
import React, { useState } from 'react';

interface Measurement {
  label: string;
  value: string;
}

interface ModelCardProps {
  id: string;
  name: string;
  image: string;
  measurements: Measurement[];
}

const ModelCard: React.FC<ModelCardProps> = ({ id, name, image, measurements }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("이미지 로드 실패:", e.currentTarget.src);
    e.currentTarget.src = "/images/placeholders/sunghwan.jpg";
    setIsLoading(false);
  };
  
  return (
    <div 
      className="model-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading && (
        <div className="card-loading">
          <div className="card-spinner"></div>
        </div>
      )}
      
      <img
        src={image}
        alt={`${name} 포트폴리오 이미지`}
        className="model-card-image"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ filter: isHovered ? 'brightness(0.7)' : 'none' }}
      />
      
      <div 
        className="model-card-overlay"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="model-card-content">
          <h3 className="model-card-name">{name}</h3>
          
          <div className="measurements-container">
            {measurements.map((measurement, index) => (
              <div key={index} className="measurement-item">
                <span className="measurement-label">{measurement.label}</span>
                <span className="measurement-value">{measurement.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;