import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, Star, Car } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import coursesData from '../../data/courseData';

gsap.registerPlugin(ScrollTrigger);

// Interface cho Course
interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  image: string;
  vehicleType: string;
  licenseClass: string;
}

// Course Card Component
const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      // Animation khi card xuất hiện
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  useEffect(() => {
    if (cardRef.current) {
      if (isHovered) {
        // Animation khi hover
        gsap.to(cardRef.current, {
          y: -10,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
          {course.licenseClass}
        </span>
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {course.vehicleType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">{course.rating}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex flex-col gap-3 items-center justify-between mt-auto pt-2 border-t border-gray-200">
          <span className="text-xl font-bold text-blue-600">{course.price}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CourseUi: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 10;
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Tính toán pagination
  const totalPages = Math.ceil(coursesData.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = coursesData.slice(indexOfFirstCourse, indexOfLastCourse);

  // Animation cho header khi load trang
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  // Animation khi chuyển trang
  const paginate = (pageNumber: number) => {
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setCurrentPage(pageNumber);
          gsap.to(gridRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
          });
        },
      });
    }
  };

  return (
    <div className="bg-linear-to-t from-blue-100 to-purple-100 min-h-screen px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Header với animation */}
        <div ref={headerRef} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Car className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Các khóa học
            </h1>
          </div>
        </div>

        {/* Course Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8"
        >
          {currentCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Pagination với animation */}
        <div ref={paginationRef} className="flex items-center justify-center gap-2 flex-wrap">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md'
            }`}
          >
            Trước
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                currentPage === number
                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-sm hover:shadow-md'
              }`}
            >
              {number}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md'
            }`}
          >
            Sau
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseUi;