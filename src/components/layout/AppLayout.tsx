import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  const location = useLocation();
  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr] bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-400">
            {location.pathname.replace("/", "").split("/").join(" / ") || "início"}
          </p>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
