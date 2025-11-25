import React, { useEffect, useRef, useState, type JSX } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import recruitmentNews from '../data/recruitmentNews';
import experienceNews from '../data/experienceNews';
import SignupDetailForm from '../components/homepage/FormSection';
import { CiMapPin } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

type Category = 'all' | 'recruitment' | 'experience';

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const newsGridRef = useRef<HTMLDivElement>(null);


  // Kết hợp tất cả tin tức
  const allNews: NewsItem[] = [...recruitmentNews, ...experienceNews];

  // Lọc tin tức theo danh mục
  const filteredNews: NewsItem[] = 
    activeCategory === 'all' 
      ? allNews 
      : allNews.filter(news => news.category === activeCategory);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 0.8 });
            },
            onLeaveBack: () => {
              gsap.to(heroRef.current, { opacity: 0, y: 50, duration: 0.5 });
            }
          }
        }
      );
    }

    // News cards animation
    const newsCards = newsGridRef.current?.querySelectorAll('[data-news-card]');
    newsCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.05 });
            },
            onLeaveBack: () => {
              gsap.to(card, { opacity: 0, y: 60, scale: 0.95, duration: 0.5 });
            }
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredNews]);

  const getCategoryLabel = (category: Category): string => {
    switch (category) {
      case 'all':
        return 'Tất cả';
      case 'recruitment':
        return 'Tin tức tuyển sinh';
      case 'experience':
        return 'Kinh nghiệm lái xe';
      default:
        return '';
    }
  };

  const getCategoryBadge = (category: 'recruitment' | 'experience'): JSX.Element => {
    if (category === 'recruitment') {
      return (
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
          Tuyển sinh
        </span>
      );
    }
    return (
      <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
        Kinh nghiệm
      </span>
    );
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center px-5 py-16 md:py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&h=600&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-blue-700 opacity-90"></div>
        <div ref={heroRef} className="relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Tin Tức & Thông Báo
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white opacity-90">
            Cập nhật thông tin tuyển sinh và kinh nghiệm lái xe mới nhất
          </p>
        </div>
      </div>

      {/* Category Filter */}
<div className="bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-5 py-4 md:py-6">

    {/* GRID thay cho flex → giúp nút bằng nhau */}
    <div className="grid grid-cols-3 gap-3 md:gap-4">

      {(['all', 'recruitment', 'experience'] as Category[]).map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          
          className={`
            w-full aspect-square md:aspect-auto 
            flex items-center justify-center

            rounded-lg font-semibold
            text-xs md:text-base transition-all duration-300

            ${activeCategory === category
              ? 'bg-blue-600 text-white shadow-lg scale-95'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-95'}
          `}
        >
          {getCategoryLabel(category)}
        </button>
      ))}

    </div>

  </div>
</div>

      {/* News Grid */}
      <div ref={newsGridRef} className="py-4 max-w-7xl mx-auto px-5 md:py-16 lg:py-20">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {getCategoryLabel(activeCategory)}
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Có {filteredNews.length} bài viết
          </p>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <p className="text-xl md:text-2xl text-gray-500">Không có tin tức nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredNews.map((news) => (
              <article
                key={news.id}
                data-news-card
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative overflow-hidden h-48 md:h-56">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    {getCategoryBadge(news.category === 'recruitment' ? 'recruitment' : 'experience')}
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{news.date}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-4 leading-relaxed">
                    {news.description}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300">
                    Xem chi tiết
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="py-5 px-3 bg-linear-to-br from-blue-100 to-purple-50">
        <SignupDetailForm />
      </div>

      
            {/* Footer */}
            <footer className="py-4 lg:py-5 bg-gray-900 md:py-10 text-white px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-lg md:text-2xl font-bold mb-6">
                  Trung Tâm Đào Tạo Lái Xe Tuấn Long
                </h2>
      
                <div className="flex flex-col gap-3 items-center">
      
                  {/* Địa chỉ */}
                  <p className="text-gray-300 text-sm md:text-base flex items-start gap-2 mb-0 p-2">
                    <CiMapPin size={20} className="text-green-300" />
                    <span>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</span>
                  </p>
      
                  {/* Hotline */}
                  <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-0 p-2">
                    <FaPhoneAlt size={18} className="text-green-300" />
                    <span>Hotline: 0901 234 567</span>
                  </p>
      
                  {/* Email */}
                  <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-0 p-2">
                    <CiMail size={20} className="text-yellow-300" />
                    <span>Email: contact@tuanlong.vn</span>
                  </p>
      
                </div>
              </div>
            </footer>
      
    </div>
  );
};

export default News;