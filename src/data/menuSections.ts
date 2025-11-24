const MENU = [
  { id: 'home', label: 'Trang Chủ', to: '/' },
  {
    id: 'about',
    label: 'Giới Thiệu',
    to: '/gioi-thieu',
    // children: [
    //   { id: 'team', label: 'Đội ngũ', to: '/gioi-thieu/doi-ngu' },
    //   { id: 'history', label: 'Lịch sử', to: '/gioi-thieu/lich-su' },
    //   { id: 'contact', label: 'Liên hệ', to: '/gioi-thieu/lien-he' },
    // ],
  },
  {
    id: 'courses',
    label: 'Khóa Học Lái Xe',
    to: '/khoa-hoc',
    children: [
      { id: 'car-b2', label: 'Hạng B2', to: '/khoa-hoc/b2' },
      { id: 'car-b1', label: 'Hạng B1', to: '/khoa-hoc/b1' },
      { id: 'motor-a2', label: 'Hạng A2', to: '/khoa-hoc/a2' },
      { id: 'motor-a1', label: 'Hạng A1', to: '/khoa-hoc/a1' },
      { id: 'truck-c1', label: 'Hạng C1', to: '/khoa-hoc/c1' },
      { id: 'bo-tuc', label: 'Bổ túc tay lái', to: '/khoa-hoc/bo-tuc-tay-lai' },
    ],
  },
  {
    id: 'news',
    label: 'Tin Tức',
    to: '/tin-tuc',
    // children: [
    //   { id: 'news-all', label: 'Tất cả', to: '/tin-tuc' },
    //   { id: 'promotion', label: 'Khuyến mãi', to: '/tin-tuc/khuyen-mai' },
    //   { id: 'tips', label: 'Mẹo lái xe', to: '/tin-tuc/meo-lai-xe' },
    // ],
  },
];

const USER_MENU = [
  { id: 'login', label: 'Đăng nhập', to: '/user/login' },
  { id: 'logout', label: 'Đăng Xuất', to: '/logout' },
];

export { MENU, USER_MENU };