// src/pages/GalleryPage.tsx
import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ModelPortfolio/ImageGallery';
import '../styles/GalleryPage.css';

// 포트폴리오 이미지 import
import model1 from '../images/model1.jpg';
import model2 from '../images/model2.jpg';
import swh from '../images/swh.jpg';
import swh2 from '../images/swh2.jpg';
import img2669 from '../images/2669.jpg';
import img2731 from '../images/2731.jpg';
import img2732 from '../images/2732.jpg';
import img2738 from '../images/2738.jpg';
import img2740 from '../images/2740.jpg';
import img2741 from '../images/2741.jpg';
import img2850 from '../images/2850.jpg';
import img2855 from '../images/2855.jpg';
import img2896 from '../images/2896.jpg';
import img2907 from '../images/2907.jpg';
import img2909 from '../images/2909.jpg';
import img2910 from '../images/2910.jpg';
import img2975 from '../images/2975.jpg';
import img2976 from '../images/2976.jpg';
import img2978 from '../images/2978.jpg';
import img2979 from '../images/2979.jpg';
import img2988 from '../images/2988.jpg';
import img2989 from '../images/2989.jpg';
import img2994 from '../images/2994.jpg';
import img3122 from '../images/3122.jpg';
import img3209 from '../images/3209.jpg';
import img3211 from '../images/3211.jpg';
import img3226 from '../images/3226.jpg';
import img3227 from '../images/3227.jpg';
import img3232 from '../images/3232.jpg';
import img3233 from '../images/3233.jpg';
import img3246 from '../images/3246.jpg';
import img3254 from '../images/3254.jpg';
import img3257 from '../images/3257.jpg';
import img3264 from '../images/3264.jpg';
import img3329 from '../images/3329.jpg';
import img3337 from '../images/3337.jpg';
import img3344 from '../images/3344.jpg';
import img31311 from '../images/31311.jpg';
import img33411 from '../images/33411.jpg';
import img34261 from '../images/34261.jpg';

// 배우 정보
const actorName = "조성환";

// 사진 분류
type CategoryType = "all" | "headshots" | "drama" | "film" | "behindscenes";

interface PhotoItem {
  img: string;
  category: CategoryType;
  title?: string;
  year?: string;
}

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleItems, setVisibleItems] = useState<number>(0);
  
  // Animation on page load
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation for items appearing
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setVisibleItems(prev => {
          if (prev < filteredImages.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isLoading, activeCategory]);
  
  // Reset visible items on category change
  useEffect(() => {
    setVisibleItems(0);
  }, [activeCategory]);

  // 모든 이미지에 카테고리 적용
  const photoItems: PhotoItem[] = [
    { img: model1, category: "headshots", title: "프로필 촬영", year: "2023" },
    { img: model2, category: "headshots", title: "프로필 촬영", year: "2023" },
    { img: swh, category: "film", title: "영화 '그날의 빛' 스틸컷", year: "2023" },
    { img: swh2, category: "film", title: "영화 '그날의 빛' 스틸컷", year: "2023" },
    { img: img2669, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2731, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2732, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2738, category: "behindscenes", title: "드라마 '서울의 밤' 비하인드", year: "2022" },
    { img: img2740, category: "behindscenes", title: "드라마 '서울의 밤' 비하인드", year: "2022" },
    { img: img2741, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img2850, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img2855, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img2896, category: "behindscenes", title: "영화 '마지막 여름' 비하인드", year: "2021" },
    { img: img2907, category: "headshots", title: "매거진 화보", year: "2022" },
    { img: img2909, category: "headshots", title: "매거진 화보", year: "2022" },
    { img: img2910, category: "headshots", title: "매거진 화보", year: "2022" },
    { img: img2975, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2976, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2978, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2979, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img2988, category: "film", title: "영화 '그날의 빛' 스틸컷", year: "2023" },
    { img: img2989, category: "film", title: "영화 '그날의 빛' 스틸컷", year: "2023" },
    { img: img2994, category: "film", title: "영화 '그날의 빛' 스틸컷", year: "2023" },
    { img: img3122, category: "headshots", title: "프로필 촬영", year: "2021" },
    { img: img3209, category: "headshots", title: "프로필 촬영", year: "2021" },
    { img: img3211, category: "headshots", title: "프로필 촬영", year: "2021" },
    { img: img3226, category: "behindscenes", title: "영화 '그날의 빛' 비하인드", year: "2023" },
    { img: img3227, category: "behindscenes", title: "영화 '그날의 빛' 비하인드", year: "2023" },
    { img: img3232, category: "behindscenes", title: "영화 '그날의 빛' 비하인드", year: "2023" },
    { img: img3233, category: "behindscenes", title: "영화 '그날의 빛' 비하인드", year: "2023" },
    { img: img3246, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img3254, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img3257, category: "drama", title: "드라마 '서울의 밤' 스틸컷", year: "2022" },
    { img: img3264, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img3329, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img3337, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img3344, category: "film", title: "영화 '마지막 여름' 스틸컷", year: "2021" },
    { img: img31311, category: "headshots", title: "화보 촬영", year: "2023" },
    { img: img33411, category: "headshots", title: "화보 촬영", year: "2023" },
    { img: img34261, category: "headshots", title: "화보 촬영", year: "2023" }
  ];

  // 현재 선택된 카테고리의 이미지만 필터링
  const filteredImages = activeCategory === 'all' 
    ? photoItems.map(item => item.img)
    : photoItems.filter(item => item.category === activeCategory).map(item => item.img);

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  // Category filter labels
  const categoryLabels = {
    all: "모든 사진",
    headshots: "프로필 & 화보",
    drama: "드라마",
    film: "영화",
    behindscenes: "비하인드"
  };

  // Category count
  const getCategoryCount = (category: CategoryType) => {
    if (category === 'all') return photoItems.length;
    return photoItems.filter(item => item.category === category).length;
  };

  return (
    <div className="gallery-page">
      {isLoading ? (
        <div className="gallery-loading-screen">
          <div className="gallery-loader"></div>
          <p>갤러리를 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          <div className="gallery-header">
            <h2 className="gallery-title">
              {actorName} 갤러리
              <span className="gallery-title-line"></span>
            </h2>
            
            <p className="gallery-intro">
              배우 {actorName}의 다양한 작품 활동과 모습을 만나보세요. 영화, 드라마, 그리고 화보 작업까지 {actorName}의 포트폴리오를 확인할 수 있습니다.
            </p>
          </div>
          
          <div className="category-navigation">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button 
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category as CategoryType)}
              >
                {label}
                <span className="category-count">{getCategoryCount(category as CategoryType)}</span>
              </button>
            ))}
          </div>
          
          <div className="category-results">
            <span className="results-count">
              {filteredImages.length}개의 사진
            </span>
          </div>
          
          <ImageGallery 
            images={filteredImages}
            modelName={actorName}
          />
        </>
      )}
    </div>
  );
};

export default GalleryPage;