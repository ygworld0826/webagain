// src/pages/PortfolioPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import ModelCard from '../components/ModelPortfolio/ModelCard';
import ImageGallery from '../components/ModelPortfolio/ImageGallery';
import '../styles/PortfolioPage.css';

// 모델 정보
const modelInfo = {
  id: "sung-hwan",
  name: "성환",
  age: 28,
  height: 183,
  gender: "Male",
  ethnicity: "Asian",
  measurements: {
    chest: "98cm",
    waist: "76cm",
    shoes: "275mm",
  },
  bio: "성환은 상업 및 에디토리얼 작업 모두에서 경험이 있는 다재다능한 모델입니다. 서울에 기반을 두고 있으며, 다양한 패션 브랜드 및 사진작가와 협업했습니다. 그의 전문적인 태도와 적응 가능한 외모는 다양한 범위의 모델링 업무에 적합합니다.",
  experience: [
    "서울 패션 위크 2023",
    "보그 코리아 에디토리얼, 2024년 봄",
    "삼성 갤럭시 캠페인",
    "GQ 코리아 피처",
    "현대백화점 카탈로그",
    "무인양품 라이프스타일 캠페인"
  ]
};

// 모델 포트폴리오 이미지 전체 목록
const portfolioImages = [
  "/images/portfolio/3364.jpg",
  "/images/portfolio/3365.jpg",
  "/images/portfolio/3381.jpg",
  "/images/portfolio/3509.jpg",
  "/images/portfolio/3520.jpg",
  "/images/portfolio/3522.jpg",
  "/images/portfolio/3530.jpg",
  "/images/portfolio/3534.jpg",
  "/images/portfolio/3535.jpg",
  "/images/portfolio/3537.jpg",
  "/images/portfolio/3544.jpg",
  "/images/portfolio/3572.jpg",
  "/images/portfolio/3575.jpg",
  "/images/portfolio/3577.jpg",
  "/images/portfolio/3578.jpg",
  "/images/portfolio/31311.jpg",
  "/images/portfolio/33411.jpg",
  "/images/portfolio/34261.jpg",
  "/images/portfolio/20240821_0037.jpg",
  "/images/portfolio/IMG_4459.JPG",
  "/images/portfolio/IMG_4465.JPG",
  "/images/portfolio/IMG_5532.JPG"
];

// 측정 데이터 생성 함수
const generateMeasurements = () => [
  { label: "HEIGHT", value: `${modelInfo.height}cm` },
  { label: "CHEST", value: modelInfo.measurements.chest },
  { label: "WAIST", value: modelInfo.measurements.waist },
  { label: "SHOES", value: modelInfo.measurements.shoes },
  { label: "HAIR", value: "BLACK" },
  { label: "EYES", value: "BROWN" }
];

const PortfolioPage: React.FC = () => {
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleCards, setVisibleCards] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    { id: "all", label: "모든 작업" },
    { id: "editorial", label: "에디토리얼" },
    { id: "commercial", label: "커머셜" },
    { id: "runway", label: "런웨이" }
  ];
  
  // Filtering function (dummy implementation - in a real app, images would have categories)
  const filterImagesByCategory = (category: string) => {
    if (category === "all") return portfolioImages;
    
    // For demo purposes, just assigning images to categories based on their index
    return portfolioImages.filter((_, index) => {
      if (category === "editorial") return index % 3 === 0;
      if (category === "commercial") return index % 3 === 1;
      if (category === "runway") return index % 3 === 2;
      return false;
    });
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCards(0);
    
    // Filter images
    const filtered = filterImagesByCategory(category);
    setValidImages(filtered);
    
    // Reset animation
    setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleCards(prev => {
          if (prev < filtered.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 100);
    }, 100);
  };
  
  // Initialize images and animations
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate checking images
    const checkImages = async () => {
      try {
        // In a real app, you would validate these images
        const filtered = filterImagesByCategory(selectedCategory);
        setValidImages(filtered);
        console.log(`${filtered.length}개의 유효한 이미지를 찾았습니다.`);
      } catch (error) {
        console.error("이미지 확인 중 오류가 발생했습니다:", error);
        setValidImages(["/images/placeholders/sunghwan.jpg"]);
      } finally {
        setIsLoading(false);
        
        // Start appearing animation for cards
        setTimeout(() => {
          const interval = setInterval(() => {
            setVisibleCards(prev => {
              if (prev < portfolioImages.length) {
                return prev + 1;
              }
              clearInterval(interval);
              return prev;
            });
          }, 100);
        }, 300);
      }
    };
    
    checkImages();
    
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    return () => observerRef.current?.disconnect();
  }, []);
  
  // Apply intersection observer to elements
  useEffect(() => {
    if (!isLoading && portfolioRef.current) {
      const elements = portfolioRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        observerRef.current?.observe(el);
      });
    }
  }, [isLoading, validImages]);
  
  return (
    <div className="portfolio-page" ref={portfolioRef}>
      {isLoading ? (
        <div className="portfolio-loading">
          <div className="portfolio-loader"></div>
          <p>포트폴리오를 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          <header className="portfolio-header">
            <h1 className="portfolio-title">모델 포트폴리오</h1>
            <div className="portfolio-subtitle animate-on-scroll">
              <span>{modelInfo.name}</span>
              <span>{modelInfo.height}cm</span>
              <span>{modelInfo.ethnicity}</span>
            </div>
          </header>
          
          {/* 모델 상세 정보 섹션 */}
          <section className="model-detail-section">
            <div className="model-detail-container">
              <div className="model-gallery-container animate-on-scroll">
                <ImageGallery 
                  images={validImages.slice(0, 5)} // 첫 5개 이미지만 갤러리에 사용
                  modelName={modelInfo.name}
                />
              </div>
              
              <div className="model-info-container animate-on-scroll">
                <h2 className="model-info-heading">{modelInfo.name}</h2>
                
                <div className="model-stats">
                  <div className="stat-item">
                    <span className="stat-label">나이:</span>
                    <span className="stat-value">{modelInfo.age}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">신장:</span>
                    <span className="stat-value">{modelInfo.height}cm</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">성별:</span>
                    <span className="stat-value">{modelInfo.gender}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">인종:</span>
                    <span className="stat-value">{modelInfo.ethnicity}</span>
                  </div>
                  {Object.entries(modelInfo.measurements).map(([key, value]) => (
                    <div key={key} className="stat-item">
                      <span className="stat-label">
                        {key === 'chest' ? '가슴' : key === 'waist' ? '허리' : key === 'shoes' ? '신발' : key}:
                      </span>
                      <span className="stat-value">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="model-section">
                  <h3 className="section-heading">소개</h3>
                  <p className="model-bio">{modelInfo.bio}</p>
                </div>
                
                <div className="model-section">
                  <h3 className="section-heading">경력</h3>
                  {modelInfo.experience.length > 0 ? (
                    <ul className="experience-list">
                      {modelInfo.experience.map((exp, index) => (
                        <li key={index} className="experience-item">{exp}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>경력 정보가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* 카테고리 필터 */}
          <section className="portfolio-categories-section">
            <div className="category-filters">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </section>
          
          {/* 포트폴리오 그리드 섹션 */}
          <section className="portfolio-grid-section">
            <h2 className="portfolio-section-heading">포트폴리오</h2>
            
            <div className="portfolio-grid">
              {validImages.map((image, index) => (
                <div 
                  key={`model-card-${index}`}
                  className={`portfolio-card-wrapper ${index < visibleCards ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ModelCard
                    id={`image-${index}`}
                    name={modelInfo.name}
                    image={image}
                    measurements={generateMeasurements()}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PortfolioPage;