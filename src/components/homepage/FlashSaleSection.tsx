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
  // đúng kiểu: mỗi item có thể null
  const coursesRef = useRef<(HTMLDivElement | null)[]>([]);

  // countdown unchanged
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

  // helper: wait images inside container to load (prevents ScrollTrigger position bugs)
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
    // guard for SSR / safety
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // wait images loaded first, then setup animations
      (async () => {
        await waitImagesLoaded(containerRef.current);

        // collect valid elements safely
        const headerEl = headerRef.current as HTMLDivElement | null;
        const timerEl = timerRef.current as HTMLDivElement | null;
        const courseEls = coursesRef.current.filter(Boolean) as HTMLDivElement[];

        // optional: if you prefer selector-based:
        // const courseEls = gsap.utils.toArray<HTMLDivElement>(".fs-course");

        // set defaults
        gsap.set([headerEl, timerEl, courseEls], { autoAlpha: 1 });

        // create timeline scoped to container
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
            // scrub: 0.6, // uncomment if you want scroll-linked (mượt theo scroll)
            // markers: true
          },
        });

        // header
        if (headerEl) {
          tl.fromTo(
            headerEl,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
        }

        // timer
        if (timerEl) {
          tl.fromTo(
            timerEl,
            { x: 40, opacity: 0, scale: 0.9 },
            { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" },
            "-=0.55"
          );
        }

        // courses (filter empty)
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

        // ensure ScrollTrigger knows layout sizes after images loaded
        ScrollTrigger.refresh();
      })();
    }, containerRef);

    // cleanup
    return () => {
      ctx.revert();
      // ensure kill leftover triggers
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <div
      className="bg-linear-to-br from-blue-900 to-grey-400 rounded-2xl shadow-2xl p-5"
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-3 gap-4">
        <div className="flex items-start gap-3" ref={headerRef}>
          <div className="bg-white p-2 rounded-full animate-pulse">
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              GIẢM SỐC ĐĂNG KÝ HÔM NAY GIẢM NGAY 1.000.000 VNĐ
              <span className="bg-red-400 text-sm text-white px-2 py-1 rounded-full animate-bounce">
                Hot!
              </span>
            </h2>
            <p className="text-white/90 text-md mt-1">
              🎓 Hơn 100+ học viên đã ghi danh • Giảm 1.000.000₫ cho học viên ghi danh hôm nay.
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
          ref={timerRef}
        >
          <span className="text-white font-semibold text-sm">Kết thúc sau</span>
          <div className="flex gap-1">
            <div className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg min-w-[50px] text-center animate-pulse">
              {String(timeLeft.hours).padStart(2, "0")}
              <div className="text-xs font-normal">Giờ</div>
            </div>
            <span className="text-white font-bold text-2xl">:</span>
            <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-lg min-w-[50px] text-center animate-pulse">
              {String(timeLeft.minutes).padStart(2, "0")}
              <div className="text-xs font-normal">Phút</div>
            </div>
            <span className="text-white font-bold text-2xl">:</span>
            <div className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-lg min-w-[50px] text-center animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
              <div className="text-xs font-normal">Giây</div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {courses.map((course, index) => (
          <div
            key={course.id}
            // lưu luôn null nếu không có element (giữ index mapping)
            ref={(el) => { coursesRef.current[index] = el;}}
            className="fs-course bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={course.image}
                alt={course.title}
                className="shadow-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-3 bg-red-600 text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
                {course.discount}
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3 line-clamp-3 h-24 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-red-500">{course.price}</span>
              </div>

              {/* Old Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-400 line-through">{course.oldPrice}</span>
              </div>

              {/* Students Progress */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Đã có {course.students} học viên ghi danh hôm nay</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
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
