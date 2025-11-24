import React, { useEffect, useRef } from 'react';
import { Calendar, Shield, Clock, Award } from 'lucide-react';
import { FaRegStar } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignupDetailForm from './FormSection';

gsap.registerPlugin(ScrollTrigger);

// Data cho các tính năng
interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Calendar className="w-8 h-8" />,
    title: "Học tập trên nền tảng số",
    description: "Trung tâm lái xe Tuấn Long ứng dụng công nghệ học online qua các nền tảng như máy tính, điện thoại di động (iOS, Android, Windows). Học viên truy cập nội dung bài giảng mọi lúc, mọi nơi, bất cứ lúc nào mà không cần đến trung tâm thường xuyên. Video hướng dẫn và tài liệu số hóa giúp học viên dễ dàng nắm vững kiến thức lý thuyết."
  },
  {
    id: 2,
    icon: <Shield className="w-8 h-8" />,
    title: "Đội ngũ giảng viên chuyên nghiệp",
    description: "Đội ngũ giảng viên giàu kinh nghiệm, tận tâm và chuyên nghiệp. Phương pháp giảng dạy hiện đại, dễ hiểu giúp học viên nhanh chóng nắm bắt kiến thức và kỹ năng lái xe an toàn. Cam kết đào tạo đạt chuẩn quốc gia với tỷ lệ đậu cao."
  },
  {
    id: 3,
    icon: <Clock className="w-8 h-8" />,
    title: "Lịch học linh hoạt",
    description: "Thời gian học linh hoạt phù hợp với lịch làm việc của học viên. Có thể sắp xếp lịch học buổi sáng, chiều hoặc tối. Cam kết hoàn thành khóa học đúng thời gian đã đăng ký với chất lượng đào tạo tốt nhất."
  },
  {
    id: 4,
    icon: <Award className="w-8 h-8" />,
    title: "Cơ sở vật chất hiện đại",
    description: "Trang thiết bị học tập và xe tập lái hiện đại, đạt chuẩn. Sân tập rộng rãi, đảm bảo an toàn tuyệt đối cho học viên. Phòng học lý thuyết được trang bị đầy đủ thiết bị hiện đại, tạo môi trường học tập tốt nhất."
  }
];

const SignupForm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const signupDetailRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const imgs = imagesRef.current.filter(Boolean) as HTMLDivElement[];
    const feats = featuresRef.current.filter(Boolean) as HTMLDivElement[];

    // set trạng thái ban đầu cho mọi thứ (giữ invisible/offset trước khi animate)
    gsap.set(imgs, { y: 30, scale: 1.08, opacity: 0 });
    gsap.set(tagRef.current, { x: -20, opacity: 0 });
    gsap.set(titleRef.current, { y: 20, opacity: 0 });
    gsap.set(descRef.current, { y: 15, opacity: 0 });
    gsap.set(feats, { y: 30, opacity: 0, scale: 0.98 });
    gsap.set(buttonRef.current, { y: 20, opacity: 0, scale: 0.96 });
    gsap.set(signupDetailRef.current, { y: 20, opacity: 0, scale: 0.98 });

    // timeline với label để chạy đồng thời
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onLeaveBack: () => tl.progress(0).pause(),
        onEnterBack: () => tl.restart()
      }
    });

    // thêm label 'start'
    tl.addLabel("start");
    // GSAP form
    tl.fromTo(
      signupDetailRef.current,
      { y: 20, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "start+=0.05"
    );

    // animate images (stagger nhỏ để vẫn có chiều sâu nhưng bắt đầu cùng lúc với các phần còn lại)
    tl.fromTo(
      imgs,
      { y: 30, scale: 1.08, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.08 },
      "start" // chạy cùng lúc với label
    );

    // animate tag, title, desc, features, button — tất cả bắt đầu tại 'start' (song song)
    tl.fromTo(tagRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
      "start"
    );
    tl.fromTo(titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
      "start"
    );
    tl.fromTo(descRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
      "start"
    );
    tl.fromTo(feats,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power2.out" },
      "start+=0.05" // có thể cho hơi trễ 0.05s nếu muốn
    );
    tl.fromTo(buttonRef.current,
      { y: 20, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
      "start+=0.05"
    );

    // cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };

  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <div className="md:px-6 lg:px-8" ref={containerRef}>
      <div className="w-full mx-auto">
        <div className="bg-white shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[600px]">
            {/* Left Side - Image */}
            <div className="relative h-full min-h-[600px] lg:min-h-full bg-linear-to-b from-blue-900/60 via-blue-900/20 to-transparent">
              <div ref={(el) => {
  if (el) imagesRef.current[0] = el;
}}>
                <img
                  src="https://images.unsplash.com/photo-1619662413798-367880946883?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Driving School"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
              </div>
              <div ref={(el) => {
  if (el) imagesRef.current[1] = el;
}}>
                <img
                  src="https://images.unsplash.com/photo-1659772338512-2d597aee508c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Driving School"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
              </div>
              <div ref={(el) => {
  if (el) imagesRef.current[2] = el;
}}>
                <img
                  src="https://images.unsplash.com/photo-1598248800873-51240b87c8ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Driving School"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/60 via-blue-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="bg-linear-to-b from-blue-50 via-blue-200 to-purple-100 p-4 md:p-12 lg:p-16 h-full">
              {/* Title */}
              <div className="mb-8">
                <div ref={tagRef} className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <FaRegStar /><span>Lựa chọn hàng đầu</span>
                </div>
                <h1 ref={titleRef} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Tại sao chọn đào tạo và sát hạch lái xe{' '}
                  <span className="text-blue-600">Tuấn Long </span><span>?</span>
                </h1>
              </div>

              {/* Description */}
              <div className="mb-10" ref={descRef}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Trung tâm lái xe Tuấn Long nổi bật với phương pháp học lý thuyết trên nền tảng số, 
                  mang lại nhiều tiện ích cho học viên trong thời đại công nghệ
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4">
                {featuresData.map((feature, index) => (
                  <div
                    key={feature.id}
                    ref={(el) => {
                      if (el) featuresRef.current[index] = el;
                    }}
                    className="flex flex-column items-center gap-4 p-5 rounded-2xl hover:bg-blue-300 transition-all duration-300 group cursor-pointer border border-transparent hover:border-purple-700"
                  >
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg text-center font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='py-3'></div>
              <div ref={signupDetailRef} className='w-full'><SignupDetailForm /></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SignupForm;