import React, { use } from 'react';
import { useParams, Outlet, Link } from 'react-router-dom';
import { COURSE_SECTIONS } from '../../config/courseSections';
import ErrorCoursePage from '../ErrorCoursePage';
import SubNavLayoutCourse from './SubnavLayoutCourse';

interface CoursePageProps {
    id: string;
    title: string;
    subtitle?: string;
    heroImage?: string;
    items: CourseItems[];
    [key: string]: any;
}

interface CourseItems {
    id: string;
    label: string;
    to: string;
    summary?: string;
    [key: string]: any;
}

const COURSE_SECTIONS_TYPED = COURSE_SECTIONS as Record<string, CoursePageProps>;
const CoursePage = () => {
    // useParams để lấy tham số động từ URL
    const params = useParams();
    const slug = params.slug as string; // Lấy slug từ tham số URL

    if(!slug) {return <ErrorCoursePage />;} // Nếu không có slug, hiển thị trang lỗi

    const courseData = COURSE_SECTIONS_TYPED[slug]; // Lấy dữ liệu khóa học từ config
    if (!courseData) {
        // Nếu không tìm thấy khóa học, hiển thị trang lỗi
        return <ErrorCoursePage />;
    }
  return (
    <SubNavLayoutCourse {...courseData}> {/* Truy cập dữ liệu khóa học bằng cú pháp expression {...} */}
        <Outlet /> {/* Nội dung chi tiết của mục con sẽ được hiển thị ở đây */}
    </SubNavLayoutCourse>
  )
}

export default CoursePage