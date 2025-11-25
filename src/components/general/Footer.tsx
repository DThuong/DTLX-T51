import { FaFacebook } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <div className='bg-blue-200'>
        <div className='footer-head flex justify-center bg-blue-600'>
            <nav>
                <ul className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-3 text-base sm:text-lg font-semibold text-white mb-0">
  {[
    { label: "Đăng Ký Online", href: "#" },
    { label: "Thi Thử Lý Thuyết (GPLX)", href: "#" },
    { label: "Thi Thử Mô Phỏng", href: "#" },
    { label: "Tài Liệu Học Tập", href: "#" },
  ].map((item, index) => (
    <li
      key={index}
      className="
        relative overflow-hidden rounded-xl
        shadow-lg
        bg-linear-to-b from-blue-500 via-purple-500 to-purple-500
        transition-transform duration-300
        hover:scale-105 hover:shadow-2xl
      "
    >
      <a
        href={item.href}
        className="
          block w-full px-5 py-3 text-center
          text-white font-semibold
          relative z-10
          transition-opacity duration-300
          hover:opacity-90
        "
      >
        {item.label}
      </a>
      {/* Optional: overlay gradient animation */}
      <span className="
        absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10
        opacity-0 hover:opacity-30
        transition-opacity duration-300
      "></span>
    </li>
  ))}
</ul>
            </nav>
        </div>

        <div className='footer-content max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-5 justify-items-start sm:justify-items-center text-sm sm:text-base'>
                <div className="column-1 mb-4 sm:mb-0">
                    <div><h4 >Công Ty Đào Tạo Lái Xe Tuấn Long</h4 ></div>
                    <div>
                        <p><span>Mã số thuế</span>: 3603681682</p>
                        <p>Công Ty Đào Tạo Lái Xe Tuấn Long</p>
                    </div>
                </div>
                <div className="column-2 mb-4 sm:mb-0">
                    <h4 >Thông Tin Trung Tâm</h4 >
                    <p><span>Địa Chỉ</span>: KHU PHỐ LONG KHÁNH 3, PHƯỜNG TAM PHƯỚC, TỈNH ĐỒNG NAI</p>
                </div>
                <div className="column-3 mb-4 sm:mb-0">
                    <h4 >Thông Tin Liên Hệ</h4 >
                    <p><span>Email</span>: ttgdnndtlxt51@gmail.com</p>
                    <p><span>Nơi tiếp nhận hồ sơ</span>: TT Đào Tạo Lái Xe T51 - Tuấn Long, Tam Phước, Long Thành District, Đồng Nai, Vietnam </p>
                </div>
                <div className="column-4 sm:mb-0">
                    <h4 >Mạng Xã Hội</h4 >
                    
                    <div className="flex justify-start sm:justify-center gap-4">
                        <a href=""><FaFacebook size={28} color="blue"/></a>
                        <a href=""><SiZalo size={28} color="blue"/></a>
                    </div>
                </div>
        </div>

        <div className='footer-end text-center bg-[rgb(12,12,201)] text-White'>
            <p className='p-3 mb-0 text-sm sm:text-base styleText'>©2025 - Công Ty Đào Tạo Lái Xe Tuấn Long</p>
        </div>
    </div>
  )
}

export default Footer