import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Breadcrumb } from "../ui/Breadcrumb";

export const AppLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-[220px_1fr] bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
