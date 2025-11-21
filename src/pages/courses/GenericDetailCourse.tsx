// src/pages/GenericDetail.tsx
import React, { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { COURSE_SECTIONS } from '../../config/courseSections';
import ErrorCoursePage from '../ErrorCoursePage';

type DetailType = 'overview' | 'program' | 'fee' | 'register';

interface GenericDetailProps {
  type: DetailType;
}

interface CourseItem {
  id: string;
  label: string;
  to: string;
  summary?: string;
  [key: string]: any;
}

interface CourseConfig {
  id?: string;
  title?: string;
  subtitle?: string;
  heroImage?: string;
  items?: CourseItem[];
  [key: string]: any;
}

const COURSE_SECTIONS_TYPED = COURSE_SECTIONS as Record<string, CourseConfig | undefined>;

export default function GenericDetail({ type }: GenericDetailProps): JSX.Element {
  const params = useParams<{ slug?: string }>();
  const slug = params.slug;

  if (!slug) {
    return <ErrorCoursePage />;
  }

  const cfg = COURSE_SECTIONS_TYPED[slug];
  if (!cfg) return <ErrorCoursePage />;

  switch (type) {
    case 'overview':
      return (
        <div>
          <h2 className="text-lg font-semibold mb-2">{cfg.title ?? 'Khóa học'} - Tổng quan</h2>
          <p>Đây là phần tổng quan cho {cfg.title ?? 'khóa học'}. Mô tả ngắn...</p>
        </div>
      );

    case 'program':
      return (
        <div>
          <h2 className="text-lg font-semibold mb-2">Chương trình</h2>
          <p>Chi tiết chương trình học...</p>
        </div>
      );

    case 'fee':
      return (
        <div>
          <h2 className="text-lg font-semibold mb-2">Học phí</h2>
          <p>Chi tiết học phí...</p>
        </div>
      );

    case 'register':
      return (
        <div>
          <h2 className="text-lg font-semibold mb-2">Đăng ký</h2>
          <p>Form đăng ký hoặc CTA...</p>
        </div>
      );

    default:
      return <div>Chọn mục ở bên trái</div>;
  }
}
