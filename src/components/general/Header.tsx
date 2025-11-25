import { useState, useEffect, useRef } from 'react';
import { MdEmail } from "react-icons/md";
import { FaClock, FaUserCircle, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { MENU, USER_MENU } from '../../data/menuSections';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

// hiệu ứng scroll của header
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setScrollDir("down"); // scroll xuống
    } else {
      setScrollDir("up"); // scroll lên
    }
    setLastScrollY(currentScrollY);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);
  // Click ngoài để đóng dropdown user
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đóng mobile menu khi resize về desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileSubmenuOpen(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <div className='h-[72px] md:h-[100px] lg:h-[125px]'></div>

    <div 
        className={`
          fixed top-0 left-0 right-0 z-30 bg-white shadow-md
          transition-transform duration-300 ease-in-out
          ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}
        `}
      >
      {/* Top Header - Ẩn trên mobile */}
      <div className='bg-blue-600 text-white hidden md:block'>
        <div className='max-w-7xl mx-auto'>
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3 sm:gap-6 sm:px-6 py-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <MdEmail size={18} className="shrink-0" />
              <span className='font-medium break-all'>phantrungnam22162018@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <FaClock size={16} className="shrink-0" />
              <span className='font-medium'>Thứ 2 - Thứ 7: 08:00 - 17:30 | Online 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3'>
        <div className='flex items-center justify-between gap-4'>
          {/* Logo */}
          <div className="shrink-0">
            <Link 
              to="/" 
              className='text-blue-900 font-bold mb-0 transition-colors cursor-pointer
                         text-lg sm:text-xl md:text-2xl lg:text-3xl
                         hover:text-blue-700 text-decoration-none'
            >
              Đào Tạo Lái Xe Tuấn Long
            </Link>
          </div>

          {/* Desktop Navigation & User Menu - Ẩn trên mobile/tablet */}
          <div className="hidden lg:flex items-center gap-8">
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
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) => `
                        flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-base
                        transition-all duration-300 ease-in-out whitespace-nowrap
                        ${isActive
                          ? 'text-white bg-blue-600 shadow-lg scale-105'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}
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
                    </NavLink>

                    {/* Dropdown Menu */}
                    {menu.children && (
                      <div 
                        className={`
                          absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg
                          transition-all duration-300 ease-in-out origin-top z-50
                          ${hoveredMenu === menu.id 
                            ? 'opacity-100 visible scale-y-100 translate-y-0' 
                            : 'opacity-0 invisible scale-y-95 -translate-y-2'
                          }
                        `}
                      >
                        <ul className='p-0 mb-0'>
                          {menu.children.map((child) => (
                            <li key={child.id} className="group relative">
                              <NavLink
                                to={child.to}
                                className="
                                  flex items-center w-full 
                                  px-5 py-3 text-gray-700 text-sm font-medium
                                  hover:bg-blue-50 hover:text-blue-600
                                  transition-colors duration-200 ease-in-out
                                  border-l-4 border-transparent hover:border-blue-600 
                                  first:rounded-t-lg last:rounded-b-lg
                                "
                              >
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-2">
                                  {child.label}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Menu Desktop */}
            <div 
              ref={userRef} 
              className='relative' 
              onMouseEnter={() => setUserDropdownOpen(true)} 
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className='flex items-center rounded-full
                           transition-all duration-300 ease-in-out
                           hover:scale-110'
              >
                <FaUserCircle size={35} color='#3b82f6'/>
              </button>

              {/* User Dropdown */}
              <div
                className={`
                  absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl
                  border border-gray-200 overflow-hidden z-50
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
                      <NavLink
                        to={item.to}
                        className="
                          flex items-center w-full px-4 py-3 text-gray-700 text-sm font-medium
                          hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-600
                          transition-colors duration-200 ease-in-out
                          first:rounded-t-lg last:rounded-b-lg
                        "
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Menu Button Only */}
          <div className="flex lg:hidden items-center">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className='flex items-center justify-center w-10 h-10 rounded-lg
                         bg-blue-600 text-white
                         transition-all duration-300 ease-in-out
                         hover:bg-blue-700 active:scale-95'
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>

          {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-60"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu - Slide from right */}
      <div
        ref={mobileMenuRef}
        className={`
          lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-70
          transition-transform duration-300 ease-in-out overflow-y-auto
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600">
          <h3 className="text-lg font-bold text-white m-0">DTLX-T51</h3>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Profile Section - Inside Mobile Menu */}
        <div className="p-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-blue-100">
          <div className="flex items-center gap-3">
            <FaUserCircle size={50} color='#3b82f6'/>
            <div>
              <p className="font-bold text-gray-800 text-lg mb-0 border-b border-gray-000">Đăng nhập</p>
            </div>
          </div>
          
        </div>

        {/* Mobile Menu Items */}
        <nav className="p-4">
          <ul className="p-0">
            {MENU.map((menu) => (
              <li key={menu.id}>
                {/* Main Menu Item */}
                <div>
                  {menu.children ? (
                    <button
                      onClick={() => setMobileSubmenuOpen(
                        mobileSubmenuOpen === menu.id ? null : menu.id
                      )}
                      className="flex items-center justify-between w-full px-4 py-3 
                                 text-gray-700 font-medium rounded-lg
                                 hover:bg-blue-50 hover:text-blue-600
                                 transition-colors duration-200"
                    >
                      <span>{menu.label}</span>
                      <FaChevronDown 
                        size={14} 
                        className={`transition-transform duration-300 ${
                          mobileSubmenuOpen === menu.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={menu.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg font-medium
                        transition-colors duration-200
                        ${isActive
                          ? 'text-white bg-blue-600'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
                      `}
                    >
                      {menu.label}
                    </NavLink>
                  )}
                </div>

                {/* Submenu */}
                {menu.children && (
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${mobileSubmenuOpen === menu.id 
                        ? 'max-h-96 opacity-100 mt-2' 
                        : 'max-h-0 opacity-0'}
                    `}
                  >
                    <ul className="pl-4 space-y-1 border-l-2 border-blue-200">
                      {menu.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            to={child.to}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileSubmenuOpen(null);
                            }}
                            className={({ isActive }) => `
                              flex items-center px-4 py-2 rounded-lg text-sm
                              transition-colors duration-200
                              ${isActive
                                ? 'text-blue-600 bg-blue-50 font-medium'
                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}
                            `}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;