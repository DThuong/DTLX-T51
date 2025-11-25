// src/components/SubNavLayout.jsx
// import React from "react";
import { NavLink } from "react-router-dom";

/**
 * props: các thuộc tính con của component
 *  - title: string
 *  - subtitle?: string
 *  - items: [{id,label,to,summary?}]
 *  - heroImage?: string
 *  - children: content area (optional)
 */
function SubNavLayoutCourse({ title, subtitle, items = [], heroImage, children }: any) {
  return (
    <div className="min-h-[60vh] bg-linear-to-b from-white to-slate-50 mt-4">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header / Hero */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
          {heroImage && <img src={heroImage} alt={title} className="w-full h-auto sm:w-14 sm:h-14 rounded-md object-cover shadow-sm" />}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-sky-700">{title}</h1>
            {subtitle && <p className="text-sm sm:text-base text-slate-500">{subtitle}</p>}
          </div>
        </div>

        <div className="lg:mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:mb-4 mb-4">
          {/* Left: subnav list */}
          <aside className="md:col-span-3 lg:mb-4 md:mb-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border w-full p-1 sm:p-2">
              {items.map((it: any) => (
                <NavLink
                  key={it.id}
                  to={it.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium transition relative
                     ${isActive ? 'bg-sky-50 border-l-4 border-sky-600 text-sky-700' : 'text-slate-700 hover:bg-slate-50'}`
                  }
                >
                  <div className="flex flex-col">
                    <span>{it.label}</span>
                    {it.summary && <small className="text-xs text-slate-400 mt-1">{it.summary}</small>}
                  </div>
                </NavLink>
              ))}
            </div>
          </aside>

          {/* Right: content */}
          <main className="md:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border min-h-[300px] sm:min-h-80">
              {children || (
                <div className="text-slate-600">
                  <p>Chọn một mục ở bên trái để xem chi tiết.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SubNavLayoutCourse;
