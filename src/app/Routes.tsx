import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from '../pages/Home';
import About from '../pages/About';
import Course from '../pages/Course';
import News from '../pages/News';

function App() {
  return (
    <>
      <Routes>
        {/** Layout chung */}
        <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/gioi-thieu' element={<About/>}/>
            <Route path='/khoa-hoc-lai-xe' element={<Course/>}/>
            <Route path='/tin-tuc' element={<News/>}/>
        </Route>

        {/** Các route khác không dùng layout */}
        <Route path='*' element={<div>404 Not Found</div>}/>
      </Routes>
    </>
  )
}

export default App
