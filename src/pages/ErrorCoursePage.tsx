import React from 'react'

const ErrorCoursePage = () => {

  return (
    <div>
        <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-[10rem] font-semibold text-blue-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Không tìm thấy khóa học</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Xin lỗi, chúng tôi không tìm thấy khóa học bạn đang tìm kiếm.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/" className="rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 text-decoration-none">Quay lại trang chủ</a>
                <a href="/support" className="text-lg text-decoration-none hover:border-b-2 font-semibold text-gray-900">Yêu cầu trợ giúp <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ErrorCoursePage