import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="app-sidebar">
      <div className="app-logo">PM</div>
      <nav className="app-menu">
        <NavLink to="/pets">Pets</NavLink>
        <NavLink to="/tutores">Tutores</NavLink>
      </nav>
    </aside>
  );
};
