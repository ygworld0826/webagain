// src/components/ModelPortfolio/ImageGallery.tsx
import React, { useState, useEffect, useCallback } from 'react';

interface ImageGalleryProps {
  images: string[];
  modelName?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  modelName = "모델" 
}) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Images per page
  const imagesPerPage = 12;
  
  // Total pages calculation
  const totalPages = Math.ceil(images.length / imagesPerPage);
  
  // Get images for current page
  const currentImages = images.slice(
    currentPage * imagesPerPage, 
    (currentPage + 1) * imagesPerPage
  );
  
  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Select first image of the new page
    setSelectedImage(pageNumber * imagesPerPage);
  };
  
  // Navigation handlers
  const handlePrevImage = useCallback(() => {
    const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1;
    setSelectedImage(newIndex);
    // Change page if needed
    const newPage = Math.floor(newIndex / imagesPerPage);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [selectedImage, images.length, imagesPerPage, currentPage]);

  const handleNextImage = useCallback(() => {
    const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(newIndex);
    // Change page if needed
    const newPage = Math.floor(newIndex / imagesPerPage);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [selectedImage, images.length, imagesPerPage, currentPage]);
  
  // Lightbox toggle
  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (e.key === 'ArrowRight') {
          handleNextImage();
        } else if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevImage, handleNextImage]);
  
  // Set loading state
  useEffect(() => {
    setIsLoading(true);
    
    const img = new Image();
    img.src = images[selectedImage];
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };
  }, [selectedImage, images]);
  
  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swipe left, go to next
      handleNextImage();
    } else if (distance < -minSwipeDistance) {
      // Swipe right, go to previous
      handlePrevImage();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  if (images.length === 0) {
    return (
      <div className="gallery-loading">
        <p>이미지를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* Main Image */}
      <div 
        className="main-image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[selectedImage]}
          alt={`${modelName} 메인 이미지`}
          className="main-image"
          onClick={toggleLightbox}
          onError={(e) => {
            console.error("이미지 로드 실패:", e.currentTarget.src);
            // Replace with first valid image
            if (images.length > 0 && images[0]) {
              e.currentTarget.src = images[0];
            }
          }}
        />
        <div className="image-caption">
          {modelName} - 포트폴리오 이미지
        </div>
        
        {/* Image counter */}
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
        
        {/* Nav buttons */}
        <button 
          className="nav-button prev-button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
          aria-label="이전 이미지"
        >
          <span className="nav-arrow">&#8249;</span>
        </button>
        <button 
          className="nav-button next-button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
          aria-label="다음 이미지"
        >
          <span className="nav-arrow">&#8250;</span>
        </button>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`page-button ${index === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(index)}
              aria-label={`페이지 ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      
      {/* Thumbnails Grid */}
      <div className="thumbnails-container">
        {currentImages.map((image, index) => {
          const actualIndex = currentPage * imagesPerPage + index;
          return (
            <div 
              key={index} 
              className={`thumbnail-item ${selectedImage === actualIndex ? 'selected' : ''}`}
              onClick={() => handleThumbnailClick(actualIndex)}
            >
              <img 
                src={image} 
                alt={`${modelName} 썸네일 ${actualIndex + 1}`} 
                className="thumbnail-image"
                onError={(e) => {
                  console.error("썸네일 로드 실패:", e.currentTarget.src);
                  if (images.length > 0 && images[0]) {
                    e.currentTarget.src = images[0];
                  }
                }}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="lightbox"
          onClick={toggleLightbox}
        >
          <div 
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[selectedImage]} 
              alt={`${modelName} 확대 이미지`}
              className="lightbox-image" 
            />
            <button 
              className="lightbox-close"
              onClick={toggleLightbox}
              aria-label="닫기"
            >
              &times;
            </button>
            <button 
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="이전 이미지"
            >
              &#8249;
            </button>
            <button 
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="다음 이미지"
            >
              &#8250;
            </button>
            <div className="lightbox-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;