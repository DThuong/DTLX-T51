// Đường dẫn và cấu trúc các phần trong khóa học
export const COURSE_SECTIONS = {
  b2: {
    id: 'b2',
    title: 'Hạng B2',
    subtitle: 'Khóa học bằng lái B2 - Ô tô',
    heroImage: 'đương dẫn tới hình ảnh minh họa hạng B2',
    items: [
      { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/b2/tong-quan', summary: 'Giới thiệu khóa học' },
      { id: 'program', label: 'Chương trình', to: '/khoa-hoc/b2/chuong-trinh', summary: 'Môn học & lịch' },
      { id: 'fee', label: 'Học phí', to: '/khoa-hoc/b2/hoc-phi', summary: 'Chi tiết chi phí' },
      { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/b2/dang-ky', summary: 'Đăng ký online' },
    ],
  },
  b1: {
    id: 'b1',
    title: 'Hạng B1',
    subtitle: 'Khóa học bằng lái B1 - Ô tô',
    heroImage: 'đương dẫn tới hình ảnh minh họa hạng B1',
    items: [
      { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/b1/tong-quan', summary: 'Giới thiệu khóa học' },
      { id: 'program', label: 'Chương trình', to: '/khoa-hoc/b1/chuong-trinh', summary: 'Môn học & lịch' },
      { id: 'fee', label: 'Học phí', to: '/khoa-hoc/b1/hoc-phi', summary: 'Chi tiết chi phí' },
      { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/b1/dang-ky', summary: 'Đăng ký online' },
    ],
  },
  a2: {
    id: 'a2',
    title: 'Hạng A2',
    subtitle: 'Khóa học bằng lái A2 - Ô tô',
    heroImage: 'đương dẫn tới hình ảnh minh họa hạng A2',
    items: [
      { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/a2/tong-quan', summary: 'Giới thiệu khóa học' },
      { id: 'program', label: 'Chương trình', to: '/khoa-hoc/a2/chuong-trinh', summary: 'Môn học & lịch' },
      { id: 'fee', label: 'Học phí', to: '/khoa-hoc/a2/hoc-phi', summary: 'Chi tiết chi phí' },
      { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/a2/dang-ky', summary: 'Đăng ký online' },
    ],
  },
  a1: {
    id: 'a1',
    title: 'Hạng A1',
    subtitle: 'Khóa học mô tô bằng A1',
    heroImage: 'đường dẫn tới hình ảnh minh họa hạng A1',
    items: [
      { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/a1/tong-quan' },
      { id: 'program', label: 'Chương trình', to: '/khoa-hoc/a1/chuong-trinh' },
      { id: 'fee', label: 'Học phí', to: '/khoa-hoc/a1/hoc-phi' },
      { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/a1/dang-ky' },
    ]
  },
  c1: {
    id: 'c1',
    title: 'Hạng C1',
    subtitle: 'Khóa học mô tô bằng C1',
    heroImage: 'đường dẫn tới hình ảnh minh họa hạng C1',
    items: [
      { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/c1/tong-quan' },
      { id: 'program', label: 'Chương trình', to: '/khoa-hoc/c1/chuong-trinh' },
      { id: 'fee', label: 'Học phí', to: '/khoa-hoc/c1/hoc-phi' },
      { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/c1/dang-ky' },
    ]
  },
  'bo-tuc-tay-lai': {
    id: 'bo-tuc-tay-lai',
    title: 'Bổ túc tay lái',
    subtitle: 'Khóa học bổ túc tay lái',
    heroImage: 'đường dẫn tới hình ảnh minh họa bổ túc tay lái',
    items: [
        { id: 'overview', label: 'Tổng quan', to: '/khoa-hoc/bo-tuc-tay-lai/tong-quan' },
        { id: 'program', label: 'Chương trình', to: '/khoa-hoc/bo-tuc-tay-lai/chuong-trinh' },
        { id: 'fee', label: 'Học phí', to: '/khoa-hoc/bo-tuc-tay-lai/hoc-phi' },
        { id: 'register', label: 'Đăng ký', to: '/khoa-hoc/bo-tuc-tay-lai/dang-ky' },
    ]
  }
};