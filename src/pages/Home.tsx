import CarViewer from '../components/homepage/CarViewer'
import FlashSaleSection from '../components/homepage/FlashSaleSection'
import RegistrationForm from '../components/homepage/InforSection'
import CoursesSection from '../components/homepage/CourseSection'
import NewsExperienceSection from '../components/homepage/NewsExperienceSection'

const Home = () => {
  return (
    <div>
      {/* <div className='h-200'>...</div> */}
      {/** Tạm ngưng load car viewer */}
      <CarViewer />
      <div className='px-3 sm:px-4 lg:px-6 relative'>
        <div 
          className="absolute inset-0 opacity-100 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600)',
            filter: 'blur(1px)'
          }}
        />
        <div className='relative z-10'>
          <div className='py-3'></div>
          <FlashSaleSection />
          <div className='py-3'></div>
        </div>
      </div>
      <div>
        <RegistrationForm />
      </div>
      <div>
        <CoursesSection />
      </div>
       <div>
        <NewsExperienceSection />
      </div>
    </div>
  )
}

export default Home