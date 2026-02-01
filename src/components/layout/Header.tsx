import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4">
      <div>
        <strong className="text-base font-semibold tracking-tight text-slate-900">
          Pet Manager
        </strong>
        <span className="ml-2 text-xs text-slate-400">Painel administrativo</span>
      </div>
      <button
        className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
        type="button"
        onClick={logout}
      >
        Sair
      </button>
    </header>
  );
};
