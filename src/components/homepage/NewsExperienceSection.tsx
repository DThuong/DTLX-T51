// NewsExperienceSection.tsx
import React, { useEffect, useRef} from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import recruitmentNews from '../../data/recruitmentNews';
import experienceNews from '../../data/experienceNews';

// Interface cho News Item
interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

// REGISTER ScrollTrigger once
if (typeof window !== 'undefined' && !(gsap as any)._hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  // mark as registered (prevent duplicate register in hot reload)
  (gsap as any)._hasScrollTrigger = true;
}

/* --------------------
   NewsCard - chỉ render markup, animation được điều khiển tập trung từ NewsSection
   -------------------- */
const NewsCard: React.FC<{ news: NewsItem; index: number }> = ({ news, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <article
      ref={cardRef}
      data-card-index={index}
      className="news-card bg-white rounded-lg overflow-hidden hover:shadow-lg cursor-pointer border border-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200 hover:scale-105 transition-all duration-300"
      tabIndex={0}
      role="article"
      aria-labelledby={`news-title-${news.id}`}
    >
      <div className="flex gap-4 p-4">
        <div className="shrink-0">
          <img
            src={news.image}
            alt={news.title}
            loading="lazy"
            className="w-32 h-24 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 id={`news-title-${news.id}`} className="font-bold text-sm text-gray-800 mb-2 line-clamp-2 uppercase">
            {news.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Calendar className="w-3 h-3" />
            <span>Th {news.date}</span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2">{news.description}</p>
        </div>
      </div>
    </article>
  );
};

/* --------------------
   NewsSection - quản lý animation cho cả section & các card con
   -------------------- */
const NewsSection: React.FC<{
  title: string;
  newsData: NewsItem[];
  limit?: number;
}> = ({ title, newsData, limit = 3 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const sectionEl = sectionRef.current;

    // Animate title reveal (slide up + clip)
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 90%',
            once: true,
            // small delay for title
          },
        }
      );
    }

    // Select cards inside this section
    const cards = Array.from(sectionEl.querySelectorAll<HTMLElement>('.news-card'));

    if (cards.length === 0) return;

    // Create a timeline for the cards with stagger and dynamic directions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        once: false,
        onLeaveBack: () => tl.progress(0).pause(),
        onEnterBack: () => tl.restart(),
      },
    });

    // For each card, compute a "from" state based on index to slide from different sides
    tl.to(
      cards,
      {
        duration: 0.9,
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        ease: 'expo.out',
        stagger: {
          each: 0.12,
          from: 'start',
        },
      },
      0
    );

    // But before that, set initial states per-card using inline set
    cards.forEach((card, i) => {
      const dir = i % 4; // 0: left, 1: right, 2: top, 3: bottom
      let fromVars: any = { opacity: 0, scale: 0.95, rotate: (Math.random() - 0.5) * 3 };
      switch (dir) {
        case 0: // from left
          fromVars.x = -40 - i * 2;
          fromVars.y = 0;
          break;
        case 1: // from right
          fromVars.x = 40 + i * 2;
          fromVars.y = 0;
          break;
        case 2: // from top
          fromVars.y = -28 - i * 1.5;
          fromVars.x = 0;
          break;
        default: // from bottom
          fromVars.y = 28 + i * 1.5;
          fromVars.x = 0;
          break;
      }
      // set initial state instantly
      gsap.set(card, fromVars);
      // add a more 'pop' entrance for each card as sub-timelines (slight overshoot)
      tl.fromTo(
        card,
        { rotation: fromVars.rotate },
        {
          duration: 0.9,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          ease: 'expo.out',
        },
        i * 0.12 // align with stagger
      );
    });

    // cleanup
    return () => {
      try {
        if ((tl as any).scrollTrigger) (tl as any).scrollTrigger.kill();
        tl.kill();
      } catch (e) {
        // ignore
      }
    };
  }, [newsData, limit]);

  const displayNews = newsData.slice(0, limit);

  return (
    <section ref={sectionRef} className="mb-0 flex flex-col h-full">
      <h2 ref={titleRef} className="text-lg md:text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
        {title}
      </h2>

      <div className="flex flex-col gap-3 flex-1 space-y-4 mb-4">
        {displayNews.map((news, index) => (
          <NewsCard key={news.id} news={news} index={index} />
        ))}
      </div>

      <div className="pt-2">
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group"
          aria-label={`Xem tất cả ${title}`}
        >
          <span>Xem tất cả</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

/* --------------------
   Main Component
   -------------------- */
const NewsExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' }
    );
  }, []);

return (
  <div ref={containerRef} className="relative min-h-screen py-4 px-4">
    {/* Layer hình nền nhạt */}
    <div 
      className="absolute inset-0 opacity-100 bg-cover bg-center" 
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, zIndex: 0 }} 
    />

    {/* Nội dung chính */}
    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-4">
        <NewsSection title="TIN TỨC TUYỂN SINH" newsData={recruitmentNews} limit={3} />
        <NewsSection title="KINH NGHIỆM LÁI XE" newsData={experienceNews} limit={3} />
      </div>
    </div>
  </div>
);
};

export default NewsExperienceSection;
