import React, { useState, useEffect, useRef } from "react";
import { Flame, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import courses from "../../data/flashsaleSections";

gsap.registerPlugin(ScrollTrigger);

const FlashSaleSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 16,
    minutes: 0,
    seconds: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<HTMLDivElement | null>(null);
  const coursesRef = useRef<(HTMLDivElement | null)[]>([]);

  // countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // helper: wait images loaded
  const waitImagesLoaded = async (root: HTMLElement | null) => {
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll("img"));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((res) => {
            if ((img as HTMLImageElement).complete) return res();
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          })
      )
    );
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      (async () => {
        await waitImagesLoaded(containerRef.current);

        const headerEl = headerRef.current as HTMLDivElement | null;
        const timerEl = timerRef.current as HTMLDivElement | null;
        const courseEls = coursesRef.current.filter(Boolean) as HTMLDivElement[];

        gsap.set([headerEl, timerEl, courseEls], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onLeaveBack: () => {
              tl.progress(0).pause();
            },
            onEnterBack: () => {
              tl.restart();
            },
          },
        });

        if (headerEl) {
          tl.fromTo(
            headerEl,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }

        if (timerEl) {
          tl.fromTo(
            timerEl,
            { x: 40, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" },
            "-=0.55"
          );
        }

        if (courseEls.length) {
          tl.fromTo(
            courseEls,
            { y: 40, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.45"
          );
        }

        ScrollTrigger.refresh();
      })();
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

   return (
<div
  className="bg-linear-to-r from-blue-400 to-purple-500 rounded-xl sm:rounded-2xl shadow-2xl p-3 md:p-5 flex flex-col items-center"
  ref={containerRef}
>
  {/* Header - Flexbox responsive */}
  <div className="flex flex-col items-center lg:flex-row lg:justify-between  gap-3 sm:gap-4 mb-4 sm:mb-6">
    {/* Title Section */}
    <div
      className="flex flex-col sm:flex-row items-center lg:items-start gap-3 lg:flex-1"
      ref={headerRef}
    >
      <div className="bg-white p-2 sm:p-2.5 rounded-full animate-pulse shrink-0">
        <Flame className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
      </div>

      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="leading-tight">
            GIẢM SỐC ĐĂNG KÝ HÔM NAY GIẢM NGAY 1.000.000 VNĐ
          </span>
          <span className="bg-red-500 text-xs sm:text-sm text-white px-2 py-1 rounded-full animate-pulse whitespace-nowrap">
            Hot!
          </span>
        </h2>
        <p className="text-white text-xs sm:text-sm md:text-base mt-1 sm:m-0">
          🎓 Hơn 100+ học viên đã ghi danh • Giảm 1.000.000₫ cho học viên ghi danh hôm nay.
        </p>
      </div>
    </div>

    {/* Countdown Timer - Flexbox responsive */}
    <div
      className="flex flex-row items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg lg:rounded-full self-center lg:self-auto"
      ref={timerRef}
    >
      <span className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">
        Kết thúc sau
      </span>

      <div className="flex gap-1 sm:gap-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl min-w-[35px] sm:min-w-[45px] md:min-w-[50px] text-center animate-bounce">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-normal text-white mt-0.5">Giờ</div>
        </div>

        <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl self-center leading-none">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl min-w-[35px] sm:min-w-[45px] md:min-w-[50px] text-center animate-bounce">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-normal text-white/90 mt-0.5">Phút</div>
        </div>

        <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl self-center leading-none">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl min-w-[35px] sm:min-w-[45px] md:min-w-[50px] text-center animate-bounce">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="text-[9px] sm:text-[10px] md:text-xs font-normal text-white/90 mt-0.5">Giây</div>
        </div>
      </div>
    </div>
  </div>

      {/* Courses Grid - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
        {courses.map((course, index) => (
          <div
            key={course.id}
            ref={(el) => { coursesRef.current[index] = el; }}
            className="fs-course bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-40 sm:h-44 md:h-48">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Discount Badge */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg animate-pulse">
                {course.discount}
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content - Flexbox Layout */}
            <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
              {/* Title */}
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 sm:line-clamp-3 min-h-10 sm:min-h-[72px] group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              {/* Price Section - Flexbox */}
              <div className="flex flex-col gap-1">
                {/* Current Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-red-500">
                    {course.price}
                  </span>
                </div>

                {/* Old Price */}
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {course.oldPrice}
                  </span>
                </div>
              </div>

              {/* Students Info - Flexbox */}
              <div className="flex flex-col gap-2">
                {/* Students Count */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="line-clamp-1">
                    Đã có <span className="font-semibold">{course.students}</span> học viên ghi danh
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-red-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((course.students / 30) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleSection;