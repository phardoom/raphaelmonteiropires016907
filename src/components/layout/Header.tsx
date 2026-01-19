import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="app-header">
      <div>
        <strong>Pet Manager</strong>
        <span className="app-subtitle">Painel administrativo</span>
      </div>
      <button className="app-button ghost" type="button" onClick={logout}>
        Sair
      </button>
    </header>
  );
};
