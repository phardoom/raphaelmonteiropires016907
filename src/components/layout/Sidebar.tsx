import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-8 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 p-6 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-base font-semibold tracking-tight shadow-inner shadow-white/10">
          PM
        </div>
        <div className="hidden flex-col md:flex">
          <span className="text-[10px] uppercase tracking-[0.15em] text-blue-100/70">
            Pet Manager
          </span>
          <span className="text-sm font-medium tracking-tight">Painel</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white/20 text-white shadow-sm"
                : "text-blue-100/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9.36 1.77-.29 3.35-1.47 3.53-1.17.18-2.43-1.11-2.8-2.89-.37-1.77.3-3.35 1.48-3.54Zm7.15 0c1.18.19 1.85 1.77 1.48 3.54-.37 1.78-1.63 3.07-2.8 2.89-1.18-.18-1.83-1.76-1.47-3.53.36-1.78 1.61-3.07 2.79-2.9ZM3 10.5c1.1-.24 2.27.88 2.61 2.5.34 1.62-.28 3.13-1.38 3.38-1.1.24-2.28-.89-2.62-2.5-.33-1.62.29-3.13 1.39-3.38Zm18 0c1.1.25 1.72 1.76 1.39 3.38-.34 1.61-1.52 2.74-2.62 2.5-1.1-.25-1.72-1.76-1.38-3.38.34-1.62 1.51-2.74 2.61-2.5ZM12 12c2.21 0 4 2.79 4 5a4 4 0 0 1-8 0c0-2.21 1.79-5 4-5Z"/>
          </svg>
          Pets
        </NavLink>
        <NavLink
          to="/tutores"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white/20 text-white shadow-sm"
                : "text-blue-100/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          Tutores
        </NavLink>
      </nav>
    </aside>
  );
};
