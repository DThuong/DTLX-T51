import React, { useState } from 'react';
// Import icons từ lucide-react (hoặc thư viện icon bạn đang sử dụng)
import { FaGoogle, FaFacebook } from "react-icons/fa";

// Khởi tạo các biến global (dummy values cho môi trường Canvas)
// Trong ứng dụng thực tế, bạn sẽ khởi tạo Firebase/Firestore ở đây.
const __app_id = 'login-app-123'; 
const __firebase_config = '{}'; 
const __initial_auth_token = ''; 


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  // States để lưu trữ dữ liệu form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (isLogin) {
      console.log('Đang thực hiện Đăng nhập:', { email, password });
      // Thêm logic Đăng nhập bằng Email/Password
    } else {
      if (password !== confirmPassword) {
        console.error('Mật khẩu và Xác nhận Mật khẩu không khớp.');
        return;
      }
      console.log('Đang thực hiện Đăng ký:', { email, password });
      // Thêm logic Đăng ký bằng Email/Password
    }
  };

  const handleSocialLogin = (provider:any) => {
    console.log(`Đang gọi API Đăng nhập bằng ${provider}...`);
    // Thêm logic gọi API Google/Facebook Auth ở đây (sử dụng Firebase Auth)
  };

  return (
    // Container chính (Căn giữa toàn màn hình)
    <div className="flex items-center justify-center p-4 sm:p-8 font-inter">
      
      <div 
        className="
          w-full max-w-lg
          p-6 space-y-6 px-4 py-3
          bg-white rounded-xl shadow-2xl 
          md:p-8 
        "
      >
        
        {/* Tiêu đề */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
        </h2>
        <p className="text-center text-sm text-gray-500">
          {isLogin ? 'Đăng nhập để tiếp tục' : 'Bắt đầu hành trình của bạn'}
        </p>

        {/* ======================================================= */}
        {/* === SOCIAL LOGIN BUTTONS === */}
        {/* ======================================================= */}
        <div className="space-y-3">
            {/* Nút Google */}
            <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
            >
                {/* Sử dụng Chrome icon với màu Google blue */}
                <FaGoogle className="w-5 h-5 mr-2 text-blue-500" />
                {isLogin ? 'Đăng nhập bằng Google' : 'Đăng ký bằng Google'}
            </button>

            {/* Nút Facebook */}
            <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full flex items-center justify-center py-3 rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
            >
                {/* Sử dụng Facebook icon với màu trắng */}
                <FaFacebook className="w-5 h-5 mr-2" />
                {isLogin ? 'Đăng nhập bằng Facebook' : 'Đăng ký bằng Facebook'}
            </button>
        </div>

        {/* Dòng chữ "Hoặc" để chia tách form */}
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">Hoặc tiếp tục với Email</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* ======================================================= */}
        {/* === FORM EMAIL/PASSWORD === */}
        {/* ======================================================= */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Trường Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              placeholder="tenban@example.com"
            />
          </div>

          {/* Trường Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Trường Xác nhận Mật khẩu (Chỉ hiển thị khi Đăng ký) */}
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận Mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          )}
          
          {/* Nút Submit Email/Password */}
          <button
            type="submit"
            className="w-full py-3 mt-5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-[1.01]"
          >
            {isLogin ? 'Đăng nhập' : 'Hoàn tất Đăng ký'}
          </button>
        </form>

        {/* Chuyển đổi trạng thái */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
                setIsLogin(!isLogin);
                // Xóa trạng thái form khi chuyển đổi
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 font-medium"
          >
            {isLogin 
              ? 'Chưa có tài khoản? Đăng ký tại đây' 
              : 'Đã có tài khoản? Quay lại Đăng nhập'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;