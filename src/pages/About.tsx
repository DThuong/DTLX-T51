import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CiMapPin } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface Reason {
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  name: string;
  content: string;
  rating: number;
  image: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Commitment {
  title: string;
  description: string;
}

const About: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
              gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 1 });
            },
            onLeaveBack: () => {
              gsap.to(heroRef.current, { opacity: 0, y: 50, duration: 0.5 });
            }
          }
        }
      );
    }

    // Reasons cards animation
    const reasonCards = reasonsRef.current?.querySelectorAll('[data-reason-card]');
    reasonCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.1 });
            },
            onLeaveBack: () => {
              gsap.to(card, { opacity: 0, y: 60, scale: 0.9, duration: 0.5 });
            }
          }
        }
      );
    });

    // Process steps animation
    const processSteps = processRef.current?.querySelectorAll('[data-process-step]');
    processSteps?.forEach((step, index) => {
      gsap.fromTo(step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.9,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(step, { opacity: 1, x: 0, rotateY: 0, duration: 0.9, delay: index * 0.08 });
            },
            onLeaveBack: () => {
              gsap.to(step, { opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 15, duration: 0.5 });
            }
          }
        }
      );
    });

    // Testimonials animation
    const testimonialCards = testimonialsRef.current?.querySelectorAll('[data-testimonial]');
    testimonialCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(card, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, delay: index * 0.1 });
            },
            onLeaveBack: () => {
              gsap.to(card, { opacity: 0, scale: 0.8, rotation: -5, duration: 0.5 });
            }
          }
        }
      );
    });

    // Commitments animation
    const commitmentCards = commitmentsRef.current?.querySelectorAll('[data-commitment]');
    commitmentCards?.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
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
              gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.08 });
            },
            onLeaveBack: () => {
              gsap.to(card, { opacity: 0, y: 40, scale: 0.95, duration: 0.5 });
            }
          }
        }
      );
    });

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(ctaRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.9 });
            },
            onLeaveBack: () => {
              gsap.to(ctaRef.current, { opacity: 0, scale: 0.9, y: 30, duration: 0.5 });
            }
          }
        }
      );
    }

    // Section headers animation
    const headers = document.querySelectorAll('[data-section-header]');
    headers.forEach((header) => {
      gsap.fromTo(header,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset',
            onEnterBack: () => {
              gsap.to(header, { opacity: 1, y: 0, duration: 0.8 });
            },
            onLeaveBack: () => {
              gsap.to(header, { opacity: 0, y: -30, duration: 0.5 });
            }
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const reasons: Reason[] = [
    {
      title: "Đội ngũ giảng viên chuyên nghiệp",
      description: "Giáo viên giàu kinh nghiệm, tận tâm, kiên nhẫn hướng dẫn từng học viên",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
    },
    {
      title: "Cơ sở vật chất hiện đại",
      description: "Sân tập rộng rãi, xe tập đời mới, đầy đủ trang thiết bị an toàn",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
    },
    {
      title: "Lịch học linh hoạt",
      description: "Sắp xếp thời gian học phù hợp với công việc và sinh hoạt của học viên",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop"
    },
    {
      title: "Chi phí hợp lý",
      description: "Học phí minh bạch, không phát sinh chi phí ẩn, hỗ trợ trả góp",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Nguyễn Văn An",
      content: "Tôi đã học và thi đậu lần đầu nhờ sự hướng dẫn tận tình của thầy Tuấn. Môi trường học tập chuyên nghiệp, xe tập đời mới rất dễ lái.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    {
      name: "Trần Thị Bình",
      content: "Là học viên nữ, tôi khá lo lắng khi học lái xe. Nhưng các thầy rất kiên nhẫn, sân tập rộng rãi giúp tôi tự tin hơn rất nhiều.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    {
      name: "Lê Minh Cường",
      content: "Lịch học linh hoạt, phù hợp với công việc của tôi. Thi sát hạch một lần đậu, rất hài lòng với chất lượng đào tạo.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Đăng ký thông tin",
      description: "Điền form đăng ký hoặc liên hệ trực tiếp qua hotline để được tư vấn chi tiết",
    },
    {
      step: "02",
      title: "Nộp hồ sơ & học lý thuyết",
      description: "Chuẩn bị giấy tờ theo quy định, tham gia lớp học lý thuyết và thi sát hạch lý thuyết",
    },
    {
      step: "03",
      title: "Học thực hành",
      description: "Luyện tập thực hành trên sân tập với giáo viên hướng dẫn 1-1",
    },
    {
      step: "04",
      title: "Thi sát hạch & cấp bằng",
      description: "Tham gia thi sát hạch thực hành, hoàn thành thủ tục cấp giấy phép lái xe",
    }
  ];

  const commitments: Commitment[] = [
    {
      title: "Đào tạo đạt chuẩn",
      description: "Cam kết đào tạo theo đúng quy trình của Bộ Giao thông Vận tải, đảm bảo học viên nắm vững kiến thức và kỹ năng lái xe an toàn",
    },
    {
      title: "Hỗ trợ thi lại miễn phí",
      description: "Nếu không đậu lần đầu, học viên được hỗ trợ ôn tập và thi lại hoàn toàn miễn phí đến khi đậu",
    },
    {
      title: "Đội xe tập đời mới",
      description: "100% xe tập được bảo dưỡng định kỳ, đảm bảo an toàn và chất lượng học tập tốt nhất",
    },
    {
      title: "Giá cả minh bạch",
      description: "Công khai mọi chi phí, không phát sinh thêm bất kỳ khoản phí nào ngoài hợp đồng",
    }
  ];

  return (
    <div className="font-sans antialiased text-gray-800">
      {/* Hero Section */}
      <div 
        className="relative min-h-80 md:min-h-[420px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop')`
        }}
      >
        <div className="bg-white/40 absolute inset-0 w-full blur-2xl"></div>
        <div ref={heroRef} className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            Trung Tâm Đào Tạo Lái Xe Tuấn Long
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white">
            Đào tạo lái xe an toàn - Chuyên nghiệp - Uy tín
          </p>
        </div>
      </div>

      {/* Lý do nên học */}
      <section ref={reasonsRef} className="py-5 mt-4 lg:mt-2 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div data-section-header className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              Tại Sao Nên Học Tại Tuấn Long?
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Những lý do khiến hơn 10,000 học viên tin tưởng lựa chọn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {reasons.map((reason, index) => (
              <article
                key={index}
                data-reason-card
                className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition transform duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-full h-44 sm:h-40 md:h-48 lg:h-44 overflow-hidden">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 md:p-6 flex-1">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình đăng ký */}
      <section ref={processRef} className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white mt-5 lg:mt-5">
        <div className="max-w-7xl mx-auto">
          <div data-section-header className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              Quy Trình Đăng Ký Học
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              4 bước đơn giản để bắt đầu hành trình của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                data-process-step
                className="p-4 flex flex-col items-center text-center bg-white rounded-xl md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 font-bold text-2xl mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cảm nhận học viên */}
      <section ref={testimonialsRef} className="py-5 mt-5 lg:mt-5py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div data-section-header className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              Cảm Nhận Của Học Viên
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Những chia sẻ chân thực từ học viên đã học tại Tuấn Long
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                data-testimonial
                className="flex flex-col bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition transform duration-300 hover:scale-102"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-0">
                      {testimonial.name}
                    </h4>
                    <div className="text-yellow-400 text-sm md:text-base mt-1">
                      {'⭐'.repeat(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic text-sm md:text-base leading-relaxed">
                  "{testimonial.content}"
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section ref={commitmentsRef} className="pt-5 pb-5 mt-5 lg:mt-5 py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div data-section-header className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Cam Kết Từ Tuấn Long
            </h2>
            <p className="text-sm md:text-base lg:text-lg opacity-90">
              Những cam kết vàng mang đến sự yên tâm cho học viên
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                data-commitment
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 md:p-6 hover:bg-opacity-20 transition transform duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {commitment.title}
                </h3>
                <p className="opacity-90 text-sm md:text-base leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


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

export default About;
