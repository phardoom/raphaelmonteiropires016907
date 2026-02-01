import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/errorHandler";
import { Loading } from "../components/ui/Loading";

export const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/pets", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate("/pets", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Credenciais inválidas."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-slate-100">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_25px_70px_-40px_rgba(15,23,42,0.55)] md:grid-cols-[1.05fr_1fr]">
          <section className="relative hidden flex-col justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-10 text-white md:flex">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-lg font-semibold tracking-tight shadow-inner shadow-white/10">
                PM
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-100/80">
                  Pet Manager
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Gestão de PETs e Tutores
                </h1>
              </div>
            </div>
          </section>

          <form className="p-8 md:p-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Acesso ao sistema
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Bem-vindo de volta
              </h2>
              <p className="text-sm text-slate-500">
                Entre com suas credenciais para continuar.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Usuário
                <input
                  type="text"
                  name="username"
                  placeholder="admin"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Senha
                <input
                  type="password"
                  name="password"
                  placeholder="admin"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            {error ? <span className="mt-4 block text-sm text-red-600">{error}</span> : null}

            <button
              className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-blue-700 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading label="Entrando..." /> : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
