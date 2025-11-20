import React from 'react'

const ErrorPage = () => {

  return (
    <div>
        <main className="grid min-h-screen place-items-center bg-blue-50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-[10rem] font-semibold text-blue-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 text-decoration-none">Go back home</a>
                <a href="#" className="text-lg text-decoration-none hover:border-b-2 font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ErrorPage