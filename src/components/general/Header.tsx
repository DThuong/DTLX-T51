import React, { useState, useEffect, useRef} from 'react';
import { MdEmail } from "react-icons/md";
import { FaClock, FaUserCircle, FaChevronDown } from "react-icons/fa";

const MENU = [
  { id: 'home', label: 'Trang Chủ', to: '/' },
  {
    id: 'about',
    label: 'Giới Thiệu',
    to: '/gioi-thieu',
    children: [
      { id: 'team', label: 'Đội ngũ', to: '/gioi-thieu/doi-ngu' },
      { id: 'history', label: 'Lịch sử', to: '/gioi-thieu/lich-su' },
      { id: 'contact', label: 'Liên hệ', to: '/gioi-thieu/lien-he' },
    ],
  },
  {
    id: 'courses',
    label: 'Khóa Học Lái Xe',
    to: '/khoa-hoc',
    children: [
      { id: 'car', label: 'Hạng B2', to: '/khoa-hoc/b2' },
      { id: 'motor', label: 'Hạng A1', to: '/khoa-hoc/a1' },
      { id: 'package', label: 'Gói trọn gói', to: '/khoa-hoc/tron-goi' },
    ],
  },
  {
    id: 'news',
    label: 'Tin Tức',
    to: '/tin-tuc',
    children: [
      { id: 'news-all', label: 'Tất cả', to: '/tin-tuc' },
      { id: 'promotion', label: 'Khuyến mãi', to: '/tin-tuc/khuyen-mai' },
      { id: 'tips', label: 'Mẹo lái xe', to: '/tin-tuc/meo-lai-xe' },
    ],
  },
];

const USER_MENU = [
  { id: 'profile', label: 'Hồ sơ', to: '/user/profile' },
  { id: 'settings', label: 'Cài đặt', to: '/user/settings' },
  { id: 'logout', label: 'Đăng xuất', to: '/logout' },
];


const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const userRef = useRef<HTMLDivElement>(null);


    // Click ngoài để đóng dropdown user
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  return (
    <div className='bg-linear-to-b from-blue-50 to-blue-100 shadow-md'>
      {/* Top Header */}
      <div className='bg-blue-600 text-white'>
        <div className='max-w-7xl mx-auto'>
          <div className="flex justify-end items-center gap-6 px-6 py-3 text-sm">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <MdEmail size={18}/>
              <span className='font-medium'>phantrungnam22162018@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <FaClock size={16}/>
              <span className='font-medium'>Thứ 2 - Thứ 7: 08:00 - 17:30 | Online 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='max-w-7xl mx-auto px-6 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className="flex shrink-0">
            <p className='text-3xl text-blue-900 font-bold mb-0 transition-colors cursor-pointer'>
              Đào Tạo Lái Xe Tuấn Long
            </p>
          </div>

          {/* Navigation & Login */}
          <div className="flex items-center gap-8">
            {/* Navigation Menu */}
            <nav>
              <ul className='flex items-center gap-3 mb-0'>
                {MENU.map((menu) => (
                  <li 
                    key={menu.id}
                    className="relative group"
                    onMouseEnter={() => setHoveredMenu(menu.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <a
                      href={menu.to}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(menu.id);
                      }}
                      className={`
                        flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-base
                        transition-all duration-300 ease-in-out
                        ${activeMenu === menu.id 
                          ? 'text-white bg-blue-600 shadow-lg scale-105' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }
                      `}
                    >
                      {menu.label}
                      {menu.children && (
                        <FaChevronDown 
                          size={12} 
                          className={`transition-transform duration-300 ${
                            hoveredMenu === menu.id ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </a>

                    {/* Dropdown Menu */}
                    {menu.children && (
                      <div 
                        className={`
                          absolute top-full left-0 mt-1 w-64 bg-blue-200 shadow-lg
                          transition-all duration-300 ease-in-out origin-top
                          ${hoveredMenu === menu.id 
                            ? 'opacity-100 visible scale-y-100 translate-y-0' 
                            : 'opacity-0 invisible scale-y-95 -translate-y-2'
                          }
                        `}
                      >
                        <ul className='p-0'>
                          {menu.children.map((child) => (
                            <li key={child.id} className="group relative">
                            <a
                                href={child.to}
                                onClick={(e) => e.preventDefault()}
                                className="
                                flex items-center w-full 
                                px-5 py-3 text-gray-700 text-sm font-medium
                                hover:bg-blue-50 hover:text-blue-600
                                transition-colors duration-200 ease-in-out
                                border-l-4 border-transparent hover:border-blue-600 
                                "
                            >
                                <span
                                className="inline-block transform transition-transform duration-200 group-hover:translate-x-2"
                                >
                                {child.label}
                                </span>
                            </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Login */}
            <div ref={userRef} className='relative' onMouseEnter={() => setUserDropdownOpen(true)} onMouseLeave={() => setUserDropdownOpen(false)}>
                <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className='flex items-center rounded-2xl
                           transition-all duration-300 ease-in-out
                            hover:scale-105
                           '
              >
                <FaUserCircle size={35} color='#3b82f6'/>
              </button>

                {/* User Dropdown */}
                <div
                className={`
                  absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl
                  border border-gray-200 overflow-hidden
                  transition-all duration-300 ease-in-out origin-top-right
                  ${userDropdownOpen 
                    ? 'opacity-100 visible scale-y-100 translate-y-0'
                    : 'opacity-0 invisible scale-y-95 -translate-y-2'
                  }
                `}
              >
                <ul className='p-0 mb-0'>
                  {USER_MENU.map((item) => (
                    <li key={item.id} className="group relative">
                      <a
                        href={item.to}
                        onClick={(e) => e.preventDefault()}
                        className="
                          flex items-center w-full px-4 py-3 text-gray-700 text-sm font-medium
                          hover:bg-blue-50 hover:text-blue-600
                          transition-colors duration-200 ease-in-out
                        "
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;