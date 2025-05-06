import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X, Menu, ArrowRight } from 'lucide-react';

// 사용 가능한 이미지만 import
// 파일이 실제로 존재하는 경로에 맞게 수정하세요
import model1 from './images/model1.jpg'; // 이 파일이 없다면 주석 처리
import model2 from './images/model2.jpg'; // 이 파일이 없다면 주석 처리
import about from './images/about.jpg';
import swh from './images/swh.jpg'; // 이 파일이 없다면 주석 처리
import swh2 from './images/swh2.jpg'; // 이 파일이 없다면 주석 처리
import img2669 from './images/2669.jpg'; // 이 파일이 없다면 주석 처리
import img2731 from './images/2731.jpg'; // 이 파일이 없다면 주석 처리
import img2732 from './images/2732.jpg'; // 이 파일이 없다면 주석 처리
import img2738 from './images/2738.jpg'; // 이 파일이 없다면 주석 처리

// about.jpg가 없으므로 다른 이미지 사용
// 실제 존재하는 이미지 중 하나를 선택
const aboutImage = about; // 또는 다른 사용 가능한 이미지

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Model info
  const modelInfo = {
    name: "조성환",
    englishName: "CHO SUNG-HWAN",
    stats: [
      { label: "HEIGHT", value: "183cm" },
      { label: "CHEST", value: "98cm" },
      { label: "WAIST", value: "76cm" },
      { label: "SHOES", value: "275mm" },
      { label: "HAIR", value: "Black" },
      { label: "EYES", value: "Brown" }
    ],
    categories: ["Editorial", "Fashion", "Commercial", "Runway"],
    agencies: ["IMG Models Seoul", "Elite Milan"]
  };
  
  // 사용 가능한 이미지로 배열 구성
  // 실제 존재하는 이미지만 포함시키세요
  const images = [
    swh,
    swh2
  ];
  
  // Portfolio 이미지 - 실제 존재하는 이미지만 포함시키세요
  const portfolioImages = [
    img2669,
    img2731,
    img2732, 
    img2738,
    model1,
    model2,
    swh,
    swh2,
    img2669 // 9개 채우기 위해 일부 이미지 재사용
  ];
  
  // Portfolio categories and items
  const portfolioCategories = [
    { id: 'editorial', name: 'Editorial' },
    { id: 'campaign', name: 'Campaign' },
    { id: 'runway', name: 'Runway' }
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Handle scroll for section detection
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          // 여기가 수정된 부분 - null 처리 추가
          const id = section.getAttribute('id');
          if (id) {
            current = id;
          }
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  // 이벤트 타입 지정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = () => {
    // In a real app, you would handle the form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Show success message
    alert("Message sent successfully!");
  };
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-thin tracking-widest text-black mb-6">{modelInfo.englishName}</div>
          <div className="w-6 h-6 border-t-2 border-black animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-white text-black font-light">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <a href="#hero" className="text-xl font-thin tracking-widest">
            {modelInfo.englishName}
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#hero" className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'hero' ? 'text-black' : 'text-gray-400'}`}>Home</a>
            <a href="#about" className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'about' ? 'text-black' : 'text-gray-400'}`}>About</a>
            <a href="#portfolio" className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'portfolio' ? 'text-black' : 'text-gray-400'}`}>Portfolio</a>
            <a href="#contact" className={`text-sm uppercase tracking-wider transition-colors ${activeSection === 'contact' ? 'text-black' : 'text-gray-400'}`}>Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-black"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
            <div className="text-xl font-thin tracking-widest">{modelInfo.englishName}</div>
            <button 
              className="text-black"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col px-6 pt-12 space-y-8">
            <a 
              href="#hero" 
              className="text-2xl font-thin uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-2xl font-thin uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#portfolio" 
              className="text-2xl font-thin uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio
            </a>
            <a 
              href="#contact" 
              className="text-2xl font-thin uppercase tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          
          <div className="mt-auto p-6 border-t border-gray-100">
            <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Represented by</div>
            {modelInfo.agencies.map((agency, index) => (
              <div key={index} className="text-sm uppercase tracking-wider mb-1">{agency}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            {images.map((img, index) => (
              <div 
                key={index}
                className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
                style={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-thin mb-4 tracking-wider">{modelInfo.englishName}</h1>
            <div className="flex justify-center gap-6 md:gap-12 opacity-80">
              {modelInfo.categories.map((category, index) => (
                <span key={index} className="text-sm uppercase tracking-wider">{category}</span>
              ))}
            </div>
          </div>
          
          <a 
            href="#about"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60 hover:opacity-100 transition-opacity animate-bounce"
          >
            <ChevronDown size={32} />
          </a>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-thin mb-8 tracking-wider">About</h2>
                <p className="mb-6 leading-relaxed">
                  조성환은 다양한 감정과 캐릭터를 표현하는 능력이 뛰어난 배우입니다. 영화, 드라마, 연극 등 다양한 분야에서 활동하며 특히 액션 연기와 섬세한 감정 연기를 균형있게 구사합니다.
                </p>
                <p className="leading-relaxed">
                  끊임없는 자기 계발과 연기에 대한 열정으로 매 작품마다 새로운 모습을 보여주고 있습니다. 2023년 서울독립영화제 신인연기상을 수상하였으며, 국내외 다양한 브랜드 및 매체와 협업하고 있습니다.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {modelInfo.stats.map((stat, index) => (
                  <div key={index} className="border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="font-light">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={aboutImage} 
                alt={modelInfo.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 md:py-32 bg-gray-50">
          <div className="px-6 md:px-12 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-thin mb-12 md:mb-16 tracking-wider">Portfolio</h2>
            
            <div className="flex overflow-x-auto mb-12 no-scrollbar">
              <div className="flex space-x-8">
                {portfolioCategories.map((category) => (
                  <button
                    key={category.id}
                    className="text-sm uppercase tracking-wider whitespace-nowrap border-b-2 border-transparent hover:border-black pb-2 transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioImages.map((img, index) => (
                <div key={index} className="group relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={img} 
                    alt={`Portfolio item ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-black py-2 px-4 text-sm uppercase tracking-wider flex items-center">
                      View <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button 
                className="inline-flex items-center text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                onClick={() => console.log('View all works clicked')}
              >
                View All Work <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
  {/* 컨택트 섹션 - 개선된 버전 */}
{/* 컨택트 섹션 - 오류 수정 및 개선된 버전 */}
<section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-gray-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-thin mb-16 tracking-wider text-center">
      <span className="relative inline-block">
        Contact
        <span className="absolute bottom-0 left-1/2 w-12 h-0.5 bg-black transform -translate-x-1/2 mt-4"></span>
      </span>
    </h2>
    
    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
      {/* 왼쪽: 컨택트 정보 */}
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-2xl font-thin mb-8 tracking-wider">Get In Touch</h3>
        
        <div className="space-y-8">
          {/* 에이전시 정보 */}
          <div className="flex border-b border-gray-100 pb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Representation</div>
              {modelInfo.agencies.map((agency: string, index: number) => (
                <div key={index} className="font-light mb-1 text-lg">{agency}</div>
              ))}
            </div>
          </div>
          
          {/* 예약 정보 */}
          <div className="flex border-b border-gray-100 pb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Booking</div>
              <div className="font-light mb-1 text-lg">booking@agency.com</div>
              <div className="font-light text-lg">+82 10-1234-5678</div>
            </div>
          </div>
          
          {/* 소셜 미디어 링크 */}
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Social</div>
              <div className="flex space-x-4">
                {[
                  { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
                  { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' }
                ].map((social: { name: string; url: string; icon: string }, index: number) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-full text-sm uppercase tracking-wider hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 오른쪽: 컨택트 폼 */}
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-2xl font-thin mb-8 tracking-wider">Send a Message</h3>
        
        <div className="space-y-6">
          {/* 이름 입력 */}
          <div className="group">
            <label htmlFor="name" className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-200 py-3 px-4 focus:border-black outline-none transition-colors bg-gray-50 rounded-t-md group-hover:bg-gray-100"
            />
          </div>
          
          {/* 이메일 입력 */}
          <div className="group">
            <label htmlFor="email" className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-200 py-3 px-4 focus:border-black outline-none transition-colors bg-gray-50 rounded-t-md group-hover:bg-gray-100"
            />
          </div>
          
          {/* 메시지 입력 */}
          <div className="group">
            <label htmlFor="message" className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border-b-2 border-gray-200 py-3 px-4 focus:border-black outline-none transition-colors bg-gray-50 rounded-t-md group-hover:bg-gray-100"
            ></textarea>
          </div>
          
          {/* 제출 버튼 */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-4 px-8 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-md shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      </main>
      
      {/* Footer */}
      <footer className="py-6 px-6 md:px-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} {modelInfo.englishName}</div>
          
          <div className="flex space-x-6">
            <a 
              href="/privacy-policy" 
              className="text-xs uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              className="text-xs uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;