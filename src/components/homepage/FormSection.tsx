import React, { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  service: string;
  content: string;
}

interface RegistrationFormProps {
  onClose?: () => void;
}

const SignupDetailForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: '',
    content: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const services = [
    'Chọn dịch vụ',
    'Học lái xe ô tô',
    'Học lái xe máy',
    'Sát hạch lái xe',
    'Tư vấn học lái xe'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên của bạn';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.service || formData.service === 'Chọn dịch vụ') {
      newErrors.service = 'Vui lòng chọn dịch vụ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form submitted:', formData);
      alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
      // Reset
      setFormData({
        name: '',
        phone: '',
        service: '',
        content: ''
      });
      if (onClose) onClose();
    }
  };

  return (
    // <div className='relative w-full p-2'>
    <>
         {/** Form */}
        <div className="relative max-w-3xl mx-auto bg-white/20 backdrop-blur-md shadow-lg mt-3 rounded-lg p-4">
            <div className="mb-6">
                <div className="inline-flex items-center justify-center text-red-800 animate-bounce rounded-2xl bg-white px-4 py-2 text-sm font-semibold mb-2">Liên hệ ngay để được tư vấn</div>
                <h2 className="text-2xl font-bold text-purple-700 mb-2">
                ĐĂNG KÝ HÔM NAY GIẢM NGAY <span className="text-4xl font-bold text-blue-600 border-b-4 border-blue-600">2.000.000Đ</span>
                </h2>
            </div>

            <div className="flex flex-col gap-3 mt-3">
                {/* Tên của bạn */}
                <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên của bạn"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-white/50 bg-white/30'} rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/50 transition-all backdrop-blur-sm placeholder-gray-700 text-gray-900 font-medium`}
                />
                {errors.name && (
                    <p className="text-red-600 font-semibold text-sm mt-1 bg-white/80 px-2 py-1 rounded inline-block">{errors.name}</p>
                )}
                </div>

                {/* Số điện thoại và Chọn dịch vụ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại của bạn"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-white/50 bg-white/30'} rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/50 transition-all backdrop-blur-sm placeholder-gray-700 text-gray-900 font-medium`}
                    />
                    {errors.phone && (
                    <p className="text-red-600 font-semibold text-sm mt-1 bg-white/80 px-2 py-1 rounded inline-block">{errors.phone}</p>
                    )}
                </div>
                
                <div>
                    <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border-2 ${errors.service ? 'border-red-500 bg-red-50/30' : 'border-white/50 bg-white/30'} rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/50 transition-all backdrop-blur-sm cursor-pointer text-gray-900 font-medium`}
                    >
                    {services.map((service, index) => (
                        <option key={index} value={service} disabled={index === 0} className="bg-white text-gray-900">
                        {service}
                        </option>
                    ))}
                    </select>
                    {errors.service && (
                    <p className="text-red-600 font-semibold text-sm mt-1 bg-white/80 px-2 py-1 rounded inline-block">{errors.service}</p>
                    )}
                </div>
                </div>

                {/* Nội dung */}
                <div>
                <textarea
                    name="content"
                    placeholder="Nội dung"
                    value={formData.content}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 max-h-24 border-2 border-white/50 bg-white/30 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/50 transition-all resize-none backdrop-blur-sm placeholder-gray-700 text-gray-900 font-medium"
                />
                </div>

                {/* Submit Button */}
                <div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full animate-pulse bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    GỬI CHO CHÚNG TÔI
                </button>
                </div>
            </div>
        </div>
    </>
   
    // </div>
  );
};

export default SignupDetailForm;