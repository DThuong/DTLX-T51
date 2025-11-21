import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Course from '../pages/Course';
import News from '../pages/News';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/user/Login';
import CoursePage from '../pages/courses/CoursePage';
import GenericDetail from '../pages/courses/GenericDetailCourse';

function App() {
  return (
    <>
      <Routes>
        {/** Layout chung */}
        <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/gioi-thieu' element={<About/>}/>
            <Route path='/khoa-hoc' element={<Course/>}/>
            <Route path='/tin-tuc' element={<News/>}/>

            {/** Route khóa học */}
            <Route path="/khoa-hoc/:slug" element={<CoursePage />}>
              <Route path="tong-quan" element={<GenericDetail type="overview" />} />
              <Route path="chuong-trinh" element={<GenericDetail type="program" />} />
              <Route path="hoc-phi" element={<GenericDetail type="fee" />} />
              <Route path="dang-ky" element={<GenericDetail type="register" />} />
              {/* fallback */}
              <Route index element={<GenericDetail type="overview" />} />
            </Route>

            {/** Route user */}
            <Route>
                <Route path='/user/login' element={<Login/>}/>
            </Route>

        </Route>

        {/** Các route khác không dùng layout */}
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App
