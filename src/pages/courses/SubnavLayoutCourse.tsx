// src/components/SubNavLayout.jsx
import React from "react";
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
    <div className="min-h-[60vh] bg-linear-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header / Hero */}
        <div className="flex items-center gap-4">
          {heroImage && (
            <img src={heroImage} alt={title} className="w-14 h-14 rounded-md object-cover shadow-sm" />
          )}
          <div>
            <h1 className="text-xl font-semibold text-sky-700">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-6">
          {/* Left: subnav list */}
          <aside className="col-span-3">
            <div className="bg-white rounded shadow-sm overflow-hidden border">
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
          <main className="col-span-9">
            <div className="bg-white rounded shadow-sm p-6 border min-h-80">
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
