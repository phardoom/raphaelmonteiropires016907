import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          <div className="app-breadcrumbs">Você está em: {location.pathname}</div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
